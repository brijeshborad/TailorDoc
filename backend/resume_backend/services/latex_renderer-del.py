from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
import asyncio
import io
import html2text
import re

async def html_to_pdf(html_content: str) -> bytes:
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, _compile_sync, html_content)

def _compile_sync(html_content: str) -> bytes:
    try:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch)
        story = []
        styles = getSampleStyleSheet()
        
        # Simple HTML to ReportLab conversion
        # Strip HTML tags and create paragraphs
        text = html_content
        
        # Extract text between body tags if present
        body_match = re.search(r'<body[^>]*>(.*?)</body>', text, re.DOTALL | re.IGNORECASE)
        if body_match:
            text = body_match.group(1)
        
        # Split by common block elements
        blocks = re.split(r'</(?:p|div|h[1-6]|li)>', text, flags=re.IGNORECASE)
        
        for block in blocks:
            # Remove HTML tags
            clean = re.sub(r'<[^>]+>', '', block).strip()
            if clean:
                # Detect headings
                if '<h1' in block.lower():
                    story.append(Paragraph(clean, styles['Heading1']))
                elif '<h2' in block.lower():
                    story.append(Paragraph(clean, styles['Heading2']))
                elif '<h3' in block.lower():
                    story.append(Paragraph(clean, styles['Heading3']))
                else:
                    story.append(Paragraph(clean, styles['Normal']))
                story.append(Spacer(1, 0.1*inch))
        
        if not story:
            story.append(Paragraph("Resume content", styles['Normal']))
        
        doc.build(story)
        return buffer.getvalue()
    except Exception as e:
        raise RuntimeError(f"PDF generation failed: {str(e)}")
