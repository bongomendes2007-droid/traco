import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  return (
    <div className="flex h-screen bg-grafite text-papel overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-grafite-2/20 overflow-hidden">
        <Topbar breadcrumbs={breadcrumbs} />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}