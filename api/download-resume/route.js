// API route to track resume downloads and serve the PDF
// Uses CounterAPI for counting and redirects to the actual PDF

export const runtime = 'edge';

export async function GET(request) {
    const NAMESPACE = 'carlosng07-portfolio';
    const API_URL = 'https://api.counterapi.dev/v1';
    const timestamp = Date.now();

    try {
        // Increment the download counter
        await fetch(`${API_URL}/${NAMESPACE}/resume-downloads/up?t=${timestamp}`);

        // Get the download count
        const countRes = await fetch(`${API_URL}/${NAMESPACE}/resume-downloads?t=${timestamp}`);
        const countData = await countRes.json();

        // Get base URL from request
        const url = new URL(request.url);
        const baseUrl = url.origin;

        // Return JSON with count and redirect URL
        return new Response(
            JSON.stringify({
                success: true,
                count: countData.count || 0,
                redirectUrl: `${baseUrl}/Carlos_Ng_Resume.pdf`
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    } catch (error) {
        console.error('Error tracking download:', error);
        
        // Return error but still provide redirect URL
        const url = new URL(request.url);
        const baseUrl = url.origin;
        
        return new Response(
            JSON.stringify({
                success: false,
                count: null,
                redirectUrl: `${baseUrl}/Carlos_Ng_Resume.pdf`
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
}
