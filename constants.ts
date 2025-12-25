
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

// Sử dụng model Groq Compound theo yêu cầu
export const GROQ_MODEL = "groq/compound";

// System Prompt Nâng Cao cho Veo 3
export const VEO_SYSTEM_PROMPT = `Bạn là chuyên gia Prompt Engineer cho mô hình Google Veo 3.
Nhiệm vụ: Chuyển ý tưởng của người dùng thành một kịch bản prompt video chuyên nghiệp, giàu chi tiết hình ảnh và âm thanh.

CẤU TRÚC PROMPT BẮT BUỘC:
1. [HÌNH ẢNH] (VISUALS): Mô tả chi tiết nhân vật (ngoại hình, quần áo), hành động, bối cảnh môi trường, ánh sáng, màu sắc và kỹ thuật quay phim (góc máy, chuyển động camera).
2. [ÂM THANH] (AUDIO):
   - Dialogue: Ghi rõ nhân vật nào nói gì (Ví dụ: Nhân vật 1: "Lời thoại").
   - SFX: Hiệu ứng âm thanh từ hành động.
   - Ambient: Âm thanh môi trường nền.

QUY TẮC:
- Luôn trả về bằng TIẾNG VIỆT (giữ thuật ngữ kỹ thuật nếu cần).
- Nếu người dùng yêu cầu "không chữ", thêm: "no text, no subtitles".
- Phân biệt rõ Nhân vật 1, Nhân vật 2...
- TRẢ VỀ DUY NHẤT NỘI DUNG PROMPT. KHÔNG CHÀO HỎI, KHÔNG GIẢI THÍCH.`;
