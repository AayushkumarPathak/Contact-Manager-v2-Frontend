import React, { useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Users, 
  UserPlus, 
  Heart, 
  Settings 
} from 'lucide-react';
import { useUserContext } from '@/contexts/user-context';
import { makeTitleCase } from '@/util/helpers';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { id: 'contacts', label: 'My Contacts', icon: Users, path: '/user/contacts' },
  { id: 'add', label: 'Add Contact', icon: UserPlus, path: '/user/add' },
  
  { id: 'settings', label: 'Settings', icon: Settings, path: '/user/settings' },
];
// { id: 'favorites', label: 'Favorites', icon: Heart, path: '/user/favorites' },

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { user, loading: userLoading } = useUserContext();
  const location = useLocation();

  return (
    <aside className={`bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        {!isCollapsed && (
          <span className="font-medium text-slate-900 dark:text-white">v2</span>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
            <Link to={"/user/profile"}>
            <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </Link>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              {userLoading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-24"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-32"></div>
                </div>
              ) : (
                <>
                  <Link to="/user/profile" className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {makeTitleCase(user?.fullName ? user.fullName : "") || 'No User'}
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user?.email || 'No Email'}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;