function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing required environment variable: ${key}`)
  return value
}
function optionalEnv(key: string, fallback = ''): string {
  return process.env[key] ?? fallback
}
export const publicConfig = {
  siteUrl: optionalEnv('NEXT_PUBLIC_SITE_URL', 'https://riverslodge.com'),
  plausibleDomain: optionalEnv('NEXT_PUBLIC_PLAUSIBLE_DOMAIN', 'riverslodge.com'),
  clerk: { publishableKey: optionalEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY') },
  supabase: { url: optionalEnv('NEXT_PUBLIC_SUPABASE_URL'), anonKey: optionalEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') },
  sanity: { projectId: optionalEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'), dataset: optionalEnv('NEXT_PUBLIC_SANITY_DATASET', 'production'), apiVersion: optionalEnv('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01') },
  mux: { heroPlaybackId: optionalEnv('NEXT_PUBLIC_MUX_HERO_PLAYBACK_ID') },
  cloudflare: { accountHash: optionalEnv('NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH') },
  stripe: { publishableKey: optionalEnv('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY') },
} as const
export function getServerConfig() {
  return {
    clerk: { secretKey: requireEnv('CLERK_SECRET_KEY'), webhookSecret: requireEnv('CLERK_WEBHOOK_SECRET') },
    supabase: { serviceRoleKey: requireEnv('SUPABASE_SERVICE_ROLE_KEY') },
    sanity: { apiToken: requireEnv('SANITY_API_TOKEN'), webhookSecret: requireEnv('SANITY_WEBHOOK_SECRET') },
    mux: { tokenId: requireEnv('MUX_TOKEN_ID'), tokenSecret: requireEnv('MUX_TOKEN_SECRET') },
    resend: { apiKey: requireEnv('RESEND_API_KEY'), fromEmail: optionalEnv('RESEND_FROM_EMAIL', 'noreply@riverslodge.com'), staffEmail: optionalEnv('RESEND_STAFF_EMAIL', 'info@riverslodge.com') },
    stripe: { secretKey: requireEnv('STRIPE_SECRET_KEY'), webhookSecret: requireEnv('STRIPE_WEBHOOK_SECRET') },
  } as const
}
