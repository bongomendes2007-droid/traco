"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken, checkApiHealth, listPlantas, deletePlanta, type PlantaDto } from "@/lib/api";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  X,
  FileImage,
  HardDrive,
  Layers,
  Ruler,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  DoorOpen,
  RefreshCw,
} from "lucide-react";

type PlanStatus = "concluida" | "processando" | "erro";

interface Plan {
  id: string;
  name: string;
  project: string;
  format: "PDF" | "DWG" | "PNG" | "JPG";
  size: string;
  sizeMB: number;
  uploadedAt: string;
  status: PlanStatus;
  area: string;
  rooms: number;
  variant: 0 | 1 | 2;
}

const initialPlans: Plan[] = [
  {
    id: "p1",
    name: "Planta Térreo.pdf",
    project: "Residencial Alpha",
    format: "PDF",
    size: "2.4 MB",
    sizeMB: 2.4,
    uploadedAt: "14 Ago 2026, 09:12",
    status: "concluida",
    area: "142,6 m²",
    rooms: 4,
    variant: 0,
  },
  {
    id: "p2",
    name: "Pavimento Superior.pdf",
    project: "Residencial Alpha",
    format: "PDF",
    size: "2.1 MB",
    sizeMB: 2.1,
    uploadedAt: "13 Ago 2026, 16:40",
    status: "concluida",
    area: "128,4 m²",
    rooms: 5,
    variant: 1,
  },
  {
    id: "p3",
    name: "Subsolo Garagem.pdf",
    project: "Edifício Comercial Beta",
    format: "PDF",
    size: "3.8 MB",
    sizeMB: 3.8,
    uploadedAt: "14 Ago 2026, 11:47",
    status: "processando",
    area: "—",
    rooms: 0,
    variant: 1,
  },
  {
    id: "p4",
    name: "Planta Comercial Térreo.dwg",
    project: "Edifício Comercial Beta",
    format: "DWG",
    size: "5.6 MB",
    sizeMB: 5.6,
    uploadedAt: "08 Ago 2026, 14:58",
    status: "concluida",
    area: "486,2 m²",
    rooms: 12,
    variant: 2,
  },
  {
    id: "p5",
    name: "Fachada Frontal.png",
    project: "Residencial Alpha",
    format: "PNG",
    size: "840 KB",
    sizeMB: 0.8,
    uploadedAt: "13 Ago 2026, 10:05",
    status: "erro",
    area: "—",
    rooms: 0,
    variant: 2,
  },
  {
    id: "p6",
    name: "Galpão Principal.pdf",
    project: "Galpão Industrial Gamma",
    format: "PDF",
    size: "1.9 MB",
    sizeMB: 1.9,
    uploadedAt: "01 Ago 2026, 11:18",
    status: "concluida",
    area: "720,0 m²",
    rooms: 6,
    variant: 0,
  },
  {
    id: "p7",
    name: "Casa Térrea Delta.pdf",
    project: "Casa Térrea Delta",
    format: "PDF",
    size: "1.2 MB",
    sizeMB: 1.2,
    uploadedAt: "14 Ago 2026, 11:52",
    status: "processando",
    area: "—",
    rooms: 0,
    variant: 1,
  },
];

const statusMeta: Record<
  PlanStatus,
  { label: string; className: string; Icon: typeof CheckCircle2 }
> = {
  concluida: { label: "Concluída", className: "text-green-400", Icon: CheckCircle2 },
  processando: { label: "Processando", className: "text-traco-laranja", Icon: Clock },
  erro: { label: "Falha na leitura", className: "text-red-400", Icon: AlertCircle },
};

function PlanThumb({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 1) {
    return (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <rect width="300" height="200" fill="#FAFAFA" />
        <path
          d="M40 25 H200 V90 H265 V175 H40 Z"
          fill="none"
          stroke="#1C1815"
          strokeWidth="3"
        />
        <line x1="125" y1="25" x2="125" y2="175" stroke="#1C1815" strokeWidth="2" />
        <line x1="125" y1="110" x2="265" y2="110" stroke="#1C1815" strokeWidth="2" />
        <line x1="40" y1="100" x2="125" y2="100" stroke="#1C1815" strokeWidth="2" />
        <text x="82" y="66" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">ESTAR</text>
        <text x="82" y="142" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">COZINHA</text>
        <text x="195" y="62" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">SUÍTE</text>
        <text x="195" y="146" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">ÁREA</text>
      </svg>
    );
  }
  if (variant === 2) {
    return (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <rect width="300" height="200" fill="#FAFAFA" />
        <rect x="25" y="25" width="250" height="150" fill="none" stroke="#1C1815" strokeWidth="3" />
        <line x1="115" y1="25" x2="115" y2="175" stroke="#1C1815" strokeWidth="2" />
        <line x1="25" y1="85" x2="115" y2="85" stroke="#1C1815" strokeWidth="2" />
        <rect x="195" y="115" width="80" height="60" fill="none" stroke="#1C1815" strokeWidth="2" />
        <text x="70" y="58" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">SALA 1</text>
        <text x="70" y="134" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">SALA 2</text>
        <text x="190" y="70" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">OPEN SPACE</text>
        <text x="235" y="148" fontFamily="monospace" fontSize="8" fill="#837A70" textAnchor="middle">REUNIÃO</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <rect width="300" height="200" fill="#FAFAFA" />
      <rect x="30" y="25" width="240" height="150" fill="none" stroke="#1C1815" strokeWidth="3" />
      <line x1="150" y1="25" x2="150" y2="175" stroke="#1C1815" strokeWidth="2" />
      <line x1="30" y1="100" x2="150" y2="100" stroke="#1C1815" strokeWidth="2" />
      <line x1="150" y1="100" x2="270" y2="100" stroke="#1C1815" strokeWidth="2" />
      <text x="90" y="66" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">SALA</text>
      <text x="90" y="142" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">COZINHA</text>
      <text x="210" y="66" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">SUÍTE</text>
      <text x="210" y="142" fontFamily="monospace" fontSize="9" fill="#837A70" textAnchor="middle">BANHO</text>
    </svg>
  );
}

function mapPlantaFromApi(p: PlantaDto): Plan {
  const formats = ["PDF", "DWG", "PNG", "JPG"];
  const statuses = ["concluida", "processando", "erro"];
  const sizeLabel =
    p.sizeBytes < 1024 * 1024
      ? Math.max(1, Math.round(p.sizeBytes / 1024)) + " KB"
      : (p.sizeBytes / (1024 * 1024)).toFixed(1).replace(".", ",") + " MB";
  return {
    id: String(p.id),
    name: p.name,
    project: p.project || "Projeto Geral",
    format: (formats.includes(p.format) ? p.format : "PDF") as Plan["format"],
    size: sizeLabel,
    sizeMB: p.sizeBytes / (1024 * 1024),
    uploadedAt: new Date(p.uploadedAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    status: (statuses.includes(p.status) ? p.status : "processando") as PlanStatus,
    area: p.area != null ? String(p.area).replace(".", ",") + " m²" : "—",
    rooms: p.rooms ?? 0,
    variant: (Number(p.id) % 3) as 0 | 1 | 2,
  };
}

export default function PlantasPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);

  useEffect(() => {
    (async () => {
      try {
        if (!getToken()) return;
        const online = await checkApiHealth();
        if (!online) return;
        const data = await listPlantas();
        if (data.length > 0) setPlans(data.map(mapPlantaFromApi));
      } catch {
        /* mantém dados locais */
      }
    })();
  }, []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todas" | PlanStatus>("todas");
  const [selected, setSelected] = useState<Plan | null>(null);

  const filtered = plans.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.project.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "todas" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalMB = plans.reduce((sum, p) => sum + p.sizeMB, 0);
  const donePlans = plans.filter((p) => p.status === "concluida");
  const totalRooms = donePlans.reduce((sum, p) => sum + p.rooms, 0);

  const handleDelete = async (id: string) => {
    try {
      if (getToken()) await deletePlanta(Number(id));
    } catch {
      /* fallback local */
    }
    setPlans(plans.filter((p) => p.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const formatBadgeVariant = (format: Plan["format"]) => {
    switch (format) {
      case "PDF":
        return "default" as const;
      case "DWG":
        return "mono" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <AppShell breadcrumbs={[{ label: "Plantas" }]}>
      <div className="p-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-2">
              Plantas
            </h1>
            <p className="text-grafite-3 text-sm">
              {plans.length} arquivo{plans.length !== 1 ? "s" : ""} •{" "}
              {donePlans.length} analisada{donePlans.length !== 1 ? "s" : ""} •{" "}
              {plans.filter((p) => p.status === "processando").length} em processamento
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/upload">
              <Upload size={18} />
              Nova Planta
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Arquivos"
            value={plans.length.toString()}
            unit="plantas"
            icon={<FileImage size={16} />}
          />
          <StatCard
            label="Armazenamento"
            value={totalMB.toFixed(1).replace(".", ",")}
            unit="MB"
            icon={<HardDrive size={16} />}
          />
          <StatCard
            label="Área Analisada"
            value="1.477,2"
            unit="m²"
            icon={<Ruler size={16} />}
            highlight
          />
          <StatCard
            label="Ambientes Detectados"
            value={totalRooms.toString()}
            unit="cômodos"
            icon={<DoorOpen size={16} />}
          />
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-grafite-3"
            />
            <Input
              placeholder="Buscar por nome ou projeto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            {(
              [
                { id: "todas", label: "Todas" },
                { id: "concluida", label: "Concluídas" },
                { id: "processando", label: "Processando" },
                { id: "erro", label: "Com erro" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all border ${
                  statusFilter === f.id
                    ? "border-traco-laranja bg-traco-laranja/10 text-traco-laranja"
                    : "border-grafite-3 text-grafite-3 hover:border-grafite-2 hover:text-papel"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((plan) => {
              const meta = statusMeta[plan.status];
              const StatusIcon = meta.Icon;
              return (
                <Card
                  key={plan.id}
                  className="group overflow-hidden hover:border-traco-laranja/40 transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <button
                    onClick={() => setSelected(plan)}
                    className="relative w-full aspect-[3/2] bg-white block cursor-zoom-in"
                  >
                    <PlanThumb variant={plan.variant} />
                    <div className="absolute top-3 left-3">
                      <Badge variant={formatBadgeVariant(plan.format)} className="font-mono text-[10px] shadow-lg">
                        {plan.format}
                      </Badge>
                    </div>
                    <div
                      className={`absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-sm bg-grafite/90 backdrop-blur-sm border border-grafite-3 ${meta.className}`}
                    >
                      <StatusIcon
                        size={12}
                        className={plan.status === "processando" ? "animate-pulse" : ""}
                      />
                      <span className="text-[10px] font-mono font-semibold">{meta.label}</span>
                    </div>
                    {plan.status === "processando" && (
                      <div className="absolute inset-0 bg-grafite/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-2 border-traco-laranja border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-mono text-traco-claro">
                          IA lendo planta...
                        </span>
                      </div>
                    )}
                    {plan.status === "erro" && (
                      <div className="absolute inset-0 bg-red-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 px-6 text-center">
                        <AlertCircle size={24} className="text-red-400" />
                        <span className="text-xs font-mono text-red-300 leading-relaxed">
                          Não foi possível ler este arquivo. Verifique a qualidade do scan.
                        </span>
                      </div>
                    )}
                  </button>

                  <CardContent className="p-5">
                    <div className="mb-1">
                      <h3 className="font-display font-semibold text-white text-base leading-tight truncate">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-grafite-3 font-mono mt-1 truncate">
                        {plan.project}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 py-3 my-3 border-y border-grafite-2 text-xs text-grafite-3 font-mono">
                      <span className="flex items-center gap-1.5">
                        <HardDrive size={12} />
                        {plan.size}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {plan.uploadedAt.split(",")[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="flex items-center gap-2 text-grafite-3 text-xs">
                        <Ruler size={14} />
                        Área
                      </span>
                      <span className="font-mono text-white text-sm font-medium">
                        {plan.area}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="flex items-center gap-2 text-grafite-3 text-xs">
                        <DoorOpen size={14} />
                        Ambientes
                      </span>
                      <span className="font-mono text-white text-sm font-medium">
                        {plan.rooms > 0 ? plan.rooms : "—"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {plan.status === "concluida" ? (
                        <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                          <Link href="/dashboard">
                            <Eye size={14} className="mr-2" />
                            Ver Análise
                          </Link>
                        </Button>
                      ) : plan.status === "erro" ? (
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          <RefreshCw size={14} className="mr-2" />
                          Reprocessar
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1 text-xs" disabled>
                          <Clock size={14} className="mr-2 animate-pulse" />
                          Na fila da IA
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-grafite-3 hover:text-papel hover:bg-grafite-2"
                      >
                        <Download size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-grafite-3 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileImage size={48} className="mx-auto text-grafite-3 mb-4 opacity-50" />
            <h3 className="font-display text-xl font-semibold text-papel mb-2">
              Nenhuma planta encontrada
            </h3>
            <p className="text-grafite-3 text-sm mb-6">
              {search || statusFilter !== "todas"
                ? "Ajuste a busca ou os filtros para encontrar o que procura."
                : "Envie sua primeira planta baixa para começar a análise."}
            </p>
            <Button asChild className="gap-2">
              <Link href="/upload">
                <Upload size={18} />
                Enviar Planta
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-grafite border border-grafite-3 rounded-lg shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-grafite-3">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  {selected.name}
                </h2>
                <p className="text-xs text-grafite-3 font-mono mt-1">
                  {selected.project}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-sm text-grafite-3 hover:text-papel hover:bg-grafite-2 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="relative w-full aspect-[3/2] bg-white rounded-sm border border-grafite-3 overflow-hidden mb-6">
                <PlanThumb variant={selected.variant} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-grafite-3 font-mono mb-1">Formato</p>
                  <Badge variant={formatBadgeVariant(selected.format)} className="font-mono text-[10px]">
                    {selected.format}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-grafite-3 font-mono mb-1">Tamanho</p>
                  <p className="font-mono text-sm text-white">{selected.size}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-grafite-3 font-mono mb-1">Upload</p>
                  <p className="font-mono text-sm text-white">{selected.uploadedAt}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-grafite-3 font-mono mb-1">Área detectada</p>
                  <p className="font-mono text-sm text-traco-laranja font-semibold">{selected.area}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-grafite-3 font-mono mb-1">Ambientes</p>
                  <p className="font-mono text-sm text-white">
                    {selected.rooms > 0 ? selected.rooms : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-grafite-3 font-mono mb-1">Status</p>
                  <p className={`text-sm font-medium flex items-center gap-1.5 ${statusMeta[selected.status].className}`}>
                    {(() => {
                      const Icon = statusMeta[selected.status].Icon;
                      return <Icon size={14} />;
                    })()}
                    {statusMeta[selected.status].label}
                  </p>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download size={14} />
                  Baixar original
                </Button>
                {selected.status === "concluida" && (
                  <Button size="sm" className="gap-2" asChild>
                    <Link href="/dashboard">
                      <Eye size={14} />
                      Ver análise completa
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}