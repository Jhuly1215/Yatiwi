export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: string;
  progress_percent: number;
  last_accessed?: Date;
  score?: number;
}

export interface LessonProgressCreate {
  id: string;
  user_id: string;
  lesson_id: string;
  status: string;
  progress_percent: number;
  score?: number;
}
