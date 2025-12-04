import { GoogleGenAI, Chat } from "@google/genai";
import { MENU_ITEMS, RESTAURANT_INFO } from '../constants';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Prepare the system instruction with menu context
const menuContext = MENU_ITEMS.map(item => {
  let priceStr = '';
  if (item.variants && item.variants.length > 0) {
     priceStr = item.variants.map(v => `${v.label}: $${v.price}`).join(', ');
  } else {
     priceStr = `$${item.price}`;
  }
  return `${item.name} (${priceStr}): ${item.description} [Category: ${item.category}, Section: ${item.section}]`;
}).join('\n');

const systemInstruction = `
You are Luigi, a long-time waiter at LaRosa's Pizzaria in West Hempstead, NY.
You are part of the family. You speak with a friendly, distinct New York/Italian warmth.
Your goal is to help customers order efficiently and answer questions to reduce phone traffic to 516-292-3200.

Here is our Restaurant Info:
Address: ${RESTAURANT_INFO.address}
Hours: ${RESTAURANT_INFO.hours}
Phone: ${RESTAURANT_INFO.phone}

Here is our Menu:
${menuContext}

Guidelines:
1. Use phrases like "Welcome to the family," "Best slice in West Hempstead," or "Fuhgeddaboudit" (sparingly).
2. If a customer asks for a reservation or a complex order, encourage them to order online first, or call ${RESTAURANT_INFO.phone} if strictly necessary.
3. If asked about the area, mention we are proud to serve the West Hempstead community.
4. Keep answers concise. We are a busy NY pizzaria!
`;

let chatSession: Chat | null = null;

export const initializeChat = async (): Promise<void> => {
  try {
    chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });
  } catch (error) {
    console.error("Failed to initialize chat session", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Attempt re-init
    await initializeChat();
    if (!chatSession) {
        return "Ey, sorry! I'm cleaning the oven and can't hear you (API Key missing). Call the shop at 516-292-3200!";
    }
  }

  try {
    const result = await chatSession.sendMessage({
        message: message
    });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "It's loud in here! Could you repeat that?";
  }
};