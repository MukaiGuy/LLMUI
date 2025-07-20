import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export type Bubble = { id: string; role: 'user' | 'assistant'; content: string; timestamp?: string;  };

export default function MessageBubble({ role, content }: Bubble) {
  const theme = useColorScheme(); // 'light' | 'dark'
  const isDark = theme === 'dark';
  const isUser = role === 'user';
  
  return (
    <View style={[styles.container, isUser ? styles.user : styles.ai]}>
      <Text style={isUser ? styles.userText : styles.aiText}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
    padding: 10,
    flexShrink: 1,
  },
  user: {
    backgroundColor: '#0078fe',
    alignSelf: 'flex-end',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderTopRightRadius: 0,
  },
  ai: {
    shadowColor: 'slategrey',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userText: { color: 'white', fontSize: 16, flexWrap: 'wrap' },
  aiText: { color: '#333', fontSize: 16, flexWrap: 'wrap' },
});
