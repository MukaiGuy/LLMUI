import { View, Text, ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../src/context/AuthContext';

export default function Index() {
  const { apiKey } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  );
}
