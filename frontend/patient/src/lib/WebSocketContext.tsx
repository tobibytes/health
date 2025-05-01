import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

type WebSocketContextType = {
  socket: WebSocket | null;
  sendMessage: (msg: string) => void;
  lastMessage: MessageEvent<any> | null;
  isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

type WebSocketProviderProps = {
  url: string;
  children: ReactNode;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ url, children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageEvent<any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let isUnmounted = false;

    function connect() {
      ws = new WebSocket(url);

      ws.onopen = () => {
        if (!isUnmounted) setIsConnected(true);
      };

      ws.onmessage = (event) => {
        if (!isUnmounted) setLastMessage(event);
      };

      ws.onclose = () => {
        if (!isUnmounted) setIsConnected(false);
        // Try to reconnect after 2 seconds
        reconnectRef.current = setTimeout(connect, 2000);
      };

      ws.onerror = () => {
        ws.close();
      };

      setSocket(ws);
    }

    connect();

    return () => {
      isUnmounted = true;
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      ws && ws.close();
    };
    // Only re-run if url changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    }
  };

  const value: WebSocketContextType = {
    socket,
    sendMessage,
    lastMessage,
    isConnected,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}
