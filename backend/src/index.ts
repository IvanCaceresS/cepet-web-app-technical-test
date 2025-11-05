import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de UF funcionando!');
});

// --- RUTAS DE LA API ---
// Aquí irán:
// POST /api/login (para validar usuario/pass) [cite: 13, 14]
// GET /api/uf/:date (para consultar la UF) [cite: 27]

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});