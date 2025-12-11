import React from 'react';
import { PromptOptions, Character } from '../types';
import { STYLES, LIGHTING, CAMERA_ANGLES, MOODS, QUALITIES, DIALOGUE_LANGUAGES } from '../constants';
import { Film, Aperture, Palette, Users, MessageSquare, Plus, Trash2, Volume2, Mic, Music, Type, Move, Sun, Monitor, ChevronDown, Check } from 'lucide-react';

interface OfflineFormProps {
  options: PromptOptions;
  setOptions: React.Dispatch<React.SetStateAction<PromptOptions>>;
  onGenerate: () => void;
}

const OfflineForm: React.FC<OfflineFormProps> = ({ options, setOptions, onGenerate }) => {
  
  const handleChange = (field: keyof PromptOptions, value: any) => {
    setOptions(prev => ({ ...prev, [field]: value }));
  };

  const handleCharacterChange = (id: string, field: keyof Character, value: string) => {
    setOptions(prev => ({
      ...prev,
      characters: prev.characters.map(char => 
        char.id === id ? { ...char, [field]: value } : char
      )
    }));
  };

  const addCharacter = () => {
    setOptions(prev => ({
      ...prev,
      characters: [...prev.characters, { 
        id: Date.now().toString(), 
        description: '', 
        dialogue: '', 
        dialogueLanguage: 'English' 
      }]
    }));
  };

  const removeCharacter = (id: string) => {
    if (options.characters.length <= 1) return;
    setOptions(prev => ({
      ...prev,
      characters: prev.characters.filter(char => char.id !== id)
    }));
  };

  // Cập nhật InputClass: Bỏ transition-all để tránh cảm giác delay, chỉ giữ hiệu ứng shadow khi focus
  const InputClass = "w-full bg-white border-2 border-black px-3 py-3 text-black placeholder-gray-400 focus:outline-none focus:shadow-neo-sm focus:bg-yellow-50 font-bold text-base appearance-none rounded-none";
  const LabelClass = "block text-sm font-bold text-black uppercase mb-2 tracking-wider";

  // Helper để render Custom Select box đẹp hơn
  const NeoSelect = ({ value, onChange, options, placeholder }: { value: string, onChange: (e: any) => void, options: string[] | {label: string, value: string}[], placeholder: string }) => (
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        className={`${InputClass} pr-10 cursor-pointer`}
      >
        <option value="">-- {placeholder} --</option>
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const label = typeof opt === 'string' ? opt : opt.label;
          return <option key={val} value={val}>{label}</option>;
        })}
      </select>
      {/* Custom Arrow Icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-2 border-black bg-neo-yellow p-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <ChevronDown size={16} strokeWidth={3} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SECTION 1: NHÂN VẬT & DIALOGUE */}
      <div className="bg-white border-2 border-black p-6 shadow-neo">
        <h3 className="text-xl font-black text-black mb-6 flex items-center gap-2 uppercase bg-neo-blue inline-block px-3 py-1 border-2 border-black">
          <Users className="w-6 h-6" />
          Nhân vật & Lời thoại
        </h3>
        
        <div className="space-y-6">
          {options.characters.map((char, index) => (
            <div key={char.id} className="bg-gray-50 p-4 border-2 border-black relative">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-black text-black uppercase bg-neo-yellow px-2 border-2 border-black py-1">
                  Nhân vật {index + 1}
                </label>
                {options.characters.length > 1 && (
                  <button 
                    onClick={() => removeCharacter(char.id)}
                    className="p-1.5 bg-red-400 border-2 border-black text-white hover:bg-red-500 hover:shadow-neo-sm transition-all"
                    title="Xóa nhân vật"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Mô tả nhân vật */}
              <div className="mb-4">
                 <label className={LabelClass}>Mô tả ngoại hình</label>
                 <input
                  type="text"
                  placeholder={index === 0 ? "ví dụ: Một chiến binh robot rỉ sét..." : "ví dụ: Một cô gái trẻ tóc xanh..."}
                  value={char.description}
                  onChange={(e) => handleCharacterChange(char.id, 'description', e.target.value)}
                  className={InputClass}
                />
              </div>

              {/* Lời thoại nhân vật */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                   <label className={`${LabelClass} flex items-center gap-1`}>
                      <MessageSquare size={14}/> Lời thoại
                   </label>
                   <input
                    type="text"
                    placeholder={`Nhân vật ${index + 1} nói gì?`}
                    value={char.dialogue}
                    onChange={(e) => handleCharacterChange(char.id, 'dialogue', e.target.value)}
                    className={`${InputClass} border-l-[12px] border-l-neo-green`}
                  />
                </div>
                <div>
                  <label className={LabelClass}>Ngôn ngữ</label>
                  <NeoSelect 
                    value={char.dialogueLanguage}
                    onChange={(e) => handleCharacterChange(char.id, 'dialogueLanguage', e.target.value)}
                    options={DIALOGUE_LANGUAGES}
                    placeholder="Chọn ngôn ngữ"
                  />
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={addCharacter}
            className="w-full py-4 bg-white border-2 border-dashed border-black text-black hover:bg-gray-100 hover:border-solid hover:shadow-neo-sm transition-all flex justify-center items-center gap-2 text-sm font-black uppercase tracking-widest"
          >
            <Plus size={20} strokeWidth={3} /> Thêm nhân vật
          </button>

          <div className="pt-2">
            <label className={LabelClass}>Hành động chung (Action)</label>
            <textarea
              placeholder="ví dụ: Nhân vật 1 đang đưa chiếc hộp cho Nhân vật 2, cả hai nhìn nhau..."
              value={options.action}
              onChange={(e) => handleChange('action', e.target.value)}
              className={`${InputClass} h-24 resize-none`}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: ÂM THANH MÔI TRƯỜNG & HIỆU ỨNG (Global SFX/Ambient) */}
      <div className="bg-neo-green border-2 border-black p-6 shadow-neo relative">
        <h3 className="text-xl font-black text-black mb-6 flex items-center gap-2 uppercase bg-white inline-block px-3 py-1 border-2 border-black">
          <Volume2 className="w-6 h-6" />
          Âm thanh & Hiệu ứng
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SFX */}
          <div className="space-y-2">
             <div className="flex items-center gap-2 font-bold text-black border-b-2 border-black inline-block px-1 bg-white mb-2">
                <Mic size={16} /> Hiệu ứng (SFX)
            </div>
            <textarea
              placeholder="ví dụ: tiếng bước chân, tiếng kiếm va chạm..."
              value={options.sfx}
              onChange={(e) => handleChange('sfx', e.target.value)}
              className={`${InputClass} h-28 resize-none`}
            />
          </div>

          {/* Ambient */}
          <div className="space-y-2">
             <div className="flex items-center gap-2 font-bold text-black border-b-2 border-black inline-block px-1 bg-white mb-2">
                <Music size={16} /> Âm nền (Ambient)
            </div>
             <textarea
              placeholder="ví dụ: tiếng gió rít, tiếng xe cộ xa xăm..."
              value={options.ambient}
              onChange={(e) => handleChange('ambient', e.target.value)}
              className={`${InputClass} h-28 resize-none`}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: BỐI CẢNH & KỸ THUẬT */}
      <div className="bg-white border-2 border-black p-6 shadow-neo">
        <h3 className="text-xl font-black text-black mb-6 flex items-center gap-2 uppercase bg-neo-pink inline-block px-3 py-1 border-2 border-black">
          <Aperture className="w-6 h-6" />
          Thông số Kỹ thuật
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className={LabelClass}>Bối cảnh chi tiết (Environment)</label>
            <input
              type="text"
              placeholder="ví dụ: Thành phố Cyberpunk năm 2077, mưa axit..."
              value={options.environment}
              onChange={(e) => handleChange('environment', e.target.value)}
              className={InputClass}
            />
          </div>

          <div>
            <label className={`${LabelClass} flex items-center gap-2`}><Palette size={16}/> Phong cách</label>
            <NeoSelect 
              value={options.style}
              onChange={(e) => handleChange('style', e.target.value)}
              options={STYLES}
              placeholder="Chọn phong cách"
            />
          </div>

          <div>
            <label className={`${LabelClass} flex items-center gap-2`}><Sun size={16}/> Ánh sáng</label>
             <NeoSelect 
              value={options.lighting}
              onChange={(e) => handleChange('lighting', e.target.value)}
              options={LIGHTING}
              placeholder="Chọn ánh sáng"
            />
          </div>

          <div>
            <label className={`${LabelClass} flex items-center gap-2`}><Move size={16}/> Góc máy</label>
            <NeoSelect 
              value={options.camera}
              onChange={(e) => handleChange('camera', e.target.value)}
              options={CAMERA_ANGLES}
              placeholder="Chọn góc máy"
            />
          </div>

           <div className="md:col-span-2">
            <label className={`${LabelClass} flex items-center gap-2`}><Monitor size={16}/> Chất lượng</label>
            <NeoSelect 
              value={options.quality}
              onChange={(e) => handleChange('quality', e.target.value)}
              options={QUALITIES}
              placeholder="Chọn chất lượng"
            />
          </div>

          {/* CHECKBOX NO TEXT/NO SUB */}
          <div className="md:col-span-2 mt-4">
             <div 
              className={`group flex items-center gap-4 p-4 border-2 border-black cursor-pointer transition-all active:translate-y-1 active:translate-x-1 active:shadow-none select-none
                ${options.noText 
                  ? 'bg-neo-yellow shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]'
                }`}
              onClick={() => handleChange('noText', !options.noText)}
             >
                {/* Checkbox Box */}
                <div className={`w-8 h-8 border-2 border-black flex items-center justify-center transition-all ${options.noText ? 'bg-black' : 'bg-white'}`}>
                    {options.noText && <Check size={20} strokeWidth={4} className="text-neo-yellow" />}
                </div>
                
                <div className="flex-1">
                    <p className="text-base font-black uppercase text-black">Không có văn bản / Không phụ đề</p>
                    <p className="text-xs font-medium text-black/70">Tự động thêm lệnh "No Text, No Subtitles"</p>
                </div>
                
                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                    <Type size={24} className={options.noText ? "text-black" : "text-gray-400"} />
                </div>
             </div>
          </div>

        </div>
      </div>

      <button
        onClick={onGenerate}
        className="w-full bg-neo-yellow border-2 border-black text-black font-black py-4 uppercase tracking-widest text-xl shadow-neo transform transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex justify-center items-center gap-3"
      >
        <Film size={28} />
        Tạo Prompt
      </button>
    </div>
  );
};

export default OfflineForm;