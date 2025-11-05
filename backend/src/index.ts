import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend de UF funcionando!');
});

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});