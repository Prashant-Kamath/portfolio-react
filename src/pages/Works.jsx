import React, { useState, useMemo } from 'react';
import WorksCard from '../components/workscard';
import { worksData } from '../components/cards-data';
import Button from '../components/button';
import { Layout } from 'lucide-react';
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
			position: {
				x: (index % COLS) * (CARD_WIDTH + GAP_X),
				y: Math.floor(index / COLS) * (CARD_HEIGHT + GAP_Y),
			},
			data: project,
		}));
	}, []);

	return (
		<section
			style={{ backgroundColor: 'var(--background-color)' }}
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
				<div
					style={isCanvasMode ? {
						backgroundColor: 'color-mix(in srgb, var(--dock-bg) 60%, transparent)',
						borderColor: 'var(--dock-border)',
						backdropFilter: 'blur(16px)',
						boxShadow: '0 8px 40px var(--dock-shadow)',
					} : {}}
					className={`flex items-center justify-between mb-12 px-6 py-4 rounded-xl transition-all duration-300
						${isCanvasMode ? 'border' : ''}
					`}
				>
					<h2
						style={{ color: 'var(--text-primary)' }}
						className="text-4xl font-bold"
					>
						Works
					</h2>

					<Button
						icon={Layout}
						onClick={() => setIsCanvasMode((prev) => !prev)}
					>
						Canvas Mode
					</Button>
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