import React, { useState, useMemo } from 'react';
import WorksCard from '../components/workscard';
import { worksData } from '../components/cards-data';
import Button from '../components/button';
import { IoTabletLandscape, IoAppsSharp, IoLayersOutline, IoAperture } from 'react-icons/io5';
import { ReactFlow, Controls, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkFlowNode from '../components/WorkFlowNode';

const nodeTypes = { workNode: WorkFlowNode };

const Works = ({ isCanvasMode, setIsCanvasMode }) => {
	const CARD_WIDTH = 360;
	const CARD_HEIGHT = 225;
	const GAP_X = 40;
	const GAP_Y = 60;
	const COLS = 4;

	const nodes = useMemo(() => {
		return worksData.map((project, index) => ({
			id: project.id.toString(),
			type: 'workNode',
			position: project.canvasPosition || {
				x: (index % COLS) * (CARD_WIDTH + GAP_X),
				y: Math.floor(index / COLS) * (CARD_HEIGHT + GAP_Y),
			},
			data: project,
		}));
	}, []);

	return (
		<section className='relative max-w-7xl mx-auto p-4 md:p-8'>
			<div className={`mb-10 transition-all duration-500 ${isCanvasMode ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}>
				<div className='w-full mb-4'>
					<h1 className='text-5xl md:text-7xl font-bold leading-none tracking-tight' style={{ color: 'var(--text-primary)' }}>
						WORKS <span className='align-top text-[0.5em]'>®</span>
					</h1>
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
							<span className='tracking-widest'>2025</span>
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
			{isCanvasMode && (
				<div className='fixed inset-0 z-0'>
					<ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView>
						<Background color='#ccccccc0' variant={BackgroundVariant.Dots} gap={40} />
					</ReactFlow>
				</div>
			)}

			{/* GRID MODE */}
			{!isCanvasMode && (
				<div className='columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-24'>
					{worksData.map((project) => (
						<div key={project.id} className='break-inside-avoid'>
							<WorksCard {...project} />
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default Works;