import io
import logging
from PyPDF2 import PdfReader
from docx import Document

logger = logging.getLogger(__name__)

def parse_file_to_markdown(file_bytes: bytes, filename: str) -> str:
    ext = "." + filename.rsplit(".", 1)[-1].lower()
    logger.info(f"Parsing file: {filename} ({len(file_bytes)} bytes), extension: {ext}")
    
    try:
        if ext == ".pdf":
            reader = PdfReader(io.BytesIO(file_bytes))
            text = ""
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            
            if text.strip():
                logger.info(f"Extracted {len(text)} characters from PDF")
                return text.strip()
            else:
                logger.error("PDF has no extractable text (might be scanned image)")
                raise RuntimeError("PDF contains no text. Please use a text-based PDF, not a scanned image.")
                
        elif ext == ".docx":
            doc = Document(io.BytesIO(file_bytes))
            text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
            
            if text.strip():
                logger.info(f"Extracted {len(text)} characters from DOCX")
                return text.strip()
            else:
                raise RuntimeError("DOCX file is empty")
        else:
            raise RuntimeError(f"Unsupported file type: {ext}")
            
    except Exception as e:
        logger.error(f"Extraction failed: {str(e)}")
        raise RuntimeError(f"Failed to extract text: {str(e)}")
