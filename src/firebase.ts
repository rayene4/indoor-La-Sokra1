/**
 * Firebase Configuration — Padel Indoor La Soukra
 *
 * SETUP (5 min) :
 * 1. Aller sur https://console.firebase.google.com
 * 2. Créer un projet → "Padel Indoor La Soukra"
 * 3. Ajouter une app Web (</>) → copier firebaseConfig
 * 4. Dans le menu : Build → Firestore Database → Créer la base (mode test)
 * 5. Remplacer les valeurs ci-dessous par les vôtres
 */

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const FIREBASE_CONFIG = {
  apiKey:            'YOUR_API_KEY',
  authDomain:        'YOUR_AUTH_DOMAIN',
  projectId:         'YOUR_PROJECT_ID',
  storageBucket:     'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId:             'YOUR_APP_ID',
}

export const isFirebaseConfigured = FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY'

const app = isFirebaseConfigured ? initializeApp(FIREBASE_CONFIG) : null
export const db = isFirebaseConfigured ? getFirestore(app!) : null
