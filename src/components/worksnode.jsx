import React from "react";
import WorksCard from "./workscard";

export const CARD_WIDTH = 360;
export const CARD_HEIGHT = 230;

const WorkFlowNode = ({ data }) => {
	const { cardWidth = CARD_WIDTH, cardHeight = CARD_HEIGHT } = data;
	return (
		<div style={{ width: cardWidth, height: cardHeight }}>
			<WorksCard {...data} forceSize="canvas" />
		</div>
	);
};

export default WorkFlowNode;