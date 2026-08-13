"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Box,
  Ruler,
  Layers,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Download,
  RefreshCw,
  Maximize2
} from "lucide-react";

export default function DashboardPage() {
  const breadcrumbs = [
    { label: "Projetos", href: "/projetos" },
    { label: "Residencial Alpha" },
    { label: "Planta Térreo" },
  ];

  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="flex h-full">
        {/* Canvas Area */}
        <div className="flex-1 relative bg-[#0F0D0B] flex flex-col overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="h-12 border-b border-grafite-3 bg-grafite/50 backdrop-blur-sm flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="font-mono text-[10px]">
                IA ATIVA
              </Badge>
              <span className="text-xs text-grafite-3 font-mono">
                Detecção automática • 4 ambientes identificados
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-sm text-grafite-3 hover:text-papel hover:bg-grafite-2 transition-colors">
                <Maximize2 size={16} />
              </button>
              <button className="p-1.5 rounded-sm text-grafite-3 hover:text-papel hover:bg-grafite-2 transition-colors">
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* Blueprint Canvas */}
          <div className="flex-1 relative flex items-center justify-center p-8 overflow-auto">
            {/* Grid Background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(#3D352F 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Blueprint Container */}
            <div className="relative w-full max-w-5xl aspect-[4/3] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-grafite-3 rounded-sm overflow-hidden">
              {/* SVG Blueprint */}
              <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E5E5" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="800" height="600" fill="#FAFAFA"/>
                <rect width="800" height="600" fill="url(#blueprint-grid)"/>

                {/* Main Walls */}
                <path d="M100 100 H700 V500 H100 Z" fill="none" stroke="#1C1815" strokeWidth="6"/>
                <path d="M100 300 H400" fill="none" stroke="#1C1815" strokeWidth="4"/>
                <path d="M400 100 V500" fill="none" stroke="#1C1815" strokeWidth="4"/>
                <path d="M400 300 H700" fill="none" stroke="#1C1815" strokeWidth="4"/>

                {/* Door Arc */}
                <path d="M250 100 A40 40 0 0 1 290 140" fill="none" stroke="#4A433D" strokeWidth="2"/>
                <line x1="250" y1="100" x2="250" y2="140" stroke="#4A433D" strokeWidth="2"/>

                {/* Window */}
                <rect x="500" y="94" width="120" height="12" fill="#fff" stroke="#1C1815" strokeWidth="2"/>
                <line x1="500" y1="100" x2="620" y2="100" stroke="#1C1815" strokeWidth="1"/>

                {/* Dimension Lines */}
                <g stroke="#837A70" strokeWidth="1" fill="#837A70">
                  <line x1="100" y1="70" x2="700" y2="70"/>
                  <line x1="100" y1="65" x2="100" y2="75"/>
                  <line x1="700" y1="65" x2="700" y2="75"/>
                  <text x="400" y="65" fontFamily="monospace" fontSize="14" textAnchor="middle" fill="#4A433D">15.00 m</text>
                </g>

                {/* Room Labels (Technical) */}
                <text x="250" y="210" fontFamily="monospace" fontSize="12" textAnchor="middle" fill="#837A70">SALA DE ESTAR</text>
                <text x="250" y="225" fontFamily="monospace" fontSize="10" textAnchor="middle" fill="#837A70">28.50 m²</text>

                <text x="250" y="410" fontFamily="monospace" fontSize="12" textAnchor="middle" fill="#837A70">COZINHA</text>
                <text x="250" y="425" fontFamily="monospace" fontSize="10" textAnchor="middle" fill="#837A70">18.20 m²</text>

                <text x="550" y="210" fontFamily="monospace" fontSize="12" textAnchor="middle" fill="#837A70">SUÍTE 01</text>
                <text x="550" y="225" fontFamily="monospace" fontSize="10" textAnchor="middle" fill="#837A70">22.40 m²</text>

                <text x="550" y="410" fontFamily="monospace" fontSize="12" textAnchor="middle" fill="#837A70">BANHEIRO</text>
                <text x="550" y="425" fontFamily="monospace" fontSize="10" textAnchor="middle" fill="#837A70">8.60 m²</text>
              </svg>

              {/* AI Detection Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                <DetectionBox top="16.6%" left="12.5%" width="37.5%" height="33.3%" label="Sala Estar" confidence="98%" />
                <DetectionBox top="50%" left="12.5%" width="37.5%" height="33.3%" label="Cozinha" confidence="96%" />
                <DetectionBox top="16.6%" left="50%" width="37.5%" height="33.3%" label="Suíte 01" confidence="99%" />
                <DetectionBox top="50%" left="50%" width="37.5%" height="33.3%" label="Banheiro" confidence="97%" />
              </div>
            </div>
          </div>

          {/* Canvas Footer Info */}
          <div className="h-10 border-t border-grafite-3 bg-grafite/50 backdrop-blur-sm flex items-center justify-between px-4 text-xs font-mono text-grafite-3">
            <span>Escala 1:50 • PDF 2.4MB</span>
            <span>Última análise: 12s atrás</span>
          </div>
        </div>

        {/* Right Panel */}
        <aside className="w-[420px] border-l border-grafite-3 bg-grafite flex flex-col overflow-hidden">
          {/* Panel Header */}
          <div className="p-6 border-b border-grafite-3 bg-grafite-2/20">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">Análise por IA</h2>
                <p className="text-xs text-grafite-3 font-mono mt-1">
                  Processado em 12s • Confiança 98%
                </p>
              </div>
              <Badge variant="success" className="font-mono text-[10px]">
                CONCLUÍDO
              </Badge>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Warning Alert */}
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-xs leading-relaxed">
                Os valores abaixo são <strong>estimativas</strong> com margem de ±8%. Consulte um engenheiro responsável antes de decisões finais.
              </AlertDescription>
            </Alert>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Área Total"
                value="142.6"
                unit="m²"
                icon={<Ruler size={16} />}
                highlight
              />
              <StatCard
                label="Ambientes"
                value="4"
                unit="detectados"
                icon={<Layers size={16} />}
              />
            </div>

            {/* Elements Detected */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Box size={16} className="text-traco-laranja" />
                  Elementos Estruturais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                <DataRow label="Pilares" value="24" />
                <DataRow label="Vigas" value="37" />
                <DataRow label="Lajes" value="18" />
                <DataRow label="Paredes" value="56" />
                <DataRow label="Esquadrias" value="23" last />
              </CardContent>
            </Card>

            {/* Quantities */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp size={16} className="text-traco-laranja" />
                  Quantitativos Estimados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0">
                <DataRow label="Concreto" value="32.45 m³" />
                <DataRow label="Aço CA-50" value="4.78 ton" />
                <DataRow label="Alvenaria" value="152.40 m²" />
                <DataRow label="Formas" value="285.60 m²" last />
              </CardContent>
            </Card>
          </div>

          {/* Cost Card (Fixed Bottom) */}
          <div className="p-6 border-t border-grafite-3 bg-grafite-2/30 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-grafite-2 to-grafite border border-traco-laranja/30 rounded-sm p-6 shadow-[0_0_30px_rgba(255,90,31,0.1)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-grafite-3 font-semibold flex items-center gap-2">
                  <DollarSign size={14} className="text-traco-laranja" />
                  Orçamento Estimado
                </span>
                <Badge variant="mono" className="text-[10px]">SINAPI 08/26</Badge>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-mono text-3xl font-bold text-traco-laranja tracking-tight">
                  R$ 287.540,60
                </span>
              </div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-grafite-3">
                <Badge variant="default" className="font-mono text-xs">
                  ±8% margem
                </Badge>
                <span className="text-xs text-grafite-3 font-mono">
                  R$ 2.016,41/m²
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Download size={14} className="mr-2" />
                  Exportar
                </Button>
                <Button variant="default" size="sm" className="w-full text-xs">
                  Ver Relatório
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

// Helper Components
function DetectionBox({
  top,
  left,
  width,
  height,
  label,
  confidence
}: {
  top: string;
  left: string;
  width: string;
  height: string;
  label: string;
  confidence: string;
}) {
  return (
    <div
      className="absolute border-2 border-traco-laranja bg-traco-laranja/10 backdrop-blur-[1px] group transition-all duration-300 hover:bg-traco-laranja/20 hover:border-traco-laranja"
      style={{ top, left, width, height }}
    >
      {/* Corner Markers */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-traco-laranja" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-traco-laranja" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-traco-laranja" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-traco-laranja" />

      {/* Label */}
      <div className="absolute -top-7 left-0 flex items-center gap-2">
        <span className="bg-traco-laranja text-white font-mono text-[10px] px-2 py-0.5 font-bold leading-none shadow-lg">
          {label}
        </span>
        <span className="bg-grafite text-traco-claro font-mono text-[9px] px-1.5 py-0.5 border border-grafite-3 leading-none">
          {confidence}
        </span>
      </div>
    </div>
  );
}

function DataRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2.5 ${!last ? 'border-b border-grafite-2' : ''}`}>
      <span className="text-sm text-papel/70">{label}</span>
      <span className="font-mono text-sm text-white font-medium">{value}</span>
    </div>
  );
}