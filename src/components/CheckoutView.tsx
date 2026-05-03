import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, View } from '../types';
import { COURSES } from '../constants';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  ShieldCheck,
  Zap
} from 'lucide-react';
import DuckMascot from './DuckMascot';

interface CheckoutViewProps {
  cart: CartItem[];
  clearCart: () => void;
  setView: (view: View) => void;
}

export default function CheckoutView({ cart, clearCart, setView }: CheckoutViewProps) {
  const [method, setMethod] = useState<'card' | 'momo' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [discounts, setDiscounts] = useState<Record<string, { code: string; amount: number }>>({});
  const [promoInputs, setPromoInputs] = useState<Record<string, string>>({});

  const calculateItemPrice = (item: CartItem) => {
    const discount = discounts[item.courseId];
    if (discount) return item.price * (1 - discount.amount);
    return item.price;
  };

  const total = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0);

  const applyDiscount = (courseId: string) => {
    const code = promoInputs[courseId]?.toUpperCase();
    const item = cart.find(c => c.courseId === courseId);
    if (!item || !code) return;

    // Fetch course details to check language (assuming we have access or it's in CartItem)
    // Actually, constants.ts has COURSES. Let's find the course.
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    let applied = false;
    if (code === 'ENG20' && course.language === 'English') {
      setDiscounts(prev => ({ ...prev, [courseId]: { code, amount: 0.2 } }));
      applied = true;
    } else if (code === 'CHI20' && course.language === 'Chinese') {
      setDiscounts(prev => ({ ...prev, [courseId]: { code, amount: 0.2 } }));
      applied = true;
    }

    if (applied) {
      alert(`Quack! Mã ${code} đã được áp dụng giảm giá 20% cho khóa học ${item.title}!`);
    } else {
      alert(`Quack! Mã giảm giá không hợp lệ hoặc không áp dụng cho ngôn ngữ của khóa học này.`);
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  if (isSuccess) return (
    <div className="max-w-xl mx-auto py-20 text-center space-y-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.3)] border-8 border-green-100"
      >
        <CheckCircle2 size={64} />
      </motion.div>
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">THANH TOÁN THÀNH CÔNG!</h1>
        <p className="text-slate-500 font-medium">Quack! Chúc mừng bạn đã sở hữu bộ khóa học tuyệt vời này. Hãy bắt đầu học ngay nhé!</p>
      </div>
      <div className="bg-yellow-50 p-6 rounded-[2rem] border border-yellow-100 flex items-center gap-6">
        <DuckMascot size="md" />
        <div className="text-left space-y-1">
          <p className="text-xs font-black text-yellow-600 uppercase tracking-widest">Lời nhắn từ Vịt AI</p>
          <p className="text-sm font-bold text-yellow-800 italic">"Kiên trì là chìa khóa của thành công. Chúc bạn một hành trình rực rỡ!"</p>
        </div>
      </div>
      <button 
        onClick={() => setView('dashboard')}
        className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg hover:bg-yellow-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
      >
        VÀO HỌC NGAY
        <Zap size={20} />
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <button 
              onClick={() => setView('cart')}
              className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-yellow-600 transition-colors uppercase tracking-[0.2em]"
            >
              <ChevronLeft size={16} /> Quay lại giỏ hàng
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Thanh toán</h1>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Chọn phương thức thanh toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setMethod('card')}
                className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all ${method === 'card' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-lg shadow-yellow-200/50' : 'border-slate-100 hover:border-yellow-200'}`}
              >
                <div className={`p-4 rounded-2xl ${method === 'card' ? 'bg-yellow-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                  <CreditCard size={28} />
                </div>
                <span className="font-black text-xs uppercase tracking-widest">Thẻ Quốc Tế</span>
              </button>
              <button
                onClick={() => setMethod('momo')}
                className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all ${method === 'momo' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-lg shadow-yellow-200/50' : 'border-slate-100 hover:border-yellow-200'}`}
              >
                <div className={`p-4 rounded-2xl ${method === 'momo' ? 'bg-yellow-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                  <Smartphone size={28} />
                </div>
                <span className="font-black text-xs uppercase tracking-widest">MOMO / ZALO</span>
              </button>
              <button
                onClick={() => setMethod('bank')}
                className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all ${method === 'bank' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-lg shadow-yellow-200/50' : 'border-slate-100 hover:border-yellow-200'}`}
              >
                <div className={`p-4 rounded-2xl ${method === 'bank' ? 'bg-yellow-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                  <Building2 size={28} />
                </div>
                <span className="font-black text-xs uppercase tracking-widest">Chuyển Khoản</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số thẻ / Thông tin thanh toán</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none font-medium transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ngày hết hạn</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none font-medium transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVC / CVV</label>
                  <input type="password" placeholder="***" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none font-medium transition-all" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4 text-xs font-bold text-slate-500 border border-slate-100">
              <ShieldCheck className="text-green-500" size={24} />
              <p>Mọi giao dịch của bạn đều được mã hóa và bảo mật tuyệt đối. Vịt Học cam kết không lưu dữ liệu thẻ của bạn.</p>
            </div>

            <button 
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-5 bg-yellow-500 text-white rounded-[1.5rem] font-black text-xl hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-200 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <ShieldCheck size={24} />}
              {isProcessing ? 'ĐANG XỬ LÝ...' : `XÁC NHẬN THANH TOÁN ${total.toLocaleString('vi-VN')}₫`}
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:pt-16">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-8 sticky top-24">
            <h3 className="text-xl font-black border-b border-slate-800 pb-4 italic">Tóm tắt đơn hàng</h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.courseId} className="space-y-3">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate leading-tight">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {discounts[item.courseId] ? (
                          <>
                            <span className="text-slate-500 line-through text-xs">{item.price.toLocaleString('vi-VN')}₫</span>
                            <span className="text-yellow-500 font-black text-sm">{calculateItemPrice(item).toLocaleString('vi-VN')}₫</span>
                          </>
                        ) : (
                          <span className="text-yellow-500 font-black text-sm">{item.price.toLocaleString('vi-VN')}₫</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Discount Field */}
                  {!discounts[item.courseId] ? (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Mã giảm giá..." 
                        value={promoInputs[item.courseId] || ''}
                        onChange={(e) => setPromoInputs(prev => ({ ...prev, [item.courseId]: e.target.value }))}
                        className="flex-1 bg-slate-800 border-none rounded-lg px-3 py-1.5 text-[10px] text-white focus:ring-1 focus:ring-yellow-500 outline-none"
                      />
                      <button 
                        onClick={() => applyDiscount(item.courseId)}
                        className="bg-yellow-500 text-slate-900 px-3 py-1.5 rounded-lg text-[10px] font-black hover:bg-yellow-600 transition-colors"
                      >
                        ÁP DỤNG
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Zap size={12} className="text-green-500" />
                      <span className="text-[10px] font-bold text-green-500 italic">Đã áp dụng mã {discounts[item.courseId].code}</span>
                      <button 
                        onClick={() => setDiscounts(prev => {
                          const next = { ...prev };
                          delete next[item.courseId];
                          return next;
                        })}
                        className="ml-auto text-[10px] text-slate-500 hover:text-white"
                      >
                        Gỡ bỏ
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-slate-800 space-y-4">
               <div className="flex justify-between items-baseline">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Thành tiền</span>
                <span className="text-3xl font-black text-yellow-500">{total.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="text-[10px] text-center text-slate-500 italic">
                Bằng cách nhấn thanh toán, bạn đồng ý với Điều khoản dịch vụ và Chính sách hoàn tiền của Vịt Học.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
