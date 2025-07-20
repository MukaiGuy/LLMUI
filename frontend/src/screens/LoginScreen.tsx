import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);        // login(key) comes from the provider
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!key.trim()) {
      Alert.alert('Missing key', 'Please paste a valid OpenAI API key.');
      return;
    }

    setLoading(true);
    try {
      // do a lightweight ping if you want (optional)
      await SecureStore.setItemAsync('OPENAI_KEY', key.trim());
      login(key.trim());          // update context → RootNavigator shows ChatList
    } catch (e) {
      Alert.alert('Error', 'Unable to save key.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter your OpenAI key</Text>

      <TextInput
        style={styles.input}
        placeholder="sk-…"
        value={key}
        onChangeText={setKey}
        autoCapitalize="none"
        secureTextEntry        // hides characters
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Continue</Text>}
      </TouchableOpacity>

      <Text style={styles.helper}>
        Your key is stored securely on-device with expo-secure-store and never leaves your phone.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#0078fe',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 },
  helper: { marginTop: 24, fontSize: 13, color: '#666', textAlign: 'center' },
});
