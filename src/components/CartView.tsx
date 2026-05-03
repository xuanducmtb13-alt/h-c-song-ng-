import { CartItem, View } from '../types';
import { Trash2, ShoppingBag, ChevronRight, ArrowLeft, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartViewProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  setView: (view: View) => void;
}

export default function CartView({ cart, removeFromCart, setView }: CartViewProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic flex items-center gap-4">
          <ShoppingBag size={40} className="text-yellow-500" />
          Giỏ hàng của bạn
        </h1>
        <button 
          onClick={() => setView('courses')}
          className="text-slate-400 hover:text-yellow-600 font-bold text-sm flex items-center gap-2 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          MUA THÊM KHÓA HỌC
        </button>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.courseId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-black text-slate-900 leading-tight">{item.title}</h3>
                    <p className="text-sm font-bold text-yellow-600">{item.price.toLocaleString('vi-VN')}₫</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.courseId)}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="relative">
            <div className="sticky top-24 bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-8 shadow-2xl">
              <h3 className="text-xl font-black tracking-tight border-b border-slate-800 pb-4">Tổng cộng</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-slate-400 font-bold text-sm">
                  <span>Tạm tính</span>
                  <span className="text-white">{total.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-slate-400 font-bold text-sm">
                  <span>Giảm giá</span>
                  <span className="text-green-500">0₫</span>
                </div>
                <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-black text-lg">Tổng tiền</span>
                  <span className="text-3xl font-black text-yellow-500">{total.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              <button 
                onClick={() => setView('checkout')}
                className="w-full py-4 bg-yellow-500 text-white rounded-2xl font-black text-lg hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-200 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                THANH TOÁN
                <ChevronRight size={20} />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 grayscale opacity-50">
                <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-black">VISA</div>
                <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-black">VCB</div>
                <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-black">MOMO</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center space-y-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto grayscale">
            <ShoppingBag size={48} className="text-yellow-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Giỏ hàng rỗng</h2>
            <p className="text-slate-400 font-medium">Bạn chưa thêm khóa học nào vào giỏ. Hãy chọn một lộ trình phù hợp ngay nhé!</p>
          </div>
          <button 
            onClick={() => setView('courses')}
            className="px-12 py-4 bg-yellow-500 text-white rounded-2xl font-black text-lg hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-200"
          >
            ĐI TỚI KHÓA HỌC
          </button>
        </div>
      )}
    </div>
  );
}
