"use client";

import { cn } from "@/lib/utils";
import { Bell, Search, HelpCircle } from "lucide-react";

interface TopbarProps {
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function Topbar({ breadcrumbs, className }: TopbarProps) {
  return (
    <header className={cn(
      "h-16 border-b border-grafite-3 flex items-center justify-between px-8 bg-grafite sticky top-0 z-40",
      className
    )}>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-grafite-3">/</span>}
              <span className={cn(
                "font-mono",
                i === breadcrumbs.length - 1 ? "text-white" : "text-grafite-3"
              )}>
                {crumb.label}
              </span>
            </span>
          ))
        ) : (
          <span className="font-mono text-grafite-3">Dashboard</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-sm text-grafite-3 hover:text-papel hover:bg-grafite-2 transition-colors">
          <Search size={18} />
        </button>
        <button className="p-2 rounded-sm text-grafite-3 hover:text-papel hover:bg-grafite-2 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-traco-laranja rounded-full" />
        </button>
        <button className="p-2 rounded-sm text-grafite-3 hover:text-papel hover:bg-grafite-2 transition-colors">
          <HelpCircle size={18} />
        </button>
        <div className="w-px h-6 bg-grafite-3 mx-2" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-papel leading-tight">Marina Prado</p>
            <p className="text-[10px] text-grafite-3 font-mono leading-tight">Pro Plan</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-traco-laranja/20 border border-traco-laranja/30 flex items-center justify-center text-xs font-bold text-traco-laranja font-mono">
            MP
          </div>
        </div>
      </div>
    </header>
  );
}