// context/ChatContext.tsx
import { chatCompleteProxy } from '../services/openAIProxy';
import { AuthContext } from './AuthContext';
import { useContext, useState } from 'react';
import { nanoid } from 'nanoid';


type Chat = {
    id: string;
    title: string;
    messages: {id: string; role: 'user'|'assistant'; content: string}[];
  };
  
  export const ChatProvider = ({children}) => {
    const {apiKey} = useContext(AuthContext);
    const [chats, setChats] = useState<Chat[]>([]);
  
    const newChat = () => {
      const blank: Chat = {
        id: nanoid(),
        title: 'New chat',
        messages: [],
      };
      setChats([blank, ...chats]);
      return blank.id;
    };
  
    const send = async (chatId: string, userText: string) => {
      setChats(cs =>
        cs.map(c =>
          c.id === chatId
            ? {...c, messages: [...c.messages, {id: nanoid(), role: 'user', content: userText}]}
            : c,
        ),
      );
  
 
      const assistantReply = await chatCompleteProxy(
        chats.find(c => c.id === chatId)!.messages.concat({
          role: 'user',
          content: userText,
        }),
      );
  
      setChats(cs =>
        cs.map(c =>
          c.id === chatId
            ? {...c, messages: [...c.messages, {id: nanoid(), role: 'assistant', content: assistantReply}]}
            : c,
        ),
      );
    };
  
    return (
      <ChatContext.Provider value={{chats, newChat, send}}>
        {children}
      </ChatContext.Provider>
    );
  };
  