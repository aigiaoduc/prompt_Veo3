import React, { useState, useEffect } from 'react';
import { PromptOptions, DEFAULT_OPTIONS, AppMode } from './types';
import { generateOptimizedPrompt } from './services/pollinationsService';
import OfflineForm from './components/OfflineForm';
import AIForm from './components/AIForm';
import PromptDisplay from './components/PromptDisplay';
import { Wifi, WifiOff, Video, Facebook, Users, Coffee } from 'lucide-react';

const App: React.FC = () => {
  // Mặc định vào chế độ AI để tối ưu trải nghiệm "chỉ cần nhập ý tưởng"
  const [mode, setMode] = useState<AppMode>('ai');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [offlineOptions, setOfflineOptions] = useState<PromptOptions>(DEFAULT_OPTIONS);
  
  // Cooldown state for AI generation (60 seconds)
  const [cooldown, setCooldown] = useState(0);

  // Timer effect for cooldown
  useEffect(() => {
    let interval: any;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  // LOGIC TẠO PROMPT OFFLINE
  const generateOfflinePrompt = () => {
    const { style, characters, action, environment, lighting, camera, mood, quality, sfx, ambient, noText } = offlineOptions;
    
    // 1. Scene Setup
    let promptBuilder = `[HÌNH ẢNH] (VISUALS)\n`;
    promptBuilder += `Phong cách & Bầu không khí: Video mang phong cách ${style || 'Điện ảnh'}. `;
    promptBuilder += `Bối cảnh diễn ra tại ${environment || 'một môi trường chi tiết'}, được chiếu sáng bởi ${lighting || 'ánh sáng tự nhiên'}. `;
    promptBuilder += `Tâm trạng tổng thể là ${mood || 'trung tính'}.\n\n`;

    // 2. Character & Action
    promptBuilder += `Nhân vật & Hành động:\n`;
    if (characters.length > 0) {
        characters.forEach((char, index) => {
            const charDesc = char.description || 'một nhân vật';
            promptBuilder += `Nhân vật ${index + 1}: ${charDesc}. `;
        });
    }
    
    if (action) {
        promptBuilder += `\nTương tác/Hành động: ${action}`;
    } else {
        promptBuilder += `\nCác nhân vật thực hiện những chuyển động tinh tế.`;
    }
    promptBuilder += `\n\n`;

    // 3. Technical Specs
    promptBuilder += `Điện ảnh (Cinematography): Được quay bằng kỹ thuật ${camera || 'Tĩnh (Static)'}. `;
    promptBuilder += `Chi tiết độ trung thực cao, chất lượng ${quality || '4K'}.\n\n`;

    // 4. AUDIO SECTION
    const hasDialogue = characters.some(c => c.dialogue && c.dialogue.trim() !== "");
    const hasSFX = sfx && sfx.trim() !== "";
    const hasAmbient = ambient && ambient.trim() !== "";

    if (hasDialogue || hasSFX || hasAmbient) {
        promptBuilder += `[ÂM THANH] (AUDIO)\n`;
        
        if (hasDialogue) {
            characters.forEach((char, index) => {
                if (char.dialogue && char.dialogue.trim() !== "") {
                     let formattedDialogue = char.dialogue.trim();
                     if (!formattedDialogue.startsWith('"') && !formattedDialogue.startsWith('“')) {
                         formattedDialogue = `"${formattedDialogue}"`;
                     }
                     promptBuilder += `Dialogue: Nhân vật ${index + 1} nói: ${formattedDialogue} (Ngôn ngữ: ${char.dialogueLanguage}).\n`;
                }
            });
        }

        if (hasSFX) promptBuilder += `SFX: ${sfx}.\n`;
        if (hasAmbient) promptBuilder += `Ambient: ${ambient}.\n`;
        
        promptBuilder += `\n`;
    }

    // 5. NO TEXT
    if (noText) {
        promptBuilder += `[YÊU CẦU KHÁC]\n`;
        promptBuilder += `no text, no subtitles (Không hiển thị văn bản, không phụ đề).\n`;
    }

    setGeneratedPrompt(promptBuilder);
  };

  // Logic cho chế độ AI
  const handleAIGenerate = async (userInput: string) => {
    if (cooldown > 0) return;

    setIsGenerating(true);
    setGeneratedPrompt('');
    
    try {
      const result = await generateOptimizedPrompt(userInput);
      setGeneratedPrompt(result);
    } catch (error: any) {
      console.error(error);
      setGeneratedPrompt(`Lỗi: ${error.message || "Số lượng người dùng đang quá tải vui lòng thử lại."}`);
    } finally {
      setIsGenerating(false);
      setCooldown(60);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-bold selection:bg-neo-pink selection:text-black pb-20">
      
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        
        {/* Header - Neo Brutalist Style */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white border-2 border-black shadow-neo mb-6 transform -rotate-1">
            <Video className="w-10 h-10 text-black mr-3" />
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              Veo 3 <span className="text-blue-600">Architect</span>
            </h1>
          </div>
          <p className="text-