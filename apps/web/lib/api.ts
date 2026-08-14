const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface AnalysisResult {
  project_name: string;
  area_total: number;
  concrete_volume: number;
  steel_weight: number;
  masonry_area: number;
  estimated_cost: number;
  margin_percent: number;
  confidence_score: number;
}

export interface UploadResponse {
  filename: string;
  status: string;
  message: string;
  project_id?: string;
}

export async function uploadPlan(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Erro ao enviar arquivo" }));
    throw new Error(error.detail || "Erro ao enviar arquivo");
  }

  return response.json();
}

export async function getAnalysis(projectId: string): Promise<AnalysisResult> {
  const response = await fetch(`${API_URL}/analysis/${projectId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar análise");
  }

  return response.json();
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/`);
    return response.ok;
  } catch {
    return false;
  }
}