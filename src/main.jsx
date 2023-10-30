import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import CarouselCreator from './pages/CarouselCreator.jsx';
import Translator from './pages/Translator';
import Nav from './components/Nav.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	//<React.StrictMode>
	<BrowserRouter>
		<Nav />

		<Routes>
			<Route path='/' element={<CarouselCreator />} />
			<Route path='/translator' element={<Translator />} />
		</Routes>
	</BrowserRouter>
	//</React.StrictMode>,
);
