import { useEffect, useContext } from 'react';
import { ChatContext } from '../../src/context/ChatContext';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, Text } from 'react-native';

export default function NewChat() {
  const { newChat } = useContext(ChatContext);
  const router = useRouter();

  useEffect(() => {
    const newId = newChat();
    setTimeout(() => {
      router.replace(`/${newId}`);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Creating new chat...</Text>
    </View>
  );
} 