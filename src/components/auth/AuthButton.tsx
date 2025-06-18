
import { Button } from '../ui/Button';

interface AuthButtonProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userAvatar?: string;
  className?: string;
}

export const AuthButton = ({
  isAuthenticated,
  onLogin,
  onLogout,
  userAvatar,
  className = '',
}: AuthButtonProps) => {
  return (
    <div className={className}>
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          {userAvatar && (
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          )}
          <Button variant="ghost" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <Button variant="primary" onClick={onLogin}>
          Iniciar sesión
        </Button>
      )}
    </div>
  );
};
