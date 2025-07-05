export interface Achievement {
  id: string;
  code: string;
  title: Record<string, string>;
  description: Record<string, string>;
  icon_url: string;
  points: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface AchievementCreate extends Omit<Achievement, 'id' | 'created_at' | 'updated_at'> {}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at?: Date;
}

export interface UserAchievementCreate {
  id: string;
  user_id: string;
  achievement_id: string;
}
