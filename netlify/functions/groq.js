export default async (req) => {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
  
    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return new Response(
        JSON.stringify({ error: { message: 'GROQ_API_KEY not set on server' } }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    const body = await req.text();
  
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body
    });
  
    return new Response(await res.text(), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' }
    });
  };