# Frontend Setup Instructions

## Install Dependencies

You need to install the new `html2pdf.js` dependency:

```bash
cd frontend
npm install
# or if using yarn
yarn install
```

## What Changed

1. **Removed backend PDF generation** - No longer calls `/api/download-pdf`
2. **Added html2pdf.js** - Generates PDF directly in browser
3. **Better formatting** - PDF now matches the editor view exactly
4. **Letter size** - PDF is properly formatted as 8.5" x 11" with margins

## Benefits

✅ No backend API call needed for PDF download
✅ PDF looks exactly like the editor preview
✅ Faster download (no network round-trip)
✅ Works offline once page is loaded
✅ Proper letter-size formatting with margins

## Start Development Server

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`
