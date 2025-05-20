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
    },
    subsections: {
      type: "array",
      description: "An array of relevant subsections within the page to highlight",
      items: {
        type: "string"
      }
    }
  },
  required: ["response", "section"],
  propertyOrdering: ["response", "section", "subsections"]
}

// Valid subsection IDs by section for reference:
// about: profile, bio, expertise, ai-expertise, fullstack-expertise, mobile-expertise
// experience: sap, sap-ai, sap-flutter, ziroh
// skills: languages, databases, cloud, dev-practices, ai-ml
// projects: ai-analyzer, ai-live
// education: masters, bachelors

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Get the model with a more reliable configuration
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-preview-04-17",
    })

    // Helper function to handle empty responses by falling back to unstructured generation
    async function handleEmptyResponseFallback(prompt: string) {
      console.log("Attempting fallback generation without schema...");
      
      // Create a model without response schema for fallback
      const fallbackModel = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash-preview-04-17",
      });
      
      try {
        // Try a simple generation
        const fallbackResult = await fallbackModel.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt + "\n\nPlease respond in a JSON format with the following structure: { response: 'your answer here', section: 'relevant section name or none', subsections: ['relevant subsection names'] }" }] }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            maxOutputTokens: 1000,
          },
        });
        
        const fallbackText = fallbackResult.response.text();
        console.log("Fallback generation result:", fallbackText);
        
        // Try to extract JSON from the text response
        const jsonRegex = /\{[\s\S]*?\}/;
        const match = fallbackText.match(jsonRegex);
        
        if (match && match[0]) {
          try {
            const extractedJson = JSON.parse(match[0]);
            return extractedJson;
          } catch (e) {
            // If parsing fails, create a structured response from the text
            return {
              response: fallbackText,
              section: "none",
              subsections: []
            };
          }
        } else {
          return {
            response: fallbackText,
            section: "none",
            subsections: []
          };
        }
      } catch (fallbackError) {
        console.error("Fallback generation failed:", fallbackError);
        return {
          response: "I'm having trouble processing your request. Please try again later.",
          section: "none",
          subsections: []
        };
      }
    }

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
      
      Then, identify ALL relevant subsections within that page that relate to the user's query. You can return multiple subsections if the query relates to multiple areas.

      For the About/Home page, available subsections are:
      - "profile": For profile information, contact details, and social links
      - "bio": For the About Me section with professional summary
      - "expertise": For the overall expertise areas section
      - "ai-expertise": For AI Development expertise specifically  
      - "fullstack-expertise": For Full-Stack Development expertise specifically
      - "mobile-expertise": For Mobile App Development expertise specifically

      For the Experience page, available subsections are:
      - "sap": For SAP Labs experience in general
      - "sap-ai": For SAP AI Developer role specifically  
      - "sap-flutter": For SAP Flutter Developer role specifically
      - "ziroh": For Ziroh Labs internship experience
      
      For the Skills page, available subsections are:
      - "languages": For Programming Languages & Frameworks (Python, Flask, Java, Flutter, etc.)
      - "databases": For Databases & Tools (MySQL, Firebase, Git, Docker, etc.)
      - "cloud": For Cloud & AI skills (Azure, AWS, Generative AI, etc.)
      - "dev-practices": For Development Practices (Agile, CI/CD, Microservices, etc.)
      - "ai-ml": For AI & Machine Learning skills (LangChain, LangGraph, etc.)
      
      For the Projects page, available subsections are:
      - "ai-analyzer": For the AI DB Analyzer project (chatbot for database analysis)
      - "ai-live": For the AI Live project (imitation of Google AI studio's live stream)

      For the Education page, available subsections are:
      - "masters": For M.Tech in Software Engineering from BITS Pilani
      - "bachelors": For B.Tech in Computer Science Engineering from Amity University

      In your response, include:
      1. Your answer to the user's query
      2. The most relevant main section
      3. ALL relevant subsections that apply to their query (you can provide multiple subsections when appropriate)`

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
          maxOutputTokens: 10000,
          responseMimeType: "application/json",
          responseSchema: responseSchema as Schema,
        },
      })

      // Log the raw response to help debug
      console.log("Raw candidate response (first case):", JSON.stringify(result.response.candidates?.[0]?.content));
      
      try {
        // Access the response text properly
        const responseText = result.response.text();
        console.log("Response text (first case):", responseText);
        
        // Check if the response is empty
        if (!responseText || responseText.trim() === '') {
          console.warn("Empty response from Gemini API");
          
          // Try fallback approach 
          const fallbackResponse = await handleEmptyResponseFallback(
            systemPrompt + "\n\nUser query: " + processedMessages[processedMessages.length - 1].content
          );
          
          return NextResponse.json(fallbackResponse);
        }
        
        // Try to parse the JSON
        const structuredResponse = JSON.parse(responseText);
        console.log("Parsed structured response (direct):", structuredResponse);
        
        // Ensure subsections is always an array
        if (!structuredResponse.subsections) {
          structuredResponse.subsections = [];
        } else if (!Array.isArray(structuredResponse.subsections)) {
          structuredResponse.subsections = [structuredResponse.subsections];
        }
        
        // Log which valid IDs are expected for the selected section
        const sectionMap = {
          about: ["profile", "bio", "expertise", "ai-expertise", "fullstack-expertise", "mobile-expertise"],
          experience: ["sap", "sap-ai", "sap-flutter", "ziroh"],
          skills: ["languages", "databases", "cloud", "dev-practices", "ai-ml"],
          projects: ["ai-analyzer", "ai-live"],
          education: ["masters", "bachelors"]
        };
        
        if (structuredResponse.section && structuredResponse.section !== "none") {
          const validIds = sectionMap[structuredResponse.section as keyof typeof sectionMap] || [];
          console.log(`Valid IDs for section "${structuredResponse.section}":`, validIds);
          console.log("Matching subsections:", 
            structuredResponse.subsections.filter((id: string) => validIds.includes(id))
          );
        }
        
        console.log("Final structured response (direct):", structuredResponse);
        return NextResponse.json(structuredResponse);
      } catch (parseError) {
        console.error("Failed to parse JSON response (first case):", parseError);
        
        // Try an alternative approach - extract the JSON from the raw response
        try {
          // Get the candidate's content directly
          const candidateContent = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
          console.log("Candidate content (first case):", candidateContent);
          
          if (candidateContent) {
            const structuredResponse = JSON.parse(candidateContent);
            console.log("Parsed structured response:", structuredResponse);
            
            // Ensure subsections is always an array
            if (!structuredResponse.subsections) {
              structuredResponse.subsections = [];
            } else if (!Array.isArray(structuredResponse.subsections)) {
              structuredResponse.subsections = [structuredResponse.subsections];
            }
            
            // Log which valid IDs are expected for the selected section
            const sectionMap = {
              about: ["profile", "bio", "expertise", "ai-expertise", "fullstack-expertise", "mobile-expertise"],
              experience: ["sap", "sap-ai", "sap-flutter", "ziroh"],
              skills: ["languages", "databases", "cloud", "dev-practices", "ai-ml"],
              projects: ["ai-analyzer", "ai-live"],
              education: ["masters", "bachelors"]
            };
            
            if (structuredResponse.section && structuredResponse.section !== "none") {
              const validIds = sectionMap[structuredResponse.section as keyof typeof sectionMap] || [];
              console.log(`Valid IDs for section "${structuredResponse.section}":`, validIds);
              console.log("Matching subsections:", 
                structuredResponse.subsections.filter((id: string) => validIds.includes(id))
              );
            }
            
            console.log("Final structured response:", structuredResponse);
            return NextResponse.json(structuredResponse);
          } else {
            throw new Error("No candidate content available");
          }
        } catch (secondError) {
          console.error("Second parsing attempt failed (first case):", secondError);
          
          // Return a fallback response
          return NextResponse.json({ 
            response: "Sorry, I encountered an error processing your request. Please try again.",
            section: "none",
            subsections: []
          }, { status: 200 });
        }
      }
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

      Then, identify ALL relevant subsections within that page that relate to the user's query. You can return multiple subsections if the query relates to multiple areas.

      For the About/Home page, available subsections are:
      - "profile": For profile information, contact details, and social links
      - "bio": For the About Me section with professional summary
      - "expertise": For the overall expertise areas section
      - "ai-expertise": For AI Development expertise specifically  
      - "fullstack-expertise": For Full-Stack Development expertise specifically
      - "mobile-expertise": For Mobile App Development expertise specifically

      For the Experience page, available subsections are:
      - "sap": For SAP Labs experience in general
      - "sap-ai": For SAP AI Developer role specifically  
      - "sap-flutter": For SAP Flutter Developer role specifically
      - "ziroh": For Ziroh Labs internship experience
      
      For the Skills page, available subsections are:
      - "languages": For Programming Languages & Frameworks (Python, Flask, Java, Flutter, etc.)
      - "databases": For Databases & Tools (MySQL, Firebase, Git, Docker, etc.)
      - "cloud": For Cloud & AI skills (Azure, AWS, Generative AI, etc.)
      - "dev-practices": For Development Practices (Agile, CI/CD, Microservices, etc.)
      - "ai-ml": For AI & Machine Learning skills (LangChain, LangGraph, etc.)
      
      For the Projects page, available subsections are:
      - "ai-analyzer": For the AI DB Analyzer project (chatbot for database analysis)
      - "ai-live": For the AI Live project (imitation of Google AI studio's live stream)

      For the Education page, available subsections are:
      - "masters": For M.Tech in Software Engineering from BITS Pilani
      - "bachelors": For B.Tech in Computer Science Engineering from Amity University
      
      In your response, include:
      1. Your answer to the user's query
      2. The most relevant main section
      3. ALL relevant subsections that apply to their query (you can provide multiple subsections when appropriate)
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
          maxOutputTokens: 10000,
          responseMimeType: "application/json", 
          responseSchema: responseSchema as Schema,
        },
      })

      // Log the raw response to help debug
      console.log("Raw candidate response:", JSON.stringify(result.response.candidates?.[0]?.content));
      
      try {
        // Access the response text properly
        const responseText = result.response.text();
        console.log("Response text:", responseText);
        
        // Check if the response is empty
        if (!responseText || responseText.trim() === '') {
          console.warn("Empty response from Gemini API");
          
          // Try fallback approach
          const fallbackResponse = await handleEmptyResponseFallback(
            contextPrompt + "\n\nUser query: " + latestMessage.content
          );
          
          return NextResponse.json(fallbackResponse);
        }
        
        // Try to parse the JSON
        const structuredResponse = JSON.parse(responseText);
        console.log("Parsed structured response (direct):", structuredResponse);
        
        // Ensure subsections is always an array
        if (!structuredResponse.subsections) {
          structuredResponse.subsections = [];
        } else if (!Array.isArray(structuredResponse.subsections)) {
          structuredResponse.subsections = [structuredResponse.subsections];
        }
        
        // Log which valid IDs are expected for the selected section
        const sectionMap = {
          about: ["profile", "bio", "expertise", "ai-expertise", "fullstack-expertise", "mobile-expertise"],
          experience: ["sap", "sap-ai", "sap-flutter", "ziroh"],
          skills: ["languages", "databases", "cloud", "dev-practices", "ai-ml"],
          projects: ["ai-analyzer", "ai-live"],
          education: ["masters", "bachelors"]
        };
        
        if (structuredResponse.section && structuredResponse.section !== "none") {
          const validIds = sectionMap[structuredResponse.section as keyof typeof sectionMap] || [];
          console.log(`Valid IDs for section "${structuredResponse.section}":`, validIds);
          console.log("Matching subsections:", 
            structuredResponse.subsections.filter((id: string) => validIds.includes(id))
          );
        }
        
        console.log("Final structured response (direct):", structuredResponse);
        return NextResponse.json(structuredResponse);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        
        // Try an alternative approach - extract the JSON from the raw response
        try {
          // Get the candidate's content directly
          const candidateContent = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
          console.log("Candidate content:", candidateContent);
          
          if (candidateContent) {
            const structuredResponse = JSON.parse(candidateContent);
            console.log("Parsed structured response:", structuredResponse);
            
            // Ensure subsections is always an array
            if (!structuredResponse.subsections) {
              structuredResponse.subsections = [];
            } else if (!Array.isArray(structuredResponse.subsections)) {
              structuredResponse.subsections = [structuredResponse.subsections];
            }
            
            // Log which valid IDs are expected for the selected section
            const sectionMap = {
              about: ["profile", "bio", "expertise", "ai-expertise", "fullstack-expertise", "mobile-expertise"],
              experience: ["sap", "sap-ai", "sap-flutter", "ziroh"],
              skills: ["languages", "databases", "cloud", "dev-practices", "ai-ml"],
              projects: ["ai-analyzer", "ai-live"],
              education: ["masters", "bachelors"]
            };
            
            if (structuredResponse.section && structuredResponse.section !== "none") {
              const validIds = sectionMap[structuredResponse.section as keyof typeof sectionMap] || [];
              console.log(`Valid IDs for section "${structuredResponse.section}":`, validIds);
              console.log("Matching subsections:", 
                structuredResponse.subsections.filter((id: string) => validIds.includes(id))
              );
            }
            
            console.log("Final structured response:", structuredResponse);
            return NextResponse.json(structuredResponse);
          } else {
            throw new Error("No candidate content available");
          }
        } catch (secondError) {
          console.error("Second parsing attempt failed:", secondError);
          
          // Return a fallback response
          return NextResponse.json({ 
            response: "Sorry, I encountered an error processing your request. Please try again.",
            section: "none",
            subsections: []
          }, { status: 200 });
        }
      }
    }
  } catch (error) {
    console.error("Error generating response:", error)
    return NextResponse.json({ 
      response: "Sorry, I encountered an error. Please try again.",
      section: "none",
      subsections: []
    }, { status: 200 })
  }
}
