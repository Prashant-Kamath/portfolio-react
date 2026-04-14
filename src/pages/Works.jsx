import React from 'react';
import WorksCard from '../components/workscard';
import { worksData } from '../components/cards-data';

const Works = () => {
	return (
		<section className="bg-zinc-950 py-20 px-10">
			<div className="max-w-7xl mx-auto">
				<div>
					<h2 className="text-white text-4xl font-bold mb-12">Selected Works</h2>
				</div>

				{/* The Grid Map */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{worksData.map((project) => (
						<WorksCard
							key={project.id}
							category={project.category}
							image={project.image}
							tags={project.tags}
							title={project.title}
							description={project.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Works;