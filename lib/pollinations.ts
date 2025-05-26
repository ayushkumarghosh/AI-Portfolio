/**
 * Pollinations API client for text generation using the OpenAI model
 */

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PollinationsTextRequest {
  model: string;
  messages: Message[];
  seed?: number;
  private?: boolean;
  referrer?: string;
}

interface PollinationsTextResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Generates text using Pollinations API with the openai-large model
 * @param messages Array of message objects with role and content
 * @param options Additional options like seed, private flag, and referrer
 * @returns Promise with the text generation response
 */
export async function generateText(
  messages: Message[],
  options?: {
    seed?: number;
    private?: boolean;
    referrer?: string;
  }
): Promise<PollinationsTextResponse> {
  const apiUrl = "https://text.pollinations.ai/openai";
  
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai-large",
      messages,
      seed: options?.seed,
      private: options?.private,
      referrer: options?.referrer,
      response_format: { "type": "json_object" }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate text: ${response.status} ${errorText}`);
  }

  return await response.json();
}

/**
 * Simple helper to extract the assistant's response from a Pollinations text response
 * @param response The response from generateText
 * @returns The assistant's message content or undefined if not found
 */
export function extractAssistantResponse(response: PollinationsTextResponse): string | undefined {
  return response.choices[0]?.message?.content;
} 