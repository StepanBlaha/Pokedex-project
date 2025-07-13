import express from 'express';
import cors from 'cors';
import randomPokemonRoutes from './routes/randompokemonRoutes'
import pokemonRoutes from "./routes/pokemonRoutes"
import pokedexRoutes from "./routes/pokedexlistRoutes"
import moveRoutes from './routes/moveRoutes'
import itemRoutes from './routes/itemRoutes'
import authRoutes from './routes/authRoutes'
import userPokedexRoutes from "./routes/userPokedexRoutes"
import favouriteRoutes from "./routes/favouriteRoutes"
import userLevelRoutes from "./routes/userLevelRoutes"
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
app.use('/api', moveRoutes);
app.use('/api', itemRoutes);
app.use('/api', authRoutes)
app.use('/api', userPokedexRoutes)
app.use('/api', favouriteRoutes)
app.use('/api', userLevelRoutes)

app.listen(5000, () => console.log('Server running on port 5000'));
