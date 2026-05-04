import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import Dock from './components/navbar';
import ContactModal from './components/contactmodal';
import { HomeSkeleton, WorksSkeleton, AboutSkeleton } from './components/skeletonloaders';

const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));
const About = lazy(() => import('./pages/About'));

function ScrollToTop() {
	const { pathname } = useLocation();
	const lenis = useLenis();
	useEffect(() => { lenis?.scrollTo(0, { immediate: true }); }, [pathname, lenis]);
	return null;
}

function App() {
	const [showContact, setShowContact] = useState(false);
	const [isCanvasMode, setIsCanvasMode] = useState(false);

	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
			<div className='min-h-screen'>
				<ScrollToTop />
				<Routes>
					<Route path='/' element={
						<Suspense fallback={<HomeSkeleton />}>
							<Home onContactClick={() => setShowContact(true)} />
						</Suspense>
					} />
					<Route path='/works' element={
						<Suspense fallback={<WorksSkeleton />}>
							<Works isCanvasMode={isCanvasMode} setIsCanvasMode={setIsCanvasMode} />
						</Suspense>
					} />
					<Route path='/about' element={
						<Suspense fallback={<AboutSkeleton />}>
							<About />
						</Suspense>
					} />
				</Routes>
				<ContactModal show={showContact} onHide={() => setShowContact(false)} />
				<Dock onContactClick={() => setShowContact(true)} isCanvasMode={isCanvasMode} setIsCanvasMode={setIsCanvasMode} />
			</div>
		</ReactLenis>
	);
}

export default App;