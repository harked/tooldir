import React from 'react';
import { PlusCircleIcon, UserCircleIcon, CubeTransparentIcon } from './icons/Icons';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginToggle: () => void;
  onSubmitToolClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginToggle, onSubmitToolClick, onLogoClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={onLogoClick}
        >
          <CubeTransparentIcon className="w-8 h-8 text-brand-primary" />
          <h1 className="text-2xl font-bold text-brand-dark hidden sm:block">
            Tool Directory
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button
              onClick={onSubmitToolClick}
              className="flex items-center gap-2 bg-brand-secondary hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              <PlusCircleIcon className="w-5 h-5" />
              <span className="hidden md:inline">Submit Tool</span>
            </button>
          )}
          <button
            onClick={onLoginToggle}
            className="flex items-center gap-2 bg-brand-primary hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <UserCircleIcon className="w-5 h-5" />
            <span className="hidden md:inline">{isLoggedIn ? 'Logout' : 'Login'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
