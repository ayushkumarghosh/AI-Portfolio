import { GoogleGenerativeAI, Schema } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"
import { generateText, extractAssistantResponse, type Message as PollinationsMessage } from "../../../lib/pollinations"

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

AI-Assisted Ecommerce Scraper
A sophisticated web scraper powered by AI that extracts product data from various e-commerce websites. It incorporates Named Entity Recognition (NER) to identify product attributes and uses machine learning for adaptive navigation through different website structures. The tool handles product listings, pricing, specifications, reviews, and availability data while automatically bypassing anti-scraping measures.

Habit Tracker
A minimalist yet powerful application for tracking daily habits and building consistent routines. Users can define custom habits, set schedules, view streak statistics, and receive motivational reminders. The app features clean data visualization with progress graphs and heatmaps showing consistency patterns, helping users maintain accountability and achieve personal development goals.

Recipe Finder
A user-friendly web application that helps people discover recipes based on ingredients they already have. Users can input available ingredients and dietary preferences to get personalized recipe suggestions with detailed instructions. The app integrates with external recipe APIs, allows saving favorites, and includes features like nutritional information and cooking time estimates.

Kanban Task Board
A visual project management tool based on the Kanban methodology that helps teams track work progress through customizable boards. Features include drag-and-drop task management, work-in-progress limits, task prioritization, due dates, and team member assignment. The board provides visual cues for workflow bottlenecks and helps optimize productivity.

Expense Splitter
A practical application that simplifies expense sharing among friends, roommates, or travel groups. Users can create groups, add expenses, specify who paid what and who owes whom, and the app automatically calculates the optimal settlement plan to minimize transactions. It includes features for receipt scanning, expense categorization, and payment tracking.

AI Daily Planner
A smart productivity tool that uses artificial intelligence to help users optimize their daily schedules. The planner learns from user patterns to suggest optimal task arrangements, prioritize activities based on energy levels and deadlines, and block focused work sessions. It integrates with calendar systems and adapts recommendations based on past productivity data.

AI Meeting Summary Tool
A specialized application that leverages AI to automatically transcribe meeting recordings, extract key discussion points, decisions, and action items. The tool identifies speakers, categorizes topics, highlights important moments, and generates concise, shareable summaries. It supports integration with popular meeting platforms and task management systems.

AI-Powered Markdown Blog
A modern blogging platform built around the Markdown format with AI enhancements throughout the writing process. The platform offers smart content suggestions, SEO optimization recommendations, automated image generation for articles, and readability analysis. It includes features like scheduled publishing, version history, and social sharing integration.

Blog CMS Frontend
A versatile content management system frontend designed specifically for blog platforms with an emphasis on user experience and design flexibility. The interface supports rich text editing, media library management, draft previewing, and content scheduling. It features customizable themes, SEO tools, multi-author support, and comprehensive analytics.

Expense Tracker API
A comprehensive RESTful API for financial tracking applications that handles expense recording, categorization, and analysis. The API supports features like budget setting, recurring transactions, multi-currency support, and financial report generation. It includes robust authentication, data validation, and integration endpoints for third-party financial services.

GitHub Profile Visualizer
A data visualization tool that transforms GitHub user data into meaningful visual representations. The application shows contribution patterns, repository statistics, language usage, and collaboration networks through interactive charts and graphs. Users can generate shareable profile cards and identify their strongest skills based on commit history.

Notes App Backend
A scalable backend service designed for note-taking applications with features for organizing, searching, and sharing notes. The system supports rich text formatting, file attachments, tagging, and full-text search capabilities. It includes user authentication, note versioning, and secure sharing controls.

Personal Knowledge Base
A digital knowledge management system designed to serve as an external brain for storing and retrieving information. The application allows users to create interconnected notes with bidirectional linking, tag classification, and dynamic knowledge graph visualization. It supports various media types and includes powerful search capabilities.

Resume Analyzer
An AI-powered tool that helps job seekers optimize their resumes by analyzing content against job descriptions. The application identifies missing keywords, suggests skill additions, evaluates ATS compatibility, and recommends structural improvements. It includes features for comparing resume versions and tracking application performance.

URL Shortener
A full-featured URL shortening service with extensive analytics capabilities. Beyond basic link shortening, the service offers click tracking, geographic analytics, device statistics, and referrer data. Users can create custom short links, set expiration dates, and password-protect links for additional security.

Webhook Listener
A flexible infrastructure component that receives and processes webhook events from third-party services. The application validates incoming payloads, routes events to appropriate handlers, retries failed deliveries, and provides detailed logs for debugging. It supports custom transformations and integrates with various notification systems.

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
- "ai-ecommerce-scraper": For the AI-Assisted Ecommerce Scraper project
- "habit-tracker": For the Habit Tracker project
- "recipe-finder": For the Recipe Finder project
- "kanban-task-board": For the Kanban Task Board project
- "expense-splitter": For the Expense Splitter project
- "ai-daily-planner": For the AI Daily Planner project
- "ai-meeting-summary-tool": For the AI Meeting Summary Tool project
- "ai-powered-markdown-blog": For the AI-Powered Markdown Blog project
- "blog-cms-frontend": For the Blog CMS Frontend project
- "expense-tracker-api": For the Expense Tracker API project
- "github-profile-visualizer": For the GitHub Profile Visualizer project
- "notes-app-backend": For the Notes App Backend project
- "personal-knowledge-base": For the Personal Knowledge Base project
- "resume-analyzer": For the Resume Analyzer project
- "url-shortener": For the URL Shortener project
- "webhook-listener": For the Webhook Listener project

For the Education page, available subsections are:
- "masters": For M.Tech in Software Engineering from BITS Pilani
- "bachelors": For B.Tech in Computer Science Engineering from Amity University

VERY IMPORTANT: When you mention a specific project in your response (like "AI Daily Planner", "Habit Tracker", etc.), you MUST include the corresponding project ID in the subsections array. For example, if you discuss the AI Daily Planner, include "ai-daily-planner" in the subsections array. This is critical for proper page navigation and highlighting.

In your response, include:
1. Your detailed yet accurate answer to the user's query about Ayush's professional background
2. Go through all the main sections and choose only the most relevant main section
3. ALL relevant subsections under that main section that apply to their query (you can provide multiple subsections when appropriate)
`

// Valid subsection IDs by section for reference:
// about: profile, bio, expertise, ai-expertise, fullstack-expertise, mobile-expertise
// experience: sap, sap-ai, sap-flutter, ziroh
// skills: languages, databases, cloud, dev-practices, ai-ml
// projects: ai-analyzer, ai-live, ai-ecommerce-scraper, habit-tracker, recipe-finder, kanban-task-board, 
// expense-splitter, ai-daily-planner, ai-meeting-summary-tool, ai-powered-markdown-blog, 
// blog-cms-frontend, expense-tracker-api, github-profile-visualizer, notes-app-backend, 
// personal-knowledge-base, resume-analyzer, url-shortener, webhook-listener
// education: masters, bachelors

export async function POST(request: NextRequest) {
  // Create a clone of the request that we can use in the catch block if needed
  const requestClone = request.clone();
  
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Get the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-preview-05-20",
    })

    // Helper function to handle empty responses by falling back to unstructured generation
    async function handleEmptyResponseFallback(prompt: string) {
      console.log("Attempting fallback generation using Pollinations API...");
      
      try {
        // Extract the user query from the prompt
        const userQueryMatch = prompt.match(/User query: (.*)$/);
        const userQuery = userQueryMatch ? userQueryMatch[1] : prompt;
        
        // Create system message with the portfolio context
        const systemMessage: PollinationsMessage = {
          role: "system",
          content: `${sharedPromptContent}\nYou are Ayush's portfolio assistant. Answer the user's question about Ayush's professional background.
          
IMPORTANT: You must format your response as a valid JSON object with these exact fields:
{
  "response": "Your detailed answer to the user's query",
  "section": "most_relevant_section_name", // one of: about, experience, skills, projects, education, none
  "subsections": ["subsection1", "subsection2"] // array of relevant subsection IDs
}

DO NOT use "answer" or "main_section" fields. Use "response" and "section" instead.`
        };
        
        // Create the user message
        const userMessage: PollinationsMessage = {
          role: "user",
          content: userQuery
        };
        
        // Call Pollinations API
        const result = await generateText([systemMessage, userMessage]);
        const responseText = extractAssistantResponse(result);
        
        console.log("Pollinations API fallback result:", responseText);
        
        if (!responseText) {
          return {
            response: "I'm having trouble processing your request. Please try again later.",
            section: "none",
            subsections: []
          };
        }
        
        // Try to extract structured data if response includes JSON
        const jsonRegex = /\{[\s\S]*?\}/;
        const match = responseText.match(jsonRegex);
        
        if (match && match[0]) {
          try {
            const extractedJson = JSON.parse(match[0]);
            // Map field names if they don't match expected schema
            return {
              response: extractedJson.response || extractedJson.answer || responseText,
              section: extractedJson.section || extractedJson.main_section || "none",
              subsections: Array.isArray(extractedJson.subsections) ? extractedJson.subsections : []
            };
          } catch (e) {
            // If parsing fails, create a structured response from the text
            return {
              response: responseText,
              section: "none",
              subsections: []
            };
          }
        } else {
          return {
            response: responseText,
            section: "none",
            subsections: []
          };
        }
      } catch (fallbackError) {
        console.error("Pollinations API fallback failed:", fallbackError);
        return {
          response: "I'm having trouble processing your request. Please try again later.",
          section: "none",
          subsections: []
        };
      }
    }

    // Process the messages to Gemini format
    const processedMessages = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }))

    // Check if we need to include the initial greeting
    const systemInstruction = processedMessages[0]?.role === "model" ? 
      `You are Ayush's portfolio assistant. Your initial greeting was: "${processedMessages[0].parts[0].text}" 
      You help users learn about Ayush Kumar Ghosh, a Software Developer at SAP Labs India with expertise in AI development, 
      full-stack development, and cross-platform mobile applications.` : "";

    try {
      // For history, filter out any assistant messages at the beginning
      // Google GenAI requires the first message to be from a user
      let historyMessages = processedMessages.slice(0, -1);
      
      // Filter out leading assistant/model messages
      while (historyMessages.length > 0 && historyMessages[0].role === "model") {
        historyMessages.shift();
      }
      
      // If there are no user messages in history, don't use history
      const useHistory = historyMessages.length > 0;
      
      // Create a chat session with history using the Google GenAI library
      const chat = model.startChat({
        history: useHistory ? historyMessages : undefined,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 10000,
          responseMimeType: "application/json",
          responseSchema: responseSchema as Schema,
        },
      });

      // Get the latest user message
      const latestMessage = processedMessages[processedMessages.length - 1];
      
      // Ensure the latest message is actually a user message
      if (latestMessage.role !== "user") {
        return NextResponse.json({ 
          response: "I can only process messages from users. Please send a query as a user.",
          section: "none",
          subsections: []
        }, { status: 400 });
      }
      
      // Create the prompt with context for structured output
      const contextPrompt = `${systemInstruction}\n${sharedPromptContent}\n\nUser query: ${latestMessage.parts[0].text}`;
      
      // Send the message
      const result = await chat.sendMessage(contextPrompt);
      
      // Log the raw response to help debug
      console.log("Raw response:", result);
      
      try {
        // Access the response text properly
        const responseText = result.response.text();
        console.log("Response text:", responseText);
        
        // Check if the response is empty
        if (!responseText || responseText.trim() === '') {
          console.warn("Empty response from Gemini API");
          
          // Try fallback approach
          const fallbackResponse = await handleEmptyResponseFallback(contextPrompt);
          return NextResponse.json(fallbackResponse);
        }
        
        // Try to parse the JSON
        const structuredResponse = JSON.parse(responseText);
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
          projects: [
            "ai-analyzer", 
            "ai-live", 
            "ai-ecommerce-scraper", 
            "habit-tracker", 
            "recipe-finder", 
            "kanban-task-board", 
            "expense-splitter", 
            "ai-daily-planner", 
            "ai-meeting-summary-tool", 
            "ai-powered-markdown-blog", 
            "blog-cms-frontend", 
            "expense-tracker-api", 
            "github-profile-visualizer", 
            "notes-app-backend", 
            "personal-knowledge-base", 
            "resume-analyzer", 
            "url-shortener", 
            "webhook-listener"
          ],
          education: ["masters", "bachelors"]
        };
        
        if (structuredResponse.section && structuredResponse.section !== "none") {
          const validIds = sectionMap[structuredResponse.section as keyof typeof sectionMap] || [];
          console.log(`Valid IDs for section "${structuredResponse.section}":`, validIds);
          
          // Special handling for Flutter queries
          const userQuery = latestMessage.parts[0].text.toLowerCase();
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
        
        return NextResponse.json(structuredResponse);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        
        // Use Pollinations API fallback for JSON parsing errors
        const fallbackResponse = await handleEmptyResponseFallback(contextPrompt);
        return NextResponse.json(fallbackResponse);
      }
    } catch (error) {
      console.error("Error generating response with Gemini:", error);
      
      // Get the latest user message for fallback
      const latestMessage = processedMessages[processedMessages.length - 1];
      const contextPrompt = `${systemInstruction}\n${sharedPromptContent}\n\nUser query: ${latestMessage.parts[0].text}`;
      
      // Use Pollinations API fallback for any Gemini API errors
      const fallbackResponse = await handleEmptyResponseFallback(contextPrompt);
      return NextResponse.json(fallbackResponse);
    }
  } catch (error) {
    console.error("Error generating response:", error)
    
    // Define handleEmptyResponseFallback directly in this scope
    const handleEmptyResponseFallback = async (prompt: string) => {
      console.log("Attempting fallback generation using Pollinations API in outer catch...");
      
      try {
        // Extract the user query from the prompt
        const userQueryMatch = prompt.match(/User query: (.*)$/);
        const userQuery = userQueryMatch ? userQueryMatch[1] : prompt;
        
        // Create system message with the portfolio context
        const systemMessage: PollinationsMessage = {
          role: "system",
          content: `${sharedPromptContent}\nYou are Ayush's portfolio assistant. Answer the user's question about Ayush's professional background.
          
IMPORTANT: You must format your response as a valid JSON object with these exact fields:
{
  "response": "Your detailed answer to the user's query",
  "section": "most_relevant_section_name", // one of: about, experience, skills, projects, education, none
  "subsections": ["subsection1", "subsection2"] // array of relevant subsection IDs
}

DO NOT use "answer" or "main_section" fields. Use "response" and "section" instead.`
        };
        
        // Create the user message
        const userMessage: PollinationsMessage = {
          role: "user",
          content: userQuery
        };
        
        // Call Pollinations API
        const result = await generateText([systemMessage, userMessage]);
        const responseText = extractAssistantResponse(result);
        
        if (!responseText) {
          return {
            response: "I'm having trouble processing your request. Please try again later.",
            section: "none",
            subsections: []
          };
        }
        
        // Try to extract structured data if response includes JSON
        const jsonRegex = /\{[\s\S]*?\}/;
        const match = responseText.match(jsonRegex);
        
        if (match && match[0]) {
          try {
            const extractedJson = JSON.parse(match[0]);
            // Map field names if they don't match expected schema
            return {
              response: extractedJson.response || extractedJson.answer || responseText,
              section: extractedJson.section || extractedJson.main_section || "none",
              subsections: Array.isArray(extractedJson.subsections) ? extractedJson.subsections : []
            };
          } catch (e) {
            // If parsing fails, create a structured response from the text
            return {
              response: responseText,
              section: "none",
              subsections: []
            };
          }
        } else {
          return {
            response: responseText,
            section: "none",
            subsections: []
          };
        }
      } catch (fallbackError) {
        console.error("Outer catch Pollinations API fallback failed:", fallbackError);
        return {
          response: "I'm having trouble processing your request. Please try again later.",
          section: "none",
          subsections: []
        };
      }
    };
    
    try {
      // Get the request body again from clone
      const body = await requestClone.json();
      const userMessages = body.messages.filter((msg: any) => msg.role === "user");
      
      if (userMessages.length > 0) {
        const latestUserMessage = userMessages[userMessages.length - 1].content;
        const contextPrompt = `${sharedPromptContent}\n\nUser query: ${latestUserMessage}`;
        
        // Use Pollinations API fallback
        const fallbackResponse = await handleEmptyResponseFallback(contextPrompt);
        return NextResponse.json(fallbackResponse);
      }
    } catch (fallbackError) {
      console.error("Final fallback attempt failed:", fallbackError);
    }
    
    // Ultimate fallback if everything else fails
    return NextResponse.json({ 
      response: "Sorry, I encountered an error. Please try again.",
      section: "none",
      subsections: []
    }, { status: 200 })
  }
}
