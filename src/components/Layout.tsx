import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Chatbot } from "./Chatbot";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onToggleSidebar={toggleSidebar} cartItemsCount={3} />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {children}
        </main>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}