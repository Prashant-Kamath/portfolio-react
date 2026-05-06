import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';
import { IoTabletLandscape } from 'react-icons/io5';
import { Header, Footer } from "../components/HeaderFooter";
import { worksData } from '../components/Cards-Data';
import WorksCard from '../components/WorksCard';
import Button from '../components/Button';
import Canvas from '../components/Canvas';

const Works = ({ isCanvasMode, setIsCanvasMode }) => {
	const [showGrid, setShowGrid] = useState(true);
	const [animateState, setAnimateState] = useState('fadeIn');

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-in-out-cubic',
			once: true,
		});
	}, []);

	useEffect(() => {
		if (isCanvasMode) {
			setAnimateState('fadeOut');
			const timeout = setTimeout(() => { setShowGrid(false); }, 400);
			return () => clearTimeout(timeout);
		}
		else {
			setShowGrid(true);
			setAnimateState('fadeIn');
		}
	}, [isCanvasMode]);

	const visibleGridData = worksData.filter(p => !p.hidden?.includes("grid"));

	return (
		<>
			{/* HEADER SECTION */}
			{!isCanvasMode && (
				<section className="relative max-w-7xl mx-auto p-4 md:p-8">
					<Header />
					<div className="animate__animated animate__fadeIn">
						<div className='w-full'>
							<h1 className='text-5xl md:text-6xl' style={{ fontFamily: '"DMSerifDisplay-Regular", serif' }}>All Works</h1>
						</div>
						<div className="flex justify-start my-10">
							<Button className='cursor-pointer' icon={IoTabletLandscape} onClick={() => setIsCanvasMode(prev => !prev)}>Canvas Mode</Button>
						</div>
						<div className='border border-(--dock-border)' />
					</div>
				</section>
			)}

			{/* CANVAS MODE */}
			{isCanvasMode && (
				<div className="animate__animated animate__fadeIn">
					<Canvas />
				</div>
			)}

			{/* GRID SECTION */}
			{showGrid && !isCanvasMode && (
				<section className="relative max-w-7xl mx-auto p-4 md:p-8">
					<div className={`columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-24 animate__animated ${animateState === 'fadeOut' ? 'animate__fadeOutDown' : 'animate__fadeIn'}`}>
						{visibleGridData.map((project, index) => (
							<div key={project.id} className="break-inside-avoid" style={project.size === 'banner' ? { columnSpan: 'all', marginTop: '1rem' } : {}} data-aos="fade-up" data-aos-delay={index * 18}>
								<WorksCard {...project} />
							</div>
						))}
					</div>
				</section>
			)}

			{/* FOOTER SECTION */}
			{!isCanvasMode && (
				<section className="relative max-w-7xl mx-auto p-4 md:p-8">
					<Footer />
				</section>
			)}
		</>
	);
};

export default Works;