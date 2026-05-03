import { useState } from 'react';
import { COURSES } from '../constants';
import { View, CartItem } from '../types';
import { 
  ChevronLeft, 
  ShoppingCart, 
  Play, 
  Clock, 
  User, 
  Layers, 
  CheckCircle2, 
  Share2,
  Heart,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

interface CourseDetailsProps {
  courseId: string | null;
  setView: (view: View) => void;
  addToCart: (item: CartItem) => void;
  triggerChat: (message: string) => void;
}

export default function CourseDetails({ courseId, setView, addToCart, triggerChat }: CourseDetailsProps) {
  const [learningLessonId, setLearningLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const course = COURSES.find(c => c.id === courseId);

  if (!course) return (
    <div className="py-20 text-center space-y-6">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
        <BookOpen size={48} />
      </div>
      <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">Không tìm thấy khóa học</h2>
      <button onClick={() => setView('courses')} className="text-yellow-600 font-bold hover:underline">Quay lại danh sách</button>
    </div>
  );

  const handleLessonAction = (lessonId: string) => {
    if (course.price > 0) {
      // Logic for paid courses (prevent learning if not bought, simulation)
    }

    if (learningLessonId === lessonId) {
      // Finishing the lesson
      setLearningLessonId(null);
      if (!completedLessons.includes(lessonId)) {
        const updated = [...completedLessons, lessonId];
        setCompletedLessons(updated);
        
        // If all lessons in a free course are completed
        if (course.price === 0 && updated.length === course.lessons.length) {
          const code = course.language === 'English' ? 'ENG20' : 'CHI20';
          triggerChat(`Quack! Chúc mừng bạn đã hoàn thành khóa học thử miễn phí: ${course.title}! 🦆✨\n\nVịt tặng bạn mã giảm giá 20%: ${code} để đăng ký khóa học ${course.language} tiếp theo. Hãy dùng ngay tại bước thanh toán nhé! Quack!`);
        }
      }
    } else {
      setLearningLessonId(lessonId);
    }
  };

  return (
    <div className="space-y-12 py-6">
      <button 
        onClick={() => setView('courses')}
        className="flex items-center gap-2 text-slate-500 hover:text-yellow-600 transition-colors font-bold text-sm group"
      >
        <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:border-yellow-200 shadow-sm">
          <ChevronLeft size={18} />
        </div>
        VỀ DANH SÁCH KHÓA HỌC
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Header Info */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-black rounded-full uppercase tracking-widest">{course.language}</span>
              <span className="px-4 py-1.5 bg-slate-900 text-white text-xs font-black rounded-full uppercase tracking-widest">{course.level}</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-[1.1]">{course.title}</h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-100 p-0.5 overflow-hidden">
                   <img src="https://picsum.photos/seed/instructor/100/100" className="w-full h-full object-cover rounded-full" alt={course.instructor} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Giáo viên</p>
                  <p className="font-bold text-slate-900 leading-none">{course.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <Play size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời lượng</p>
                  <p className="font-bold text-slate-900 leading-none">12.5 Giờ Học</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Layers size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bài học</p>
                  <p className="font-bold text-slate-900 leading-none">{course.lessons.length} Chương Trình</p>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">Nội dung khóa học</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, idx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isLearning = learningLessonId === lesson.id;
                
                return (
                  <div 
                    key={lesson.id}
                    className={`p-6 rounded-3xl border transition-all flex items-center justify-between group ${
                      isLearning ? 'bg-yellow-50 border-yellow-200' : 
                      isCompleted ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-3xl font-black transition-colors ${
                        isCompleted ? 'text-green-200' : 'text-slate-100 group-hover:text-yellow-100'
                      }`}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                          {lesson.title}
                          {isCompleted && <CheckCircle2 size={16} className="text-green-500" />}
                        </h4>
                        <p className="text-xs text-slate-400 font-bold">{lesson.duration}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleLessonAction(lesson.id)}
                      className={`w-auto px-6 h-12 rounded-2xl flex items-center justify-center gap-2 font-black text-xs transition-all ${
                        isLearning 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : isCompleted 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-50 text-slate-300 group-hover:bg-yellow-500 group-hover:text-white'
                      }`}
                    >
                      {isLearning ? (
                        <>KẾT THÚC BÀI HỌC</>
                      ) : isCompleted ? (
                        <>HỌC LẠI</>
                      ) : (
                        <>
                          <Play size={16} fill="currentColor" />
                          BẮT ĐẦU HỌC
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
              {course.lessons.length === 0 && (
                <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300 shadow-sm">
                    <BookOpen size={24} />
                  </div>
                  <p className="text-slate-400 font-bold text-sm italic">Nội dung đang được cập nhật. Cùng chờ Vịt nhé! Quack!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Sticky */}
        <div className="relative">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-yellow-100 shadow-2xl shadow-yellow-200/40 space-y-8">
              <div className="aspect-video rounded-2xl overflow-hidden relative group cursor-pointer">
                <img src={course.thumbnail} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/60 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-yellow-500 shadow-xl group-hover:scale-110 transition-transform">
                    <Play size={24} className="ml-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">{course.price.toLocaleString('vi-VN')}₫</span>
                  <span className="text-sm text-slate-400 line-through font-bold">{(course.price * 1.5).toLocaleString('vi-VN')}₫</span>
                </div>
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">Ưu đãi 30% kết thúc sau 2 giờ</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => { addToCart({ courseId: course.id, title: course.title, price: course.price, thumbnail: course.thumbnail }); setView('cart'); }}
                  className="w-full py-4 bg-yellow-500 text-white rounded-2xl font-black text-lg hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-200 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <ShoppingCart size={22} />
                  MUA NGAY
                </button>
                <button 
                  onClick={() => addToCart({ courseId: course.id, title: course.title, price: course.price, thumbnail: course.thumbnail })}
                  className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-lg border-2 border-slate-100 hover:border-yellow-200 hover:text-yellow-600 transition-all active:scale-[0.98]"
                >
                  THÊM VÀO GIỎ
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Khóa học bao gồm:</p>
                <ul className="space-y-3">
                  {[
                    'Truy cập trọn đời tất cả bài học',
                    'Chatbot AI tư vấn 24/7',
                    'Bài tập tự động chấm điểm',
                    'Chứng chỉ hoàn thành từ Vịt Học',
                    'Hỗ trợ giải đáp từ giảng viên'
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-50">
                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-yellow-600 transition-colors">
                  <Share2 size={16} /> Chia sẻ
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                  <Heart size={16} /> Yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
