import React from "react";
import WorksCard from "./workscard";

const WorkFlowNode = ({ data }) => {
  return (
    <div style={{ width: 300 }}>
      <WorksCard {...data} />
    </div>
  );
};

export default WorkFlowNode;