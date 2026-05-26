/**
 * EmailJS Configuration — Padel Indoor La Soukra
 *
 * SETUP STEPS:
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
 * 3. Create an Email Template with these variables:
 *      {{client_name}}   — nom du client
 *      {{client_phone}}  — téléphone
 *      {{booking_date}}  — date
 *      {{booking_time}}  — heure
 *      {{court_name}}    — terrain choisi
 *      {{to_email}}      — email admin (auto-filled)
 * 4. Copy the Template ID and your Public Key
 * 5. Replace the placeholders below with your real values
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID:  'service_e8lxs0r',   // e.g. 'service_abc123'
  TEMPLATE_ID: 'template_p6km1ao',
  PUBLIC_KEY:  'Gmozdr4zDaX4Wo706',   // e.g. 'abcDEFghiJKL...'
  ADMIN_EMAIL: 'rayenemhirsi8@gmail.com', // email qui reçoit les réservations
}
