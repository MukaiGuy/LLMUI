// src/context/ChatContext.tsx
import { createContext, useContext, useState } from 'react';
import { chatCompleteProxy } from '../services/openaiProxy';
import { nanoid } from 'nanoid';

export type Message = { id: string; role: 'user' | 'assistant' | 'system'; content: string };
export type Chat = { id: string; title: string; messages: Message[] };

export const ChatContext = createContext<{
  chats: Chat[];
  newChat: () => string;
  send: (chatId: string, text: string) => Promise<void>;
}>({} as any);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const newChat = () => {
    const id = nanoid();
    setChats(cs => [{ id, title: 'New chat', messages: [] }, ...cs]);
    return id;
  };

  const send = async (chatId: string, userText: string) => {
    // 1️⃣ add the user's message locally
    setChats(cs =>
      cs.map(c =>
        c.id === chatId
          ? {
              ...c,
              messages: [...c.messages, { id: nanoid(), role: 'user', content: userText }],
            }
          : c,
      ),
    );

    // 2️⃣ collect history + new message to send to proxy
    const history = chats.find(c => c.id === chatId)?.messages ?? [];
    const assistantReply = await chatCompleteProxy([
      ...history.map(({ role, content }) => ({ role, content })), // strip id
      { role: 'user', content: userText },
    ]);

    // 3️⃣ add assistant reply
    setChats(cs =>
      cs.map(c =>
        c.id === chatId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: nanoid(), role: 'assistant', content: assistantReply },
              ],
            }
          : c,
      ),
    );
  };

  return (
    <ChatContext.Provider value={{ chats, newChat, send }}>
      {children}
    </ChatContext.Provider>
  );
};
