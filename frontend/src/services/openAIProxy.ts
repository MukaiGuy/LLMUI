// frontend/src/services/openaiProxy.ts
type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

const API_BASE = 'http://localhost:8000'; // Hardcoded for now

export async function chatCompleteProxy(messages: { role: string; content: string }[]) {
  try {
    const url = `${API_BASE}/chat`;
    console.log('API_BASE:', API_BASE);
    console.log('Using URL:', url);
    console.log('Sending messages:', messages);
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers);

    if (!res.ok) {
      const txt = await res.text();
      console.error('Error response:', txt);
      throw new Error(`Proxy error ${res.status}: ${txt}`);
    }

    const data = (await res.json()) as { role: string; content: string };
    console.log('Success response:', data);
    return data.content; // just the assistant's reply
  } catch (error) {
    console.error('API call failed:', error);
    return "I'm sorry, I'm having trouble processing your request. Please try again later.";
  }
}
