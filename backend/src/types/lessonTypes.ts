export interface Lesson {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  subject_id: string;
  tags: string[];
  level: number;
  author_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface LessonCreate {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  subject_id: string;
  tags: string[];
  level: number;
  author_id: string;
}
