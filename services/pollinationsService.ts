import { VEO_SYSTEM_PROMPT, POLLINATIONS_MODELS } from '../constants';

/**
 * Generates an optimized prompt using Pollinations.ai (Free Text API).
 * No API Key required.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  // 1. Chuẩn bị prompt: System Prompt + User Input
  // Pollinations hoạt động tốt nhất khi ngữ cảnh được gửi trực tiếp trong URL
  const fullPrompt = `${VEO_SYSTEM_PROMPT}\n\nYêu cầu của người dùng: ${userInput}`;
  
  // 2. Chọn model: Ưu tiên openai hoặc qwen
  const model = POLLINATIONS_MODELS[0] || 'openai';

  // 3. Tạo URL request
  // Format chuẩn: https://text.pollinations.ai/{prompt}?model={model}
  // encodeURIComponent là bắt buộc để xử lý các ký tự đặc biệt, xuống dòng, tiếng Việt
  const url = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?model=${model}&seed=${Math.floor(Math.random() * 1000)}`;

  try {
    // 4. Gọi API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Tránh browser cache kết quả cũ
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Lỗi kết nối AI (${response.status}). Vui lòng thử lại.`);
    }

    const text = await response.text();

    if (!text || text.trim().length === 0) {
        throw new Error("AI không trả về kết quả nào. Hãy thử lại với mô tả khác.");
    }

    return text.trim();

  } catch (error: any) {
    console.error("Pollinations Service Error:", error);
    // Thông báo lỗi thân thiện
    throw new Error(error.message || "Hệ thống AI đang bận. Vui lòng thử lại sau giây lát.");
  }
};