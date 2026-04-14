import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Folder, User, Mail, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // Add this

const NavItem = ({ icon: Icon, label, isActive, onClick, mouseX }) => {
	const ref = useRef(null);

	const distance = useTransform(mouseX, (val) => {
		const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
		return val - bounds.x - bounds.width / 2;
	});

	const widthSync = useTransform(distance, [-150, 0, 150], [48, 76, 48]);
	const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

	const iconSizeSync = useTransform(distance, [-150, 0, 150], [20, 32, 20]);
	const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

	return (
		<div className="relative group flex items-center justify-center">
			<div className="absolute -top-12 scale-0 transition-all rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:scale-100 whitespace-nowrap z-50">
				{label}
			</div>

			<motion.button
				ref={ref}
				onClick={onClick}
				style={{ width, height: width }}
				className={`flex items-center justify-center rounded-full transition-colors duration-300 shadow-sm ${isActive
					? 'bg-black text-white'
					: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
					}`}
			>
				<motion.div style={{ width: iconSize, height: iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Icon size="90%" strokeWidth={isActive ? 2 : 2} />
				</motion.div>
			</motion.button>
		</div>
	);
};

const Dock = () => {
	const navigate = useNavigate(); // Hook for programmatic navigation
	const location = useLocation(); // Hook to check current path
	const mouseX = useMotionValue(Infinity);

	const navItems = [
		{ icon: Home, label: 'Home', path: '/' },
		{ icon: Folder, label: 'Works', path: '/works' }, // Update label and add path
		{ icon: User, label: 'About', path: '/about' },
		{ icon: Mail, label: 'Contact', path: '/contact' },
	];

	return (
		<div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
			<motion.div
				onMouseMove={(e) => mouseX.set(e.pageX)}
				onMouseLeave={() => mouseX.set(Infinity)}
				className="flex items-center gap-3 rounded-[40px] bg-white/90 p-3 shadow-2xl backdrop-blur-md border border-gray-100 h-[80px] w-max"
			>
				<div className="px-4 py-2 border-r border-gray-200 shrink-0">
					<span className="text-xl font-black tracking-tighter select-none">FK</span>
				</div>

				<div className="flex items-center gap-3 px-2">
					{navItems.map((item) => (
						<NavItem
							key={item.label}
							icon={item.icon}
							label={item.label}
							isActive={location.pathname === item.path} // Sync active state with URL
							onClick={() => navigate(item.path)} // Navigate on click
							mouseX={mouseX}
						/>
					))}
				</div>

				<div className="pl-2 border-l border-gray-200 shrink-0">
					<button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
						<Moon size={20} />
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default Dock;