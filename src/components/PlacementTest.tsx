import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { View, User, Course } from '../types';
import { COURSES } from '../constants';
import { 
  ChevronRight, 
  ChevronLeft, 
  ClipboardCheck, 
  Trophy, 
  Loader2,
  Sparkles,
  RefreshCcw,
  BookOpen,
  User as UserIcon,
  HelpCircle,
  Target,
  ArrowRight,
  Clock
} from 'lucide-react';
import DuckMascot from './DuckMascot';

interface PlacementTestProps {
  user: User | null;
  setView: (view: View) => void;
}

type TestStep = 'basic-info' | 'intro-site' | 'preferences' | 'suggest-test' | 'testing' | 'result';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
}

const ENGLISH_QUESTIONS: Question[] = [
  // Basic
  { id: 'en1', question: 'I ___ a student.', options: ['am', 'is', 'are', 'be'], correct: 'am', level: 'Basic' },
  { id: 'en2', question: 'They ___ playing football now.', options: ['is', 'are', 'am', 'was'], correct: 'are', level: 'Basic' },
  { id: 'en3', question: 'She ___ her homework every night.', options: ['do', 'does', 'did', 'doing'], correct: 'does', level: 'Basic' },
  { id: 'en4', question: 'Where ___ you live?', options: ['do', 'does', 'are', 'is'], correct: 'do', level: 'Basic' },
  { id: 'en5', question: 'I don\'t like ___ coffee.', options: ['drink', 'drinking', 'drank', 'to drank'], correct: 'drinking', level: 'Basic' },
  // Intermediate
  { id: 'en6', question: 'If I ___ you, I would take that job.', options: ['am', 'was', 'were', 'be'], correct: 'were', level: 'Intermediate' },
  { id: 'en7', question: 'She has been working here ___ 2010.', options: ['for', 'since', 'during', 'until'], correct: 'since', level: 'Intermediate' },
  { id: 'en8', question: 'By the time I reached the station, the train ___.', options: ['left', 'has left', 'had left', 'is leaving'], correct: 'had left', level: 'Intermediate' },
  { id: 'en9', question: 'I suggest ___ more exercise.', options: ['do', 'doing', 'to do', 'did'], correct: 'doing', level: 'Intermediate' },
  { id: 'en10', question: 'The movie was ___ than I expected.', options: ['good', 'better', 'best', 'more good'], correct: 'better', level: 'Intermediate' },
  // Harder Intermediate
  { id: 'en11', question: 'Hardly ___ when the phone rang.', options: ['had I arrived', 'I had arrived', 'I arrived', 'did I arrive'], correct: 'had I arrived', level: 'Intermediate' },
  { id: 'en12', question: 'You ___ told me you were coming!', options: ['should have', 'must have', 'could have', 'would have'], correct: 'should have', level: 'Intermediate' },
  { id: 'en13', question: 'The report ___ by tomorrow morning.', options: ['will finish', 'is finishing', 'will be finished', 'finished'], correct: 'will be finished', level: 'Intermediate' },
  { id: 'en14', question: 'Neither the manager nor the employees ___ happy.', options: ['is', 'are', 'was', 'being'], correct: 'are', level: 'Intermediate' },
  { id: 'en15', question: 'Despite ___ ill, he went to work.', options: ['he was', 'being', 'his illness', 'be'], correct: 'being', level: 'Intermediate' },
  // 5 more for 20
  { id: 'en16', question: 'I look forward to ___ you soon.', options: ['see', 'seeing', 'to see', 'saw'], correct: 'seeing', level: 'Intermediate' },
  { id: 'en17', question: 'The car, ___ was expensive, broke down.', options: ['who', 'which', 'that', 'whom'], correct: 'which', level: 'Intermediate' },
  { id: 'en18', question: 'I wish I ___ more time.', options: ['have', 'had', 'has', 'having'], correct: 'had', level: 'Intermediate' },
  { id: 'en19', question: 'He is used to ___ in the city.', options: ['live', 'living', 'lives', 'lived'], correct: 'living', level: 'Intermediate' },
  { id: 'en20', question: 'Not only ___ but she also dances.', options: ['she sings', 'does she sing', 'sing she', 'she does sing'], correct: 'does she sing', level: 'Intermediate' }
];

const CHINESE_QUESTIONS: Question[] = [
  // Basic
  { id: 'zh1', question: '你好! (Nǐ hǎo!) means:', options: ['Goodbye', 'Hello', 'Thank you', 'I am sorry'], correct: 'Hello', level: 'Basic' },
  { id: 'zh2', question: '我 ___ 学生。 (Wǒ ___ xuéshēng.)', options: ['是 (shì)', '有 (yǒu)', '在 (zài)', '去 (qù)'], correct: '是 (shì)', level: 'Basic' },
  { id: 'zh3', question: '一 (Yī), 二 (èr), 三 (sān), ___?', options: ['五 (wǔ)', '四 (sì)', '六 (liù)', '十 (shí)'], correct: '四 (sì)', level: 'Basic' },
        {id: 'zh4', question: '他 ___ 中国人。 (Tā ___ Zhōngguórén.)', options: ['不 (bù)', '是 (shì)', '很 (hěn)', '也 (yě)'], correct: '是 (shì)', level: 'Basic' },
  { id: 'zh5', question: '我喜欢吃 ___。 (Wǒ xǐhuān chī ___.)', options: ['苹果 (píngguǒ)', '衣服 (yīfu)', '桌子 (zhuōzi)', '医生 (yīshēng)'], correct: '苹果 (píngguǒ)', level: 'Basic' },
  // Intermediate
  { id: 'zh6', question: '我要买两 ___ 书。 (Wǒ yào mǎi liǎng ___ shū.)', options: ['个 (gè)', '口 (kǒu)', '本 (běn)', '只 (zhī)'], correct: '本 (běn)', level: 'Intermediate' },
  { id: 'zh7', question: '虽然下雨了，___ 我还是去了。 (Suīrán xiàyǔ le, ___ wǒ háishì qù le.)', options: ['所以 (suǒyǐ)', '但是 (dànshì)', '因为 (yīnwèi)', '还是 (háishì)'], correct: '但是 (dànshì)', level: 'Intermediate' },
  { id: 'zh8', question: '他跑 ___ 很快。 (Tā pǎo ___ hěn kuài.)', options: ['的 (de)', '地 (de)', '得 (de)', '了 (le)'], correct: '得 (de)', level: 'Intermediate' },
  { id: 'zh9', question: '这个题我也 ___ 做。 (Zhège tí wǒ yě ___ zuò.)', options: ['能 (néng)', '会 (huì)', '可以 (kěyǐ)', '想 (xiǎng)'], correct: '会 (huì)', level: 'Intermediate' },
  { id: 'zh10', question: '请把手机 ___ 桌子上。 (Qǐng bǎ shǒujī ___ zhuōzi shàng.)', options: ['在 (zài)', '到 (dào)', '放 (fàng) 在 (zài)', '拿 (ná)'], correct: '放 (fàng) 在 (zài)', level: 'Intermediate' },
  // Harder Intermediate
  { id: 'zh11', question: '只有坚持努力，___ 能成功。 (Zhǐyǒu jiānchí nǔlì, ___ néng chénggōng.)', options: ['就 (jiù)', '才 (cái)', '都 (dōu)', '也 (yě)'], correct: '才 (cái)', level: 'Intermediate' },
  { id: 'zh12', question: '这篇文章写 ___ 不错。 (Zhè piān wénzhāng xiě ___ bùcuò.)', options: ['得很 (dehěn)', '得 (de)', '地 (de)', '了 (le)'], correct: '得 (de)', level: 'Intermediate' },
  { id: 'zh13', question: '哪怕工作再忙，他 ___ 坚持读书。 (Nǎpà gōngzuò zài máng, tā ___ jiānchí dúshū.)', options: ['也 (yě)', '就 (jiù)', '才 (cái)', '都 (dōu)'], correct: '也 (yě)', level: 'Intermediate' },
  { id: 'zh14', question: '这本小说被他 ___ 丢了。 (Zhè běn xiǎoshuō bèi tā ___ diū le.)', options: ['给 (gěi)', '了 (le)', '在 (zài)', '着 (zhe)'], correct: '给 (gěi)', level: 'Intermediate' },
  { id: 'zh15', question: '我们既然约好了，你 ___ 应该准时。 (Wǒmen jìrán yuē hǎo le, nǐ ___ yīnggāi zhǔnshí.)', options: ['就 (jiù)', '才 (cái)', '也 (yě)', '都 (dōu)'], correct: '就 (jiù)', level: 'Intermediate' },
  // More
  { id: 'zh16', question: '他 ___ 还没来，一定是有事耽误了。 (Tā ___ hái méi lái...)', options: ['也许 (yěxǔ)', '肯定 (kěndìng)', '一定 (yídìng)', '毕竟 (bìjìng)'], correct: '也许 (yěxǔ)', level: 'Intermediate' },
  { id: 'zh17', question: '即使你不想去，___ 得去。 (Jíshǐ nǐ bù xiǎng qù, ___ děi qù.)', options: ['也 (yě)', '就 (jiù)', '才 (cái)', '还 (hái)'], correct: '也 (yě)', level: 'Intermediate' },
  { id: 'zh18', question: '不论发生什么，我 ___ 支持你。 (Búlùn fāshēng shénme, wǒ ___ zhīchí nǐ.)', options: ['都 (dōu)', '就 (jiù)', '才 (cái)', '也 (yě)'], correct: '都 (dōu)', level: 'Intermediate' },
  { id: 'zh19', question: '果然 ___ 我所料，他真的来了。 (Guǒrán ___ wǒ suǒ liào...)', options: ['如 (rú)', '出 (chū)', '像 (xiàng)', '随 (suí)'], correct: '如 (rú)', level: 'Intermediate' },
  { id: 'zh20', question: '除非你去，___ 我才去。 (Chúfēi nǐ qù, ___ wǒ cái qù.)', options: ['否则 (fǒuzé)', '不然 (bùrán)', '不然的话 (bùrán de huà)', '要不然 (yào bùrán)'], correct: '否则 (fǒuzé)', level: 'Intermediate' }
];

export default function PlacementTest({ user, setView }: PlacementTestProps) {
  const [step, setStep] = useState<TestStep>('basic-info');
  const [basicInfo, setBasicInfo] = useState({
    name: user?.name || '',
    age: '',
    gender: 'Nam',
    reason: ''
  });
  const [preferences, setPreferences] = useState({
    language: 'English' as 'English' | 'Chinese',
    target: ''
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinishing, setIsFinishing] = useState(false);
  const [score, setScore] = useState(0);

  const questions = useMemo(() => {
    return preferences.language === 'English' ? ENGLISH_QUESTIONS : CHINESE_QUESTIONS;
  }, [preferences.language]);

  const handleStartTest = () => {
    setStep('testing');
    setCurrentIndex(0);
    setAnswers({});
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsFinishing(true);
    setTimeout(() => {
      let correctCount = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correct) correctCount++;
      });
      setScore(Math.round((correctCount / questions.length) * 100));
      setStep('result');
      setIsFinishing(false);
    }, 2000);
  };

  const getRecommendation = () => {
    const lang = preferences.language;
    const targetValue = preferences.target.toLowerCase();
    
    // Helper to see if they are shooting high
    const isTargetingHigh = targetValue.includes('80') || targetValue.includes('90') || targetValue.includes('7') || targetValue.includes('5') || targetValue.includes('6');

    if (lang === 'English') {
      if (score < 40) return COURSES.find(c => c.id === 'toeic-starter');
      if (score < 75) return COURSES.find(c => c.id === 'toeic-bridge');
      return COURSES.find(c => c.id === 'toeic-master');
    } else {
      // HSK Logic
      if (score < 20) return COURSES.find(c => c.id === 'hsk-1');
      if (score < 40) return COURSES.find(c => c.id === 'hsk-2');
      if (score < 60) return COURSES.find(c => c.id === 'hsk-3');
      if (score < 80) return COURSES.find(c => c.id === 'hsk-4');
      return COURSES.find(c => c.id === 'hsk-5');
    }
  };

  const recommendedCourse = getRecommendation();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <AnimatePresence mode="wait">
        {step === 'basic-info' && (
          <motion.div
            key="basic-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-yellow-100 space-y-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <DuckMascot size="lg" />
              </motion.div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter italic">Chào bạn! Quack!</h1>
                <p className="text-slate-500 font-medium max-w-md mx-auto">Vịt rất vui được gặp bạn! Trước khi bắt đầu, hãy cho Vịt biết một chút về bạn nhé.</p>
              </div>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên của bạn là gì?</label>
                  <div className="relative">
                    <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="text" 
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})}
                      placeholder="VD: Nguyễn Văn Vịt"
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold text-lg"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tuổi của bạn?</label>
                  <input 
                    type="number" 
                    value={basicInfo.age}
                    onChange={(e) => setBasicInfo({...basicInfo, age: e.target.value})}
                    placeholder="20"
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold text-lg"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-center block">Giới tính của bạn?</label>
                <div className="flex gap-4">
                  {['Nam', 'Nữ', 'Khác'].map(g => (
                    <button
                      key={g}
                      onClick={() => setBasicInfo({...basicInfo, gender: g})}
                      className={`flex-1 py-5 rounded-[1.5rem] border-2 font-black transition-all ${basicInfo.gender === g ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-lg shadow-yellow-100/50' : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-yellow-100'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lý do bạn tìm đến Vịt Học là gì? Quack!</label>
                <textarea 
                  value={basicInfo.reason}
                  onChange={(e) => setBasicInfo({...basicInfo, reason: e.target.value})}
                  placeholder="VD: Mình muốn đi du học, xin việc làm, hay chỉ là yêu thích ngôn ngữ..."
                  rows={3}
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold resize-none text-lg"
                />
              </div>

              <button 
                onClick={() => setStep('intro-site')}
                disabled={!basicInfo.name || !basicInfo.age}
                className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-2xl hover:bg-yellow-500 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
              >
                GẶP VỊT NGAY <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'intro-site' && (
          <motion.div
            key="intro-site"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[4rem] p-12 md:p-20 shadow-3xl border border-yellow-100 text-center space-y-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-yellow-500" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -mr-48 -mb-48" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-center">
                <div className="p-8 bg-yellow-100 rounded-[3rem] relative">
                  <BookOpen size={80} className="text-yellow-600" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-yellow-300 rounded-[3rem] -m-2"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Học với Vịt</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">Phá bỏ rào cản ngôn ngữ</p>
              </div>

              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                Chào mừng <span className="text-yellow-600 font-black decoration-yellow-200 underline decoration-4 underline-offset-4">{basicInfo.name}</span> đã đến với gia đình Vịt Học! 
                <br /><br />
                Chúng mình tự hào là nền tảng học <span className="text-slate-900 font-black italic">Tiếng Anh & Tiếng Trung</span> tối ưu nhất hiện nay. Với lộ trình cá nhân hóa và sự trợ giúp của AI, bạn sẽ đạt được mục tiêu nhanh hơn 2.5 lần! Quack!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                <button 
                  onClick={() => setStep('basic-info')}
                  className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2 border border-slate-100"
                >
                  <ChevronLeft size={18} /> Quay lại
                </button>
                <button 
                  onClick={() => setStep('preferences')}
                  className="flex-2 py-5 bg-yellow-500 text-white rounded-[2rem] font-black text-lg hover:bg-yellow-600 transition-all shadow-2xl shadow-yellow-200 flex items-center justify-center gap-3 active:scale-95 group"
                >
                  BẮT ĐẦU CHỌN LỘ TRÌNH <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'preferences' && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-yellow-100 space-y-12"
          >
             <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Lựa chọn của bạn</h2>
                <p className="text-slate-400 font-bold">Hãy chọn ngôn ngữ và mục tiêu bạn muốn đạt được.</p>
             </div>

             <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest text-center block">Bạn muốn học ngôn ngữ nào?</label>
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      onClick={() => setPreferences({...preferences, language: 'English'})}
                      className={`p-10 rounded-[2.5rem] border-4 flex flex-col items-center gap-4 transition-all ${preferences.language === 'English' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-xl scale-105' : 'border-slate-100 text-slate-300 grayscale opacity-60 hover:opacity-100'}`}
                    >
                      <img src="https://cdn-icons-png.flaticon.com/512/197/197374.png" className="w-16 h-16" alt="English" />
                      <span className="font-black text-lg">Tiếng Anh</span>
                    </button>
                    <button 
                      onClick={() => setPreferences({...preferences, language: 'Chinese'})}
                      className={`p-10 rounded-[2.5rem] border-4 flex flex-col items-center gap-4 transition-all ${preferences.language === 'Chinese' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-xl scale-105' : 'border-slate-100 text-slate-300 grayscale opacity-60 hover:opacity-100'}`}
                    >
                      <img src="https://cdn-icons-png.flaticon.com/512/197/197375.png" className="w-16 h-16" alt="Chinese" />
                      <span className="font-black text-lg">Tiếng Trung</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mục tiêu bạn muốn đạt được? (Band score / HSK)</label>
                  <div className="relative">
                    <Target className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                    <input 
                      type="text" 
                      value={preferences.target}
                      onChange={(e) => setPreferences({...preferences, target: e.target.value})}
                      placeholder={preferences.language === 'English' ? 'VD: TOEIC 800+, IELTS 7.0' : 'VD: HSK 4, Giao tiếp cơ bản'}
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-yellow-500/20 outline-none font-bold text-lg"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => setStep('suggest-test')}
                    disabled={!preferences.target}
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-yellow-500 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
                  >
                    XÁC NHẬN MỤC TIÊU
                    <ArrowRight size={24} />
                  </button>
                </div>
             </div>
          </motion.div>
        )}

        {step === 'suggest-test' && (
          <motion.div
            key="suggest-test"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[4rem] p-12 md:p-20 shadow-3xl border border-yellow-100 text-center space-y-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-center">
                <div className="p-8 bg-yellow-50 rounded-full relative">
                  <Sparkles size={64} className="text-yellow-500" />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-yellow-400/10 rounded-full -m-4"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight italic">
                  Vịt đã hiểu mục tiêu của bạn!
                </h2>
                <p className="text-slate-500 font-medium text-lg">
                  Để giúp bạn đạt được <span className="text-yellow-600 font-black">{preferences.target}</span> hiệu quả nhất, 
                  Vịt đề xuất bạn thực hiện một bài kiểm tra trình độ nhanh.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100 flex items-start gap-4 text-left">
                <div className="p-3 bg-white rounded-xl shadow-sm text-yellow-600">
                  <ClipboardCheck size={24} />
                </div>
                <div>
                   <p className="font-black text-slate-900 text-sm uppercase tracking-wider">Thông tin bài test</p>
                   <p className="text-slate-500 text-sm font-medium">Bao gồm 20 câu hỏi từ cơ bản đến nâng cao. Thời gian làm bài khoảng 5-10 phút.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleStartTest}
                  className="w-full py-6 bg-yellow-500 text-white rounded-[2rem] font-black text-2xl hover:bg-yellow-600 transition-all shadow-2xl shadow-yellow-200 flex items-center justify-center gap-3 active:scale-95 group"
                >
                  BẮT ĐẦU KIỂM TRA NGAY <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setStep('preferences')}
                  className="text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Thay đổi mục tiêu
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {step === 'testing' && (
          <motion.div
            key="testing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl border border-yellow-100 space-y-12 relative"
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-slate-900 text-yellow-500 rounded-full font-black text-xs tracking-widest flex items-center gap-2">
                <Clock size={14} /> KIỂM TRA ĐANG DIỄN RA
             </div>

             <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Câu hỏi {currentIndex + 1} / {questions.length}</p>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">Chọn đáp án đúng nhất</h2>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-2 w-32 md:w-48 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                      className="h-full bg-yellow-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{Math.round(((currentIndex + 1) / questions.length) * 100)}% HOÀN THÀNH</span>
                </div>
             </div>

             <div className="space-y-10">
                <div className="bg-yellow-50/50 p-8 rounded-[2.5rem] border border-yellow-100 relative group">
                  <HelpCircle className="absolute -top-4 -left-4 text-yellow-500 bg-white rounded-full p-1" size={32} />
                  <p className="text-2xl font-bold text-slate-800 leading-relaxed">{questions[currentIndex].question}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentIndex].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setAnswers({...answers, [questions[currentIndex].id]: opt})}
                      className={`p-6 rounded-3xl border-2 text-left font-bold transition-all flex items-center gap-4 ${
                        answers[questions[currentIndex].id] === opt
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-lg scale-[1.02]'
                          : 'border-slate-50 hover:border-yellow-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${answers[questions[currentIndex].id] === opt ? 'bg-yellow-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-lg">{opt}</span>
                    </button>
                  ))}
                </div>
             </div>

             <div className="flex justify-between pt-10 border-t border-slate-50">
               <button 
                onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 text-slate-400 font-black text-sm uppercase tracking-widest hover:text-slate-900 disabled:opacity-20 transition-all"
               >
                 <ChevronLeft size={20} /> Quay lại
               </button>
               <button 
                onClick={nextQuestion}
                disabled={!answers[questions[currentIndex].id]}
                className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-yellow-500 transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl group"
               >
                 {currentIndex === questions.length - 1 ? (isFinishing ? 'QUACK! ĐANG CHẤM ĐIỂM...' : 'NỘP BÀI THI') : 'CÂU TIẾP THEO'}
                 {isFinishing ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
               </button>
             </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[4rem] p-12 md:p-16 shadow-3xl border border-yellow-100 text-center space-y-12 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl -mr-40 -mt-40" />
             
             <div className="space-y-6">
                <div className="w-32 h-32 bg-yellow-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl relative rotate-3">
                   <Trophy size={64} />
                   <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.5 }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                   >
                    <ClipboardCheck size={24} />
                   </motion.div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Hoàn thành!</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Chúc mừng {basicInfo.name}, bạn đã làm rất tốt!</p>
                </div>
                <div className="text-7xl font-black text-yellow-500 tracking-tighter">{score}%</div>
             </div>

             <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6 relative overflow-hidden text-left">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl -mr-24 -mb-24" />
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                   <div className="w-32 h-32 shrink-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-500/50">
                      <img src={recommendedCourse?.thumbnail} className="w-full h-full object-cover" alt="Recommended" referrerPolicy="no-referrer" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-yellow-500 font-black text-[10px] uppercase tracking-[0.3em]">
                        <Sparkles size={14} /> Lộ trình đề xuất cho bạn
                      </div>
                      <h3 className="text-2xl font-black text-yellow-50 text-yellow-400">{recommendedCourse?.title}</h3>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        Với mục tiêu <span className="text-white font-bold">{preferences.target}</span> và kết quả bài test, 
                        đây là khóa học tối ưu nhất để giúp bạn bứt phá trình độ ngay lập tức.
                      </p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    if (recommendedCourse) {
                      // Navigate to course details
                      setView('courses');
                    }
                  }}
                  className="w-full py-6 bg-yellow-500 text-white rounded-[2rem] font-black text-xl hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-200"
                >
                  ĐĂNG KÝ HỌC NGAY
                </button>
                <button 
                  onClick={() => setStep('basic-info')}
                  className="w-full py-6 bg-white text-slate-700 rounded-[2rem] font-black text-xl border-2 border-slate-100 hover:border-yellow-500 hover:text-yellow-600 transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCcw size={24} /> LÀM LẠI BÀI TEST
                </button>
             </div>

             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                © 2026 Vịt Học Academy • Personalized Learning Experience
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
