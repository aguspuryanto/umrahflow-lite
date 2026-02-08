import React from 'react';
import { Moon, Search } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView; 
  setView: (v: AppView) => void; 
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  onLogin: () => void;
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  setView, 
  showLogin, 
  setShowLogin, 
  onLogin, 
  isLoggedIn 
}) => {
  const navItems = isLoggedIn ? [] : [
    { view: AppView.LANDING, label: 'Beranda' },
    { view: AppView.PACKAGES, label: 'Paket' },
    { view: AppView.COMMUNITY, label: 'Komunitas' },
    { view: AppView.MAP, label: 'Eksplor Peta' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Moon className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Umrah<span className="text-emerald-600">Flow</span></span>
          </div>
          
          <div className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <button 
                key={item.view}
                onClick={() => setView(item.view)}
                className={`${currentView === item.view ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 border-b-2 border-transparent'} hover:text-emerald-600 font-medium transition-all text-sm py-5`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            {isLoggedIn ? (
              <button 
                onClick={() => setView(AppView.DASHBOARD)}
                className="hidden sm:block px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200"
              >
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="hidden sm:block px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
