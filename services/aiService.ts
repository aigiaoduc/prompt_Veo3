
import { VEO_SYSTEM_PROMPT, V_DATA, GROQ_MODEL } from '../constants';

/**
 * Khôi phục API Key từ mảng số đã được làm mờ (Obfuscated)
 */
const getAuthToken = (): string => {
  try {
    // Khôi phục bằng cách dịch chuyển ngược lại (Shift +3)
    return V_DATA.map(code => String.fromCharCode(code + 3)).join('');
  } catch (e) {
    console.error("Auth error");
    return "";
  }
};

/**
 * Generates an optimized prompt using Groq Cloud API via direct fetch.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  try {
    const apiKey = getAuthToken();
    
    if (!apiKey) throw new Error("Cấu hình bảo mật không hợp lệ.");

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
