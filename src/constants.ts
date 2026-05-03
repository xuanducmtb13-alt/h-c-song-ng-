import { Course } from './types';

export const COURSES: Course[] = [
  // --- CHINESE HSK SERIES ---
  {
    id: 'hsk-1',
    title: 'Tiếng Trung HSK 1',
    description: 'Bắt đầu từ con số 0 với 150 từ vựng và ngữ pháp cơ bản nhất.',
    price: 1000000,
    language: 'Chinese',
    level: 'Beginner',
    instructor: 'Ms. Ling',
    thumbnail: 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'h1l1', title: 'Bài 1: Chào hỏi', duration: '30 mins', content: 'Cách chào hỏi và giới thiệu tên.', exercises: [] },
      { id: 'h1l2', title: 'Bài 2: Gia đình', duration: '30 mins', content: 'Từ vựng về các thành viên trong gia đình.', exercises: [] }
    ]
  },
  {
    id: 'hsk-2',
    title: 'Tiếng Trung HSK 2',
    description: 'Mở rộng vốn từ lên 300 từ và giao tiếp được trong đời sống hàng ngày.',
    price: 1000000,
    language: 'Chinese',
    level: 'Beginner',
    instructor: 'Ms. Ling',
    thumbnail: 'https://images.unsplash.com/photo-1546706714-386b0a68d011?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'h2l1', title: 'Bài 1: Đi mua sắm', duration: '40 mins', content: 'Hỏi giá và các đơn vị tiền tệ.', exercises: [] }
    ]
  },
  {
    id: 'hsk-3',
    title: 'Tiếng Trung HSK 3',
    description: 'Trình độ trung cấp với 600 từ vựng, tự tin giao tiếp nhiều chủ đề.',
    price: 1000000,
    language: 'Chinese',
    level: 'Intermediate',
    instructor: 'Ms. Ling',
    thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'h3l1', title: 'Bài 1: Du lịch', duration: '45 mins', content: 'Lên kế hoạch và đặt vé tàu.', exercises: [] }
    ]
  },
  {
    id: 'hsk-4',
    title: 'Tiếng Trung HSK 4',
    description: 'Sử dụng tiếng Trung linh hoạt, thuyết trình và thảo luận chuyên sâu.',
    price: 1000000,
    language: 'Chinese',
    level: 'Intermediate',
    instructor: 'Master Chen',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    lessons: []
  },
  {
    id: 'hsk-5',
    title: 'Tiếng Trung HSK 5',
    description: 'Đọc hiểu báo chí, xem phim không cần sub và viết luận văn.',
    price: 1000000,
    language: 'Chinese',
    level: 'Advanced',
    instructor: 'Master Chen',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
    lessons: []
  },
  {
    id: 'hsk-6',
    title: 'Tiếng Trung HSK 6',
    description: 'Bậc thầy tiếng Trung, am hiểu văn hóa và thành ngữ chuyên sâu.',
    price: 1000000,
    language: 'Chinese',
    level: 'Advanced',
    instructor: 'Master Chen',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop',
    lessons: []
  },

  // --- FREE TRIAL COURSES ---
  {
    id: 'trial-zh-pinyin',
    title: 'Học Thử: Phát Âm Pinyin',
    description: 'Bí kíp phát âm vận mẫu, thanh mẫu và 4 thanh điệu chuẩn xác.',
    price: 0,
    language: 'Chinese',
    level: 'Beginner',
    instructor: 'Vịt AI',
    thumbnail: 'https://images.unsplash.com/photo-1544391496-1628f9a784d7?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'tzh1', title: 'Thanh điệu trong tiếng Trung', duration: '15 mins', content: 'Cách điều khiển luồng hơi để phát âm 4 thanh điệu.', exercises: [] },
      { id: 'tzh2', title: 'Vận mẫu và Thanh mẫu', duration: '20 mins', content: 'Làm quen với bảng chữ cái Pinyin.', exercises: [] }
    ]
  },
  {
    id: 'trial-zh-writing',
    title: 'Học Thử: Quy Tắc Bút Thuận',
    description: 'Nắm vững 8 nét cơ bản và quy tắc viết chữ Hán từ trái sang phải, trên xuống dưới.',
    price: 0,
    language: 'Chinese',
    level: 'Beginner',
    instructor: 'Vịt AI',
    thumbnail: 'https://images.unsplash.com/photo-1546255146-56275ccae407?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'tzh3', title: '8 Nét Cơ Bản', duration: '10 mins', content: 'Cách đặt bút và kết thúc nét.', exercises: [] },
      { id: 'tzh4', title: 'Thứ tự nét viết', duration: '15 mins', content: 'Quy tắc từ trên xuống dưới, trái sang phải.', exercises: [] }
    ]
  },
  {
    id: 'trial-zh-radicals',
    title: 'Học Thử: 50 Bộ Thủ Cơ Bản',
    description: 'Làm quen với cấu trúc chữ Hán thông qua các bộ thủ thông dụng nhất.',
    price: 0,
    language: 'Chinese',
    level: 'Beginner',
    instructor: 'Vịt AI',
    thumbnail: 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'tzh5', title: 'Bộ Thủ là gì?', duration: '10 mins', content: 'Giới thiệu về ý nghĩa của các bộ thủ.', exercises: [] }
    ]
  },
  {
    id: 'trial-en-alphabet',
    title: 'Học Thử: Bảng Chữ Cái & IPA',
    description: 'Phát âm chuẩn xác 44 âm trong bảng phiên âm quốc tế IPA.',
    price: 0,
    language: 'English',
    level: 'Beginner',
    instructor: 'Vịt AI',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'ten1', title: 'Alphabet & IPA', duration: '20 mins', content: 'Cách đọc bảng chữ cái và các ký hiệu IPA.', exercises: [] }
    ]
  },
  {
    id: 'trial-en-grammar',
    title: 'Học Thử: Ngữ Pháp Căn Bản',
    description: 'Nắm vững 3 thì đơn (Hiện tại, Quá khứ, Tương lai) và cấu trúc câu đơn.',
    price: 0,
    language: 'English',
    level: 'Beginner',
    instructor: 'Vịt AI',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 'ten2', title: '3 Thì Đơn Cơ Bản', duration: '30 mins', content: 'Present Simple, Past Simple, Future Simple.', exercises: [] }
    ]
  },

  // --- CHINESE COMMUNICATION ---
  {
    id: 'zh-comm-basic',
    title: 'Giao Tiếp Tiếng Trung Cơ Bản',
    description: 'Tập trung phản xạ nói trong các tình huống thực tế đời thường.',
    price: 750000,
    language: 'Chinese',
    level: 'Beginner',
    instructor: 'Teacher Ming',
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
    lessons: []
  },
  {
    id: 'zh-comm-adv',
    title: 'Giao Tiếp Tiếng Trung Nâng Cao',
    description: 'Giao tiếp chuyên nghiệp trong môi trường công sở và kinh doanh.',
    price: 1200000,
    language: 'Chinese',
    level: 'Advanced',
    instructor: 'Teacher Ming',
    thumbnail: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=800&auto=format&fit=crop',
    lessons: []
  },

  // --- TOEIC ENGLISH SERIES ---
  {
    id: 'toeic-starter',
    title: 'Luyện Thi TOEIC Starter (0 - 450)',
    description: 'Lấy lại căn bản ngữ pháp và làm quen với 7 phần trong đề thi TOEIC.',
    price: 850000,
    language: 'English',
    level: 'Beginner',
    instructor: 'Ms. Duckie',
    thumbnail: 'https://images.unsplash.com/photo-1434031211608-25002018a7d1?q=80&w=800&auto=format&fit=crop',
    lessons: [
      { id: 't1l1', title: 'Part 1: Mô tả hình ảnh', duration: '20 mins', content: 'Cách nhìn hình và dự đoán đáp án.', exercises: [] }
    ]
  },
  {
    id: 'toeic-bridge',
    title: 'Luyện Thi TOEIC Bridge (450 - 650)',
    description: 'Nâng cao kỹ năng Listening và Reading, mẹo giải đề nhanh.',
    price: 950000,
    language: 'English',
    level: 'Intermediate',
    instructor: 'Mr. Duck',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
    lessons: []
  },
  {
    id: 'toeic-master',
    title: 'Luyện Thi TOEIC Master (650 - 900+)',
    description: 'Chinh phục điểm số cao nhất với các đề thi thực tế và từ vựng chuyên sâu.',
    price: 1500000,
    language: 'English',
    level: 'Advanced',
    instructor: 'Mr. Duck',
    thumbnail: 'https://images.unsplash.com/photo-1543165796-5426273ea458?q=80&w=800&auto=format&fit=crop',
    lessons: []
  }
];

export const DUCK_QUOTES = [
  "Quack! Chào mừng đến với Vịt Học!",
  "Hôm nay bạn học gì thế? Quack quack!",
  "Cố lên, ngoại ngữ không khó như bạn nghĩ đâu!",
  "Học một ngôn ngữ mới là mở ra một thế giới mới!",
  "HSK 6 không khó nếu bạn có Vịt đồng hành!",
  "TOEIC 900+ nằm trong tầm tay bạn. Quack!"
];
