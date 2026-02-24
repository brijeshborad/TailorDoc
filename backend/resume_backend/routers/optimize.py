from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
import io
import logging
from resume_backend.services.document_parser import parse_file_to_markdown
from resume_backend.services.llm_chain import generate_optimized_html
from resume_backend.core.config import settings

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api")
ALLOWED = {"application/pdf",
           "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}

@router.post("/optimize")
async def optimize_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    hide_contact_details: bool = Form(False),
):
    if resume.content_type not in ALLOWED:
        raise HTTPException(400, "Only PDF and DOCX supported.")
    
    try:
        raw = await resume.read()
        if len(raw) > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
            raise HTTPException(413, "File too large.")

        logger.info(f"Processing file: {resume.filename}")
        md = parse_file_to_markdown(raw, resume.filename)
        logger.info(f"Extracted resume content ({len(md)} chars):\n{md[:500]}...")
        
        logger.info("Generating optimized HTML...")
        html = await generate_optimized_html(md, job_description, hide_contact_details)
        logger.info(f"Generated HTML ({len(html)} chars):\n{html[:500]}...")
        
        return JSONResponse({"html": html})
    except Exception as e:
        logger.error(f"Error during optimization: {str(e)}")
        raise HTTPException(500, f"Optimization failed: {str(e)}")

@router.post("/optimize/html")  # Debug: return raw HTML
async def get_html(resume: UploadFile = File(...), job_description: str = Form(...)):
    try:
        raw = await resume.read()
        md = parse_file_to_markdown(raw, resume.filename)
        html = await generate_optimized_html(md, job_description)
        return {"html": html}
    except Exception as e:
        logger.error(f"Error generating HTML: {str(e)}")
        raise HTTPException(500, f"HTML generation failed: {str(e)}")


@router.post("/optimize/test") # Simple test endpoint
async def test_endpoint():
    return {"status": "ok", "message": "Backend is running"}
