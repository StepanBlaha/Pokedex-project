import React from 'react';
import './App.css';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react';
import { PokemonProvider } from './context/pokemonContext';

console.log('Clerk Publishable Key:', process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY ?? 'default_publishable_key';

if (!PUBLISHABLE_KEY) {
  throw new Error('Clerk Publishable Key is missing');
}
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
      <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
        <BrowserRouter>
        <PokemonProvider>
          <AppRoutes />
        </PokemonProvider>
        </BrowserRouter>
      </ClerkProvider>
      </React.StrictMode>

    </>
  );
}

export default App;
