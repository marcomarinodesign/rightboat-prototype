import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Lazy singleton — client is created only on first call, never at module load time.
// This prevents @supabase/supabase-js from throwing "supabaseUrl is required"
// when NEXT_PUBLIC_* env vars are absent (e.g. during local dev without .env.local).
let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
    )
  }
  _client = createClient(url, key)
  return _client
}
