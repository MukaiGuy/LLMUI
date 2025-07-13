// screens/ChatScreen.tsx
export const ChatScreen = ({route}) => {
    const {chatId} = route.params;
    const {chats, send} = useContext(ChatContext);
    const chat = chats.find(c => c.id === chatId)!;
    const [input, setInput] = useState('');
  
    const handleSend = () => {
      if (input.trim()) {
        send(chatId, input);
        setInput('');
      }
    };
  
    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <FlatList
          data={chat.messages}
          renderItem={({item}) => <MessageBubble {...item} />}
          keyExtractor={m => m.id}
        />
        <InputBar
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
        />
      </KeyboardAvoidingView>
    );
  };
  