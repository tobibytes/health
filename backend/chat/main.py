from fastapi import APIRouter, WebSocket, Depends
from common.utils.auth import decode_token
chat_router = APIRouter(prefix="/chat")

class ChatWebSocketManager:
    """Manages WebSocket connections for chat."""
    def __init__(self):
        self.user_to_socket: dict[int, WebSocket] = {}
        self.socket_to_user: dict[WebSocket, int] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        """Accept a new WebSocket connection."""
        await websocket.accept()
        self.user_to_socket[user_id] = websocket
        self.socket_to_user[websocket] = user_id

    async def disconnect(self, websocket: WebSocket):
        """Disconnect a WebSocket connection."""
        user_id = self.socket_to_user.pop(websocket, None)
        if user_id:
            self.user_to_socket.pop(user_id, None)
        await websocket.close()

    async def send_message_to_user(self, user_id: int, message: str):
        """Send a message to a specific user."""
        websocket = self.user_to_socket.get(user_id)
        if websocket:
            await websocket.send_text(message)

    async def get_user_by_socket(self, websocket: WebSocket) -> int:
        """Get the user_id associated with a WebSocket."""
        return self.socket_to_user.get(websocket)

    async def broadcast(self, message: str):
        """Send a message to all connected clients."""
        for websocket in self.user_to_socket.values():
            await websocket.send_text(message)


manager = ChatWebSocketManager()

@chat_router.websocket("/ws")
async def chat_websocket_endpoint(websocket: WebSocket, token_data: dict = Depends(decode_token)):
    """WebSocket endpoint for chat."""
    await manager.connect(token_data.get("user_id"), websocket)
    while True:
        data = await websocket.receive_json()
        if data.get("action") == "send_message":
            recipient_id = data.get("recipient_id")
            message = data.get("message")
            await manager.send_message_to_user(recipient_id, message)
        elif data.get("action") == "disconnect":
            await manager.disconnect(websocket)
            break
        else:
            await websocket.send_text("Invalid action")
    await manager.disconnect(websocket)

    