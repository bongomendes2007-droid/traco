"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Upload,
  BarChart3,
  DollarSign,
  FileText,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const ACCENT = "#FF5A1F";

const NAV_ITEMS = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Projetos", href: "/projetos" },
  { label: "Orçamentos", href: "/orcamentos" },
  { label: "Preços", href: "#recursos" },
];

const FEATURES = [
  {
    no: "01",
    title: "Upload inteligente",
    body: "Arraste sua planta em PDF ou DWG. Nossa IA identifica paredes, esquadrias e áreas automaticamente.",
    icon: Upload,
    href: "/upload",
    variant: "light" as const,
  },
  {
    no: "02",
    title: "Quantitativos",
    body: "Concreto, aço, alvenaria e acabamentos calculados em segundos, com precisão técnica.",
    icon: BarChart3,
    href: "/dashboard",
    variant: "dark" as const,
  },
  {
    no: "03",
    title: "Orçamento SINAPI",
    body: "Estimativa de custo baseada na tabela SINAPI atualizada, com margem de erro transparente.",
    icon: DollarSign,
    href: "/orcamentos",
    variant: "dark" as const,
  },
  {
    no: "04",
    title: "Relatórios",
    body: "Exporte tudo em PDF ou Excel. Pronto para enviar ao cliente ou usar na licitação.",
    icon: FileText,
    href: "/projetos",
    variant: "light" as const,
  },
];

const STEPS = [
  {
    no: "01",
    title: "Envie a planta",
    body: "Faça upload do PDF ou DWG. A IA reconhece a geometria e as camadas do desenho.",
  },
  {
    no: "02",
    title: "A IA processa",
    body: "Áreas, materiais e quantitativos são extraídos e cruzados com a base SINAPI vigente.",
  },
  {
    no: "03",
    title: "Receba o orçamento",
    body: "Custo estimado com margem ±8%, itemizado por serviço e pronto para exportar.",
  },
];

const TRUSTED = ["SINAPI", "CAIXA", "IBGE", "ABNT", "SICRO"];

function NavPill() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [pill, setPill] = useState({ transform: "translateX(0)", width: "0px" });

  const shown = hoverIdx ?? activeIdx;

  const updatePill = (idx: number) => {
    const el = itemRefs.current[idx];
    if (!el) return;
    setPill({ transform: `translateX(${el.offsetLeft}px)`, width: `${el.offsetWidth}px` });
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => {
        setHoverIdx(null);
        updatePill(activeIdx);
      }}
      className="relative hidden md:flex items-center gap-1 rounded-full p-[5px] bg-gradient-to-br from-[#eef1ee] to-[#e2eae4] shadow-[inset_0_1px_2px_rgba(255,255,255,.7),inset_0_-1px_3px_rgba(0,0,0,.05)]"
    >
      <div
        className="absolute top-[5px] left-0 h-[calc(100%-10px)] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,.12),0_1px_2px_rgba(0,0,0,.08)] pointer-events-none transition-[transform,width] duration-[380ms] ease-[cubic-bezier(.34,1.4,.5,1)]"
        style={pill}
      />
      {NAV_ITEMS.map((item, i) => (
        <Link
          key={item.label}
          href={item.href}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          onMouseEnter={() => {
            setHoverIdx(i);
            updatePill(i);
          }}
          className="relative z-[1] whitespace-nowrap rounded-full px-[18px] py-[9px] text-[15px] transition-colors"
          style={{
            fontWeight: i === shown ? 600 : 500,
            color: i === shown ? "#111110" : "#6f7a72",
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-papel text-[#111110]" style={{ fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}>
      <div className="max-w-[1240px] mx-auto px-8">
        {/* NAV */}
        <nav className="flex items-center justify-between py-[26px]">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/traco-civil-logo.png"
              alt="TRAÇO CIVIL"
              width={150}
              height={30}
              className="h-[30px] w-auto"
              priority
            />
          </Link>
          <NavPill />
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[15px] font-medium">
              Entrar
            </Link>
            <Link
              href="/upload"
              className="rounded-full bg-[#111110] px-5 py-[11px] text-sm font-semibold text-white"
            >
              Começar agora
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 items-center py-11 pb-[68px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#111110] px-[14px] py-[6px] mb-[26px] font-mono text-[11px] font-bold uppercase tracking-[.12em]">
              <span className="h-[7px] w-[7px] rounded-full" style={{ background: ACCENT }} />
              IA para engenharia civil
            </div>
            <h1 className="text-[42px] sm:text-[58px] leading-[1.02] font-bold tracking-[-.02em] mb-[22px]">
              Do traço à obra,{" "}
              <span
                className="px-[10px]"
                style={{ background: ACCENT, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}
              >
                sem adivinhação.
              </span>
            </h1>
            <p className="text-lg leading-[1.55] text-[#5c5c58] max-w-[460px] mb-[30px]">
              Envie sua planta baixa e receba em minutos os quantitativos de materiais e um
              orçamento estimativo baseado em SINAPI — com margem de erro transparente.
            </p>
            <div className="flex gap-[14px] flex-wrap mb-[26px]">
              <Link
                href="/upload"
                className="inline-flex items-center gap-[10px] rounded-xl bg-[#111110] px-6 py-[15px] text-[15px] font-semibold text-white"
              >
                <Upload size={16} strokeWidth={2.2} />
                Enviar planta agora
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-[10px] rounded-xl border-[1.5px] border-[#111110] bg-white px-6 py-[15px] text-[15px] font-semibold text-[#111110]"
              >
                Ver demo do dashboard
              </Link>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#8a8a85]">
              <ShieldCheck size={14} className="text-[#111110]" strokeWidth={2} />
              Margem ±8% · Base SINAPI 08/2026 · Sem cartão de crédito
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="absolute -inset-x-[4%] -inset-y-[6%] rounded-[28px] bg-[#f4f4f1]" />
            <svg
              className="absolute -top-[14px] right-[34px] traco-spin"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill={ACCENT}
            >
              <path d="M12 0l2.6 8.4L23 6l-6.2 6.2L23 18l-8.4-2.6L12 24l-2.6-8.6L1 18l6.2-5.8L1 6l8.4 2.4z" />
            </svg>
            <div className="absolute bottom-4 -left-[14px] h-[30px] w-[30px] rounded-full bg-[#111110] traco-float" />
            <div
              className="absolute top-10 -left-2 h-4 w-4 rounded-full"
              style={{ background: ACCENT }}
            />
            <div className="relative p-[22px]">
              <svg
                viewBox="0 0 520 400"
                className="w-full h-auto block"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="64" y="74" width="182" height="132" fill={ACCENT} opacity="0.1" />
                <rect x="254" y="74" width="182" height="132" fill="#111110" opacity="0.04" />
                <rect x="64" y="74" width="372" height="242" stroke="#111110" strokeWidth="4" />
                <rect
                  x="72"
                  y="82"
                  width="356"
                  height="226"
                  stroke="#111110"
                  strokeWidth="1"
                  opacity="0.35"
                />
                <path
                  d="M250 74 V150 M250 176 V206 M64 206 H150 M176 206 H436"
                  stroke="#111110"
                  strokeWidth="4"
                />
                <path
                  d="M250 150 A26 26 0 0 1 224 176"
                  stroke="#111110"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <path
                  d="M150 206 A26 26 0 0 1 176 232"
                  stroke="#111110"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <path d="M120 74 H180 M300 74 H370" stroke="#faf6f0" strokeWidth="4" />
                <path d="M120 74 H180 M300 74 H370" stroke="#111110" strokeWidth="1.2" />
                <path d="M64 240 V285 M436 130 V190" stroke="#faf6f0" strokeWidth="4" />
                <path d="M64 240 V285 M436 130 V190" stroke="#111110" strokeWidth="1.2" />
                <text
                  x="155"
                  y="145"
                  fontFamily="var(--font-ibm-plex-mono), monospace"
                  fontSize="11"
                  fill="#8a8a85"
                  textAnchor="middle"
                >
                  SALA
                </text>
                <text
                  x="345"
                  y="145"
                  fontFamily="var(--font-ibm-plex-mono), monospace"
                  fontSize="11"
                  fill="#8a8a85"
                  textAnchor="middle"
                >
                  QUARTO
                </text>
                <text
                  x="250"
                  y="270"
                  fontFamily="var(--font-ibm-plex-mono), monospace"
                  fontSize="11"
                  fill="#8a8a85"
                  textAnchor="middle"
                >
                  ÁREA COMUM
                </text>
                <rect
                  x="50"
                  y="60"
                  width="400"
                  height="270"
                  stroke={ACCENT}
                  strokeWidth="2"
                  strokeDasharray="7 7"
                  opacity="0.9"
                />
                <path
                  d="M50 84 V60 H74 M426 60 H450 V84 M450 306 V330 H426 M74 330 H50 V306"
                  stroke={ACCENT}
                  strokeWidth="3.5"
                  fill="none"
                />
                <path d="M64 356 H436" stroke="#111110" strokeWidth="1.2" />
                <path d="M64 350 V362 M436 350 V362" stroke="#111110" strokeWidth="1.2" />
                <rect x="215" y="346" width="90" height="20" rx="4" fill="#faf6f0" />
                <text
                  x="260"
                  y="360"
                  fontFamily="var(--font-ibm-plex-mono), monospace"
                  fontSize="11"
                  fill="#111110"
                  textAnchor="middle"
                >
                  12,40 m
                </text>
                <g>
                  <line
                    x1="345"
                    y1="120"
                    x2="405"
                    y2="52"
                    stroke="#111110"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <rect x="360" y="30" width="140" height="30" rx="15" fill="#111110" />
                  <circle cx="378" cy="45" r="5" fill={ACCENT} />
                  <text
                    x="392"
                    y="49"
                    fontFamily="var(--font-space-grotesk), sans-serif"
                    fontSize="12"
                    fontWeight="600"
                    fill="#ffffff"
                  >
                    Alvenaria · 86 m²
                  </text>
                </g>
                <g>
                  <line
                    x1="150"
                    y1="140"
                    x2="70"
                    y2="188"
                    stroke="#111110"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <rect
                    x="18"
                    y="176"
                    width="128"
                    height="30"
                    rx="15"
                    fill="#ffffff"
                    stroke="#111110"
                    strokeWidth="1.5"
                  />
                  <circle cx="36" cy="191" r="5" fill={ACCENT} />
                  <text
                    x="50"
                    y="195"
                    fontFamily="var(--font-space-grotesk), sans-serif"
                    fontSize="12"
                    fontWeight="600"
                    fill="#111110"
                  >
                    Concreto · 14 m³
                  </text>
                </g>
                <path
                  d="M420 250 l3.4 9 9 3.4 -9 3.4 -3.4 9 -3.4 -9 -9 -3.4 9 -3.4z"
                  fill={ACCENT}
                />
              </svg>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-[#ececea] py-[26px] mb-[88px]">
          <div className="flex items-center gap-7">
            <span className="flex-none font-mono text-[11px] uppercase tracking-[.1em] text-[#9a9a95]">
              Baseado em
              <br />
              dados oficiais
            </span>
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
                maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
              }}
            >
              <div className="traco-belt">
                {[...TRUSTED, ...TRUSTED].map((name, i) => (
                  <span
                    key={i}
                    className="flex-none px-[34px] text-xl font-bold tracking-[.02em] text-[#b3b3ad] whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RECURSOS */}
        <section id="recursos" className="mb-24">
          <div className="flex items-end gap-7 mb-9 flex-wrap">
            <span
              className="text-[26px] font-bold tracking-[-.01em] px-3 py-[2px]"
              style={{ background: ACCENT }}
            >
              Recursos
            </span>
            <p className="text-base leading-[1.5] text-[#5c5c58] max-w-[440px] m-0">
              Do upload da planta ao orçamento pronto para licitação — quatro etapas que a TRAÇO
              resolve automaticamente com precisão técnica.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              const dark = f.variant === "dark";
              return (
                <Link
                  key={f.no}
                  href={f.href}
                  className="relative flex flex-col rounded-[22px] p-[30px] min-h-[230px]"
                  style={{
                    background: dark ? "#111110" : "#ffffff",
                    border: dark ? "none" : "1.5px solid #111110",
                    color: dark ? "#ffffff" : "#111110",
                  }}
                >
                  <span
                    className="absolute top-[26px] right-7 font-mono text-[13px]"
                    style={{ color: dark ? "#5c5c58" : "#b3b3ad" }}
                  >
                    {f.no}
                  </span>
                  <div
                    className="mb-auto flex h-[46px] w-[46px] items-center justify-center rounded-xl"
                    style={{ background: dark ? ACCENT : "#111110" }}
                  >
                    <Icon size={22} color={dark ? "#111110" : ACCENT} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold mt-[22px] mb-[10px]">
                    <span
                      className="px-2 py-px text-[#111110]"
                      style={{ background: ACCENT, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}
                    >
                      {f.title}
                    </span>
                  </h3>
                  <p
                    className="text-[15px] leading-[1.5] mb-5 max-w-[340px]"
                    style={{ color: dark ? "#9a9a92" : "#5c5c58" }}
                  >
                    {f.body}
                  </p>
                  <span className="inline-flex items-center gap-[10px] text-sm font-semibold mt-auto">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{
                        background: dark ? ACCENT : "#111110",
                        color: dark ? "#111110" : "#ffffff",
                      }}
                    >
                      <ArrowUpRight size={14} strokeWidth={2.4} />
                    </span>
                    Saiba mais
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA BAND */}
        <section className="relative rounded-[28px] bg-[#f4f4f1] px-8 sm:px-14 py-[52px] mb-24 overflow-hidden">
          <div className="relative z-[1] max-w-[520px]">
            <h2 className="text-[34px] font-bold tracking-[-.02em] mb-[14px]">
              Vamos tirar seu projeto do papel.
            </h2>
            <p className="text-base leading-[1.55] text-[#5c5c58] mb-[26px]">
              Envie uma planta baixa agora e veja em minutos quanto sua obra vai consumir de
              material e custar de verdade. Sem planilha, sem chute.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-[10px] rounded-xl bg-[#111110] px-[26px] py-[15px] text-[15px] font-semibold text-white"
            >
              Receber orçamento grátis
            </Link>
          </div>
          <svg
            className="absolute right-[150px] top-11 traco-spin-slow hidden sm:block"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="#111110"
          >
            <path d="M12 0l2.6 8.4L23 6l-6.2 6.2L23 18l-8.4-2.6L12 24l-2.6-8.6L1 18l6.2-5.8L1 6l8.4 2.4z" />
          </svg>
          <div
            className="absolute right-[78px] bottom-[52px] h-[88px] w-[88px] rounded-full traco-float-slow hidden sm:block"
            style={{ background: ACCENT }}
          />
          <div className="absolute right-14 top-[70px] h-[120px] w-[120px] rounded-full border-2 border-[#111110] opacity-50 hidden sm:block" />
          <div className="absolute right-[210px] bottom-11 h-5 w-5 rotate-45 bg-[#111110] hidden sm:block" />
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="mb-[88px]">
          <div className="flex items-baseline gap-5 mb-[26px] flex-wrap">
            <span className="text-[26px] font-bold px-3 py-[2px]" style={{ background: ACCENT }}>
              Como funciona
            </span>
            <p className="text-[15px] text-[#5c5c58] m-0 max-w-[420px]">
              Três passos entre a sua planta e um orçamento confiável.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 rounded-3xl bg-[#111110] p-11">
            {STEPS.map((s) => (
              <div key={s.no}>
                <span className="font-mono text-[13px]" style={{ color: ACCENT }}>
                  {s.no}
                </span>
                <h4 className="text-xl font-bold text-white mt-[14px] mb-[10px]">{s.title}</h4>
                <p className="text-sm leading-[1.55] text-[#9a9a92] m-0">{s.body}</p>
                <span
                  className="inline-flex items-center gap-2 text-[13px] font-semibold mt-4"
                  style={{ color: ACCENT }}
                >
                  Saiba mais
                  <ArrowRight size={13} strokeWidth={2.4} />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#ececea] py-[34px] mb-5">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/traco-civil-logo.png"
              alt="TRAÇO CIVIL"
              width={110}
              height={22}
              className="h-[22px] w-auto"
            />
            <span className="font-mono text-xs text-[#8a8a85]">
              © 2026 — IA para Engenharia Civil
            </span>
          </div>
          <span className="font-mono text-xs text-[#8a8a85]">
            Do traço à obra, sem adivinhação.
          </span>
        </footer>
      </div>
    </main>
  );
}
