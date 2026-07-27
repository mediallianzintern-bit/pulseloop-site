/**
 * PulseLoop — demo request collector.
 *
 * Paste this into Extensions → Apps Script on the Google Sheet that should
 * receive submissions, then Deploy → New deployment → Web app:
 *   Execute as:       Me
 *   Who has access:   Anyone
 * Copy the resulting /exec URL into the SHEET_WEBHOOK_URL env var on Vercel.
 *
 * Set SHARED_TOKEN below to any random string and add the identical value as
 * the SHEET_TOKEN env var on Vercel. That stops anyone who discovers the URL
 * from writing rows into your sheet.
 */

var SHARED_TOKEN = "CHANGE_ME_TO_A_RANDOM_STRING";

var HEADERS = [
  "Submitted at",
  "Name",
  "Work email",
  "Company",
  "Job title",
  "Company size",
  "Message",
  "Page",
];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (SHARED_TOKEN && payload.token !== SHARED_TOKEN) {
      return json({ ok: false, error: "unauthorised" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write the header row once, on the first submission.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.name || "",
      payload.email || "",
      payload.company || "",
      payload.title || "",
      payload.size || "",
      payload.message || "",
      payload.page || "",
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
