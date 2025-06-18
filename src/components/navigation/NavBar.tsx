import { ReactNode } from 'react';
import { SearchBar } from '../search/SearchBar';
import { AuthButton } from '../auth/AuthButton';
import { NavItem } from './NavItem';
import { FiHome, FiFilm, FiTv, FiBookmark } from 'react-icons/fi';

interface NavBarProps {
  onSearch: (query: string) => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userAvatar?: string;
  /**
   * Custom navigation items to override the default ones
   */
  customNavItems?: ReactNode;
  className?: string;
}

export const NavBar = ({
  onSearch,
  isAuthenticated,
  onLogin,
  onLogout,
  userAvatar,
  customNavItems,
  className = '',
}: NavBarProps) => {
  // Default navigation items
  const defaultNavItems = (
    <>
      <NavItem icon={<FiHome />} href="/">
        Inicio
      </NavItem>
      <NavItem icon={<FiFilm />} href="/movies">
        Películas
      </NavItem>
      <NavItem icon={<FiTv />} href="/series">
        Series
      </NavItem>
      {isAuthenticated && (
        <NavItem icon={<FiBookmark />} href="/saved">
          Guardados
        </NavItem>
      )}
    </>
  );

  // Use customNavItems if provided, otherwise use defaultNavItems
  const navItems = customNavItems || defaultNavItems;
  return (
    <nav className={`bg-white shadow-sm w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap items-center justify-between w-full py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">CineApp</h1>
          </div>
          
          {/* Navigation Items */}
          <div className="flex-1 flex justify-center">
            <ul className="flex space-x-1 sm:space-x-4 mx-4">
              {navItems}
            </ul>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <SearchBar onSearch={onSearch} className="w-full" />
          </div>
          
          {/* Auth Button */}
          <div className="flex-shrink-0 ml-4">
            <AuthButton
              isAuthenticated={isAuthenticated}
              onLogin={onLogin}
              onLogout={onLogout}
              userAvatar={userAvatar}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
