// frontend/src/screens/ChatScreen.tsx
import React, { useRef, useState, useEffect, useContext } from 'react';
import { SafeAreaView, FlatList, KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ChatContext } from '../context/ChatContext';
import MessageBubble from '../components/MessageBubble';
import InputBar from '../components/InputBar';
import Navbar from '../components/Navbar';
import { useRouter, useSegments } from 'expo-router';

export default function ChatScreen() {
  const { params } = useRoute(); // { chatId }
  const { chatId } = params as { chatId: string };
  const { chats, send, newChat } = useContext(ChatContext);
  const chat = chats.find(c => c.id === chatId);
  const router = useRouter();
  const segments = useSegments();

  const [input, setInput] = useState('');
  const flatRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!chat && segments.length > 0) {
      const newId = newChat();
      setTimeout(() => {
        router.replace(`/${newId}`);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat, newChat, router, segments]);

  const handleSend = () => {
    if (input.trim()) {
      send(chatId, input.trim());
      setInput('');
    }
  };

  if (!chat) {
    return null; // or a loading spinner
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Chat" />
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatRef}
          data={chat.messages}
          keyExtractor={m => m.id}
          renderItem={({ item }) => (
            <MessageBubble role={item.role} content={item.content} id={item.id} />
          )}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatRef.current?.scrollToEnd({ animated: true })}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputContainer}>
          <InputBar value={input} onChangeText={setInput} onSend={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  inputContainer: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
});
