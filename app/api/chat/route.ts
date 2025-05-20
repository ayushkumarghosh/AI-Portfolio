import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "")

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Prepare the chat history - filter out assistant messages at the beginning
    const processedMessages = [...messages]

    // If the first message is from the assistant, we need to handle it differently
    // since Gemini expects the first message to be from the user
    if (processedMessages.length > 0 && processedMessages[0].role === "assistant") {
      // Add a system prompt as context instead
      const systemPrompt = `You are Ayush's portfolio assistant. Your initial greeting was: "${processedMessages[0].content}" 
      You help users learn about Ayush Kumar Ghosh, a Software Developer at SAP Labs India with expertise in AI development, 
      full-stack development, and cross-platform mobile applications. Answer questions about his experience, skills, projects, 
      and education. Be helpful, concise, and friendly.`

      // Start a new chat without history
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt + "\n\nUser query: " + processedMessages[processedMessages.length - 1].content },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000,
        },
      })

      const response = result.response.text()
      return NextResponse.json({ response })
    } else {
      // Normal case - convert messages to Gemini format
      const history = processedMessages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

      // Start a chat session
      const chat = model.startChat({
        history,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000,
        },
      })

      // Get the latest user message
      const latestMessage = processedMessages[processedMessages.length - 1]

      // Send the message and get the response
      const result = await chat.sendMessage(latestMessage.content)
      const response = result.response.text()

      return NextResponse.json({ response })
    }
  } catch (error) {
    console.error("Error generating response:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
