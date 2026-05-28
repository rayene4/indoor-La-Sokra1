/**
 * Google Sheets Configuration — Padel Indoor La Soukra
 *
 * SETUP (5 minutes) :
 * 1. Ouvrir https://sheets.google.com → créer une nouvelle feuille
 * 2. Nommer la feuille : "Reservations"
 * 3. Extensions → Apps Script → coller le code de APPS_SCRIPT.js → Enregistrer
 * 4. Déployer → Nouvelle déploiement → Application Web
 *    • Exécuter en tant que : Moi
 *    • Accès : Tout le monde
 * 5. Copier l'URL et la coller dans SCRIPT_URL ci-dessous
 */

export const SHEETS_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxNCp2PF4BrhNXZqcNclVNei6yL927-yaKZlrbsdWnbO7QGC6IFtVBRtXMImseajQWa/exec', 
}

export const isSheetsConfigured = SHEETS_CONFIG.SCRIPT_URL !== 'YOUR_SCRIPT_URL'
