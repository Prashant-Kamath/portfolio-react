import React from 'react';

export const sizeClasses = { landscape: "aspect-[16/9]", portrait: "aspect-[9/16]", square: "aspect-square", banner: "aspect-[21/6]" };
const WorksCard = ({ image, title, tags = [], date, size = "square", forceSize, cardWidth = 360, cardHeight = 230 }) => {
	const isCanvas = forceSize === "canvas";

	return (
		<div style={isCanvas ? { width: cardWidth, height: cardHeight } : {}} className={`group relative w-full overflow-hidden rounded-2xl cursor-pointer hover:scale-102 hover:-translate-y-1 transition-transform duration-500 ${isCanvas ? "" : sizeClasses[size]}`}>
			<img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
			<div className="absolute inset-0" />
			<div className="absolute bottom-0 left-0 right-0 p-4">
				<div className="flex flex-wrap gap-1 mb-2">
					{tags.map((tag, i) => (
						<span key={i} style={{ backgroundColor: 'var(--item-bg)', color: 'var(--text-secondary)', borderColor: 'var(--dock-border)' }} className="text-[10px] border px-2 py-0.5 rounded-md">
							{tag}
						</span>
					))}
				</div>
				<div className="flex justify-between text-sm">
					<h3 style={{ color: 'var(--text-primary)' }} className="truncate">
						{title}
					</h3>
					<span style={{ color: 'var(--text-secondary)' }}>{date}</span>
				</div>
			</div>
		</div>
	);
};

export default WorksCard;