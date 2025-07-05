export interface Download {
  id: string;
  user_id: string;
  material_id: string;
  version: string;
  local_path: string;
  downloaded_at?: Date;
}

export interface DownloadCreate {
  id: string;
  user_id: string;
  material_id: string;
  version: string;
  local_path: string;
}
