import { COURSES } from '../constants';
import { View } from '../types';
import { Search, Filter, Star, Clock, User, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CourseListProps {
  setView: (view: View) => void;
  selectCourse: (id: string) => void;
}

export default function CourseList({ setView, selectCourse }: CourseListProps) {
  const [filter, setFilter] = useState<'All' | 'English' | 'Chinese'>('All');
  const [search, setSearch] = useState('');

  const filteredCourses = COURSES.filter(c => {
    const matchesLang = filter === 'All' || c.language === filter;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesLang && matchesSearch;
  });

  return (
    <div className="space-y-10 py-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Khám phá khóa học</h1>
          <p className="text-slate-500 font-medium">Bắt đầu hành trình chinh phục ngôn ngữ mới cùng Vịt!</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm tên khóa học..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-sm font-medium shadow-sm"
            />
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
            {(['All', 'English', 'Chinese'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === lang ? 'bg-yellow-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {lang === 'All' ? 'Tất cả' : lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={course.id}
            onClick={() => { selectCourse(course.id); setView('course-details'); }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-yellow-200/30 transition-all cursor-pointer flex flex-col h-full"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={course.thumbnail} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={course.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black text-yellow-600 rounded-full uppercase tracking-widest shadow-sm">
                  {course.language}
                </span>
                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-[10px] font-black text-white rounded-full uppercase tracking-widest shadow-sm">
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User size={14} className="text-yellow-500" />
                  {course.instructor}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  4.9 (240+)
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 leading-tight line-clamp-2">
                {course.title}
              </h3>
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giá khóa học</span>
                  <span className="text-xl font-black text-slate-900">{course.price.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="p-3 bg-yellow-500 text-white rounded-2xl group-hover:px-6 transition-all duration-300 flex items-center gap-2">
                  <span className="hidden group-hover:block font-black text-xs">XEM THÊM</span>
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="py-20 text-center space-y-6">
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto grayscale">
            <Search size={48} className="text-yellow-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Không tìm thấy khóa học</h2>
            <p className="text-slate-400 text-sm">Quack! Thử tìm với từ khóa khác hoặc lọc theo ngôn ngữ xem sao nhé.</p>
          </div>
          <button 
            onClick={() => { setSearch(''); setFilter('All'); }}
            className="px-6 py-2 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
