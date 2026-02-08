import React, { useState, useEffect, useRef } from 'react';
import { Moon, X, Send, MessageCircle } from 'lucide-react';
import { askAssistant } from '../services/gemini';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Assalamu\'alaikum! Saya Sahabat Umrah. Ada yang bisa saya bantu terkait keberangkatan Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const botResponse = await askAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[2.5rem] shadow-2xl border border-emerald-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2rem flex items-center justify-center">
                <Moon className="w-7 h-7 fill-white" />
              </div>
              <div>
                <p className="font-bold text-base">Sahabat Umrah AI</p>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(110,231,183,1)]"></span> Aktif Melayani
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50/50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                }`}>
                  {m.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('-') ? 'ml-2 mb-1' : 'mb-2'}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-1.5">
                  <div className="w-2 h-2 bg-emerald-200 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-gray-100 bg-white flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanyakan jadwal atau lokasi..."
              className="flex-1 bg-gray-100 border-none rounded-[1.5rem] px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none placeholder:text-gray-400"
            />
            <button 
              onClick={handleSend}
              className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg active:scale-90"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white p-5 rounded-full shadow-2xl hover:shadow-emerald-200 hover:scale-110 transition-all group relative"
        >
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">1</span>
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
