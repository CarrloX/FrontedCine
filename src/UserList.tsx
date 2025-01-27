import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Estado para un solo usuario
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/user/1') // Hacemos la petición al API
      .then((response) => {
        setUser(response.data); // Guardamos el usuario obtenido en el estado
        setLoading(false); // Cambiamos el estado de carga
      })
      .catch(() => {
        setError('Error fetching user'); // Si hay un error, lo mostramos
        setLoading(false);
      });
  }, []); // Solo se ejecuta una vez al montar el componente

  if (loading) return <div>Loading...</div>; // Mostramos un mensaje mientras cargamos los datos
  if (error) return <div>{error}</div>; // Mostramos un mensaje de error si ocurre uno

  // Si tenemos un usuario, lo mostramos
  return (
    <div>
      <h1>Info del usuario</h1>
      {user && ( // Verificamos que el usuario no sea null
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
