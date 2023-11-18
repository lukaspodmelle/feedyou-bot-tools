import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CarouselCreator from './pages/CarouselCreator.jsx';
import Translator from './pages/Translator';
import Navigation from '../src/ui/Navigation.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	//<React.StrictMode>
	<BrowserRouter>
		<Navigation />

		<Routes>
			<Route path='/' element={<CarouselCreator />} />
			<Route path='/translation-manager' element={<Translator />} />
		</Routes>
	</BrowserRouter>
	//</React.StrictMode>,
);
