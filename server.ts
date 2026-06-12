import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Lazy-loaded Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    geminiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      let ai;
      try {
        ai = getGeminiClient();
      } catch (err: any) {
        console.warn("Gemini client initialization failed, returning local helper mode:", err.message);
        return res.json({
          text: `Hello! I am BEE's virtual coordinator. It looks like the GEMINI_API_KEY has not been configured in Secrets yet, but I can still assist you. 

We specialize in bespoke weddings, luxury sangeets, professional catering tiers, and premium bollywood photography. Please use the interactive Packages & Itinerary Builder below to customize your services and estimate your budget in real time!`
        });
      }

      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: `You are BEE, the elite automated Virtual Event Coordinator for "The Blue Eye Events". 
Your voice, tone, and character are extremely professional, warm, refined, and concierge-like. You guide couples and clients through planning their dream celebrations (Weddings, Sangeets, Royal Receptions, and Beach ceremonies) in India or global destination settings.

Key information about The Blue Eye Events:
- **Founder & Philosophy**: We curate grand, emotionally-rich events with flawless design, spectacular catering, and cinematic photography. We do NOT compromise on aesthetic beauty.
- **Packages**:
  - *Classic Baseline*: Focuses on intimate celebrations with exquisite core essentials. (Coordination, baseline photography, and standard banquet elements)
  - *Royal Heritage*: Our most popular mid-tier option. Features hand-crafted floral decors, warm architectural uplighting, premium cinematic photography, and premium multi-cuisine catering.
  - *Majestic Signature*: Absolute pinnacle of event luxury. Complete custom design schemes, VIP styling, gourmet live-station buffet, dual-drone cinema coverage, and first-priority logistics.
- **Culinary & Catering**: Tiers include Standard (₹650/plate, 6 items included), Premium (₹1,200/plate, 8 items included), and Gourmet (₹1,850/plate, 10 items included). Users can fully customize their menus with dishes like Fresh Mint Mojito, Paneer Tikka, Chicken Malai Tikka, Dal Makhani Bukhara, Saffron Jalebi, and custom entered dishes. Note: Each extra dish beyond the cap adds ₹65/plate.
- **Interactive Menu Customizer**: Remind them they can craft their menu in Step 3 of our dynamic calculator page! They can select drinks, starters, mains, and desserts, or type in bespoke family recipes.
- **Actionable Advice**: Match your answers with our interactive estimator below. Offer to help them plan itineraries, select appropriate floral decors, or choose correct catering counts.

Respond with pristine, polite spacing and rich bullet points when presenting options. Do not use markdown titles (# or ##), instead use bold text. Keep answers conversational, extremely high-class, helpful, and under 150 words.`
        }
      });

      return res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      return res.status(500).json({ error: error.message || "Something went wrong in processing your event question." });
    }
  });

  // Vite middleware for development vs static asset serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
