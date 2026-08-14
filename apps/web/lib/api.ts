const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TOKEN_KEY = "traco_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

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
  filename?: string;
  status?: string;
  message?: string;
  project_id?: string;
  id?: number;
  name?: string;
  format?: string;
  area?: number | null;
  rooms?: number | null;
}

export interface ProjectDto {
  id: number;
  name: string;
  type: string;
  status: string;
  plans: number;
  createdAt: string;
}

export interface PlantaDto {
  id: number;
  name: string;
  format: string;
  sizeBytes: number;
  status: string;
  area: number | null;
  rooms: number | null;
  project: string | null;
  projectId: number | null;
  uploadedAt: string;
}

export interface AnalysisDto {
  id: number;
  code: string;
  project: string | null;
  plan: string | null;
  date: string;
  durationSeconds: number | null;
  confidence: number | null;
  status: string;
  area: number | null;
  rooms: number | null;
  estimatedCost: number | null;
  elements: { label: string; value: string }[];
  quantities: { label: string; value: string }[];
}

function authHeaders(): HeadersInit {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...authHeaders(), ...(init?.headers || {}) },
  });
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Erro inesperado na API." }));
    throw new Error(error.detail || "Erro inesperado na API.");
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

/* ---------- auth ---------- */

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await request<AuthResponse>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  setToken(res.token);
  return res;
}

export async function register(
  name: string,
  email: string,
  password: string,
  role: string
): Promise<AuthResponse> {
  const res = await request<AuthResponse>("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  setToken(res.token);
  return res;
}

export async function me(): Promise<UserDto> {
  return request<UserDto>("/api/auth/me");
}

/* ---------- plantas ---------- */

export async function uploadPlan(file: File, projectId?: number): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  if (projectId) formData.append("projectId", String(projectId));

  const path = getToken() ? "/api/plantas/upload" : "/upload/";
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    body: formData,
    headers: authHeaders(),
  });
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Erro ao enviar arquivo." }));
    throw new Error(error.detail || "Erro ao enviar arquivo.");
  }
  return response.json();
}

export async function listPlantas(): Promise<PlantaDto[]> {
  return request<PlantaDto[]>("/api/plantas");
}

export async function deletePlanta(id: number): Promise<void> {
  return request<void>(`/api/plantas/${id}`, { method: "DELETE" });
}

/* ---------- projetos ---------- */

export async function listProjetos(): Promise<ProjectDto[]> {
  return request<ProjectDto[]>("/api/projetos");
}

export async function createProjeto(name: string, type: string): Promise<ProjectDto> {
  return request<ProjectDto>("/api/projetos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type }),
  });
}

export async function deleteProjeto(id: number): Promise<void> {
  return request<void>(`/api/projetos/${id}`, { method: "DELETE" });
}

/* ---------- análises ---------- */

export async function listAnalises(): Promise<AnalysisDto[]> {
  return request<AnalysisDto[]>("/api/analises");
}

/** Endpoint legado compatível com a antiga API FastAPI. */
export async function getAnalysis(projectId: string): Promise<AnalysisResult> {
  return request<AnalysisResult>(`/analysis/${projectId}`);
}

/* ---------- health ---------- */

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/`);
    return response.ok;
  } catch {
    return false;
  }
}