import React from 'react';

const WorksCard = ({ image, title, tags = [], date, size = "square", forceSize }) => {

	const sizeClasses = {
		landscape: "aspect-[16/9]",
		portrait: "aspect-[9/16]",
		square: "aspect-square",
	};

	const isCanvas = forceSize === "canvas";

	return (
		<div
			className={`group relative w-full overflow-hidden rounded-2xl
			${isCanvas ? "w-[360px] h-[225px]" : sizeClasses[size]}`}
		>
			<img
				src={image}
				alt={title}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>

			<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

			<div className="absolute bottom-0 left-0 right-0 p-4">
				<div className="flex flex-wrap gap-1 mb-2">
					{tags.map((tag, i) => (
						<span
							key={i}
							style={{
								color: 'var(--text-secondary)',
								borderColor: 'var(--dock-border)',
							}}
							className="text-[10px] border px-2 py-0.5 rounded-md"
						>
							{tag}
						</span>
					))}
				</div>
				<div className="flex justify-between text-sm">
					<h3
						style={{ color: 'var(--text-primary)' }}
						className="truncate"
					>
						{title}
					</h3>
					<span style={{ color: 'var(--text-secondary)' }}>{date}</span>
				</div>
			</div>
		</div>
	);
};

export default WorksCard;