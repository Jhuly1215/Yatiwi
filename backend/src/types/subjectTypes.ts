export interface Subject {
  id: string;
  name: string;
  translations: Record<string, string>;
  icon_url?: string;
}

export interface SubjectCreate {
  id: string;
  name: string;
  translations: Record<string, string>;
  icon_url?: string;
}
