"use client";
import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
interface Message {
  id: number;
  sender: 'user' | 'assistant';
  content: string;
}
export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'user', content: 'Hello, how can I help you?' },
    { id: 2, sender: 'assistant', content: 'I need assistance with my medication.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage : Message = { id: Date.now(), sender: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} sender={message.sender} content={message.content} />
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-md p-2"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}