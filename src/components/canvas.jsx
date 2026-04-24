import React, { useMemo } from 'react';
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkFlowNode, { CARD_WIDTH, CARD_HEIGHT } from './worksnode';
import { worksData } from './cards-data';

const nodeTypes = { workNode: WorkFlowNode };
const GAP = 40;
const getCardSize = (size) => {
	switch (size) {
		default: return { width: CARD_WIDTH, height: CARD_HEIGHT };
		// case 'landscape': return { width: CARD_WIDTH, height: CARD_HEIGHT };
		// case 'portrait': return { width: CARD_HEIGHT, height: CARD_WIDTH };
		// case 'square': return { width: CARD_HEIGHT, height: CARD_HEIGHT };
		// case 'banner': return { width: CARD_WIDTH * 2, height: CARD_HEIGHT };
	}
};

const resolvePositions = (items) => {
	const resolved = {};

	const resolve = (item) => {
		if (resolved[item.id]) return resolved[item.id];

		const pos = item.canvasPosition;

		if ('x' in pos && 'y' in pos) {
			resolved[item.id] = { x: pos.x, y: pos.y };
			return resolved[item.id];
		}

		const { relativeTo, side } = pos;
		const parent = items.find((i) => i.id === relativeTo);
		if (!parent) {
			console.warn(`Card id:${item.id} references unknown id:${relativeTo}`);
			resolved[item.id] = { x: 0, y: 0 };
			return resolved[item.id];
		}

		const parentPos = resolve(parent);
		const parentSize = getCardSize(parent.size);
		const mySize = getCardSize(item.size);

		let x, y;
		switch (side) {
			case 'right':
				x = parentPos.x + parentSize.width + GAP;
				y = parentPos.y;
				break;
			case 'left':
				x = parentPos.x - mySize.width - GAP;
				y = parentPos.y;
				break;
			case 'bottom':
				x = parentPos.x;
				y = parentPos.y + parentSize.height + GAP;
				break;
			case 'top':
				x = parentPos.x;
				y = parentPos.y - mySize.height - GAP;
				break;
			default:
				console.warn(`Card id:${item.id} has unknown side: "${side}"`);
				x = parentPos.x;
				y = parentPos.y;
		}

		resolved[item.id] = { x, y };
		return resolved[item.id];
	};

	items.forEach(resolve);
	return resolved;
};

const Canvas = () => {
	const nodes = useMemo(() => {
		const visibleData = worksData.filter((p) => p.hidden !== "canvas");
		const positions = resolvePositions(visibleData);

		return visibleData.map((project) => {
			const { width: cardWidth, height: cardHeight } = getCardSize(project.size);
			return {
				id: project.id.toString(),
				type: 'workNode',
				position: positions[project.id],
				data: { ...project, cardWidth, cardHeight },
			};
		});
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