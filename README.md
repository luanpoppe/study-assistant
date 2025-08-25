# AI Study Assistant 🎓

This repository showcases a complete, **end-to-end full-stack project**: an AI-powered Study Assistant. It was built from the ground up to demonstrate the practical integration of a modern frontend, a robust backend API, and a decoupled AI tool server, all orchestrated by the **Mastra agent framework**.

More than just a script, this is a fully functional application that highlights proven skills in system architecture, AI agent implementation, and the communication patterns between distinct, independently running services.

[Image of the AI Study Assistant UI]

---

## ✨ Key Features

- 🧠 **Intelligent Tool Use**: The agent analyzes user requests to decide which tools (web search, summarizer, flashcard creator) to use, orchestrating them to create a concise and helpful response.
- 📚 **Persistent & Semantic Memory**: Conversation history is not only saved but also vectorized. This allows the agent to recall relevant past messages based on semantic meaning, not just keywords, providing richer context for ongoing conversations.
- ⚙️ **Dynamic Model Control**: The frontend UI includes sliders to adjust the LLM's `temperature` and `top-p (nucleus)` sampling on a per-request basis, allowing users to fine-tune the creativity and determinism of the AI's responses.
- 🃏 **Automatic Flashcard Generation**: Ask the assistant to create flashcards on a topic, and it will use its tools to generate a structured JSON output ready for studying.
- 🌐 **Integrated Web Search**: The assistant can browse the web to find up-to-date information, citing its sources and noting their credibility.

---

## 🛠️ Tech Stack & Architecture

This project is built with a modern, decoupled architecture to ensure modularity and scalability.

- **Frontend**: Vite + React (TypeScript)
- **Backend**: Node.js + Express
- **AI & Orchestration**:
  - **Framework**: Mastra (`@mastra/core`, `@mastra/mcp`, `@mastra/memory`)
  - **Model**: Google Gemini (`@ai-sdk/google`)
  - **Embeddings**: `fastembed` for efficient, local vector generation
- **Database**: LibSQL for both message history (relational store) and vector storage.
- **Tooling**: Zod for type-safe data validation in tool schemas.

### Architectural Overview

The application is built on a **multi-service, full-stack architecture**, a design pattern common in modern, scalable web applications. Each component has a distinct responsibility and communicates over APIs. The Mastra framework serves as the intelligent core that connects the user-facing elements with the backend logic and the specialized action-performing tools. This demonstrates a clear separation of concerns, from the user interface down to the AI reasoning layer.

1.  **Frontend**: A lightweight React UI for user interaction and dynamic LLM parameter control.
2.  **Backend API**: An Express server that acts as the gateway. It handles user requests, manages memory scoping (`userid`, `conversationid`), and communicates with the main agent.
3.  **Main Agent (Reasoning Layer)**: The core of the application, built with Mastra. This agent interprets user intent, plans which tools to call, and synthesizes final responses.
4.  **MCP Tool Server (Action Layer)**: A separate Node.js server that exposes the tools (Summarizer, Web Search, Flashcards) as microservices. This decouples the "thinking" from the "doing."
5.  **Memory Layer**: LibSQL databases that persist conversation history and vector embeddings, enabling long-term memory and semantic recall.

This decoupled design makes the system highly modular. For example, a new tool can be added to the MCP server without ever touching the main agent's core logic.

---

## 💡 Implementation Highlights

This project was an exercise in building a robust, maintainable AI application. Here are some key decisions I made:

### 1. End-to-End Full-Stack Implementation

- **What I did**: I architected and built the entire application stack, from the user-facing React components (**Frontend**), to the business logic and API layer (**Backend**), and the specialized microservice for AI tools (**MCP Server**). I then used the Mastra agent framework to serve as the intelligent "glue" that orchestrates communication between these distinct services.
- **Why**: This holistic approach demonstrates the ability to deliver a **complete, production-ready feature**. It shows not just how to build individual components, but how to **design, integrate, and manage the data flow across an entire system**. This proves a comprehensive understanding of the full application lifecycle, a critical skill for building complex, real-world products.

### 2. Decoupled Tool Server (MCP)

- **What I did**: Instead of bundling all tool logic within the main application, I implemented tools (Summarizer, Web Search, etc.) on a separate Mastra Communication Protocol (MCP) server. The main agent communicates with this server via a client.
- **Why**: This architectural choice embodies a clear **Reasoning and Action Model**, separating the 'thinking' agent from the 'doing' tools. The communication between the agent and the MCP server is a practical implementation of **handoff logic**, where the reasoning core delegates a specific task to a specialized tool and waits for a structured result. This makes the system highly modular and demonstrates an understanding of building scalable agentic architectures.

### 3. Persistent & Semantic Memory

- **What I did**: I used `LibSQL` to create both a standard message store and a vector database. Each conversation is saved, and its content is converted into vector embeddings using `fastembed`. The agent is configured to perform a semantic search over recent messages before generating a response.
- **Why**: This gives the agent true **long-term memory**. It can recall contextually relevant information from past interactions, leading to more coherent and intelligent conversations. Scoping memory to a `userid` and `conversationid` also demonstrates a clear path to a multi-tenant application.

### 4. Frontend-Driven Agent Control

- **What I did**: I exposed the `temperature` and `top-p` LLM parameters as interactive sliders in the React frontend. These values are passed through the backend API to the agent on every request.
- **Why**: This feature demonstrates a **full-stack feedback loop**, giving the end-user direct control over the agent's behavior. It shows an understanding of how model parameters impact output and how to wire them from the UI down to the AI core.

### 5. Robust Prompt Engineering & Evaluation

- **What I did**: The agent's prompt was developed through an **iterative evaluation process**. I tested multiple phrasings and structural commands, evaluating the agent's responses for reliability, adherence to format (e.g., JSON for flashcards), and tool selection accuracy. The final prompt (`src/agents/study-assistant.prompt.ts`) also instructs the agent to provide citations with credibility notes.
- **Why**: This demonstrates a practical approach to **prompt evaluation and refinement**, a core skill for building reliable agents. Furthermore, instructing the agent to provide citations is a foundational step towards **responsible and safe AI**, ensuring users can trace and verify the information provided.

### 6. Performance & Efficiency Considerations

- **What I did**: I intentionally selected Google's `gemini-2.5-flash-lite` model for the core agent. Furthermore, the prompt guides the agent to use tools only when strictly necessary, minimizing unnecessary external calls.
- **Why**: This demonstrates an understanding of **latency-sensitive AI systems**. The 'flash' model is optimized for speed, ensuring a more responsive user experience. By guiding the agent to be efficient, I am actively managing the **reasoning effort** and computational cost per query, which is crucial for building scalable and cost-effective AI applications.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- A `.env` file at the project root with your API keys:
  ```env
  GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
  TAVILY_API_KEY=your_tavily_api_key
  ```

### Installation & Running

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start the MCP Tool Server** (in one terminal):

    - This server provides the tools for the main agent.

    ```bash
    npm start
    # Watches src/index.ts and runs on http://localhost:8080
    ```

3.  **Start the Backend API** (in a separate terminal):

    - This is the main entry point for the frontend.

    ```bash
    npm run back
    # Watches src/backend/app.ts and runs on http://localhost:5000
    ```

4.  **Start the Frontend** (in a third terminal):
    ```bash
    npm run front
    # Runs the React development server
    ```

### API Example (cURL)

You can test the backend directly with a `cURL` request:

```bash
curl -X POST http://localhost:5000/study \
 -H "Content-Type: application/json" \
 -H "userid: user-123" \
 -H "conversationid: conv-abc" \
 -d '{"message":"Create three flashcards about the water cycle","temperature":0.3,"nucleusSampling":0.9}'
```

---

## 🐳 Docker Note

A `docker-compose.yml` is included to orchestrate the services. Please note that the current configuration uses local SQLite files for memory and does not configure persistent volumes. For production use, these would need to be mounted to a volume.

## 🔮 Future Enhancements

While this project provides a robust foundation for an AI agent, the following enhancements are planned to further expand its capabilities:

- 🛡️ **Advanced Safety & Guardrails**: Integrate a dedicated moderation API to programmatically filter user inputs and model outputs. This would complement the existing prompt-based instructions with a more robust, scalable safety layer.

- 🎙️ **Voice-Enabled Interaction**: Implement a full NLP pipeline for voice commands, incorporating speech-to-text (STT) for input and text-to-speech (TTS) for output. This would enable a hands-free, truly conversational user experience.
