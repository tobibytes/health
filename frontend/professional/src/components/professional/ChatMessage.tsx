import React from 'react';

interface ChatMessageProps {
  sender: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ sender, content }: ChatMessageProps) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        {content}
      </div>
    </div>
  );
}