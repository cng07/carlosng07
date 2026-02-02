// API route to track resume downloads and serve the PDF
// Uses CounterAPI v2 for counting

export const runtime = 'edge';

export async function GET(request) {
    const OWNER = 'carlos-ngs-team-2745';
    const COUNTER = 'carlosng07-portfolio-resume-downloads';
    const API_URL = 'https://api.counterapi.dev/v2';
    const timestamp = Date.now();

    try {
        // Increment the download counter
        const upRes = await fetch(`${API_URL}/${OWNER}/${COUNTER}/up?t=${timestamp}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.COUNTERAPI_API_KEY || ''}`
            }
        });
        
        if (!upRes.ok) {
            console.error('CounterAPI up response:', upRes.status, upRes.statusText);
        }

        // Get the download count
        const countRes = await fetch(`${API_URL}/${OWNER}/${COUNTER}?t=${timestamp}`, {
            headers: {
                'Authorization': `Bearer ${process.env.COUNTERAPI_API_KEY || ''}`
            }
        });
        
        let count = 0;
        if (countRes.ok) {
            const countData = await countRes.json();
            count = countData.count || 0;
        } else {
            console.error('CounterAPI count response:', countRes.status, countRes.statusText);
        }

        // Get base URL from request
        const url = new URL(request.url);
        const baseUrl = url.origin;

        // Return JSON with count and redirect URL
        return new Response(
            JSON.stringify({
                success: true,
                count: count,
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
                error: error.message,
                count: 0,
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
