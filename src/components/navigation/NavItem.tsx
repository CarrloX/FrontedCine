import { ReactNode } from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface NavItemProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const NavItem = ({
  icon,
  children,
  onClick,
  href,
  className = '',
}: NavItemProps) => {
  const baseClasses = 'whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md';
  
  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  return (
    <li className="list-none">
      {href ? (
        <Link
          to={href}
          className={`inline-flex items-center ${baseClasses} ${className}`}
          onClick={onClick}
        >
          {content}
        </Link>
      ) : (
        <Button
          variant="ghost"
          size="md"
          onClick={onClick}
          className={`${baseClasses} ${className}`}
        >
          {content}
        </Button>
      )}
    </li>
  );
};
