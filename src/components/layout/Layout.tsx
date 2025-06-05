import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isCollapsed={isSidebarOpen} setIsCollapsed={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1920px]">
            <Outlet />
          </div>
        </main>
        <footer className="w-full py-3 bg-gray-900 border-t border-gray-800 text-center text-xs text-gray-400">
          Powered by Creo Solutions
        </footer>
      </div>
    </div>
  );
};

export default Layout; 