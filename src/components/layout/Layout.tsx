import { ReactNode, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAppStore } from '@/context/store';

export default function Layout({ children }: { children: ReactNode }) {
  const { setSidebarOpen } = useAppStore();

  useEffect(() => {
    // On mobile screens, initialize sidebar as closed to avoid blocking backdrop overlay
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-1 dark:bg-surface-dark-0">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
