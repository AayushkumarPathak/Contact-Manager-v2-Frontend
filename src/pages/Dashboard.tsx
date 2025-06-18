import { useState, useEffect } from "react";
import { Menu} from 'lucide-react';
import Sidebar from "@/mycomponents/Sidebar";
import MobileSidebar from "@/mycomponents/MobileSidebar";
import TopNav from "@/mycomponents/TopNav";
import MainContent from "@/mycomponents/MainContent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initializeUserContext } from "@/contexts/user-context";

// Main Dashboard Component
const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('contacts');
  const navigate = useNavigate();

  useEffect(() => {
    const user = initializeUserContext();
    if (user) {
      console.log("User initialized in context:", user);
    }
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic
    localStorage.removeItem("loginToken");
    toast.success("Logging out");
    setTimeout(()=>{
      navigate("/login")
    },1000);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 ${isDark ? 'dark' : ''}`}>
      <div className="flex h-screen">
        {/* Mobile Menu Button */}
        <button
          onClick={openMobileMenu}
          className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm lg:hidden"
        >
          <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={toggleSidebar}
            activeItem={activeItem}
            onItemClick={setActiveItem}
          />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={closeMobileMenu}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopNav
            onLogout={handleLogout}
          />
          
          <MainContent activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;