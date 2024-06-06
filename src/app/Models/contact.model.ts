export interface Contact {
  id: number;
  name: string;
  last_name?: string;
  company?: string;
  phones?: string[];
  emails?: string[];
  addresses?: string[];
  created_at?: string;
  updated_at?: string;
}
