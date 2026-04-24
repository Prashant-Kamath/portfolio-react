import React from "react";
import WorksCard from "./workscard";
import Works from "../pages/Works";

const WorkFlowNode = ({ data }) => {
	const { cardWidth = CARD_WIDTH, cardHeight = CARD_HEIGHT } = data;
	return (
		<div style={{ width: cardWidth, height: cardHeight }}>
			<WorksCard {...data} forceSize="canvas" />
		</div>
	);
};

export default WorkFlowNode;