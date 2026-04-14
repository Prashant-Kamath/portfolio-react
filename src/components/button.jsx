import React from 'react';

const Button = ({ icon: Icon, children, onClick, className = "" }) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-lg ${className}`}
		>
			{Icon && <Icon size={18} />}
			{children}
		</button>
	);
};

export default Button;