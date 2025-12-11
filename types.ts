export interface Character {
  id: string;
  description: string; // Mô tả ngoại hình, trang phục
  dialogue: string;    // Lời thoại riêng của nhân vật này
  dialogueLanguage: 'English' | 'Vietnamese'; // Ngôn ngữ nói của nhân vật này
}

export interface PromptOptions {
  characters: Character[];
  action: string;
  environment: string;
  style: string;
  lighting: string;
  camera: string;
  mood: string;
  quality: string;
  // dialogue và dialogueLanguage đã được chuyển vào Character
  sfx: string;     // Hiệu ứng âm thanh cụ thể (Global)
  ambient: string; // Âm thanh nền/môi trường (Global)
  noText: boolean; // Tùy chọn không văn bản/phụ đề
}

export type AppMode = 'offline' | 'ai';

export const DEFAULT_CHARACTER: Character = {
  id: '1',
  description: '',
  dialogue: '',
  dialogueLanguage: 'English'
};

export const DEFAULT_OPTIONS: PromptOptions = {
  characters: [{ ...DEFAULT_CHARACTER }],
  action: "",
  environment: "",
  style: "Điện ảnh (Cinematic)",
  lighting: "Ánh sáng tự nhiên",
  camera: "Tĩnh (Static)",
  mood: "Trung tính",
  quality: "4K, HDR, Độ trung thực cao",
  sfx: "",
  ambient: "",
  noText: false
};
