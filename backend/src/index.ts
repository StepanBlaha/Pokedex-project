import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/randompokemonRoutes'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', pokemonRoutes); 
app.listen(5000, () => console.log('Server running on port 5000'));
