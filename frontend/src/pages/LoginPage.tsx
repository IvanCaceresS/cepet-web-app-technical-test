import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('admin');
  const [contrasena, setContrasena] = useState('1234');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        usuario,
        contrasena,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/consulta');

    } catch (err) {
      setError('Usuario o contraseña incorrectos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            className="form-input"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            className="form-input"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>

        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}