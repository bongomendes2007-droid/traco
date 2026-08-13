from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="TRAÇO API",
    description="API para análise de plantas e geração de quantitativos/orçamentos.",
    version="0.1.0"
)

# CORS para permitir acesso do Frontend Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisResult(BaseModel):
    project_name: str
    area_total: float
    concrete_volume: float
    steel_weight: float
    masonry_area: float
    estimated_cost: float
    margin_percent: float
    confidence_score: float

@app.get("/")
def read_root():
    return {"status": "online", "service": "TRAÇO AI Engine"}

@app.post("/upload/", response_model=dict)
async def upload_plan(file: UploadFile = File(...)):
    """
    Endpoint simulado para upload de planta.
    Em produção, aqui entraria a lógica de visão computacional (OpenCV/PyTorch).
    """
    if not file.filename.endswith(('.pdf', '.dwg', '.png', '.jpg')):
        raise HTTPException(status_code=400, detail="Formato de arquivo não suportado.")

    # Simulação de processamento
    return {
        "filename": file.filename,
        "status": "processing",
        "message": "Planta recebida. Iniciando análise de IA..."
    }

@app.get("/analysis/{project_id}", response_model=AnalysisResult)
def get_analysis(project_id: str):
    """
    Retorna dados simulados de uma análise para o protótipo.
    """
    # Dados mockados baseados no protótipo HTML
    return AnalysisResult(
        project_name="Residencial Alpha",
        area_total=142.6,
        concrete_volume=32.45,
        steel_weight=4.78,
        masonry_area=152.40,
        estimated_cost=287540.60,
        margin_percent=8.0,
        confidence_score=0.98
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)