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

	// Convert worksData → React Flow nodes
	const nodes = useMemo(() => {
		return worksData.map((project, index) => ({
			id: project.id.toString(),
			type: 'workNode',
			position: {
				x: (index % 3) * 350,
				y: Math.floor(index / 3) * 450,
			},
			data: project,
		}));
	}, []);

	return (
		<section className="relative bg-zinc-950 py-20 px-10">

			{/* 🔥 FULLSCREEN CANVAS (ONLY WHEN ACTIVE) */}
			{isCanvasMode && (
				<div className="fixed inset-0 z-0">
					<ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView>
						<Background />
						<Controls />
					</ReactFlow>
				</div>
			)}

			<div className="relative max-w-7xl mx-auto z-10">

				{/* 🧊 HEADER (SAME POSITION, NOW WITH BLUR WHEN CANVAS ACTIVE) */}
				<div
					className={`flex items-center justify-between mb-12 px-6 py-4 rounded-xl transition-all duration-300
					${isCanvasMode
							? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
							: ''
						}`}
				>
					<h2 className="text-white text-4xl font-bold">Works</h2>

					<Button
						icon={Layout}
						onClick={() => setIsCanvasMode((prev) => !prev)}
					>
						Canvas Mode
					</Button>
				</div>

				{/* GRID (UNCHANGED) */}
				{!isCanvasMode && (
					<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
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