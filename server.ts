import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DEFAULT_SURF_CONDITIONS, MOCK_VIDEOS, MOCK_SPONSORS, MOCK_EVENTS, AVATAR_PROFILES } from './src/data/mockData.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get current surf & bar conditions
  app.get('/api/surf-conditions', (req, res) => {
    res.json({
      status: 'success',
      conditions: DEFAULT_SURF_CONDITIONS,
      avatarProfile: AVATAR_PROFILES,
      timestamp: new Date().toISOString()
    });
  });

  // API Route: Get videos list
  app.get('/api/videos', (req, res) => {
    res.json({
      status: 'success',
      videos: MOCK_VIDEOS
    });
  });

  // API Route: Get sponsors list
  app.get('/api/sponsors', (req, res) => {
    res.json({
      status: 'success',
      sponsors: MOCK_SPONSORS
    });
  });

  // API Route: Get events list
  app.get('/api/events', (req, res) => {
    res.json({
      status: 'success',
      events: MOCK_EVENTS
    });
  });

  // API Route: Sponsor / Advertiser Inquiry
  app.post('/api/sponsor-inquire', (req, res) => {
    const { name, businessName, email, phone, partnershipType, message } = req.body || {};
    if (!name || !email || !businessName) {
      return res.status(400).json({
        error: 'Please provide name, business name, and email.'
      });
    }

    console.log(`[PWBC Partner Inquiry] New lead from ${businessName} (${name} - ${email}) - Type: ${partnershipType}`);

    res.json({
      success: true,
      message: `Kia ora ${name}! Thank you for your interest in partnering with Port Waikato Boardriders Club. Our sponsorship coordinator will reach out shortly.`,
      referenceCode: `PWBC-SPON-${Math.floor(100000 + Math.random() * 900000)}`
    });
  });

  // API Route: Interactive AI Avatar Surf Host Assistant powered by Gemini API
  app.post('/api/avatar-ai', async (req, res) => {
    try {
      const { userQuery, userLevel, spot } = req.body || {};
      const apiKey = process.env.GEMINI_API_KEY;

      if (!userQuery) {
        return res.status(400).json({ error: 'Please provide a query.' });
      }

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback intelligent response if GEMINI_API_KEY is not set or placeholder
        const fallbackAnswers: Record<string, string> = {
          default: "Kia ora! Mana here from Port Waikato Boardriders. Today Sunset Beach has clean 2.0-2.5m SW groundswell with offshore ESE winds. Out at the river mouth bar, remember to watch out for the ebb tide sweep and check Coastguard VHF 64 if crossing!",
          bar: "Kia ora! Crossing the Port Waikato River Mouth Bar is high risk during an outgoing tide. Always wait for slack high tide, check visual markers, wear lifejackets if boating, and stay clear of heavy break channels on soft foamies or paddleboards.",
          beginner: "Kia ora grom! For beginners, Sunset Beach inside corner on a 1.2m day with rising tide is your best bet. Avoid the main river mouth channel and always surf with a buddy!",
          membership: "Kia ora! You can join the Port Waikato Boardriders Club right here on our site! Membership gives you entry to monthly comps, 15% discounts at local surf shapers, and access to club gear."
        };

        let responseText = fallbackAnswers.default;
        const qLower = userQuery.toLowerCase();
        if (qLower.includes('bar') || qLower.includes('safety') || qLower.includes('river')) responseText = fallbackAnswers.bar;
        else if (qLower.includes('beginner') || qLower.includes('learn') || qLower.includes('easy')) responseText = fallbackAnswers.beginner;
        else if (qLower.includes('join') || qLower.includes('member') || qLower.includes('sponsor')) responseText = fallbackAnswers.membership;

        return res.json({
          reply: responseText,
          source: 'local-host-mode',
          avatarState: 'friendly'
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Mana, the friendly local Kiwi surf guide and host avatar for the Port Waikato Boardriders Club (PWBC) in Port Waikato, New Zealand.
Your vibe: Welcoming, authentic West Coast surfer, safety-focused, knowledgeable about Sunset Beach, the Waikato River mouth bar, swells, tides, currents, and local Kiwi culture. Use natural Kiwi greetings like "Kia ora", "chur", "team", "line-up", "grom".

Current Surf Conditions context:
- Spot: Port Waikato Bar & Sunset Beach
- Swell: 2.2m SW Groundswell, 13.8s period
- Wind: 10 knots Offshore ESE
- Bar Hazard Level: Moderate (River mouth ebb tide sweep caution)
- Water Temp: 16°C
- Tide: High Tide 11:15 AM

User Query: "${userQuery}"
User Skill Level (if specified): "${userLevel || 'Intermediate'}"
Target Spot (if specified): "${spot || 'Sunset Beach'}"

Give a concise, helpful, and enthusiastic 2-3 sentence answer as Mana. Always highlight ocean safety if relevant to the bar or river mouth.`;

      const geminiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const replyText = geminiResponse.text || "Kia ora! The surf is looking mint today at Sunset Beach. Keep an eye on the bar conditions!";

      res.json({
        reply: replyText,
        source: 'gemini-ai',
        avatarState: 'enthusiastic'
      });
    } catch (err: any) {
      console.error('Error calling Gemini API for avatar:', err?.message || err);
      res.json({
        reply: "Kia ora! Mana here. Today's swell is 2.2m SW at Sunset Beach with offshore winds. Remember to check bar conditions before heading out!",
        source: 'fallback-safety',
        avatarState: 'standard'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Port Waikato Boardriders Club server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
