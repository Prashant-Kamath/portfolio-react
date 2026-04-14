import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dock from './components/navbar';
import './App.css';

const Works = lazy(() => import('./pages/Works'));

function App() {
	return (
		<div className="min-h-screen bg-zinc-950">
			<Suspense fallback={<div className="text-white p-10">Loading...</div>}>
				<Routes>
					<Route path="/" element={<div className="text-white p-10">Home Content</div>} />
					<Route path="/works" element={<Works />} />
				</Routes>
			</Suspense>
			<Dock />
		</div>
	);
}

export default App;