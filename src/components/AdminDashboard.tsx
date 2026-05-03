import { useState } from 'react';
import { User, View, Course } from '../types';
import { COURSES as INITIAL_COURSES } from '../constants';
import { downloadCSV } from '../lib/exportUtils';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  BookOpen, 
  DollarSign, 
  Search,
  Check,
  X,
  ShieldAlert,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminDashboardProps {
  user: User | null;
  setView: (view: View) => void;
}

export default function AdminDashboard({ user, setView }: AdminDashboardProps) {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    price: 0,
    language: 'English',
    level: 'Beginner',
    instructor: 'Admin Duck',
    thumbnail: 'https://images.unsplash.com/photo-1543165796-5426273ea458?q=80&w=800&auto=format&fit=crop'
  });

  if (user?.role !== 'Administrator') {
    return (
      <div className="py-20 text-center space-y-8">
        <ShieldAlert size={80} className="mx-auto text-red-500" />
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">TRUY CẬP BỊ TỪ CHỐI</h2>
        <p className="text-slate-500 max-w-md mx-auto">Khu vực này chỉ dành cho Quản trị viên. Vui lòng quay lại nhé! Quack!</p>
        <button onClick={() => setView('home')} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">VỀ TRANG CHỦ</button>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleAdd = () => {
    const course: Course = {
      ...newCourse as Course,
      id: Math.random().toString(36).substr(2, 9),
      lessons: []
    };
    setCourses([...courses, course]);
    setIsAdding(false);
    setNewCourse({
      title: '',
      description: '',
      price: 0,
      language: 'English',
      level: 'Beginner',
      instructor: 'Admin Duck',
      thumbnail: 'https://images.unsplash.com/photo-1543165796-5426273ea458?q=80&w=800&auto=format&fit=crop'
    });
  };

  const exportCoursesCSV = () => {
    const data = courses.map(c => ({
      id: c.id,
      title: c.title,
      language: c.language,
      level: c.level,
      price: c.price,
      instructor: c.instructor,
      lessonsCount: c.lessons.length
    }));
    downloadCSV(data, 'danh_sach_khoa_hoc.csv', ['ID', 'Tiêu đề', 'Ngôn ngữ', 'Trình độ', 'Giá', 'Giảng viên', 'Số bài học']);
  };

  return (
    <div className="space-y-12 py-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-yellow-100 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-[0.2em] mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Control Center
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Quản trị viên</h1>
          <p className="text-slate-400 font-bold">Hệ thống quản lý dữ liệu Master CRUD - Vịt Học v1.0</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={exportCoursesCSV}
            className="px-6 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2"
          >
            <Download size={20} /> XUẤT CSV
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-8 py-4 bg-yellow-500 text-white rounded-[1.5rem] font-black text-lg hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-200 flex items-center gap-3"
          >
            <Plus size={24} /> THÊM KHÓA HỌC MỚI
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
             <BookOpen size={30} />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{courses.length}</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Khóa học hiện có</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
             <Users size={30} />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">4,203</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Học viên đăng ký</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
             <DollarSign size={30} />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">2.5B₫</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Doanh thu tháng này</p>
          </div>
        </div>
      </div>

      {/* Course Management Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-xl font-black text-slate-900 italic">Danh sách quản lý</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input type="text" placeholder="Tìm kiếm nhanh..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Khóa học</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngôn ngữ</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Giá</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bài học</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map(course => (
                 <tr key={course.id} className="hover:bg-yellow-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                        <img src={course.thumbnail} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{course.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{course.instructor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.language === 'English' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {course.language}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-600">
                    {course.price.toLocaleString('vi-VN')}₫
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-slate-400">{course.lessons.length} LESSONS</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"><Edit2 size={18} /></button>
                       <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal Placeholder (Overlay) */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] p-10 w-full max-w-2xl relative z-10 shadow-3xl space-y-8"
            >
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Thêm khóa học mới</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiêu đề khóa học</label>
                  <input 
                    type="text" 
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="VD: Tiếng Anh cho người mất gốc" 
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngôn ngữ</label>
                  <select 
                    value={newCourse.language}
                    onChange={(e) => setNewCourse({...newCourse, language: e.target.value as any})}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold text-sm h-[46px]"
                  >
                    <option value="English">English</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Giá (VNĐ)</label>
                  <input 
                    type="number" 
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value)})}
                    placeholder="500000" 
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold" 
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
                >
                  HỦY BỎ
                </button>
                <button 
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-yellow-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-200/50"
                >
                  LƯU KHÓA HỌC
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
