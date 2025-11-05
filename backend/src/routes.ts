import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { checkJwt } from './middleware';

const router = Router();

router.post('/api/login', (req: Request, res: Response) => {
  const { usuario, contrasena } = req.body;
  if (usuario === 'admin' && contrasena === '1234') {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'Error interno del servidor: JWT_SECRET no definida' });
    }
    const token = jwt.sign({ sub: usuario }, secret, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }
});

router.get('/api/uf/:date', checkJwt, async (req: Request, res: Response) => {
  
  const { date } = req.params;
  
  if (!date) {
    return res.status(400).json({ message: 'No se proporcionó una fecha en la URL' });
  }

  const parts = date.split('-');
  if (parts.length !== 3) {
    return res.status(400).json({ message: 'Formato de fecha inválido. Usar YYYY-MM-DD' });
  }
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  try {
    const url = `https://mindicador.cl/api/uf/${formattedDate}`;
    const apiResponse = await axios.get(url);

    if (apiResponse.data && apiResponse.data.serie && apiResponse.data.serie.length > 0) {
      const valorUf = apiResponse.data.serie[0].valor;
      return res.json({ valor: valorUf });
    } else {
      return res.status(404).json({ message: 'No se encontró valor de UF para esa fecha' });
    }

  } catch (error) {
    console.error('Error al consultar mindicador.cl:', error);
    return res.status(503).json({ message: 'Error al consultar el servicio externo' });
  }
});

export default router;