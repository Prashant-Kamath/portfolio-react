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
    <section className="bg-zinc-950 py-20 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-white text-4xl font-bold">Works</h2>

          <Button
            icon={Layout}
            onClick={() => setIsCanvasMode((prev) => !prev)}
          >
            Canvas Mode
          </Button>
        </div>

        {/* 🔁 Conditional Render */}
        {!isCanvasMode ? (
          // GRID VIEW
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {worksData.map((project) => (
              <WorksCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          // CANVAS VIEW
          <div className="w-full h-[80vh] bg-black rounded-xl overflow-hidden">
            <ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView>
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        )}
      </div>
    </section>
  );
};

export default Works;