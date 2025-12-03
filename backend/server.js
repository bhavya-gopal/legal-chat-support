import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from backend directory
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Validate API key on startup
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ ERROR: OPENAI_API_KEY is not set in .env file');
  console.error('Please create a .env file in the backend directory with:');
  console.error('OPENAI_API_KEY=your_actual_api_key_here');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('✅ OpenAI API key loaded successfully');

const LEGAL_SYSTEM_PROMPT = `You are a legal information assistant for AI startups. You provide INFORMATION ONLY - not legal advice. Always remind users to consult licensed attorneys for legal decisions. Help them understand concepts, organize workflows, and identify areas where they need professional legal help.

When discussing legal matters:
- Explain concepts clearly
- Point out complexity and risk areas
- Always conclude with "For your specific situation, consult a licensed attorney"
- Never say "you should" - instead say "companies typically" or "consider discussing with your attorney"
- Frame responses as informational and educational, not prescriptive`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build messages array with system prompt and conversation history
    const messages = [
      { role: 'system', content: LEGAL_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      temperature: 0.7,
    });

    const aiMessage = completion.choices[0].message.content;

    res.json({
      message: aiMessage,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: aiMessage }
      ]
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error.response) {
      res.status(error.response.status).json({ 
        error: 'OpenAI API error', 
        details: error.response.data 
      });
    } else if (error.message.includes('API key')) {
      res.status(500).json({ 
        error: 'API key configuration error. Please check your .env file.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to process chat message. Please try again.' 
      });
    }
  }
});

app.listen(port, () => {
  console.log(`✅ Backend server running on http://localhost:${port}`);
});

