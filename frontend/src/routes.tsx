import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PokedexList from './pages/PokedexList';
import Spinner from './components/Spinner';
import MovePage from './pages/MovePage';
import ItemPage from './pages/ItemPage';
const DetailPage = lazy(() => import('./pages/DetailPage'));
const AppRoutes = () => {
    return(
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path='/' element={<PokedexList/>}/>
                <Route path='moves' element={<MovePage/>}/>
                <Route path='items' element={<ItemPage/>}/>
                <Route path='pokemon/:id' element={<DetailPage/>}/>
            </Routes>
        </Suspense>
    )
}
export default AppRoutes