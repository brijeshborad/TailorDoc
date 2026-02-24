---

# 🚀 Resume Optimizer — Full Implementation Plan

> **Stack:** React 19 (Vite) · FastAPI 0.115+ · Groq `llama-3.3-70b-versatile` · LangChain 0.3+ · MarkItDown 0.1.3 · LaTeX → PDF via `pdflatex`

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────┐
│         FRONTEND (React 19 + Vite)      │
│  Upload Zone | JD Input | PDF Preview   │
└─────────────────────┬───────────────────┘
                      │  POST /api/optimize (multipart)
                      ▼
┌─────────────────────────────────────────┐
│        BACKEND (FastAPI 0.115+)         │
│                                         │
│  1. MarkItDown[all] → Markdown text     │
│  2. LangChain 0.3  → Prompt chain      │
│  3. Groq API       → LaTeX output      │
│  4. pdflatex subprocess → PDF bytes    │
│  5. StreamingResponse → client         │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
resume-optimizer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadZone.tsx
│   │   │   ├── JobDescInput.tsx
│   │   │   └── ResumePreview.tsx
│   │   ├── hooks/
│   │   │   └── useOptimizer.ts
│   │   └── App.tsx
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/optimize.py
│   │   ├── services/
│   │   │   ├── document_parser.py
│   │   │   ├── llm_chain.py
│   │   │   └── latex_renderer.py
│   │   └── core/config.py
│   ├── requirements.txt
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

---

## 🧰 Pinned Dependencies

### Backend `requirements.txt`
```
fastapi[standard]==0.115.12
uvicorn[standard]==0.34.3
pydantic==2.11.4
pydantic-settings==2.9.1
python-multipart==0.0.20
markitdown[all]==0.1.3
langchain==0.3.25
langchain-core==0.3.60
langchain-groq==1.1.2
groq==0.33.0
python-dotenv==1.1.0
aiofiles==24.1.0
```

### Frontend `package.json` (key deps)
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "vite": "^6.3.0",
  "typescript": "^5.8.0",
  "tailwindcss": "^4.1.0",
  "@tanstack/react-query": "^5.75.0",
  "react-dropzone": "^14.3.5",
  "react-pdf": "^9.2.1",
  "lucide-react": "^0.511.0",
  "axios": "^1.9.0"
}
```

---

## ⚙️ Backend Code

### `app/core/config.py`
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    MAX_FILE_SIZE_MB: int = 10

    class Config:
        env_file = ".env"

settings = Settings()
```

---

### `app/services/document_parser.py`
```python
import io
from markitdown import MarkItDown

_md = MarkItDown()

def parse_file_to_markdown(file_bytes: bytes, filename: str) -> str:
    # v0.1.x requires binary BytesIO stream — NOT StringIO
    stream = io.BytesIO(file_bytes)
    result = _md.convert_stream(stream, file_extension="." + filename.rsplit(".", 1)[-1].lower())
    return result.text_content
```

---

### `app/services/llm_chain.py`
```python
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.core.config import settings

llm = ChatGroq(
    model=settings.GROQ_MODEL,
    temperature=0.3,
    max_tokens=8192,
    api_key=settings.GROQ_API_KEY,
)

SYSTEM_PROMPT = """You are an expert resume writer and ATS optimization specialist.
Rewrite the resume to maximize shortlisting for the given job description.

RULES:
1. Keep real experience and education — do NOT fabricate companies or dates.
2. Mirror exact keywords and action verbs from the JD in bullet points.
3. Add adjacent/related missing skills to the Skills section. Mark brand-new skills with "(learning)".
4. Re-order sections so most relevant content is first.
5. ATS-safe: use standard headings (Summary, Experience, Education, Skills, Projects),
   no tables/columns/images, quantify achievements, consistent date format.
6. Output ONLY a complete compilable LaTeX document — no markdown fences, no explanation.
   Use moderncv or clean article class. Single page preferred, max 2 pages."""

prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("human", "## RESUME:\n{resume_markdown}\n\n## JOB DESCRIPTION:\n{job_description}"),
])

resume_chain = prompt | llm | StrOutputParser()

async def generate_optimized_latex(resume_markdown: str, job_description: str) -> str:
    latex = await resume_chain.ainvoke({
        "resume_markdown": resume_markdown,
        "job_description": job_description,
    })
    latex = latex.strip()
    if latex.startswith("```"):
        latex = latex.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    return latex
```

---

### `app/services/latex_renderer.py`
```python
import asyncio, subprocess, tempfile
from pathlib import Path

async def latex_to_pdf(latex_content: str) -> bytes:
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, _compile_sync, latex_content)

def _compile_sync(latex_content: str) -> bytes:
    with tempfile.TemporaryDirectory() as tmpdir:
        tex = Path(tmpdir) / "resume.tex"
        pdf = Path(tmpdir) / "resume.pdf"
        tex.write_text(latex_content, encoding="utf-8")

        cmd = ["pdflatex", "-interaction=nonstopmode", "-output-directory", tmpdir, str(tex)]
        for _ in range(2):  # Two passes for moderncv cross-refs
            subprocess.run(cmd, capture_output=True, timeout=60)

        if not pdf.exists():
            log = (Path(tmpdir) / "resume.log").read_text(errors="ignore")
            raise RuntimeError(f"Compilation failed:\n{log[-3000:]}")

        return pdf.read_bytes()
```
> **Tip:** Swap `pdflatex` for `tectonic` — a self-contained Rust binary that auto-downloads packages. Just change `cmd = ["tectonic", str(tex)]`.

---

### `app/routers/optimize.py`
```python
from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
import io
from app.services.document_parser import parse_file_to_markdown
from app.services.llm_chain import generate_optimized_latex
from app.services.latex_renderer import latex_to_pdf
from app.core.config import settings

router = APIRouter(prefix="/api")
ALLOWED = {"application/pdf",
           "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}

@router.post("/optimize")
async def optimize_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
):
    if resume.content_type not in ALLOWED:
        raise HTTPException(400, "Only PDF and DOCX supported.")
    
    raw = await resume.read()
    if len(raw) > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(413, "File too large.")

    md = parse_file_to_markdown(raw, resume.filename)
    latex = await generate_optimized_latex(md, job_description)
    pdf = await latex_to_pdf(latex)

    return StreamingResponse(
        io.BytesIO(pdf), media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=optimized_resume.pdf"}
    )

@router.post("/optimize/latex")  # Debug: return raw LaTeX
async def get_latex(resume: UploadFile = File(...), job_description: str = Form(...)):
    raw = await resume.read()
    md = parse_file_to_markdown(raw, resume.filename)
    return {"latex": await generate_optimized_latex(md, job_description)}
```

---

### `app/main.py`
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.optimize import router

app = FastAPI(title="Resume Optimizer API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"],
                   allow_methods=["*"], allow_headers=["*"])
app.include_router(router)
```

---

## 🎨 Frontend

### `vite.config.ts`
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { "/api": { target: "http://localhost:8000", changeOrigin: true } } },
});
```

### `src/hooks/useOptimizer.ts`
```typescript
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useOptimizer = () =>
  useMutation({
    mutationFn: async ({ resumeFile, jobDescription }: { resumeFile: File; jobDescription: string }) => {
      const form = new FormData();
      form.append("resume", resumeFile);
      form.append("job_description", jobDescription);
      const res = await axios.post("/api/optimize", form, { responseType: "blob" });
      return URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
    },
  });
```

---

## 🏗️ Phased Build Plan

| Phase | Days | Focus |
|---|---|---|
| **1** | 1–2 | Project scaffolding, MarkItDown integration, test parsing |
| **2** | 3–4 | LangChain + Groq chain, prompt tuning, LaTeX quality |
| **3** | 5 | LaTeX → PDF pipeline, TeX Live/tectonic setup |
| **4** | 6–7 | FastAPI routes, React UI, end-to-end wiring |
| **5** | 8–9 | ATS scoring display, progress states, error UX |

---

## 💡 Why LangChain Fits Here

LangChain is genuinely valuable in this stack — not just filler. `ChatPromptTemplate` cleanly manages the multi-part system + human prompt. `StrOutputParser` strips LLM response metadata. The `|` pipe syntax (`prompt | llm | parser`) is readable and maintainable. `ainvoke()` is async-native, which pairs perfectly with FastAPI. And when you want to evolve this into a multi-step agentic flow (parse → optimize → ATS score → retry if score low → compile), `LangGraph` slots in with zero refactoring.

---

## 🔐 Key Security & Edge Case Mitigations

- Validate MIME type AND enforce 10MB file size limit on upload
- User text goes through the LLM, never directly into `.tex` (avoids LaTeX injection)
- Truncate inputs to ~12k tokens before the LLM call to avoid context overflow
- `subprocess(..., timeout=60)` prevents hanging compilation — return raw LaTeX as fallback
- Prompt explicitly forbids fabricating companies, dates, or degrees
