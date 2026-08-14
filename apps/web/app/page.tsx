import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Upload, BarChart3, DollarSign, FileText, ArrowRight, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-grafite text-papel flex flex-col relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#FF5A1F 1px, transparent 1px), linear-gradient(90deg, #FF5A1F 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-traco-laranja/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-grafite-3 px-8 py-4 flex items-center justify-between bg-grafite/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3">
          <Logo size="md" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/projetos" className="text-sm text-grafite-3 hover:text-traco-laranja transition-colors font-medium hidden sm:block">
            Projetos
          </Link>
          <Link href="/orcamentos" className="text-sm text-grafite-3 hover:text-traco-laranja transition-colors font-medium hidden sm:block">
            Orçamentos
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button size="sm" asChild className="gap-2">
            <Link href="/upload">
              Começar Agora
              <ArrowRight size={14} />
            </Link>
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex items-center justify-center p-8 pt-20 pb-16">
        <div className="max-w-5xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-traco-laranja/30 bg-traco-laranja/5 mb-8">
            <Zap size={14} className="text-traco-laranja" />
            <span className="text-xs font-mono text-traco-laranja uppercase tracking-wider">
              IA para Engenharia Civil
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tighter mb-6 text-white leading-[1.05]">
            Do traço à obra,
            <br />
            <span className="text-traco-laranja">sem adivinhação.</span>
          </h1>

          <p className="text-xl text-grafite-3 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            Envie sua planta baixa e receba em minutos quantitativos de materiais e orçamento estimativo baseado em SINAPI — com margem de erro transparente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" asChild className="gap-2 h-12 px-8 text-base">
              <Link href="/upload">
                <Upload size={18} />
                Enviar Planta Agora
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base">
              <Link href="/dashboard">
                Ver Demo do Dashboard
              </Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-grafite-3 font-mono">
            <ShieldCheck size={14} className="text-traco-laranja/60" />
            <span>Estimativas com margem ±8% • Base SINAPI 08/2026 • Sem cartão de crédito</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              href="/upload"
              icon={<Upload size={20} />}
              number="01"
              title="Upload Inteligente"
              description="Arraste sua planta (PDF/DWG). Nossa IA identifica paredes, esquadrias e áreas automaticamente."
            />
            <FeatureCard
              href="/dashboard"
              icon={<BarChart3 size={20} />}
              number="02"
              title="Quantitativos"
              description="Concreto, aço, alvenaria e acabamentos calculados em segundos com precisão técnica."
            />
            <FeatureCard
              href="/orcamentos"
              icon={<DollarSign size={20} />}
              number="03"
              title="Orçamento SINAPI"
              description="Estimativa de custo baseada na tabela SINAPI atualizada, com margem de erro transparente."
            />
            <FeatureCard
              href="/projetos"
              icon={<FileText size={20} />}
              number="04"
              title="Relatórios"
              description="Exporte tudo em PDF ou Excel. Pronto para enviar ao cliente ou usar na licitação."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-grafite-3 px-8 py-6 flex items-center justify-between text-xs text-grafite-3 font-mono">
        <span>TRAÇO © 2026 — IA para Engenharia Civil</span>
        <span>Do traço à obra, sem adivinhação.</span>
      </footer>
    </main>
  );
}

function FeatureCard({
  href,
  icon,
  number,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block p-6 rounded-lg border border-grafite-3 bg-grafite-2/20 hover:border-traco-laranja/40 hover:bg-grafite-2/40 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-traco-laranja/10 border border-traco-laranja/20 flex items-center justify-center text-traco-laranja group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="font-mono text-traco-laranja text-sm font-bold">{number}</span>
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-2 flex items-center gap-2">
        {title}
        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </h3>
      <p className="text-sm text-grafite-3 leading-relaxed">{description}</p>
    </Link>
  );
}