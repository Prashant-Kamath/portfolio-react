import React from 'react';

const Button = ({ icon: Icon, children, onClick, className = "" }) => {
	return (
		<button onClick={onClick} style={{backgroundColor: 'var(--black-to-white)', color: 'var(--white-to-black)', willChange: 'transform',}} className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform duration-200 ease-out hover:scale-105 active:scale-95 shadow-lg ${className}`}>
			{Icon && <Icon size={18} />}
			{children}
		</button>
	);
};

export default Button;