export interface Progress {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  time_spent: number;
  lessons_completed: number;
  points_earned: number;
  current_streak: number;
}

export interface ProgressCreate extends Omit<Progress, 'id'> {}
