import React from 'react';
import { ArrowUpRight } from 'lucide-react'; // Optional: for the top right button

const WorksCard = ({ image, title, description, tags, category }) => {
	return (
		<div className="relative group w-full max-w-sm aspect-[4/5] overflow-hidden rounded-2xl bg-black text-white shadow-xl transition-transform duration-300 hover:scale-[1.02]">

			{/* Background Image */}
			<img
				src={image}
				alt={title}
				className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
			/>

			{/* Top Badge (e.g., Auction) */}
			<div className="absolute left-4 top-4 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-md">
				<span className="text-xs font-mono uppercase tracking-wider">{category}</span>
			</div>

			{/* Top Right Action Button */}
			<button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110">
				<ArrowUpRight size={20} />
			</button>

			{/* Bottom Content Overlay */}
			<div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent">

				{/* Tags */}
				<div className="flex gap-2 mb-4">
					{tags.map((tag, index) => (
						<span
							key={index}
							className="rounded bg-gray-200/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-black font-mono"
						>
							{tag}
						</span>
					))}
				</div>

				{/* Title */}
				<h3 className="mb-2 text-3xl font-serif font-bold tracking-tight leading-tight">
					{title}
				</h3>

				{/* Description */}
				<p className="text-sm text-gray-300 font-mono opacity-90">
					{description}
				</p>
			</div>
		</div>
	);
};

export default WorksCard;