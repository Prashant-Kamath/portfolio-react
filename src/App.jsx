import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dock from './components/navbar';
import './App.css';

const Works = lazy(() => import('./pages/Works'));
const About = lazy(() => import('./pages/About_Me'));

function App() {
	return (
		<div className="min-h-screen bg-zinc-950">
			<Suspense fallback={<div className="text-white p-10">Loading...</div>}>
				<Routes>
					<Route path="/" element={""} />
					<Route path="/works" element={<Works />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Suspense>
			<Dock />
		</div>
	);
}

export default App;