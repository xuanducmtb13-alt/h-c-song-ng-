import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, X, MessageSquare, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

interface ChatbotProps {
  onClose: () => void;
  triggerMessage?: string;
}

export default function Chatbot({ onClose, triggerMessage }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dailyQuestions, setDailyQuestions] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const QUESTION_LIMIT = 10;

  useEffect(() => {
    // Sync daily questions from localStorage
    const today = new Date().toDateString();
    const stored = localStorage.getItem('duck_ai_usage');
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        setDailyQuestions(data.count);
      } else {
        localStorage.setItem('duck_ai_usage', JSON.stringify({ date: today, count: 0 }));
      }
    } else {
      localStorage.setItem('duck_ai_usage', JSON.stringify({ date: today, count: 0 }));
    }

    // Initial greeting or trigger message
    if (triggerMessage) {
      setMessages([{ role: 'assistant', content: triggerMessage }]);
    } else {
      setMessages([
        { role: 'assistant', content: 'Quack! Chào bạn! Mình là Trợ lý Vịt AI. Hôm nay bạn muốn tìm hiểu về ngữ pháp hay từ vựng gì không? Quack!' }
      ]);
    }
  }, [triggerMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (dailyQuestions >= QUESTION_LIMIT) {
      setMessages(prev => [...prev, 
        { role: 'user', content: input },
        { role: 'assistant', content: `Quack! Bạn đã hết lượt hỏi miễn phí cho hôm nay (${dailyQuestions}/${QUESTION_LIMIT}). Hãy quay lại vào ngày mai hoặc đăng ký khóa học trả phí để mở khóa không giới hạn nhé! Quack!` }
      ]);
      setInput('');
      return;
    }

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const newCount = dailyQuestions + 1;
      setDailyQuestions(newCount);
      const today = new Date().toDateString();
      localStorage.setItem('duck_ai_usage', JSON.stringify({ date: today, count: newCount }));

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `Bạn là Trợ lý Vịt AI (Duck AI) của nền tảng 'Vịt Học'. 
          - Trả lời bằng tiếng Việt thân thiện, vui vẻ.
          - Hãy luôn thêm tiếng 'Quack!' vào cuối câu hoặc khi bắt đầu.
          - Giúp người dùng giải đáp thắc mắc về ngữ pháp, từ vựng Tiếng Anh và Tiếng Trung.
          - Người dùng hiện đang sử dụng bản miễn phí (Giới hạn ${QUESTION_LIMIT} câu/ngày, họ đã dùng ${newCount} câu).
          - Nếu họ hỏi về các khóa học, hãy khuyến khích họ mua để ủng hộ Vịt.`,
          temperature: 0.7,
        }
      });

      const aiResponse: ChatMessage = { 
        role: 'assistant', 
        content: response.text || 'Ôi quack! Hình như có chút lỗi nhỏ, bạn nói lại được không?' 
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Quack! Xin lỗi bạn, mình đang gặp chút trục trặc kỹ thuật. Hãy thử lại sau nhé!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-white rounded-[2rem] shadow-2xl border border-yellow-100 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-yellow-500 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-yellow-500 shadow-inner">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight leading-tight">Vịt AI Support</h3>
            <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Đang trực tuyến</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-yellow-600 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-yellow-50/10"
      >
        {messages.map((msg, i) => (
          <motion.div
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' 
                : 'bg-white text-slate-800 border border-yellow-100 rounded-tl-none shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'assistant' ? <Bot size={12} className="text-yellow-600" /> : <User size={12} className="text-slate-400" />}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {msg.role === 'assistant' ? 'Vịt AI' : 'Bạn'}
                </span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-yellow-100 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-yellow-500" />
              <span className="text-xs text-slate-400 font-bold">Vịt đang gõ...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-yellow-50 bg-white">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi Vịt điều gì đó..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 text-sm font-medium transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:grayscale"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
