import { create } from 'zustand'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

export interface ChatState {
  messages: Message[]
  activeChat: string | null
  isTyping: boolean
  addMessage: (message: Message) => void
  setActiveChat: (chatId: string | null) => void
  setIsTyping: (isTyping: boolean) => void
  clearMessages: () => void
}

export const createChatSlice = (set: any) => ({
  messages: [],
  activeChat: null,
  isTyping: false,
  addMessage: (message: Message) =>
    set((state: ChatState) => ({
      messages: [...state.messages, message],
    })),
  setActiveChat: (chatId: string | null) => set({ activeChat: chatId }),
  setIsTyping: (isTyping: boolean) => set({ isTyping }),
  clearMessages: () => set({ messages: [] }),
})

export const useChatStore = create<ChatState>()((set) => ({
  ...createChatSlice(set),
})) 