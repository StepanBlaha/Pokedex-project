import React from 'react';
import logo from './logo.svg';
import './App.css';
import DetailPage from './pages/DetailPage';
import PokedexList from './pages/PokedexList';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function App() {
  return (
      <>

      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
