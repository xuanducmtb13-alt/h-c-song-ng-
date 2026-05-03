import { motion } from 'motion/react';
import { View, Course, User as UserType } from '../types';
import { COURSES } from '../constants';
import { downloadCSV } from '../lib/exportUtils';
import { 
  ChevronRight, 
  Play, 
  BookOpen, 
  User, 
  Languages, 
  Sparkles, 
  ArrowRight, 
  Star,
  Activity,
  AlertCircle,
  TrendingDown,
  BarChart3,
  Clock,
  Layout,
  GraduationCap
} from 'lucide-react';
import DuckMascot from './DuckMascot';

interface HomePageProps {
  setView: (view: View) => void;
  selectCourse: (id: string) => void;
  user: UserType | null;
}

export default function HomePage({ setView, selectCourse, user }: HomePageProps) {
  if (!user) return <GuestHome setView={setView} selectCourse={selectCourse} />;
  if (user.role === 'Learner') return <LearnerHome setView={setView} selectCourse={selectCourse} user={user} />;
  if (user.role === 'Administrator') return <AdminHome setView={setView} user={user} />;
  
  return <GuestHome setView={setView} selectCourse={selectCourse} />;
}

// --- GUEST HOMEPAGE (LANDING) ---
function GuestHome({ setView, selectCourse }: Omit<HomePageProps, 'user'>) {
  const freeTrialCourses = COURSES.filter(c => c.price === 0);
  const featuredCourses = COURSES.filter(c => c.price > 0).slice(0, 4);

  return (
    <div className="space-y-32 pb-24">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -ml-32 -mt-32" />
        <div className="flex-1 space-y-10 text-center lg:text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-100/50 backdrop-blur-sm text-yellow-700 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-200"
          >
            <Sparkles size={14} />
            Nền tảng học ngoại ngữ số 1 Việt Nam
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter italic"
          >
            Học <span className="text-yellow-500">Tiếng Anh & Trung</span> <br /> 
            Thông Minh Cùng Vịt!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Học ngoại ngữ không còn là gánh nặng. Với Vịt Học, bạn sẽ có lộ trình cá nhân hóa, chatbot AI hỗ trợ 24/7 và cộng đồng cùng tiến bước. Quack!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
          >
            <button 
              onClick={() => setView('courses')}
              className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-yellow-500 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-3 group"
            >
              HỌC NGAY
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setView('placement-test')}
              className="px-10 py-5 bg-white text-slate-700 rounded-[2rem] font-black text-xl border-2 border-slate-100 hover:border-yellow-500 hover:text-yellow-600 transition-all active:scale-95 shadow-lg shadow-slate-100/50"
            >
              THI THỬ TRÌNH ĐỘ
            </button>
          </motion.div>
        </div>
        
        <div className="flex-1 relative flex justify-center group">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 1.5 }}
            className="relative z-10 cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <DuckMascot size="xl" />
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-yellow-400/10 rounded-full blur-[100px] -z-0" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-yellow-200 rounded-full scale-125 opacity-40"
          />
        </div>
      </section>

      {/* Free Trials Section */}
      <section className="space-y-12 bg-yellow-50/50 -mx-4 px-4 py-20 rounded-[4rem] border border-yellow-100">
        <div className="text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-white text-yellow-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-100 mb-4">Mới cập nhật ✨</div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic capitalize underline decoration-yellow-300 decoration-8 underline-offset-4">Học thử miễn phí</h2>
          <p className="text-slate-500 font-medium max-w-lg mx-auto">Trải nghiệm chất lượng giảng dạy cùng AI Vịt trước khi bắt đầu lộ trình chuyên sâu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {freeTrialCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -8 }}
              onClick={() => { selectCourse(course.id); setView('course-details'); }}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 cursor-pointer group flex flex-col"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 px-4 py-1.5 bg-green-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">MIỄN PHÍ</div>
              </div>
              <div className="p-6 space-y-4 flex flex-1 flex-col">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600">{course.language}</span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-1">{course.title}</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium line-clamp-2">{course.description}</p>
                <div className="pt-4 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <User size={14} className="text-yellow-500" />
                    {course.instructor}
                  </div>
                  <div className="p-2 bg-slate-900 text-white rounded-xl group-hover:bg-yellow-500 transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-4">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic border-l-8 border-yellow-500 pl-6 leading-none">Khóa học ưu tú</h2>
            <p className="text-slate-500 font-medium ml-6">Được thiết kế để bạn đạt kết quả nhanh chóng và bền vững nhất.</p>
          </div>
          <button 
            onClick={() => setView('courses')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all group"
          >
            Xem tất cả <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featuredCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => { selectCourse(course.id); setView('course-details'); }}
              className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row group cursor-pointer"
            >
              <div className="md:w-2/5 relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all" />
              </div>
              <div className="flex-1 p-10 space-y-6 flex flex-col">
                <div className="space-y-2">
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-[9px] font-black uppercase tracking-[0.3em] rounded-full">{course.language}</span>
                  <h3 className="text-3xl font-black text-slate-900 leading-[1.1]">{course.title}</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium line-clamp-3 leading-relaxed">{course.description}</p>
                
                <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    {course.level}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between mt-auto border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Học phí</span>
                    <span className="text-2xl font-black text-slate-900">{course.price.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-[2rem] hover:bg-yellow-500 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 px-8">
                    <span className="font-black text-sm">CHI TIẾT</span>
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- LEARNER HOMEPAGE (STUDENT) ---
function LearnerHome({ setView, selectCourse, user }: HomePageProps & { user: UserType }) {
  const activeCourses = COURSES.filter(c => user.progress[c.id] !== undefined);
  const recommendations = COURSES.filter(c => user.progress[c.id] === undefined && c.price > 0).slice(0, 3);

  return (
    <div className="space-y-12 pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-yellow-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Chào mừng trở lại, {user.name}!</h1>
            <DuckMascot size="sm" />
          </div>
          <p className="text-slate-500 font-medium">Hôm nay bạn muốn tiếp tục hành trình chinh phục ngôn ngữ nào? Quack!</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setView('dashboard')} className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm border border-slate-200 hover:border-yellow-500 transition-all shadow-sm flex items-center gap-2">
            <Layout size={18} /> LỘ TRÌNH CỦA TÔI
          </button>
          <button onClick={() => setView('placement-test')} className="px-6 py-3 bg-yellow-500 text-white rounded-2xl font-black text-sm hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-200 flex items-center gap-2">
             <Activity size={18} /> THI THỬ LẠI
          </button>
        </div>
      </header>

      {/* Active Courses */}
      <section className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
          <Play size={24} className="text-yellow-500" /> Đang học dở
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCourses.length > 0 ? (
            activeCourses.map(course => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -5 }}
                onClick={() => { selectCourse(course.id); setView('course-details'); }}
                className="bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-xl shadow-slate-200/40 cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                    <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-black text-yellow-600 uppercase tracking-widest">{course.language}</span>
                    <h3 className="font-black text-slate-900 leading-tight group-hover:text-yellow-500 transition-colors line-clamp-2">{course.title}</h3>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Tiến độ</span>
                    <span className="text-yellow-600">{user.progress[course.id]}%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${user.progress[course.id]}%` }}
                      className="h-full bg-yellow-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center space-y-4">
              <DuckMascot size="md" />
              <p className="font-bold text-slate-400">Bạn chưa bắt đầu khóa học nào. Hãy chọn một khóa học bên dưới nhé!</p>
              <button onClick={() => setView('courses')} className="text-yellow-600 font-black text-sm uppercase tracking-widest hover:underline">Khám phá ngay</button>
            </div>
          )}
        </div>
      </section>

      {/* Suggested for you */}
      <section className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
          <Sparkles size={24} className="text-yellow-500" /> Gợi ý cho bạn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map(course => (
             <div 
              key={course.id}
              onClick={() => { selectCourse(course.id); setView('course-details'); }}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={course.title} referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-xl text-yellow-500 shadow-sm">
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.language}</span>
                <h3 className="font-black text-slate-900 group-hover:text-yellow-600 transition-colors">{course.title}</h3>
                <div className="flex justify-between items-center pt-2">
                   <span className="font-black text-slate-900">{course.price.toLocaleString('vi-VN')}₫</span>
                   <ChevronRight size={18} className="text-slate-300 group-hover:text-yellow-500 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- ADMIN HOMEPAGE (ADMIN) ---
function AdminHome({ setView, user }: Omit<HomePageProps, 'selectCourse'> & { user: UserType }) {
  const stats = [
    { label: 'Tổng học viên', value: '1,284', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Doanh thu tháng', value: '45.2M', icon: TrendingDown, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Khóa học hoạt động', value: '52', icon: BookOpen, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Bài tập đã nộp', value: '8.4K', icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const commonMistakes = [
    { course: 'HSK 3', error: 'Nhầm lẫn giữa "不" và "没"', frequency: '85%', priority: 'High' },
    { course: 'TOEIC Starter', error: 'Chia động từ ở thì Hiện tại đơn', frequency: '72%', priority: 'Medium' },
    { course: 'HSK 1', error: 'Thanh điệu 3 (Tone 3)', frequency: '64%', priority: 'Medium' },
    { course: 'TOEIC Bridge', error: 'Giới từ trong tiếng Anh', frequency: '58%', priority: 'Low' },
  ];

  const distractedStudents = [
    { name: 'Nguyễn Văn A', course: 'HSK 4', focusLevel: 45, status: 'Distracted', alert: true },
    { name: 'Trần Thị B', course: 'TOEIC Master', focusLevel: 32, status: 'Idle', alert: true },
    { name: 'Lê Văn C', course: 'HSK 2', focusLevel: 58, status: 'Focusing', alert: false },
    { name: 'Phạm Thị D', course: 'Tiếng Trung Giao Tiếp', focusLevel: 22, status: 'Away', alert: true },
  ];

  const exportAllTables = () => {
    downloadCSV(commonMistakes, 'loi_sai_thuong_gap.csv', ['Khóa học', 'Nội dung lỗi', 'Tần suất', 'Ưu tiên']);
    downloadCSV(distractedStudents, 'giam_sat_tap_trung.csv', ['Tên học viên', 'Khóa học', 'Độ tập trung (%)', 'Trạng thái', 'Cảnh báo']);
  };

  return (
    <div className="space-y-12 pb-24">
      <header className="flex justify-between items-center pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
             <BarChart3 className="text-yellow-500" size={36} /> Quản trị Vịt Học
          </h1>
          <p className="text-slate-500 font-medium">Báo cáo hiệu suất học tập và thống kê hệ thống theo thời gian thực.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportAllTables}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-yellow-500 transition-colors active:scale-95"
          >
            XUẤT BÁO CÁO (CSV)
          </button>
        </div>
      </header>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Common Mistakes Table */}
        <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
              <AlertCircle className="text-red-500" size={24} /> Lỗi sai thường gặp
            </h2>
            <button className="text-yellow-600 font-black text-xs uppercase tracking-widest hover:underline">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="text-left pb-4">Khóa học</th>
                  <th className="text-left pb-4">Nội dung lỗi</th>
                  <th className="text-left pb-4">Tần suất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {commonMistakes.map((item, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 font-black text-xs text-slate-900">{item.course}</td>
                    <td className="py-4 text-xs font-medium text-slate-500">{item.error}</td>
                    <td className="py-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                         item.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                       }`}>
                         {item.frequency}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Student Distraction Monitor */}
        <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/20 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-tight italic flex items-center gap-3">
              <Activity className="text-yellow-500" size={24} /> Giám sát tập trung
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-widest">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live
            </div>
          </div>
          <div className="space-y-6">
            {distractedStudents.map((student, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${student.alert ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      {student.name[0]}
                   </div>
                   <div>
                      <h4 className="font-black text-sm">{student.name}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{student.course}</p>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Độ tập trung</p>
                      <div className="flex items-center gap-2 font-black text-sm">
                        <span className={student.focusLevel < 50 ? 'text-red-400' : 'text-green-400'}>{student.focusLevel}%</span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className={`h-full rounded-full ${student.focusLevel < 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${student.focusLevel}%` }} />
                        </div>
                      </div>
                   </div>
                   {student.alert && (
                     <button className="p-2 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/30 hover:scale-110 transition-transform">
                        <AlertCircle size={18} />
                     </button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
