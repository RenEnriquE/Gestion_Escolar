import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hnoooloxrbpovvcaxdhr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub29vbG94cmJwb3Z2Y2F4ZGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Mjk1OTIsImV4cCI6MjA5NDMwNTU5Mn0.KFCNOLU-9cjwsaGyrHy3a4jRzKG21PFZ_2PjetXk1Cg'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
