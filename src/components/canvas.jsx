import React, { useMemo } from 'react';
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkFlowNode from './worksnode';
import { worksData } from './cards-data';
import { CARD_WIDTH, CARD_HEIGHT } from './worksnode';

const nodeTypes = { workNode: WorkFlowNode };

const Canvas = () => {
	const nodes = useMemo(() => {
		return worksData.map((project, index) => ({
			id: project.id.toString(),
			type: 'workNode',
			position: project.canvasPosition || {
				x: (index % 4) * (CARD_WIDTH + 40),
				y: Math.floor(index / 4) * (CARD_HEIGHT + 60),
			},
			data: project,
		}));
	}, []);

	return (
		<div className='fixed inset-0 z-0'>
			<ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView>
				<Background color='#ccccccc0' variant={BackgroundVariant.Dots} gap={40} />
			</ReactFlow>
		</div>
	);
};

export default Canvas;