import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';
import { IoTabletLandscape, IoAppsSharp, IoLayersOutline, IoAperture, IoHeart } from 'react-icons/io5';
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
		<section className="relative max-w-7xl mx-auto p-4 md:p-8">
			{/* HEADER */}
			<div className='flex justify-between items-center mb-8 animate__animated animate__fadeIn'>
				<p className='text-xs text-neutral-500 uppercase tracking-widest'>Creative Studio / Digital Craft</p>
				<Button className='font-normal flex items-center justify-center transition-all duration-300 text-xs px-3 py-1 gap-2 md:text-sm md:px-4 md:py-2 cursor-svg' style={{ color: 'white', background: 'var(--background-color)', border: '2px solid rgba(255, 255, 255, 0.5)', filter: 'drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.25))', animation: 'flickering 2s linear infinite both' }}>
					<span className='w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-600 opacity-80 animate-pulse'></span>Available for work
				</Button>
			</div>
			<div className={`mb-10 animate__animated ${isCanvasMode ? 'animate__fadeOutUp' : 'animate__fadeIn'}`}>
				<div className='w-full mb-4 animate__animated animate__fadeIn'>
					<h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
						ALL<br /> WORKS<span className="align-top text-[0.5em]">®</span>
					</h1>
				</div>

				{/* <div className="flex flex-col lg:flex-row justify-between gap-10 text-xs sm:text-sm md:text-base">
					<div className="max-w-xl">
						<p className="leading-relaxed opacity-80">
							Amine Zegmou is a web developer focused in animation and interaction.
							Collaborating with companies, agencies, and individuals to create immersive online experiences.
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-4">
							<span className="tracking-widest">2026</span>
							<div className="flex gap-2">
								{[...Array(4)].map((_, i) => (
									<span key={i} className="w-2 h-2 rounded-full bg-white"></span>
								))}
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-4">
							<div className="flex gap-2">
								<span className="opacity-60">LOCATION:</span>
								<span>PARIS, FR</span>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-6">
							<div className="flex items-center gap-2">
								<IoLayersOutline /><span>ENGINE LAB 2.0</span>
							</div>
							<IoAperture />
							<div className="flex items-center gap-2">
								<span>/ TOOLS</span>
								<span className="opacity-70">REACT.JS</span>
								<span className="opacity-70">FRAMER MOTION</span>
							</div>
						</div>

						<div className="flex items-center gap-4 flex-wrap">
							<span className="opacity-60">MODE:</span>
							<span className="tracking-widest opacity-60">//////////////////////</span>
							<span>*BBBLACK</span>
							<span className="opacity-50">RRRED</span>
						</div>
					</div>
				</div> */}

				<div className="flex justify-start my-10 animate__animated animate__fadeIn">
					<Button className='cursor-pointer' icon={isCanvasMode ? IoTabletLandscape : IoTabletLandscape} onClick={() => setIsCanvasMode(prev => !prev)}>
						{isCanvasMode ? 'Canvas Mode' : 'Canvas Mode'}
					</Button>
				</div>
				<div className='border mb-10 border-(--dock-border) animate__animated animate__fadeIn' />
			</div>

			{/* CANVAS MODE */}
			{isCanvasMode && (
				<div className="animate__animated animate__fadeIn">
					<Canvas />
				</div>
			)}

			{/* GRID MODE */}
			{showGrid && (
				<div className={`columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-24 animate__animated ${animateState === 'fadeOut' ? 'animate__fadeOutDown' : 'animate__fadeIn'}`}>
					{visibleGridData.map((project, index) => (
						<div key={project.id} className="break-inside-avoid" style={project.size === 'banner' ? { columnSpan: 'all', marginTop: '1rem' } : {}} data-aos="fade-up" data-aos-delay={index * 20}>
							<WorksCard {...project} />
						</div>
					))}
				</div>
			)}

			{/* Footer */}
			<footer className={`animate__animated ${isCanvasMode ? 'animate__fadeOutDown' : 'animate__fadeIn'}`} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 0", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
				<p className='text-[#555] text-xs tracking-wider'>Hand crafted by<strong className='text-[#FFD600] font-bold tracking-widest'> PRASHANT</strong></p>
				<p className='flex gap-2 text-[#555] text-xs tracking-wider'>With<strong className='text-[#FFD600] font-bold tracking-widest'> <IoHeart /></strong> 2026</p>
			</footer>
		</section>
	);
};

export default Works;