from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    MAX_FILE_SIZE_MB: int = 10

    class Config:
        env_file = ".env"

settings = Settings()
