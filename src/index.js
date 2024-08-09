// index.js
import express from 'express';
import { generateToken, verifyToken } from './auth.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación Express con JWT!');
  });

app.post('/login', (req, res) => {

  const user = {
    id: 1,
    nombre: 'juan Martinez',
    email: 'jaredjuan71@gmail.com'
   }
  
  //const { user, password } = req.body;

  // Supongamos que la autenticación es exitosa
  const token = generateToken({ user });

  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = verifyToken(token.split(' ')[1]);
    res.json({ message: `Bienvenido, ${decoded.username}!` });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});