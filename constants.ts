// Danh sách cho Trình tạo mẫu Offline (Giao diện Tiếng Việt)
export const STYLES = [
  "Điện ảnh (Cinematic)",
  "Chân thực như ảnh (Photorealistic)",
  "Phong cách Anime",
  "Hoạt hình 3D (Kiểu Pixar)",
  "Hoạt hình đất sét (Claymation)",
  "Cyberpunk",
  "Phim cổ điển (Thập niên 80)",
  "Phim Noir (Đen trắng nghệ thuật)",
  "Phim tài liệu",
  "Cảnh quay Flycam (Drone)",
  "Nhiếp ảnh Macro (Cận cảnh)",
  "Tranh màu nước",
  "Siêu thực (Surrealist)"
];

export const LIGHTING = [
  "Ánh sáng tự nhiên",
  "Giờ vàng (Golden Hour)",
  "Giờ xanh (Blue Hour)",
  "Ánh sáng điện ảnh",
  "Ánh sáng đèn Neon",
  "Ánh sáng Studio (Softbox)",
  "Sương mù (Volumetric Fog)",
  "Ánh sáng Rembrandt",
  "Tối và Tâm trạng (Dark & Moody)",
  "Sáng và Thoáng đãng",
  "Phát quang sinh học"
];

export const CAMERA_ANGLES = [
  "Tĩnh (Static)",
  "Lia máy chậm (Slow Pan)",
  "Đi theo chủ thể (Tracking Shot)",
  "Hiệu ứng Dolly Zoom",
  "Flycam bay lướt qua",
  "Góc thấp (Low Angle)",
  "Góc nhìn thần thánh (Từ trên cao xuống)",
  "Cầm tay rung lắc (Handheld)",
  "Flycam FPV",
  "Chuyển nét (Rack Focus)",
  "Xoay 360 độ"
];

export const MOODS = [
  "Trung tính",
  "Hùng vĩ (Epic)",
  "Yên bình",
  "Hỗn loạn",
  "Huyền bí",
  "Lãng mạn",
  "Kinh dị",
  "U sầu",
  "Năng lượng cao",
  "Tương lai (Futuristic)"
];

export const QUALITIES = [
  "4K, HDR, Độ trung thực cao",
  "8K, Siêu chi tiết",
  "Hiệu ứng nhiễu băng VHS",
  "Đen trắng, Nhiễu hạt",
  "Siêu thực (Hyper-realistic)"
];

export const DIALOGUE_LANGUAGES = [
  { label: "Tiếng Anh (English)", value: "English" },
  { label: "Tiếng Việt (Vietnamese)", value: "Vietnamese" }
];

// Cấu hình Pollinations.ai
// Removed searchgpt due to instability (502 errors)
export const POLLINATIONS_MODELS = [
  "openai",      
  "qwen",        
  "mistral",     
  "llama"
];

// System Prompt Nâng Cao cho Veo 3
export const VEO_SYSTEM_PROMPT = `
Bạn là Chuyên gia Kỹ thuật Prompt (Prompt Engineer) hàng đầu thế giới dành cho Google Veo 3 Video Model.
Nhiệm vụ: Chuyển đổi ý tưởng của người dùng thành một PROMPT SIÊU CHI TIẾT theo cấu trúc chuẩn Veo 3.1.

QUY TẮC CẤU TRÚC (BẮT BUỘC):
Prompt đầu ra phải được chia thành các phần rõ ràng.

1. [HÌNH ẢNH] (VISUALS): 
   - Mô tả rõ ràng từng nhân vật (Nhân vật 1, Nhân vật 2...).
   - Hành động chung và tương tác.
   - Bối cảnh, ánh sáng, góc máy.

2. [ÂM THANH] (AUDIO): Phân loại rõ ràng 3 yếu tố sau (nếu có):
   - Dialogue: PHẢI GẮN VỚI NHÂN VẬT CỤ THỂ. Ví dụ: 
     Dialogue: Nhân vật 1 nói: "Xin chào". 
   - SFX: Mô tả nguồn âm và hành động. Ví dụ: SFX: tiếng bước chân vang vọng hành lang.
   - Ambient: Mô tả không gian nền. Ví dụ: Ambient: tiếng mưa rơi nhẹ và xe cộ phía xa.

LƯU Ý QUAN TRỌNG:
- Trả về PROMPT BẰNG TIẾNG VIỆT (trừ các thuật ngữ kỹ thuật có thể giữ tiếng Anh nếu cần thiết để model hiểu rõ hơn, nhưng câu văn chính phải là tiếng Việt).
- Nếu người dùng yêu cầu "không chữ", "no text", hãy thêm ghi chú: "Yêu cầu: Không hiển thị văn bản, không phụ đề (no text, no subtitles)."
- Luôn đánh số nhân vật (Nhân vật 1, Nhân vật 2) nếu có nhiều người.

Định dạng đầu ra:
Chỉ trả về nội dung prompt. Không giải thích thêm.
`;