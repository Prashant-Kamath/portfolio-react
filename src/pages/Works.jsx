import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';
import { IoTabletLandscape, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Header, Footer } from '../components/HeaderFooter';
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

	const visibleGridData = worksData.filter(p => !p.hidden?.includes('grid'));

	return (
		<>
			{/* HEADER SECTION */}
			{!isCanvasMode && (
				<section className='relative max-w-7xl mx-auto p-4 md:p-8'>
					<Header />
					<div className='animate__animated animate__fadeIn'>
						<h1 className='text-5xl md:text-6xl flex justify-around mb-8' style={{ fontFamily: '"DMSerifDisplay-Regular", serif' }}>My Works</h1>
						{/* <div className='w-full flex justify-between items-center mb-8'>
							<IoChevronBack size={40} /> 
							<div className='flex flex-col items-center gap-4'>
								<h1 className='text-3xl md:text-4xl font-bold tracking-wider'>UI/UX</h1>
								<p className='text-sm text-neutral-500 max-w-sm leading-relaxed text-center'>
									I craft digital experiences that live at the intersection
									of design and engineering. Clean. Considered. Purposeful.
								</p>
							</div>
							<IoChevronForward size={40}/> 
						</div> */}
						<div className='border border-(--dock-border)' />
					</div>
				</section>
			)}

			{/* CANVAS MODE */}
			{isCanvasMode && (
				<div className='animate__animated animate__fadeIn'>
					<Canvas />
				</div>
			)}

			{/* GRID SECTION */}
			{showGrid && !isCanvasMode && (
				<section className='relative max-w-7xl mx-auto px-4 py-1 md:px-8 md:py-2'>
					<div className='mb-8 animate__animated animate__fadeIn'>
						<Button className='cursor-pointer' icon={IoTabletLandscape} onClick={() => setIsCanvasMode(prev => !prev)}>Canvas Mode</Button>
					</div>
					<div className={`columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-24 animate__animated ${animateState === 'fadeOut' ? 'animate__fadeOutDown' : 'animate__fadeIn'}`}>
						{visibleGridData.map((project, index) => (
							<div key={project.id} className='break-inside-avoid' style={project.size === 'banner' ? { columnSpan: 'all', marginTop: '1rem' } : {}} data-aos='fade-up' data-aos-delay={index * 18}>
								<WorksCard {...project} />
							</div>
						))}
					</div>
				</section>
			)}

			{/* FOOTER SECTION */}
			{!isCanvasMode && (
				<section className='relative max-w-7xl mx-auto p-4 md:p-8'>
					<Footer />
				</section>
			)}
		</>
	);
};

export default Works;


{/* <div className='flex flex-col lg:flex-row justify-between gap-10 text-xs sm:text-sm md:text-base'>
								<div className='max-w-xl'>
									<p className='leading-relaxed opacity-80'>
										Amine Zegmou is a web developer focused in animation and interaction.
										Collaborating with companies, agencies, and individuals to create immersive online experiences.
									</p>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='flex items-center gap-4'>
										<span className='tracking-widest'>2026</span>
										<div className='flex gap-2'>
											{[...Array(4)].map((_, i) => (
												<span key={i} className='w-2 h-2 rounded-full bg-white'></span>
											))}
										</div>
									</div>
									<div className='flex flex-wrap items-center gap-4'>
										<div className='flex gap-2'>
											<span className='opacity-60'>LOCATION:</span>
											<span>PARIS, FR</span>
										</div>
									</div>
									<div className='flex flex-wrap items-center gap-6'>
										<div className='flex items-center gap-2'>
											<IoLayersOutline /><span>ENGINE LAB 2.0</span>
										</div>
										<IoAperture />
										<div className='flex items-center gap-2'>
											<span>/ TOOLS</span>
											<span className='opacity-70'>REACT.JS</span>
											<span className='opacity-70'>FRAMER MOTION</span>
										</div>
									</div>
									<div className='flex items-center gap-4 flex-wrap'>
										<span className='opacity-60'>MODE:</span>
										<span className='tracking-widest opacity-60'>//////////////////////</span>
										<span>*BBBLACK</span>
										<span className='opacity-50'>RRRED</span>
									</div>
								</div>
							</div> */}