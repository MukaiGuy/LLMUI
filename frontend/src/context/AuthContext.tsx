// context/AuthContext.tsx
import * as SecureStore from 'expo-secure-store';
...
export const AuthProvider = ({children}) => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => { SecureStore.getItemAsync('OPENAI_KEY').then(setApiKey); }, []);

  const login = async (key: string) => {
    await SecureStore.setItemAsync('OPENAI_KEY', key);
    setApiKey(key);
  };
  const logout = async () => { await SecureStore.deleteItemAsync('OPENAI_KEY'); setApiKey(null); };

  return (
    <AuthContext.Provider value={{apiKey, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
