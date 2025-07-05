export interface User {
  id: string;
  email: string;
  hashed_password: string;
  type: 'student' | 'teacher';
  name: string;
  selected_language: string;
  profile_image_url?: string;
  settings?: string;
  created_at?: Date;
  last_login?: Date;
}

export interface UserCreate {
  id: string;
  email: string;
  hashed_password: string;
  type: 'student' | 'teacher';
  name: string;
  selected_language: string;
}
