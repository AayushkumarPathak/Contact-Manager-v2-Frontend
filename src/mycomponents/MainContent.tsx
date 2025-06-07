import React from 'react';
import MyContacts from './MyContacts';
import AddContact from './AddContact';
import FavoriteContacts from './FavoriteContacts';
import AppSettings from './AppSettings';

interface MainContentProps {
  activeItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  const getContent = () => {
    switch (activeItem) {
      case 'contacts':
        return (
          <MyContacts/>
        );
      case 'add':
        return (
         <AddContact/>
        );
      case 'favorites':
        return (
         <FavoriteContacts/>
        );
      case 'settings':
        return (
          <AppSettings/>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              Welcome
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <p className="text-slate-600 dark:text-slate-300">
                Select an option from the sidebar to get started.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 p-4 lg:p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {getContent()}
      </div>
    </main>
  );
};

export default MainContent;