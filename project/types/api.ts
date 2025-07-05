// types/api.ts

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'student' | 'teacher';
  selected_language: string;
  profile_image_url?: string;
  created_at: string;
  last_login?: string;
}

export interface Subject {
  id: string;
  name: string;
  translations: Record<string, string>;
  icon_url: string;
}

export interface Lesson {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  subject_id: string;
  tags: string[];
  level: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Material {
  id: string;
  lesson_id: string;
  type: 'video' | 'audio' | 'text' | 'pdf';
  language: string;
  url: string;
  format: string;
  size: number;
  version: string;
  order: number;
  checksum: string;
  created_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: string;
  progress_percent: number;
  last_accessed: string;
  score?: number;
}

export interface Question {
  id: string;
  lesson_id: string;
  text: Record<string, string>;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options: string[];
  order: number;
}

export interface Favorite {
  id: string;
  user_id: string;
  lesson_id: string;
  added_at: string;
}

export interface Download {
  id: string;
  user_id: string;
  material_id: string;
  version: string;
  local_path: string;
  downloaded_at: string;
}

export interface ProgressDay {
  id: string;
  user_id: string;
  date: string;
  time_spent: number;
  lessons_completed: number;
  points_earned: number;
  current_streak: number;
}

export interface Achievement {
  id: string;
  code: string;
  title: Record<string, string>;
  description: Record<string, string>;
  icon_url: string;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}
