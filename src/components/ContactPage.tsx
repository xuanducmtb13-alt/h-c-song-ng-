import { Mail, Phone, MapPin, Send, Facebook, Youtube, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import DuckMascot from './DuckMascot';

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 space-y-20">
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="inline-block p-4 bg-yellow-100 rounded-full"
        >
          <DuckMascot size="md" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase">Liên hệ với Vịt</h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto">Bạn có thắc mắc? Đừng ngần ngại gửi tin nhắn cho chúng tôi. Team Vịt luôn sẵn sàng lắng nghe bạn! Quack!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Info Cards */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-yellow-100 shadow-xl space-y-4 hover:border-yellow-300 transition-colors group">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Email</p>
                <p className="font-bold text-slate-900">hello@vithoc.vn</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-yellow-100 shadow-xl space-y-4 hover:border-yellow-300 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Hotline</p>
                <p className="font-bold text-slate-900">1900 8888</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-yellow-100 shadow-xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Văn phòng</p>
                <p className="font-bold text-slate-900 italic">Toà nhà Duck Tower, Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
               <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50" alt="Office" />
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all"><Facebook size={20} /></button>
            <button className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"><Youtube size={20} /></button>
            <button className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-100 hover:bg-blue-50 transition-all"><Twitter size={20} /></button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-12 rounded-[3.5rem] border border-yellow-100 shadow-2xl shadow-yellow-200/50 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none">Gửi tin nhắn</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chúng tôi sẽ phản hồi trong 24h</p>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ tên</label>
                <input type="text" placeholder="Nguyễn Văn Vịt" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                <input type="text" placeholder="090 123 4567" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chủ đề</label>
              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold text-sm h-[58px]">
                <option>Tư vấn lộ trình học</option>
                <option>Hỗ trợ thanh toán</option>
                <option>Hợp tác giảng dạy</option>
                <option>Phản hồi khiếu nại</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nội dung</label>
              <textarea placeholder="Bạn cần Vịt giúp gì?" rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold resize-none" />
            </div>
            <button className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-xl hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-100 active:scale-95 flex items-center justify-center gap-3">
              GỬI NGAY <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
