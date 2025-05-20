import { GoogleGenerativeAI, Schema } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "")

// Define the response schema
const responseSchema = {
  type: "object",
  properties: {
    response: {
      type: "string",
      description: "The response to the user's query"
    },
    section: {
      type: "string",
      description: "The most relevant section to navigate to",
      enum: ["about", "experience", "skills", "projects", "education", "none"]
    }
  },
  required: ["response", "section"],
  propertyOrdering: ["response", "section"]
}

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
      and education. Be helpful, concise, and friendly.

      Based on the user's query, determine the most relevant section of the portfolio they might want to navigate to:
      - "about": for general info about Ayush, introductions, bio, or home
      - "experience": for work history, jobs, SAP experience, Ziroh experience
      - "skills": for technical skills, technologies used, programming languages
      - "projects": for personal projects, portfolio items, GitHub projects
      - "education": for university background, college info, degrees, BITS or Amity
      - "none": if no clear navigation intent is detected

      Your response should include both your answer and the relevant section.`

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
          responseMimeType: "application/json",
          responseSchema: responseSchema as Schema,
        },
      })

      const structuredResponse = JSON.parse(result.response.text())
      return NextResponse.json(structuredResponse)
    } else {
      // Normal case - convert messages to Gemini format
      const history = processedMessages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

      // Add context for structured output in the prompt
      const contextPrompt = `
      You are Ayush's portfolio assistant.
      Based on the user's query, determine the most relevant section of the portfolio they might want to navigate to:
      - "about": for general info about Ayush, introductions, bio, or home
      - "experience": for work history, jobs, SAP experience, Ziroh experience
      - "skills": for technical skills, technologies used, programming languages
      - "projects": for personal projects, portfolio items, GitHub projects
      - "education": for university background, college info, degrees, BITS or Amity
      - "none": if no clear navigation intent is detected

      Your response should include both your answer and the relevant section.
      `

      // Get the latest user message
      const latestMessage = processedMessages[processedMessages.length - 1]

      // Send the message and get the response with structured output
      const result = await model.generateContent({
        contents: [
          ...history,
          {
            role: "user",
            parts: [{ text: contextPrompt + "\n\nUser query: " + latestMessage.content }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000,
          responseMimeType: "application/json", 
          responseSchema: responseSchema as Schema,
        },
      })

      const structuredResponse = JSON.parse(result.response.text())
      return NextResponse.json(structuredResponse)
    }
  } catch (error) {
    console.error("Error generating response:", error)
    return NextResponse.json({ 
      response: "Sorry, I encountered an error. Please try again.",
      section: "none"
    }, { status: 200 })
  }
}
