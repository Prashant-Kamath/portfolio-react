import React, { useState, useMemo } from 'react';
import WorksCard from '../components/workscard';
import { worksData } from '../components/cards-data';
import Button from '../components/button';
import { IoTabletLandscape, IoAppsSharp } from "react-icons/io5";
import { ReactFlow, Controls, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import WorkFlowNode from '../components/WorkFlowNode';

const nodeTypes = {
	workNode: WorkFlowNode,
};

const Works = () => {
	const [isCanvasMode, setIsCanvasMode] = useState(false);

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
		<section className="relative max-w-7xl mx-auto p-8 md:p-16">
			<div
				className={`flex items-center justify-between mb-16 transition-all duration-500
				${isCanvasMode ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}
				`}
			>
				<h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none"
					style={{ color: 'var(--text-primary)' }}>
					WORKS
				</h2>

				<Button
					icon={isCanvasMode ? IoAppsSharp : IoTabletLandscape}
					onClick={() => setIsCanvasMode(prev => !prev)}
				>
					{isCanvasMode ? 'Grid Layout' : 'Canvas Mode'}
				</Button>
			</div>

			{/* CANVAS MODE */}
			{isCanvasMode && (
				<div className="fixed inset-0 z-0">
					<ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView>
						<Background color="#ccccccc0" variant={BackgroundVariant.Dots} gap={40} />
						<Controls />
					</ReactFlow>
				</div>
			)}

			{/* GRID MODE */}
			{!isCanvasMode && (
				<div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-24">
					{worksData.map((project) => (
						<div key={project.id} className="break-inside-avoid">
							<WorksCard {...project} />
						</div>
					))}
				</div>
			)}

			{isCanvasMode && (
				<div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 opacity-100 opacity-0 animate-[fadeIn_1s_forwards]">
					<Button
						icon={IoAppsSharp}
						onClick={() => setIsCanvasMode(false)}
					>
						Exit Canvas
					</Button>
				</div>
			)}

		</section>
	);
};

export default Works;