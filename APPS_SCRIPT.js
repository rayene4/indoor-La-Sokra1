// ============================================================
// Padel Indoor La Soukra — Google Apps Script
// Instructions :
//   1. Ouvrir votre Google Sheet
//   2. Extensions → Apps Script
//   3. Coller ce code entier → Enregistrer (Ctrl+S)
//   4. Déployer → Nouvelle déploiement → Application Web
//      • Exécuter en tant que : Moi
//      • Accès : Tout le monde
//   5. Copier l'URL → la mettre dans sheets.config.ts
// ============================================================

const SHEET_NAME = 'Reservations'

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(['Date', 'Heure', 'Terrain ID', 'Terrain', 'Nom', 'Téléphone', 'Créé le'])
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold')
  }
  return sheet
}

function doGet(e) {
  const action = e.parameter.action || 'getBookings'

  if (action === 'getBookings') {
    const sheet = getOrCreateSheet()
    const date = e.parameter.date
    const courtId = parseInt(e.parameter.courtId)

    const data = sheet.getDataRange().getValues()
    const times = data.slice(1)
      .filter(row => row[0] === date && parseInt(row[2]) === courtId)
      .map(row => row[1])

    return ContentService
      .createTextOutput(JSON.stringify({ times }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  if (action === 'book') {
    const sheet = getOrCreateSheet()
    const date      = e.parameter.date
    const time      = e.parameter.time
    const courtId   = parseInt(e.parameter.courtId)
    const courtName = e.parameter.courtName
    const clientName  = e.parameter.clientName
    const clientPhone = e.parameter.clientPhone

    // Check for duplicate
    const data = sheet.getDataRange().getValues()
    const alreadyBooked = data.slice(1).some(
      row => row[0] === date && row[1] === time && parseInt(row[2]) === courtId
    )
    if (alreadyBooked) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'SLOT_TAKEN' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    sheet.appendRow([
      date, time, courtId, courtName, clientName, clientPhone,
      new Date().toLocaleString('fr-FR')
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON)
}
