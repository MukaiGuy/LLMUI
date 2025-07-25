// services/openai.ts
export async function chatComplete(
    apiKey: string,
    messages: {role: 'user' | 'assistant' | 'system'; content: string}[],
  ) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({model: 'gpt-4o-mini', messages}),
    });
    return (await res.json()).choices[0].message.content;
  }
  