
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function ChatBot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize greeting based on language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'bot', text: t.chat.greeting }]);
    }
  }, [language, messages.length, t.chat.greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are a professional and helpful virtual assistant for "Aristocrat Moscow", a premium barbershop in Moscow. 
            Your tone is sophisticated, polite, and elite. 
            Current language context: ${language.toUpperCase()}. PLEASE RESPOND IN ${language === 'en' ? 'ENGLISH' : language === 'ky' ? 'KYRGYZ' : 'RUSSIAN'}.
            
            You know the following services:
            - Мужская стрижка Aristocrat (3000₽) - 60 min
            - Моделирование бороды (2000₽) - 45 min
            - Королевское бритье (2500₽) - 45 min
            - Комплекс (Стрижка + Борода) (4500₽) - 90 min
            - Камуфляж седины (from 1500₽)
            - Гримминг лица (from 1000₽)
            
            Our location: Presnenskaya nab. 12, Moscow (Moscow-City, Federation Tower).
            Working hours: 10:00 - 22:00 daily.
            Phone: +7 (495) 777-00-00.
            
            If users want to book, tell them they can use the booking form on the website or you can help with info.
            Keep answers concise and high-end.`,
        },
        contents: [
          ...messages.map(m => ({
            role: m.role === 'bot' ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      });

      const botText = response.text || t.chat.error;
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: t.chat.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gold text-black rounded-full flex items-center justify-center shadow-2xl transition-shadow hover:shadow-gold/20"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-black border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                 <Bot size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-display uppercase italic tracking-wider">Aristocrat Assistant</h3>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((m, i) => (
                <div 
                   key={i} 
                   className={cn(
                    "flex flex-col max-w-[85%]",
                    m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-gold text-black rounded-br-none" 
                      : "bg-zinc-900 text-zinc-300 rounded-bl-none border border-zinc-800"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono ml-2">
                  <Loader2 size={12} className="animate-spin" />
                  {t.chat.typing}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.chat.placeholder}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:border-gold outline-none transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold hover:text-white transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
