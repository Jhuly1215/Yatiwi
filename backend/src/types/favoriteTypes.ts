export interface Favorite {
  id: string;
  user_id: string;
  lesson_id: string;
  added_at?: Date;
}

export interface FavoriteCreate {
  id: string;
  user_id: string;
  lesson_id: string;
}
