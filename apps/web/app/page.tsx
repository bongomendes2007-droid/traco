import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-grafite text-papel">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-grafite-3 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-grafite-2 lg:p-4">
          TRAÇO v0.1.0 — Arquitetura Inicializada
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-traco-laranja before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-traco-brasa after:via-transparent after:to-traco-fogo after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-traco-laranja before:dark:opacity-10 after:dark:from-traco-claro after:dark:via-[#ff5a1f] after:dark:opacity-10 before:lg:h-[360px] z-[-1]">
        <div className="relative w-full max-w-4xl mx-auto text-center">
           <h1 className="text-6xl font-display font-bold tracking-tighter mb-6 text-white">
            Do traço à obra, <br/>
            <span className="text-traco-laranja">sem adivinhação.</span>
          </h1>
          <p className="text-xl text-grafite-3 max-w-2xl mx-auto mb-10 font-sans">
            IA para engenharia civil. Quantitativos e orçamento estimativo a partir da sua planta baixa.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-traco-laranja hover:bg-traco-brasa text-white px-8 py-3 rounded-sm font-display font-semibold transition-colors"
            >
              Acessar Dashboard
            </Link>
            <Link
              href="/docs"
              className="border border-grafite-3 hover:border-traco-laranja text-white px-8 py-3 rounded-sm font-display font-semibold transition-colors"
            >
              Documentação
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mt-20 gap-8">
        <div className="group rounded-lg border border-grafite-3 px-5 py-4 transition-colors hover:border-traco-laranja hover:bg-grafite-2/50">
          <h2 className={`mb-3 text-2xl font-display font-semibold`}>
            Upload Inteligente{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Arraste sua planta (PDF/DWG). Nossa IA identifica paredes, esquadrias e áreas automaticamente.
          </p>
        </div>

        <div className="group rounded-lg border border-grafite-3 px-5 py-4 transition-colors hover:border-traco-laranja hover:bg-grafite-2/50">
          <h2 className={`mb-3 text-2xl font-display font-semibold`}>
            Quantitativos{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Concreto, aço, alvenaria e acabamentos calculados em segundos com precisão técnica.
          </p>
        </div>

        <div className="group rounded-lg border border-grafite-3 px-5 py-4 transition-colors hover:border-traco-laranja hover:bg-grafite-2/50">
          <h2 className={`mb-3 text-2xl font-display font-semibold`}>
            Orçamento SINAPI{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Estimativa de custo baseada na tabela SINAPI atualizada, com margem de erro transparente.
          </p>
        </div>

        <div className="group rounded-lg border border-grafite-3 px-5 py-4 transition-colors hover:border-traco-laranja hover:bg-grafite-2/50">
          <h2 className={`mb-3 text-2xl font-display font-semibold`}>
            Relatórios{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Exporte tudo em PDF ou Excel. Pronto para enviar ao cliente ou usar na licitação.
          </p>
        </div>
      </div>
    </main>
  );
}