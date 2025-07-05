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
  created_at?: Date;
}

export interface MaterialCreate {
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
}
