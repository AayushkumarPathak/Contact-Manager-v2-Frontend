import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react';

function ThemeToogle() {
    const {theme,toggleTheme }= useTheme();

  return (
    <div>
      <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
    </div>
  )
}

export default ThemeToogle;
