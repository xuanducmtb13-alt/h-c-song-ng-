import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  ShoppingCart, 
  User as UserIcon, 
  Settings, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  Mail,
  ChevronRight
} from 'lucide-react';
import { View, User, CartItem } from './types';
import DuckMascot from './components/DuckMascot';

// Page components
import HomePage from './components/HomePage';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import PlacementTest from './components/PlacementTest';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import DashboardView from './components/DashboardView';
import AuthView from './components/AuthView';
import AdminDashboard from './components/AdminDashboard';
import ContactPage from './components/ContactPage';
import Chatbot from './components/Chatbot';

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTriggerMessage, setChatTriggerMessage] = useState<string | undefined>(undefined);

  const triggerChat = (message: string) => {
    setChatTriggerMessage(message);
    setIsChatOpen(true);
  };

  // Persistence (Mock)
  useEffect(() => {
    const savedUser = localStorage.getItem('vithoc_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedCart = localStorage.getItem('vithoc_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('vithoc_user', JSON.stringify(user));
    else localStorage.removeItem('vithoc_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vithoc_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    setUser(null);
    setActiveView('home');
  };

  const addToCart = (item: CartItem) => {
    if (cart.find(c => c.courseId === item.courseId)) return;
    setCart([...cart, item]);
  };

  const removeFromCart = (courseId: string) => {
    setCart(cart.filter(item => item.courseId !== courseId));
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'courses', label: 'Khóa học', icon: BookOpen },
    { id: 'contact', label: 'Liên hệ', icon: Mail },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'home': return <HomePage setView={setActiveView} selectCourse={setSelectedCourseId} user={user} />;
      case 'courses': return <CourseList setView={setActiveView} selectCourse={setSelectedCourseId} />;
      case 'course-details': return <CourseDetails courseId={selectedCourseId} setView={setActiveView} addToCart={addToCart} triggerChat={triggerChat} />;
      case 'placement-test': return <PlacementTest user={user} setView={setActiveView} />;
      case 'cart': return <CartView cart={cart} removeFromCart={removeFromCart} setView={setActiveView} />;
      case 'checkout': return <CheckoutView cart={cart} clearCart={() => setCart([])} setView={setActiveView} />;
      case 'dashboard': return <DashboardView user={user} setView={setActiveView} />;
      case 'auth': return <AuthView setUser={setUser} setView={setActiveView} />;
      case 'admin': return <AdminDashboard user={user} setView={setActiveView} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setView={setActiveView} selectCourse={setSelectedCourseId} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50/20 font-sans text-slate-800 selection:bg-yellow-200">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-yellow-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveView('home')}>
            <div className="transform group-hover:scale-110 transition-transform">
              <DuckMascot size="sm" />
            </div>
            <h1 className="text-xl font-black text-yellow-600 tracking-tighter">VỊT HỌC</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`text-sm font-bold uppercase tracking-wider transition-all relative py-2 ${activeView === item.id ? 'text-yellow-600' : 'text-slate-500 hover:text-yellow-500'}`}
              >
                {item.label}
                {activeView === item.id && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setActiveView('cart')} className="relative p-2 text-slate-500 hover:text-yellow-600 transition-colors">
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-2 md:gap-3">
                <button 
                  onClick={() => setActiveView('dashboard')}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs md:text-sm font-bold border border-yellow-200 hover:bg-yellow-200 transition-colors"
                >
                  <UserIcon size={16} />
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </button>
                {user.role === 'Administrator' && (
                  <button onClick={() => setActiveView('admin')} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Admin">
                    <Settings size={20} />
                  </button>
                )}
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Log out">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setActiveView('auth')}
                className="px-4 md:px-6 py-2 bg-yellow-500 text-white rounded-xl text-sm font-extrabold hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-200 active:scale-95"
              >
                ĐĂNG NHẬP
              </button>
            )}

            <button className="md:hidden p-2 text-slate-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-yellow-100 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {navItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveView(item.id as View); setIsMenuOpen(false); }}
                    className={`w-full text-left p-3 rounded-xl font-bold flex items-center gap-3 transition-colors ${activeView === item.id ? 'bg-yellow-50 text-yellow-600' : 'text-slate-600 hover:bg-yellow-50'}`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Chatbot Toggle */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <AnimatePresence>
          {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} triggerMessage={chatTriggerMessage} />}
        </AnimatePresence>
        <button 
          className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative overflow-hidden"
          onClick={() => { setIsChatOpen(!isChatOpen); setChatTriggerMessage(undefined); }}
        >
          <motion.div animate={{ rotate: isChatOpen ? 90 : 0 }}>
            {isChatOpen ? <X size={30} /> : <MessageSquare size={30} />}
          </motion.div>
          {!isChatOpen && (
            <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Hỏi Vịt AI tư vấn!
            </span>
          )}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <DuckMascot size="sm" />
              <h2 className="text-2xl font-black text-white tracking-tighter italic">VỊT HỌC</h2>
            </div>
            <p className="text-sm leading-relaxed">
              Vịt Học là nền tảng học ngoại ngữ hàng đầu dành cho người Việt, kết hợp giữa giáo trình chuẩn quốc tế và công nghệ AI hiện đại.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-yellow-500 pl-3">Khám phá</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Lộ trình học tập</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Kiểm tra trình độ</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Vịt AI Support</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Cộng đồng Vịt Con</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-yellow-500 pl-3">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Trung tâm trợ giúp</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Hướng dẫn thanh toán</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Điều khoản dịch vụ</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Chính sách bảo mật</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-yellow-500 pl-3">Bản tin</h3>
            <p className="text-xs mb-4">Đăng ký để nhận bí kíp học tập và ưu đãi mới nhất.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email của bạn" className="bg-slate-800 border-none rounded-lg px-3 py-2 text-xs w-full focus:ring-1 focus:ring-yellow-500" />
              <button className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
          <span>© 2026 Vịt Học Academy. Phát triển bởi Đội ngũ Quack.</span>
          <div className="flex gap-6">
            <span>Facebook</span>
            <span>Youtube</span>
            <span>TikTok</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
