/**
 * Server-side PDF Export Implementation
 * 
 * This is a standalone Express server that handles PDF generation using Puppeteer.
 * Run with: node server/export.js
 * 
 * Requirements:
 * - npm install express puppeteer cors
 */

import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();
const PORT = process.env.EXPORT_PORT || 3001;
const APP_URL = process.env.APP_URL || 'http://localhost:5173';

// Middleware
app.use(cors());
app.use(express.json());

/**
 * POST /export/player/:id
 * 
 * Generates a PDF portfolio for the specified player
 * 
 * @param {string} id - Player ID
 * @returns {Buffer} PDF file
 */
app.post('/export/player/:id', async (req, res) => {
  let browser;
  
  try {
    console.log(`Generating PDF for player: ${req.params.id}`);
    
    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });
    
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // For higher DPI (300dpi equivalent)
    });
    
    // Navigate to player page with print parameter
    const url = `${APP_URL}/player/${req.params.id}?print=true`;
    console.log(`Navigating to: ${url}`);
    
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    
    // Wait for charts to render
    await page.waitForSelector('.recharts-wrapper', { timeout: 10000 });
    
    // Optional: Hide interactive elements for print
    await page.addStyleTag({
      content: `
        .no-print,
        button,
        header nav,
        footer a {
          display: none !important;
        }
      `,
    });
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      scale: 0.9, // Slight scale to fit more content
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
    });
    
    console.log(`PDF generated successfully (${pdf.length} bytes)`);
    
    // Set headers
    res.contentType('application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=player-${req.params.id}-portfolio.pdf`
    );
    res.setHeader('Content-Length', pdf.length);
    
    // Send PDF
    res.send(pdf);
    
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({
      error: 'PDF generation failed',
      message: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

/**
 * GET /export/status
 * 
 * Health check endpoint
 */
app.get('/export/status', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PDF Export Service',
    version: '1.0.0',
  });
});

/**
 * POST /export/batch
 * 
 * Generate PDFs for multiple players
 * 
 * @param {Array<string>} playerIds - Array of player IDs
 * @returns {Object} Status and download links
 */
app.post('/export/batch', async (req, res) => {
  const { playerIds } = req.body;
  
  if (!Array.isArray(playerIds) || playerIds.length === 0) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'playerIds must be a non-empty array',
    });
  }
  
  try {
    const results = [];
    
    for (const playerId of playerIds) {
      // In production, you'd queue these jobs
      console.log(`Processing player ${playerId}...`);
      results.push({
        playerId,
        status: 'queued',
      });
    }
    
    res.json({
      success: true,
      total: playerIds.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Batch export failed',
      message: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  PDF Export Service Running                                ║
║  Port: ${PORT}                                              ║
║  App URL: ${APP_URL}                                        ║
║                                                            ║
║  Endpoints:                                                ║
║  - POST /export/player/:id                                 ║
║  - GET  /export/status                                     ║
║  - POST /export/batch                                      ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

/**
 * Example usage:
 * 
 * curl -X POST http://localhost:3001/export/player/player-001 \
 *   --output player-portfolio.pdf
 * 
 * Or from JavaScript:
 * 
 * const response = await fetch('http://localhost:3001/export/player/player-001', {
 *   method: 'POST',
 * });
 * const blob = await response.blob();
 * const url = URL.createObjectURL(blob);
 * const a = document.createElement('a');
 * a.href = url;
 * a.download = 'portfolio.pdf';
 * a.click();
 */
