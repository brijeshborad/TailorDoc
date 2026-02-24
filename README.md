# TailorDoc
 AI-driven, ATS-friendly resume optimisation


An AI-powered application that tailors your resume to specific job descriptions. It parses your existing resume, rewrites the content using a Large Language Model (Groq/Llama 3.3) to match the job requirements, and generates a professional, ATS-friendly PDF using LaTeX.

![Resume Optimizer](https://raw.githubusercontent.com/placeholder-image.png)

## ✨ Features

- **Smart Parsing**: Extracts text from PDF and DOCX resumes using Microsoft's MarkItDown.
- **AI Optimization**: Uses Groq (Llama 3.3 70B) to rewrite bullet points, adding relevant keywords and skills from the Job Description.
- **ATS-Friendly Output**: Generates a clean, standard LaTeX-based PDF that parses well with Applicant Tracking Systems.
- **Modern UI**: A responsive, dark-mode Interface built with React 19 and Tailwind v4.
- **Real-time Preview**: View your optimized resume directly in the browser.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: TailwindCSS v4
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI
- **LLM Orchestration**: LangChain
- **document Processing**: MarkItDown
- **PDF Generation**: LaTeX (`pdflatex`)

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

1.  **Node.js** (v18 or higher)
2.  **Python** (v3.10 or higher)
3.  **LaTeX Distribution**: You **MUST** have a LaTeX engine installed and available in your system's PATH.
    -   **Windows**: [MiKTeX](https://miktex.org/download) or [TeX Live](https://www.tug.org/texlive/).
    -   **Linux**: `sudo apt-get install texlive-latex-base texlive-fonts-recommended texlive-latex-extra`
    -   **macOS**: [MacTeX](https://www.tug.org/mactex/)
4.  **OCR Tools** (for scanned PDF resumes):
    -   **Linux**: `sudo apt-get install tesseract-ocr poppler-utils`
    -   **Windows**: Install [Tesseract](https://github.com/UB-Mannheim/tesseract/wiki) and [Poppler](https://github.com/oschwartz10612/poppler-windows/releases/)
    -   **macOS**: `brew install tesseract poppler`
5.  **Groq API Key**: Get a free API key from [console.groq.com](https://console.groq.com).

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resume-optimizer.git
cd resume-optimizer
```

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

```bash
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configuration**:
Create a `.env` file in the `backend` directory:
```env
# backend/.env
GROQ_API_KEY=your_actual_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
MAX_FILE_SIZE_MB=10
```

### 3. Frontend Setup
Navigate to the frontend directory and install Node dependencies.

```bash
cd ../frontend
npm install
```

## 🏃‍♂️ Running the Application

### Start the Backend Server
From the `backend` directory:
```bash
# Ensure your virtual environment is activated
uvicorn resume_backend.main:app --host 127.0.0.1 --port 8000 --reload
```
The API will be available at `http://127.0.0.1:8000`.

### Start the Frontend Client
From the `frontend` directory:
```bash
npm run dev
```
Access the application at `http://localhost:5173`.

## 💡 How to Use

1.  Open `http://localhost:5173` in your browser.
2.  **Upload Resume**: Drag and drop your existing resume (PDF or DOCX).
3.  **Job Description**: Paste the job description you are applying for into the text area.
4.  Click **"Generate Optimized Resume"**.
5.  Wait a few seconds for the AI to process and compile the document.
6.  Preview or download the optimized PDF.

## 🐛 Troubleshooting

### `RuntimeError: pdflatex not found`
The backend cannot find the `pdflatex` command.
-   **Verify Installation**: Open a new terminal and run `pdflatex --version`.
-   **Check PATH**: Ensure your LaTeX distribution's `bin` folder is added to your system's PATH environment variable.
-   **Restart**: You may need to restart your terminal or IDE after installing LaTeX.

### `PydanticUserError: ChatGroq is not fully defined`
This is a known compatibility issue between Pydantic v2 and some versions of LangChain.
-   **Fix**: The project includes a runtime patch in `services/llm_chain.py` to handle this. Ensure you are running the code provided in this repository.

### `PDF is a scanned image. Install OCR`
Your resume PDF doesn't have a text layer (it's a scanned image).
-   **Linux**: `sudo apt-get install tesseract-ocr poppler-utils`
-   **Windows**: Install [Tesseract](https://github.com/UB-Mannheim/tesseract/wiki) and add to PATH
-   **macOS**: `brew install tesseract poppler`
-   Restart the backend server after installation.

### Frontend Connection Errors
-   Ensure the backend is running on port `8000`.
-   Check the browser console for CORS errors. The backend is configured to allow requests from `http://localhost:5173`.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
