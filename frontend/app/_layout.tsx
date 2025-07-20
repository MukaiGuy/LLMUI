import { Slot, useRouter } from 'expo-router';
import { AuthProvider, AuthContext } from '../src/context/AuthContext';
import { ChatProvider } from '../src/context/ChatContext';
import { useEffect, useContext } from 'react';

function RootLayoutNav() {
  const { apiKey } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log('RootLayoutNav: apiKey status:', apiKey === null ? 'loading' : apiKey ? 'authenticated' : 'not authenticated');
    
    if (apiKey === null) {
      console.log('RootLayoutNav: Still loading auth...');
      return; // Still loading
    }
    
    if (!apiKey) {
      console.log('RootLayoutNav: Redirecting to login');
      router.replace('/(auth)/login');
    } else {
      console.log('RootLayoutNav: Redirecting to new chat');
      router.replace('/(app)/new');
    }
  }, [apiKey, router]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ChatProvider>
        <RootLayoutNav />
      </ChatProvider>
    </AuthProvider>
  );
}
