import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuaqgwdqpyesnxxisldg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YXFnd2RxcHllc254eGlzbGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQ2NDQsImV4cCI6MjA3Nzc0MDY0NH0.5oFmZVizaK8nDgybMTYZ2jUAkiXa5m7Hie8XNjLo7U8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
