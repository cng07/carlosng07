// API route to serve PDF with download headers
// Forces browser to download instead of opening

export const runtime = 'edge';

export async function GET(request) {
    const url = new URL(request.url);
    const baseUrl = url.origin;
    const pdfUrl = `${baseUrl}/Carlos_Ng_Resume.pdf`;

    try {
        // Fetch the PDF
        const pdfRes = await fetch(pdfUrl);
        
        if (!pdfRes.ok) {
            throw new Error('Failed to fetch PDF');
        }

        const pdfBuffer = await pdfRes.arrayBuffer();
        const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

        // Return with Content-Disposition: attachment (forces download)
        return new Response(pdfBlob, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Carlos_Ng_Resume.pdf"',
                'Content-Length': pdfBlob.size.toString(),
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error serving PDF:', error);
        
        // Fallback: redirect to PDF
        return new Response(null, {
            status: 302,
            headers: {
                'Location': `${url.origin}/Carlos_Ng_Resume.pdf`
            }
        });
    }
}
