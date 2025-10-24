import React from 'react';
import { Button } from './ui/button';
import { Download, FileText } from 'lucide-react';
import { Card } from './ui/card';

interface PDFExportProps {
  playerId: string;
  playerName: string;
}

export function PDFExport({ playerId, playerName }: PDFExportProps) {
  const handleExport = async () => {
    // In a real implementation, this would call the backend endpoint
    // POST /export/player/{id}
    // The backend would use Puppeteer to render the page and generate PDF
    
    console.log('PDF Export initiated for player:', playerId);
    
    // Mock implementation - would be replaced with actual API call
    alert(
      `PDF Export Feature\n\n` +
      `In production, this would:\n` +
      `1. Call POST /export/player/${playerId}\n` +
      `2. Server renders this page with print CSS\n` +
      `3. Puppeteer generates 300dpi PDF\n` +
      `4. Returns downloadable PDF file\n\n` +
      `Implementation requires Node.js backend with:\n` +
      `- Express.js server\n` +
      `- Puppeteer for PDF generation\n` +
      `- Print-optimized CSS\n` +
      `- 1-page layout optimization`
    );
    
    // Actual implementation would look like:
    /*
    try {
      const response = await fetch(`/export/player/${playerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${playerName.replace(/\s/g, '_')}_Portfolio.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('PDF export failed:', error);
    }
    */
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-[#0E6B64]/5 to-[#FF6B6B]/5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0E6B64]" aria-hidden="true" />
            <h3 className="text-[#253858]">Export Portfolio</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Download a professional PDF report (300dpi, 1-page)
          </p>
        </div>
        
        <Button
          onClick={handleExport}
          className="bg-[#0E6B64] hover:bg-[#0E6B64]/90"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" aria-hidden="true" />
          Download PDF
        </Button>
      </div>

      {/* Technical Details */}
      <div className="mt-4 pt-4 border-t text-xs text-muted-foreground space-y-1">
        <p><strong>Backend Implementation Required:</strong></p>
        <ul className="list-disc list-inside space-y-0.5 ml-2">
          <li>Endpoint: POST /export/player/{`{id}`}</li>
          <li>Puppeteer renders page with print.css</li>
          <li>Output: PDF (300dpi, A4, single page)</li>
          <li>Includes all charts and statistics</li>
        </ul>
      </div>
    </Card>
  );
}

/**
 * Print CSS (to be added to globals.css or separate print.css file)
 * 
 * @media print {
 *   @page {
 *     size: A4;
 *     margin: 1cm;
 *   }
 *   
 *   body {
 *     print-color-adjust: exact;
 *     -webkit-print-color-adjust: exact;
 *   }
 *   
 *   .no-print {
 *     display: none !important;
 *   }
 *   
 *   .page-break {
 *     page-break-after: always;
 *   }
 *   
 *   // Optimize charts for print
 *   .recharts-wrapper {
 *     max-height: 200px !important;
 *   }
 * }
 */

/**
 * Server-side Puppeteer implementation example:
 * 
 * import puppeteer from 'puppeteer';
 * 
 * app.post('/export/player/:id', async (req, res) => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   
 *   await page.goto(`${process.env.APP_URL}/player/${req.params.id}?print=true`, {
 *     waitUntil: 'networkidle0'
 *   });
 *   
 *   const pdf = await page.pdf({
 *     format: 'A4',
 *     printBackground: true,
 *     scale: 1,
 *     preferCSSPageSize: true,
 *   });
 *   
 *   await browser.close();
 *   
 *   res.contentType('application/pdf');
 *   res.send(pdf);
 * });
 */
