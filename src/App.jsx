import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dock from './components/navbar';
import ContactModal from './components/contactmodal';
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));
const About = lazy(() => import('./pages/About'));

function App() {
	const [showContact, setShowContact] = useState(false);
	const [isCanvasMode, setIsCanvasMode] = useState(false);

	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
			<div className='min-h-screen'>
				<Suspense fallback={<div className='text-white p-10'>Loading...</div>}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/works' element={<Works isCanvasMode={isCanvasMode} setIsCanvasMode={setIsCanvasMode} />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</Suspense>
				<ContactModal show={showContact} onHide={() => setShowContact(false)} />
				<Dock onContactClick={() => setShowContact(true)} isCanvasMode={isCanvasMode} setIsCanvasMode={setIsCanvasMode} />
			</div>
		</ReactLenis>
	);
}

export default App;