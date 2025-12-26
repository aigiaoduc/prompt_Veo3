
import React, { useState } from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

interface AIFormProps {
  onGenerate: (input: string) => Promise<void>;
  isGenerating: boolean;
  cooldown: number;
}

const AIForm: React.FC<AIFormProps> = ({ onGenerate, isGenerating, cooldown }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim() || isGenerating || cooldown > 0) return;
    onGenerate(input);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-neo-purple border-2 border-black p-6 shadow-neo">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-white border-2 border-black shadow-neo-sm">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>
          <div>
            <h3 className="text-xl font-black text-black uppercase">Kiến trúc sư AI (Secure Core)</h3>
            <p className="text-black font-medium text-sm mt-1">
              Hệ thống AI đã được nhúng khóa bảo mật. Luôn sẵn sàng hoạt động 24/7.
              <br/>
              <span className="text-xs opacity-75">(Phím tắt: Ctrl + Enter để tạo)</span>
            </p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ví dụ: Một phi hành gia đang đi bộ trên bề mặt sao hỏa, ánh sáng mặt trời chiếu từ phía sau..."
            className="w-full h-40 bg-white border-2 border-black p-4 text-black placeholder-gray-400 focus:outline-none focus:shadow-neo-sm focus:bg-yellow-50 text-lg font-medium resize-none"
          />
          <Sparkles className="absolute bottom-4 right-4 text-black w-6 h-6 animate-pulse" />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isGenerating || !input.trim() || cooldown > 0}
        className={`w-full border-2 border-black font-black py-4 uppercase tracking-widest text-lg shadow-neo transform transition-all flex justify-center items-center gap-3
          ${(isGenerating || !input.trim() || cooldown > 0) 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border-gray-400' 
            : 'bg-neo-pink text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'}
        `}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="animate-spin w-6 h-6" />
            Đang giải mã & Tạo...
          </>
        ) : cooldown > 0 ? (
          <>
            <Clock className="w-6 h-6 animate-pulse" />
            Đợi {cooldown}s...
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            Khởi tạo kịch bản Veo 3
          </>
        )}
      </button>
      
      <div className="flex justify-center gap-2 flex-wrap">
         {['Mã hóa 128-bit', 'Zero Config', 'Groq Engine', 'Veo 3.1 Optimized'].map((tag) => (
             <span key={tag} className="text-[10px] font-bold border border-black bg-white px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                 {tag}
             </span>
         ))}
      </div>
    </div>
  );
};

export default AIForm;
