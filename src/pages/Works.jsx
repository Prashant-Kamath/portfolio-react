import React, { useState, useMemo } from 'react';
import WorksCard from '../components/workscard';
import { worksData } from '../components/cards-data';
import Button from '../components/button';
import { IoTabletLandscape, IoAppsSharp } from "react-icons/io5";

import { ReactFlow, Background, Controls } from '@xyflow/react';
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
		<section
			style={{
				backgroundColor: isCanvasMode ? 'transparent' : 'var(--background-color)'
			}}
			className="relative py-20 px-10"
		>
			{isCanvasMode && (
				<div className="fixed inset-0 z-0">
					<ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView>
						<Controls />
					</ReactFlow>
				</div>
			)}

			<div className="relative max-w-7xl mx-auto z-10">
				{/* Header */}
				<div className="relative max-w-7xl mx-auto z-10">
					<div className={`flex items-center justify-between mb-12 px-6 py-4 rounded-xl transition-all duration-300 ${isCanvasMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : ''}`}>
						<h2 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Works</h2>

						<div className="flex gap-2">

							<Button
								icon={isCanvasMode ? IoAppsSharp : IoTabletLandscape}
								onClick={() => setIsCanvasMode((prev) => !prev)}
							>
								{isCanvasMode ? 'Grid Layout' : 'Canvas Mode'}
							</Button>
						</div>
					</div>

					{!isCanvasMode && (
						<div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
							{worksData.map((project) => (
								<div key={project.id} className="break-inside-avoid">
									{/* Your existing WorksCard */}
								</div>
							))}
						</div>
					)}
				</div>

				{/* Grid */}
				{!isCanvasMode && (
					<div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
						{worksData.map((project) => (
							<div key={project.id} className="break-inside-avoid">
								<WorksCard {...project} />
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Works;