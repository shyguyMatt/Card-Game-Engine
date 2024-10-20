import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Game from './components/game';
import Home from './components/home';
import CreateDeck from './components/createDeck';
import { PeerProvider } from './components/contexts/peerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path='game' element={<PeerProvider><Game /></PeerProvider>} />
      <Route path='create-deck' element={<CreateDeck />} />
    </Routes>
    <Outlet /> 
  </BrowserRouter>      
);

