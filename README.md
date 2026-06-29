
readme_content = """# Tic-Tac-Toe AI Server

The backend service for the Tic-Tac-Toe application. Built with **FastAPI**, this server manages game logic and leverages the **Google Gemini SDK** (`gemini-2.5-flash`) to power an intelligent AI opponent capable of making strategic game moves.

---

## 🚀 Features

- **FastAPI Backend:** Lightweight, high-performance REST API with automatic documentation.
- **Gemini AI Integration:** Utilizes advanced LLM capabilities via the modern `google-genai` client to dynamically calculate turns.
- **Robust Game Logic:** Full tracking of Tic-Tac-Toe board states, validation of available moves, and win/draw detection.
- **Comprehensive Test Suite:** 100% stable testing suite using `pytest` and `unittest.mock` to ensure API calls are isolated and clean.

---

## 🛠️ Tech Stack

- **Language:** Python 3.14+
- **Framework:** FastAPI
- **AI SDK:** `google-genai`
- **Asynchronous Runtime:** `anyio`
- **Testing:** `pytest`
- **Production Server:** `uvicorn`

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have Python 3.14+ installed and an active Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### 2. Installation
Navigate to the server directory, set up a virtual environment, and install the required dependencies: