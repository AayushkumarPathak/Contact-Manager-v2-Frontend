import React from 'react';
import { LogOut } from 'lucide-react';
import ThemeToogle from './ThemeToogle';

interface TopNavProps {
 
  onLogout: () => void;
}


const TopNav: React.FC<TopNavProps> = ({ onLogout }) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
      <div className='mx-10'>
        <h1 className="text-2xl sm:mx-28 lg:mx-0 font-semibold text-slate-900 dark:text-white">
        Contact Manager v2
      </h1>
      </div>
      
      <div className="flex items-center gap-3">
       <ThemeToogle/>
        
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopNav;