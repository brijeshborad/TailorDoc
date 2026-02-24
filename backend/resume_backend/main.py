from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from resume_backend.routers.optimize import router
import uvicorn

app = FastAPI(title="Resume Optimizer API", version="1.0.0")

# Allow CORS for frontend dev server
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
                   allow_methods=["*"], allow_headers=["*"])

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Resume Optimizer API is ready"}

if __name__ == "__main__":
    uvicorn.run("resume_backend.main:app", host="0.0.0.0", port=8000, reload=True)
