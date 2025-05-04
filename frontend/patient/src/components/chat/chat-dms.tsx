interface ChatDm {
    id: string;
    user: {
        id: number;
        name: string;
        image: string;
        type: 'patient' | 'professional' | 'assistant';
    },
    url: string
}

export function ChatDms({ chats } : { chats: ChatDm[] }) {
    return (
        <div className="flex flex-col space-y-4">
            {chats.map((chat) => (
                <ChatDmItem key={chat.id} chat={chat} />
            ))}
        </div>
    );
}

export function ChatDmItem({ chat } : { chat: ChatDm }) {
    return (
        <div className="flex items-center space-x-4 p-4 border-b">
            <img src={chat.user.image} alt={chat.user.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{chat.user.name}</h2>
                <p className="text-sm text-gray-500">{chat.url}</p>
            </div>
        </div>
    );
}