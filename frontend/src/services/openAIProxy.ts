// frontend/src/services/openaiProxy.ts
type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

const API_BASE = process.env.EXPO_PUBLIC_API_BASE!;   // loaded from .env

export async function chatCompleteProxy(messages: ChatMessage[]) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Proxy error ${res.status}: ${txt}`);
  }

  const data = (await res.json()) as { role: string; content: string };
  return data.content;        // just the assistant’s reply
}
