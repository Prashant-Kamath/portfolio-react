import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoTabletLandscape, IoAppsSharp, IoLayersOutline, IoAperture } from 'react-icons/io5';
import { worksData } from '../components/cards-data';
import WorksCard from '../components/workscard';
import Button from '../components/button';
import Canvas from '../components/canvas';

const Works = ({ isCanvasMode, setIsCanvasMode }) => {
	useEffect(() => {
		AOS.init({ duration: 800, easing: 'ease-in-out-cubic', once: true});
	}, []); // ,  offset: 60

	return (
		<section className='relative max-w-7xl mx-auto p-4 md:p-8'>
			<div className={`mb-10 transition-all duration-500 ${isCanvasMode ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}>
				<div className='w-full mb-4'>
					<h1 className='text-5xl md:text-7xl font-bold leading-none tracking-tight' style={{ color: 'var(--text-primary)' }}>ALL WORKS<span className='align-top text-[0.5em]'>®</span></h1>
				</div>
				<div className='flex flex-col lg:flex-row justify-between gap-10 text-xs sm:text-sm md:text-base'>
					<div className='max-w-xl'>
						<p className='leading-relaxed opacity-80'>
							Amine Zegmou is a web developer focused in animation and interaction.
							Collaborating with companies, agencies, and individuals to create immersive online experiences.
						</p>
					</div>
					<div className='flex flex-col gap-2 flex'>
						<div className='flex items-center gap-4'>
							<span className='tracking-widest'>2026</span>
							<div className='flex gap-2'>
								{[...Array(4)].map((_, i) => (<span key={i} className='w-2 h-2 rounded-full bg-white'></span>))}
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
							<div className='flex gap-3 text-lg'>
								<IoAperture />
							</div>
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
				</div>
				<div className='flex justify-start mt-10'>
					<Button icon={isCanvasMode ? IoAppsSharp : IoTabletLandscape} onClick={() => setIsCanvasMode(prev => !prev)}>
						{isCanvasMode ? 'Grid Layout' : 'Canvas Mode'}
					</Button>
				</div>
			</div>

			{/* CANVAS MODE */}
			{isCanvasMode && <Canvas />}

			{/* GRID MODE */}
			{!isCanvasMode && (
				<div className='columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-24'>
					{worksData.filter((p) => p.hidden !== "grid").map((project, index) => (
						<div key={project.id} className='break-inside-avoid' style={project.size === 'banner' ? { columnSpan: 'all', marginTop: '1rem' } : {}} data-aos="fade-up" data-aos-delay={index * 20}>
							<WorksCard {...project} />
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default Works;