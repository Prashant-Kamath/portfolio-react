import React from "react";
import WorksCard from "./workscard";

const WorkFlowNode = ({ data }) => {
	return (
		<div style={{ width: 360, height: 230 }}>
			<WorksCard {...data} forceSize="canvas" />
		</div>
	);
};

export default WorkFlowNode;