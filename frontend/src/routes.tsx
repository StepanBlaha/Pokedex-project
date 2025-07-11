import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PokedexList from './pages/PokedexList';
import Spinner from './components/Spinner';
import MovePage from './pages/MovePage';
import ItemPage from './pages/ItemPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/Login';
import Profile from './pages/Profile';
import Pokedex from './pages/Pokedex';
import RequireAuth from './components/RequireAuth/RequireAuth';
import NotFound from './pages/404';
const DetailPage = lazy(() => import('./pages/DetailPage'));
const AppRoutes = () => {
    return(
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='register' element={<RegisterPage/>}/>
                <Route path='profile' element={
                    <RequireAuth>
                        <Profile/>
                    </RequireAuth>
                    }/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='pokemon' element={<PokedexList/>}/>
                <Route path='pokedex' element={
                    <RequireAuth>
                        <Pokedex/>
                    </RequireAuth>
                }/>
                <Route path='moves' element={<MovePage/>}/>
                <Route path='items' element={<ItemPage/>}/>
                <Route path='pokemon/:id' element={<DetailPage/>}/>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}
export default AppRoutes