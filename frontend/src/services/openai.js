import OpenAI from 'openai'

const LEGAL_SYSTEM_PROMPT = `You are a legal information assistant for AI startups. You provide INFORMATION ONLY - not legal advice. Always remind users to consult licensed attorneys for legal decisions. Help them understand concepts, organize workflows, and identify areas where they need professional legal help.

When discussing legal matters:
- Explain concepts clearly
- Point out complexity and risk areas
- Always conclude with "For your specific situation, consult a licensed attorney"
- Never say "you should" - instead say "companies typically" or "consider discussing with your attorney"
- Frame responses as informational and educational, not prescriptive`

// Get API key from environment variable
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey) {
  console.error('VITE_OPENAI_API_KEY is not set. Please add it to your environment variables.')
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Required for browser usage
})

export async function sendChatMessage(message, conversationHistory = []) {
  try {
    // Build messages array with system prompt and conversation history
    const messages = [
      { role: 'system', content: LEGAL_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      temperature: 0.7,
    })

    const aiMessage = completion.choices[0].message.content

    return {
      message: aiMessage,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: aiMessage }
      ]
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

