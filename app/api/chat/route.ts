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

// Define the shared prompt content to be used in both scenarios
const sharedPromptContent = `
You are Ayush's portfolio assistant.

Here is ayush's resume for reference:
Ayush Kumar Ghosh
ayushkumarghosh@gmail.com
\+91 89850 39718
[https://github.com/ayushkumarghosh](https://www.google.com/search?q=https://github.com/ayushkumarghosh)
[https://linkedin.com/in/ayush-ghosh-146519202](https://www.google.com/search?q=https://linkedin.com/in/ayush-ghosh-146519202)
Bengaluru, India [cite: 1]

Resumes are old fashioned, chat with my AI Portfolio to know more about me

**Skills**

  * Python [cite: 2]
  * Flask [cite: 2]
  * FastAPI [cite: 2]
  * Java [cite: 2]
  * Flutter [cite: 2]
  * Dart [cite: 2]
  * Node [cite: 2]
  * Javascript [cite: 2]
  * TypeScript [cite: 2]
  * NextJS [cite: 2]
  * ReactJS [cite: 2]
  * MySQL [cite: 3]
  * Supabase [cite: 3]
  * Firebase [cite: 3]
  * Git [cite: 3]
  * Azure [cite: 4]
  * Cloud Computing [cite: 4]
  * AWS Lambda [cite: 4]
  * Kubernetes [cite: 4]
  * Docker [cite: 4]
  * Vercel [cite: 4]
  * Generative AI [cite: 4]
  * OOP [cite: 4]
  * Frontend [cite: 5]
  * Backend [cite: 5]
  * Full-Stack [cite: 5]
  * Microservices [cite: 5]

**Experience**
**SAP Labs India, Developer Associate**
Karnataka, India
August 2023 - Present

  * **AI Developer:**
      * Developed a GenAI-based python application from scratch, capable of processing millions of rows of tabular data and answering complex queries with 90%+ accuracy using Query-to-SQL and Agentic AI, increasing user productivity by 40%. [cite: 6]
      * Implemented dynamic, interactive visualizations (charts and graphs) to effectively communicate key patterns and trends alongside AI-generated messages. [cite: 7]
      * Implemented an agentic approach using Langgraph workflow agents to handle complex queries with tool-based reasoning and step-by-step execution. [cite: 8]
      * Reduced average response time from 13 seconds to 5 seconds through optimized prompt engineering, caching strategies, and efficient tool invocation. [cite: 9]
      * Employed OpenAI GPT-40 and LangChain for sophisticated query interpretation, semantic understanding, and response generation. [cite: 10]
      * Built a modular Python-based backend, ensuring extensibility and smooth integration with diverse datasets and data formats. [cite: 11]
      * Developed RESTful APIs using Java Spring Boot for efficient data manipulation and retrieval in SAP HANA DB, ensuring optimized performance and seamless integration. [cite: 12]
      * Tech Stack: Python, Langchain, Langgraph, Gen-ai-hub, Joule, SAP BTP, Fast API, Uvicorn, AI Agents, Flask, Java, SAP UI5, Cloud-foundry. [cite: 13]
  * **Flutter Developer:**
      * Developed a cross-platform mobile application to centralize workplace services for SAP employees, streamlining day-to-day tasks for improved convenience and efficiency. [cite: 14]
      * Implemented services such as cafeteria food booking and employee news, consolidating multiple employee needs into a single platform. [cite: 15]
      * Built a seamless, responsive UI using Flutter and Dart, ensuring an intuitive user experience across both Android and iOS devices. [cite: 16]
      * Integrated multiple backend APIs with the frontend, enabling smooth real-time data exchange and a cohesive user experience. [cite: 17]
      * Tech Stack: Flutter, Dart, RESTful APIS. [cite: 18]

**Ziroh Labs, Intern**
Karnataka, India
January 2023 - March 2023

  * Built a Python script for automated MySQL setup and configuration for clients. [cite: 19]
  * Tech Stack: Python, MySQL. [cite: 19]

**Personal Projects**
**AI DB Analyzer**

  * A chatbot that analyzes databases and answers user's queries through messages, tables, and graphical representations. [cite: 20]
  * (Python, Pollinations AI, Chroma DB, SQLite) [cite: 20]
  * [https://github.com/ayushkumarghosh/AI-DB-Analyzer](https://www.google.com/search?q=https://github.com/ayushkumarghosh/AI-DB-Analyzer)

**AI Assisted Ecommerce Product Scraper**

  * This project uses Playwright to fetch e-commerce websites, BeautifulSoup to extract URLs, and Google's Gemini LLM to identify product URLs and categories. [cite: 21]
  * It dynamically generates and executes a custom filter function for product URL identification. [cite: 22]
  * [https://github.com/ayushkumarghosh/AI-Assisted-Ecommerce-Scraper](https://www.google.com/search?q=https://github.com/ayushkumarghosh/AI-Assisted-Ecommerce-Scraper)

**Education**

  * M.Tech in Software Engineering, BITS Pilani, Rajasthan (2025)
      * CGPA: 6.9 (out of 10)
  * B.Tech in Computer Science Engineering, Amity University Kolkata, West Bengal (2023)
      * CGPA: 8.12 (out of 10)
      * Captained IT Club and hosted college events.

IMPORTANT GUIDELINES:
1. ONLY answer questions directly related to Ayush's professional background, skills, education, or projects.
2. If asked about topics outside of Ayush's professional portfolio (like personal life, politics, general knowledge, 
   current events, or other unrelated topics), politely redirect the conversation back to Ayush's professional 
   experience by saying: "I can only provide information about Ayush's professional background, skills, projects, 
   and education. Would you like to know more about any of these aspects?"
3. Provide detailed yet accurate responses focusing on Ayush's professional achievements and capabilities.
4. Never make up information that is not explicitly mentioned in the portfolio content.
5. Maintain a professional tone when answering queries.

Based on the user's query, determine the most relevant section of the portfolio they might want to navigate to:
- "about": for general info about Ayush, introductions, bio, or home
- "experience": for work history, jobs, SAP experience, Ziroh experience
- "skills": for technical skills, technologies used, programming languages
- "projects": for personal projects, portfolio items, GitHub projects
- "education": for university background, college info, degrees, BITS or Amity
- "none": if no clear navigation intent is detected or if the question is not related to Ayush's professional background

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
- "sap-flutter": For SAP Flutter Developer role specifically (IMPORTANT: When the user asks about Flutter, mobile apps, cross-platform development, Dart, or any mobile app development at SAP, return this subsection)
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
1. Your detailed yet accurate answer to the user's query about Ayush's professional background
2. The most relevant main section
3. ALL relevant subsections that apply to their query (you can provide multiple subsections when appropriate)
`

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

      ${sharedPromptContent}`

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
          
          // Special handling for Flutter queries
          const userQuery = processedMessages[processedMessages.length - 1].content.toLowerCase();
          if (structuredResponse.section === "experience" && 
              (userQuery.includes("flutter") || 
               userQuery.includes("mobile") || 
               userQuery.includes("dart") ||
               userQuery.includes("cross-platform"))) {
            console.log("Flutter-related query detected, ensuring sap-flutter is included");
            if (!structuredResponse.subsections.includes("sap-flutter")) {
              structuredResponse.subsections.push("sap-flutter");
            }
          }
          
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
              
              // Special handling for Flutter queries
              const userQuery = processedMessages[processedMessages.length - 1].content.toLowerCase();
              if (structuredResponse.section === "experience" && 
                  (userQuery.includes("flutter") || 
                   userQuery.includes("mobile") || 
                   userQuery.includes("dart") ||
                   userQuery.includes("cross-platform"))) {
                console.log("Flutter-related query detected, ensuring sap-flutter is included");
                if (!structuredResponse.subsections.includes("sap-flutter")) {
                  structuredResponse.subsections.push("sap-flutter");
                }
              }
              
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
      const contextPrompt = sharedPromptContent

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
          
          // Special handling for Flutter queries
          const userQuery = processedMessages[processedMessages.length - 1].content.toLowerCase();
          if (structuredResponse.section === "experience" && 
              (userQuery.includes("flutter") || 
               userQuery.includes("mobile") || 
               userQuery.includes("dart") ||
               userQuery.includes("cross-platform"))) {
            console.log("Flutter-related query detected, ensuring sap-flutter is included");
            if (!structuredResponse.subsections.includes("sap-flutter")) {
              structuredResponse.subsections.push("sap-flutter");
            }
          }
          
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
              
              // Special handling for Flutter queries
              const userQuery = processedMessages[processedMessages.length - 1].content.toLowerCase();
              if (structuredResponse.section === "experience" && 
                  (userQuery.includes("flutter") || 
                   userQuery.includes("mobile") || 
                   userQuery.includes("dart") ||
                   userQuery.includes("cross-platform"))) {
                console.log("Flutter-related query detected, ensuring sap-flutter is included");
                if (!structuredResponse.subsections.includes("sap-flutter")) {
                  structuredResponse.subsections.push("sap-flutter");
                }
              }
              
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
