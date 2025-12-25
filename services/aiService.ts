
import { VEO_SYSTEM_PROMPT, GROQ_MODEL } from '../constants';

/**
 * Generates an optimized prompt using Groq API.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Không tìm thấy Groq API Key trong môi trường.");
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: VEO_SYSTEM_PROMPT },
          { role: "user", content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Lỗi kết nối Groq (HTTP ${response.status})`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("Groq không trả về kết quả.");
    }

    return result.trim();

  } catch (error: any) {
    console.error("Groq Service Error:", error);
    if (error.message?.includes("429")) {
      throw new Error("Tốc độ yêu cầu quá nhanh. Vui lòng đợi vài giây.");
    }
    throw new Error(error.message || "Không thể kết nối tới máy chủ AI của Groq.");
  }
};
