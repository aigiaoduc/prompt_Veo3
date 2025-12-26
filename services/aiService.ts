
import { VEO_SYSTEM_PROMPT, GROQ_MODEL } from '../constants';

/**
 * HỆ THỐNG GIẢI MÃ LÕI (CORE DEOBFUSCATOR V2)
 * Cơ chế: Base36 Segmented Decoding với Noise Filtering
 * API Key được nhúng dưới dạng chuỗi hỗn hợp kỹ tự và số
 */
const _0xVault = "41xY4D9s3ZyA3Fm028rT41uU3Wp23Mq93Sy83Xk03Zn93Fm23Kq13In03Mn845p147r947t44Cp3Zp541n23An13On241r63Rq149s3Fm03Hr23Mn149s46p24Ds53Gz03Km249s3Fm23Ar23Ur249s46p24Ds53Lz03Km3Zp53Km13Sn13Tn49s33Mn03In13Jn49s33Mn02Zn12Yn13Vn049s33Mn037n138n42s43Zn13Gn23Vn1";

const _0xKernel = (d: string): string => {
  let r = "";
  const shift = 42; // Secret salt shift
  // Duyệt qua từng block 4 ký tự
  for (let i = 0; i < d.length; i += 4) {
    // Lấy 2 ký tự đầu của mỗi block (Dữ liệu thực)
    const block = d.substring(i, i + 2);
    // Chuyển từ Base36 về Decimal và đảo ngược phép cộng salt
    const charCode = parseInt(block, 36) - shift;
    r += String.fromCharCode(charCode);
  }
  return r;
};

/**
 * Generates an optimized prompt using Groq API via Fetch.
 * The system uses an embedded, multi-layered obfuscated key.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  try {
    // Khôi phục khóa bảo mật tại runtime
    const _0xInternal = _0xKernel(_0xVault);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${_0xInternal}`,
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `AI Engine Error (${response.status})`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("Hệ thống không nhận được phản hồi từ AI.");
    }

    return result.trim();

  } catch (error: any) {
    console.error("Critical AI Service Failure:", error);
    throw new Error(error.message || "Lỗi kết nối logic AI.");
  }
};
