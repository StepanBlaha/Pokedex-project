import React from 'react';
import logo from './logo.svg';
import './App.css';
import DetailPage from './pages/DetailPage';
import PokedexList from './pages/PokedexList';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
