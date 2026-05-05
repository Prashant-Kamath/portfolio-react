import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import Dock from './components/NavBar';
import ContactModal from './components/ContactModal';
import { HomeSkeleton, WorksSkeleton, AboutSkeleton } from './components/SkeletonLoaders';

const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));
const About = lazy(() => import('./pages/About'));

function ScrollToTop() {
	const { pathname } = useLocation();
	const lenis = useLenis();
	useEffect(() => { lenis?.scrollTo(0, { immediate: true }); }, [pathname, lenis]);
	return null;
}

const workPages = {
	'the-frozen-stars': lazy(() => import('./works/the-frozen-stars')),
};

function WorkPage() {
	const { slug } = useParams();
	const Page = workPages[slug];
	if (!Page) return <div>Work not found</div>;
	return <Suspense fallback={<div>Loading...</div>}><Page /></Suspense>;
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
					<Route path='/works/:slug' element={<WorkPage />} />
				</Routes>
				<ContactModal show={showContact} onHide={() => setShowContact(false)} />
				<Dock onContactClick={() => setShowContact(true)} isCanvasMode={isCanvasMode} setIsCanvasMode={setIsCanvasMode} />
			</div>
		</ReactLenis>
	);
}

export default App;