import React from 'react';
import WorksCard from '../components/workscard';

const worksData = [
	{
		id: 1,
		category: "Auction",
		image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
		tags: ["Web3", "NFT", "React"],
		title: "NFT Auction Platform",
		description: "Real-time bidding for digital collectibles."
	},
	{
		id: 2,
		category: "Design",
		image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
		tags: ["UI/UX", "Figma", "Branding"],
		title: "Minimalist Brand Identity",
		description: "A clean visual language for tech startups."
	},
	{
		id: 3,
		category: "Development",
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
		tags: ["Next.js", "Tailwind", "Three.js"],
		title: "Interactive 3D Portfolio",
		description: "Immersive web experience using WebGL."
	}
];

const Works = () => {
	return (
		<section className="bg-zinc-950 py-20 px-10">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-white text-4xl font-bold mb-12">Selected Works</h2>

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