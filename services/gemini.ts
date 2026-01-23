
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are 'Sahabat Umrah', an expert AI travel assistant for an Indonesian Umrah and Hajj agency.
Your goals:
1. Help users understand Umrah and Hajj requirements (visa, documents, health).
2. Answer questions about specific travel packages.
3. Provide guidance on rituals (Manasik).
4. Provide location information for hotels, mosques, and historical sites in Saudi Arabia using Google Maps data.
5. Maintain a polite, helpful, and professional tone in Indonesian (Bahasa Indonesia).

Available packages summary:
- Umrah Syawal (9 days, 28.5jt)
- Umrah + Turkiye (12 days, 35jt)
- Umrah Ramadhan (15 days, 32jt)
- Haji Furoda (25 days, 250jt)

When users ask for locations or directions, use your Google Maps tool to provide accurate links and context.
`;

export async function askAssistant(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ googleMaps: {} }],
      },
    });

    let output = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks && chunks.length > 0) {
      output += "\n\n**Referensi Lokasi:**\n";
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          output += `- [${chunk.maps.title}](${chunk.maps.uri})\n`;
        }
      });
    }

    return output;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, saya sedang mengalami kendala teknis. Silakan coba lagi nanti.";
  }
}
