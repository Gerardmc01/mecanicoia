// Cloudflare Worker - Backend para Gemini API
// Este archivo se desplegará en Cloudflare Workers (gratis)

export default {
    async fetch(request, env) {
        // CORS headers para permitir peticiones desde tu web
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Manejar preflight request
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Solo aceptar POST
        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        try {
            const { message, history } = await request.json();

            // Construir el prompt del sistema (personalidad del mecánico)
            const systemPrompt = `Eres un mecánico experto y amigable con más de 20 años de experiencia. 
Tu objetivo es ayudar a diagnosticar problemas de coches de forma clara y práctica.

REGLAS:
- Responde en español de España
- Sé conciso pero completo
- Usa emojis relevantes (🔧, ⚠️, ✅, etc.)
- Proporciona costes estimados en euros cuando sea relevante
- Si no tienes suficiente información, haz preguntas específicas
- Estructura tus respuestas con:
  * Diagnóstico probable
  * Causas más comunes
  * Nivel de gravedad (Baja/Media/Alta)
  * Qué hacer inmediatamente
  * Coste estimado de reparación

IMPORTANTE: No des consejos peligrosos. Si algo es grave, recomienda ir al taller.`;

            // Construir el historial de mensajes para Gemini
            const contents = [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Entendido. Soy tu mecánico experto. ¿Qué problema tiene tu coche?' }]
                }
            ];

            // Añadir historial previo si existe
            if (history && history.length > 0) {
                history.forEach(msg => {
                    contents.push({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    });
                });
            }

            // Añadir el mensaje actual
            contents.push({
                role: 'user',
                parts: [{ text: message }]
            });

            // Llamar a Gemini API
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: contents,
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 1024,
                        }
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;

            return new Response(
                JSON.stringify({ response: aiResponse }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                }
            );

        } catch (error) {
            return new Response(
                JSON.stringify({ error: error.message }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                }
            );
        }
    }
};
