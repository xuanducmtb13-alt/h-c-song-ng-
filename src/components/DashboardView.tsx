import { User, View } from '../types';
import { COURSES } from '../constants';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  ChevronRight, 
  Play,
  Calendar,
  Zap,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';
import DuckMascot from './DuckMascot';

interface DashboardViewProps {
  user: User | null;
  setView: (view: View) => void;
}

export default function DashboardView({ user, setView }: DashboardViewProps) {
  if (!user) {
    return (
      <div className="py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto grayscale">
          <BookOpen size={48} className="text-yellow-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Vui lòng đăng nhập để xem tiến độ</h2>
        <button 
          onClick={() => setView('auth')}
          className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-black shadow-lg shadow-yellow-200"
        >
          ĐĂNG NHẬP NGAY
        </button>
      </div>
    );
  }

  const enrolledCourses = COURSES.slice(0, 1); // Mock: user owns the first course

  return (
    <div className="space-y-12 py-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-8 rounded-[3rem] border border-yellow-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-yellow-500 p-1 shadow-lg overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`} className="w-full h-full object-cover rounded-[1.8rem]" alt={user.name} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Chào mừng, {user.name}!</h1>
            <p className="text-slate-400 font-bold flex items-center gap-2">
              <Zap size={14} className="text-yellow-500 fill-yellow-500" />
              Bạn đang có chuỗi 5 ngày học liên tiếp! Quack!
            </p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <div className="flex-1 md:flex-none p-6 bg-slate-900 text-white rounded-[2rem] text-center min-w-[140px] space-y-1">
            <p className="text-3xl font-black text-yellow-500">1,250</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Điểm kinh nghiệm</p>
          </div>
          <div className="flex-1 md:flex-none p-6 bg-yellow-100 text-yellow-700 rounded-[2rem] text-center min-w-[140px] border border-yellow-200 space-y-1">
            <p className="text-3xl font-black">Level 5</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-yellow-600">Thành viên ưu tú</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
              <BookOpen size={24} className="text-yellow-500" />
              Khóa học của tôi
            </h2>
            <button onClick={() => setView('courses')} className="text-yellow-600 font-bold text-xs uppercase tracking-widest hover:underline">Tất cả bài học</button>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map(course => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row items-center gap-8 group"
              >
                <div className="w-full sm:w-40 aspect-video rounded-2xl overflow-hidden shrink-0">
                   <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 leading-tight">{course.title}</h3>
                    <p className="text-xs text-slate-400 font-bold">Giảng viên: {course.instructor}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                       <span className="text-slate-400">Tiến độ hoàn thành</span>
                       <span className="text-yellow-600">45%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-yellow-500 transition-all duration-1000" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>
                <button 
                  className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:px-10 transition-all flex items-center gap-2"
                >
                  TIẾP TỤC
                  <Play size={18} fill="currentColor" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Activity Placeholder */}
          <div className="bg-slate-900 rounded-[3rem] p-8 text-white space-y-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl -ml-24 -mb-24" />
            <h3 className="text-xl font-black italic flex items-center gap-3">
              <TrendingUp size={24} className="text-yellow-500" />
              Thống kê học tập tuần này
            </h3>
            <div className="grid grid-cols-7 gap-2 items-end h-32">
              {[20, 60, 45, 80, 50, 90, 70].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    className={`w-full rounded-t-lg transition-colors ${val > 70 ? 'bg-yellow-500' : 'bg-slate-700'}`}
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="bg-white rounded-[2.5rem] p-8 border border-yellow-100 shadow-xl space-y-8">
             <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
               <Target size={22} className="text-yellow-600" />
               Mục tiêu ngày
             </h3>
             <div className="space-y-6">
                {[
                  { label: 'Học 30 phút', sub: 'Đã hoàn thành 15p', progress: 50 },
                  { label: 'Làm 2 bài tập', sub: 'Đã xong 1 bài', progress: 50 },
                  { label: 'Ôn tập 10 từ vựng', sub: 'Đã ôn 8 từ', progress: 80 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-sm text-slate-700">{item.label}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase">{item.progress}%</p>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${item.progress === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full py-4 bg-yellow-50 text-yellow-600 rounded-2xl font-black text-xs uppercase tracking-widest border border-yellow-100 hover:bg-yellow-100 transition-colors">
               CHỈNH SỬA MỤC TIÊU
             </button>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                <Award size={22} className="text-yellow-600" />
                Thành tích gần đây
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-16 h-16 shrink-0 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 border border-yellow-200">
                    <Award size={32} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-bold text-center">Bạn đã mở khóa 8/50 huy hiệu!</p>
           </div>
        </div>
      </div>
    </div>
  );
}
