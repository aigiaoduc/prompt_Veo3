import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!prompt) return null;

  return (
    <div className="mt-10 animate-slideUp">
      <div className="flex justify-between items-end mb-0 px-2">
        <label className="text-sm font-black text-white bg-black px-3 py-1 uppercase tracking-wider flex items-center gap-2 border-t-2 border-l-2 border-r-2 border-black relative top-[2px] z-10">
          <Terminal size={14} className="text-neo-green" />
          Output Terminal
        </label>
        {copied ? (
            <span className="text-black text-xs font-bold bg-neo-green border-2 border-black px-2 py-1 shadow-neo-sm mb-2">
                <Check size={12} className="inline mr-1" /> Đã sao chép!
            </span>
        ) : null}
      </div>
      
      <div className="relative bg-white border-2 border-black p-0 shadow-neo">
        <div className="bg-gray-100 p-2 border-b-2 border-black flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
        </div>
        <div className="p-6">
            <p className="text-black font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
              {prompt}
            </p>
            
            <div className="flex justify-end mt-6 border-t-2 border-black pt-4 border-dashed">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-neo-blue border-2 border-black text-black px-6 py-2 font-bold shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'COPIED' : 'COPY PROMPT'}</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDisplay;