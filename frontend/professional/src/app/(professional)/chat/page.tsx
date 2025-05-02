"use client";
import React from 'react';
import { ChatPanel } from '../../../components/professional/ChatPanel';

export default function ChatPage() {
  return (
    <div className="p-6 space-y-6 md:p-8">
      <h1 className="text-2xl font-semibold text-center md:text-left">Chat</h1>
      <ChatPanel />
    </div>
  );
}