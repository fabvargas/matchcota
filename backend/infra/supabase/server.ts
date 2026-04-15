import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in environment variables'
  )
}

// Cliente estándar respetando RLS
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
)

// Cliente administrativo opcional pra rignorar RLS
export const supabaseAdmin = supabaseSecretKey
  ? createClient(supabaseUrl, supabaseSecretKey)
  : null