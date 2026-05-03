import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import { User, Role } from '../types';
import DuckMascot from './DuckMascot';

interface AuthViewProps {
  setUser: (user: User | null) => void;
  setView: (view: any) => void;
}

export default function AuthView({ setUser, setView }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('Learner');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock Auth
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: mode === 'login' ? email.split('@')[0] : name,
        role,
        progress: {}
      };
      setUser(mockUser);
      setIsLoading(false);
      setView('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-yellow-200/50 flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-yellow-100">
        
        {/* Left Side: Mascot & Brand */}
        <div className="md:w-1/2 bg-yellow-400 p-12 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -mr-32 -mb-32" />
          
          <div className="relative z-10 transition-transform hover:scale-110 duration-500">
            <DuckMascot size="xl" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
              {mode === 'login' ? 'Chào Bạn Quay Lại!' : 'Gia Nhập Cộng Đồng Vịt!'}
            </h2>
            <p className="text-yellow-900/70 font-bold max-w-xs mx-auto">
              Học tập là một hành trình thú vị. Vịt Học sẽ luôn đồng hành cùng bạn!
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h1>
            <p className="text-slate-400 text-sm mt-2">Nhập thông tin của bạn để tiếp tục học tập.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-yellow-500 transition-colors" size={20} />
                  <input 
                    required
                    type="text" 
                    placeholder="Nguyễn Văn Vịt"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-yellow-500 transition-colors" size={20} />
                <input 
                  required
                  type="email" 
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mật khẩu</label>
                {mode === 'login' && <button type="button" className="text-[10px] font-bold text-yellow-600 hover:underline">Quên mật khẩu?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-yellow-500 transition-colors" size={20} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Vai trò / Quyền hạn</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Administrator', 'Staff', 'Learner'] as Role[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all ${role === r ? 'bg-yellow-500 text-white border-yellow-500 shadow-lg shadow-yellow-200' : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}
                    >
                      {r === 'Administrator' ? 'Admin' : r === 'Staff' ? 'Staff' : 'Học viên'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-[1.25rem] font-black text-lg hover:bg-yellow-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <ShieldCheck size={24} />
                </motion.div>
              ) : (
                <>
                  {mode === 'login' ? 'ĐĂNG NHẬP' : 'TIẾP TỤC'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400 font-medium">
              {mode === 'login' ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-2 text-yellow-600 font-black hover:underline"
              >
                {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
