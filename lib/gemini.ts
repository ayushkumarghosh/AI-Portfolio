"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function generateChatResponse(previousMessages: ChatMessage[], userMessage: string): Promise<string> {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" })

    // Prepare the chat history
    const history = previousMessages.map((msg) => ({
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

    // Send the message and get the response
    const result = await chat.sendMessage(userMessage)
    const response = result.response.text()

    return response
  } catch (error) {
    console.error("Error generating response:", error)
    return "Sorry, I encountered an error while processing your request. Please try again."
  }
}
