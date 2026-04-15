import React from 'react';

const WorksCard = ({ image, title, tags = [], date, size = "square" }) => {

	const sizeClasses = {
		landscape: "aspect-[16/9]",
		portrait: "aspect-[9/16]",
		square: "aspect-square",
	};

	return (
		<div className={`group relative w-full ${sizeClasses[size]} overflow-hidden rounded-2xl`}>

			<img
				src={image}
				alt={title}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>

			<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

			<div className="absolute bottom-0 left-0 right-0 p-5">
				<div className="flex flex-wrap gap-2">
					{tags.map((tag, i) => (
						<span key={i} className="text-[11px] text-white/70 border border-white/20 px-2 py-0.5 rounded-md">
							{tag}
						</span>
					))}
				</div>
				<div className="flex justify-between text-white mb-2">
					<h3 className="text-lg">{title}</h3>
					<span className="text-sm text-white/60">{date}</span>
				</div>
			</div>
		</div>
	);
};

export default WorksCard;