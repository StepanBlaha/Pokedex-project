import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import PokedexList from './pages/PokedexList';
const AppRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<PokedexList/>}/>
            <Route path='pokemon/:id' element={<DetailPage/>}/>
        </Routes>
    )
}
export default AppRoutes