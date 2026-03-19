const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: { content: string };
  }>;
}

export async function callOpenAI(
  messages: ChatMessage[],
  apiKey: string,
): Promise<string> {
  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.1,   // low temp = consistent grammar output
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `OpenAI error: ${res.status}`);
  }

  const data: OpenAIResponse = await res.json();
  const content = data.choices[0]?.message?.content?.trim();

  if (!content) throw new Error('Empty response from OpenAI');
  return content;
}