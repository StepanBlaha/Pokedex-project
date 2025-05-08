import express from 'express';
import cors from 'cors';
import randomPokemonRoutes from './routes/randompokemonRoutes'
import pokemonRoutes from "./routes/pokemonRoutes"
import pokedexRoutes from "./routes/pokedexlistRoutes"
import axios from 'axios';
import dotenv from 'dotenv';

import connectDB from './db/connect';
connectDB()



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', randomPokemonRoutes); 
app.use('/api', pokemonRoutes); 
app.use('/api', pokedexRoutes); 

app.listen(5000, () => console.log('Server running on port 5000'));
