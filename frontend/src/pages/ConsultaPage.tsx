import { useState, FormEvent } from 'react';
import axios from 'axios';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export default function ConsultaPage() {
  const [fecha, setFecha] = useState('');
  const [resultado, setResultado] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleConsultar = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setResultado('');
    setIsLoading(true);

    if (!fecha) {
      setError('La fecha no puede estar vacía');
      setIsLoading(false);
      return;
    }
    const hoy = new Date();
    const fechaSeleccionada = new Date(fecha + 'T00:00:00-04:00');
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada > hoy) {
      setError('La fecha no puede ser futura');
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        handleLogout();
        return;
      }

      const response = await axios.get(`http://localhost:4000/api/uf/${fecha}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const valor = response.data.valor;
      const fechaFormateada = formatDate(fecha);
      const valorFormateado = formatCurrency(valor);
      
      setResultado(`El valor de la UF para el ${fechaFormateada} es: $${valorFormateado}`);

    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        handleLogout();
      } else if (err.response && err.response.status === 404) {
        setError('No se encontró valor de UF para esa fecha. Intenta con otra.');
      } else {
        setError('Error al consultar el servicio. Inténtalo más tarde.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="consulta-card">
        <header className="header">
          <h2>Pantalla de Consulta de UF</h2>
          <button onClick={handleLogout} className="form-button" style={{width: 'auto'}}>
            Cerrar Sesión
          </button>
        </header>

        <p style={{color: 'var(--text-muted)', marginTop: '2rem'}}>
          Selecciona una fecha para ver el valor de la UF.
        </p>

        <form onSubmit={handleConsultar} style={{display: 'flex', gap: '10px', alignItems: 'flex-end'}}>
          <div className="form-group" style={{flexGrow: 1, marginBottom: 0}}>
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              id="fecha"
              className="form-input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button" disabled={isLoading} style={{width: 'auto'}}>
            {isLoading ? 'Consultando...' : 'Consultar UF'}
          </button>
        </form>

        {resultado && (
          <div className="form-result">
            <p>{resultado}</p>
          </div>
        )}

        {error && (
          <div className="form-error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}