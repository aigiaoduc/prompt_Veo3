
import { VEO_SYSTEM_PROMPT, GROQ_API_KEY, GROQ_MODEL } from '../constants';

/**
 * Generates an optimized prompt using Groq Cloud API via direct fetch.
 * This removes the dependency on @google/genai which was causing build errors.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: VEO_SYSTEM_PROMPT },
          { role: 'user', content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Lỗi kết nối Groq (${response.status})`);
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content;

    if (!result) {
      throw new Error("AI không trả về kết quả.");
    }

    return result.trim();

  } catch (error: any) {
    console.error("Groq Service Error:", error);
    throw new Error(error.message || "Không thể kết nối tới máy chủ AI của Groq.");
  }
};
