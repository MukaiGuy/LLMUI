// screens/ChatListScreen.tsx
export const ChatListScreen = ({navigation}) => {
    const {chats, newChat} = useContext(ChatContext);
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={chats}
          keyExtractor={c => c.id}
          renderItem={({item}) => (
            <Pressable onPress={() => navigation.navigate('Chat', {chatId: item.id})}>
              <Text style={{fontSize: 18, padding: 12}}>{item.title}</Text>
            </Pressable>
          )}
        />
        <FAB icon="plus" onPress={() => {
          const id = newChat();
          navigation.navigate('Chat', {chatId: id});
        }}/>
      </SafeAreaView>
    );
  };
  