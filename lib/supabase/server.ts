import { createClient } from '@supabase/supabase-js'
import { createServerClient as createSsrClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { publicConfig } from '@/lib/config'
import type { Database } from './types'

export function createBrowserClient() {
  return createClient<Database>(publicConfig.supabase.url, publicConfig.supabase.anonKey)
}
export async function createServerComponentClient() {
  const cookieStore = await cookies()
  return createSsrClient<Database>(publicConfig.supabase.url, publicConfig.supabase.anonKey, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => { cookieStore.set(name, value, options) }) } catch {}
      },
    },
  })
}
export function createServiceClient() {
  const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']
  if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  return createClient<Database>(publicConfig.supabase.url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
}
