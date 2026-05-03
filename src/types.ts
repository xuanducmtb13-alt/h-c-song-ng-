export type Role = 'Administrator' | 'Staff' | 'Learner';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  progress: Record<string, number>; // courseId -> completion percentage
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  language: 'English' | 'Chinese';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  lessons: Lesson[];
  instructor: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'text';
}

export type View = 
  | 'home' 
  | 'courses' 
  | 'course-details' 
  | 'placement-test' 
  | 'cart' 
  | 'checkout' 
  | 'dashboard' 
  | 'auth' 
  | 'admin'
  | 'contact';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CartItem {
  courseId: string;
  title: string;
  price: number;
  thumbnail: string;
}
