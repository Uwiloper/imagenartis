import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteSectionRow {
  id: string;
  name: string;
  category: string;
  data: Record<string, any>;
  updated_at: string;
}

export interface LeadQuoteRow {
  id?: string;
  client_name: string;
  phone: string;
  service?: string;
  message?: string;
  source?: string;
  status?: string;
  created_at?: string;
}
