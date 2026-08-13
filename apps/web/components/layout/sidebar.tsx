"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import {
  LayoutGrid,
  FolderOpen,
  FileImage,
  BarChart3,
  DollarSign,
  Settings,
  Upload,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/upload", label: "Nova Análise", icon: Upload },
  { href: "/projetos", label: "Projetos", icon: FolderOpen },
  { href: "/plantas", label: "Plantas", icon: FileImage },
  { href: "/analises", label: "Análises", icon: BarChart3 },
  { href: "/orcamentos", label: "Orçamentos", icon: DollarSign },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-grafite-3 flex flex-col bg-grafite h-screen sticky top-0">
      <div className="p-6 flex items-center justify-between mb-8">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-grafite-2 text-white border-l-2 border-traco-laranja pl-[14px]"
                  : "text-grafite-3 hover:bg-grafite-2/50 hover:text-papel"
              )}
            >
              <Icon
                size={18}
                className={cn(
                  "transition-colors",
                  isActive ? "text-traco-laranja" : "opacity-60 group-hover:opacity-100"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-grafite-3">
        <Link
          href="/configuracoes"
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-grafite-3 hover:bg-grafite-2/50 hover:text-papel transition-all"
        >
          <Settings size={18} className="opacity-60" />
          Configurações
        </Link>
      </div>

      {/* User Profile Mini */}
      <div className="p-4 border-t border-grafite-3 bg-grafite-2/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-traco-laranja/20 border border-traco-laranja/30 flex items-center justify-center text-xs font-bold text-traco-laranja font-mono">
            MP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-papel truncate">Marina Prado</p>
            <p className="text-xs text-grafite-3 font-mono truncate">Eng. Orçamentos</p>
          </div>
        </div>
      </div>
    </aside>
  );
}