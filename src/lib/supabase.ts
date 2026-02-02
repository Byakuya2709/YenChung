// filepath: src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase chưa được cấu hình. Vui lòng set VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env',
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
