/**
 * Supabase Configuration — Padel Indoor La Soukra
 *
 * SETUP (5 min) :
 * 1. Créer un compte gratuit sur https://supabase.com
 * 2. Nouveau projet → noter l'URL et la clé anon
 * 3. Dans l'éditeur SQL, exécuter ce script :
 *
 *    CREATE TABLE bookings (
 *      id          TEXT PRIMARY KEY,
 *      date        TEXT NOT NULL,
 *      time        TEXT NOT NULL,
 *      court_id    INTEGER NOT NULL,
 *      court_name  TEXT,
 *      client_name TEXT,
 *      client_phone TEXT,
 *      created_at  TIMESTAMPTZ DEFAULT NOW()
 *    );
 *
 *    -- Autoriser lecture et écriture publique
 *    ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
 *    CREATE POLICY "public select" ON bookings FOR SELECT USING (true);
 *    CREATE POLICY "public insert" ON bookings FOR INSERT WITH CHECK (true);
 *
 * 4. Remplacer les valeurs ci-dessous (Settings → API)
 */

export const SUPABASE_CONFIG = {
  URL:      'YOUR_SUPABASE_URL',   // https://xxxx.supabase.co
  ANON_KEY: 'YOUR_ANON_KEY',       // eyJhbGciOiJIUzI1...
}

export const isSupabaseConfigured = SUPABASE_CONFIG.URL !== 'YOUR_SUPABASE_URL'
