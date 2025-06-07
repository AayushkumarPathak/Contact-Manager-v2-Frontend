import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToogle from './ThemeToogle';

import {Menu} from 'lucide-react'


const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isCurrentRoute = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200"
            >
              <p className=''>Contact Manager v2</p>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`
                  ${location.pathname === '/' ? 'bg-slate-600 text-white' : ''}
                  text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-400 dark:hover:bg-blue-400`}
              >
                Home
              </Link>
              <Link
                to="/login"
                className={`text-slate-700
                  ${location.pathname === '/login' ? 'bg-slate-600 text-white' : ''}
                  dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-400 dark:hover:bg-blue-400`
                }
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={` 
                  ${location.pathname === '/signup' ? 'bg-slate-600 text-white' : ''} dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-400 dark:hover:bg-blue-400`
                }
              >
                Register
              </Link>
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToogle/>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <Menu></Menu> : <Menu/>}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-200 dark:border-slate-700">
              <Link
                to="/"
                className={`
                  ${location.pathname === '/' ? 'bg-slate-600 text-white' : ''}
                  dark:text-slate-200 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-blue-400 dark:hover:bg-blue-400`
                }
              >
                Home
              </Link>
              <Link
                to="/login"
                className={`
                  ${location.pathname === '/login' ? 'bg-slate-600 text-white' : ''}
                  dark:text-slate-200 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-blue-400 dark:hover:bg-blue-400`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`
                  ${location.pathname === '/signup' ? 'bg-slate-600 text-white' : ''}
                  dark:text-slate-200 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-blue-400 dark:hover:bg-blue-400`}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
