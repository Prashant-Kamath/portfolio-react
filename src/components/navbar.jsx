import { useMemo, useState } from "react";
import logo from "../assets/favicon.webp";
import { Home, Folder, User, Mail, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BASE = 48;
const PEAK = 76;
const SPREAD = 2;

const eased = (t) => Math.pow(Math.max(0, t), 1.8);

const buildDockItems = (onThemeToggle) => [
	{ id: "home",    label: "Home",     path: "/",        icon: Home   },
	{ id: "works",   label: "Works",    path: "/works",   icon: Folder },
	{ id: "about",   label: "About Me", path: "/about",   icon: User   },
	{ id: "contact", label: "Contact",  path: "/contact", icon: Mail   },
	{ id: "theme",   label: "Theme",    path: null,       icon: Moon, onClick: onThemeToggle },
];

function sizeForIndex(index, hoveredIndex) {
	if (hoveredIndex == null) return BASE;
	const dist = Math.abs(index - hoveredIndex);
	const t = Math.max(0, 1 - dist / (SPREAD + 1));
	return Math.round(BASE + (PEAK - BASE) * eased(t));
}

function iconSize(size) {
	const pct = (size - BASE) / (PEAK - BASE);
	return Math.round(22 + (34 - 22) * pct);
}

export default function MacDockNavbar({ logoSrc = logo, onThemeToggle }) {
	const [hoveredIndex, setHoveredIndex] = useState(null);

	const navigate  = useNavigate();
	const location  = useLocation();

	const dockItems = useMemo(() => buildDockItems(onThemeToggle), [onThemeToggle]);

	const sizes = useMemo(
		() => dockItems.map((_, i) => sizeForIndex(i, hoveredIndex)),
		[hoveredIndex, dockItems]
	);

	return (
		<nav className="fixed bottom-6 left-1/2 z-50 flex h-[68px] -translate-x-1/2 items-end gap-4 rounded-full border border-white/60 bg-[#FFFFFF]/90 px-3.5 py-2 shadow-lg backdrop-blur-md">

			{/* Logo — always center-aligned, never magnified */}
			<div className="flex items-center self-center">
				<img src={logoSrc} alt="Logo" className="h-[35px] w-[35px]" />
			</div>

			<div className="h-8 w-px bg-gray-800 shrink-0 self-center" />

			{/* Dock items (nav + moon) */}
			{dockItems.map((item, index) => {
				const size   = sizes[index];
				const svg    = iconSize(size);
				const isActive = item.path && location.pathname === item.path;
				const Icon   = item.icon;

				return (
					<button
						key={item.id}
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}
						onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
						className={`group relative flex items-center justify-center rounded-full transition-all duration-200
							${isActive ? "bg-black" : "bg-[#E0E0E0] hover:scale-105"}
						`}
						style={{ width: size, height: size }}
					>
						{/* Tooltip */}
						<div className="absolute -top-12 scale-0 transition-all duration-200 rounded bg-gray-800 px-2 py-1 text-xs text-white whitespace-nowrap z-50 group-hover:scale-100">
							{item.label}
						</div>

						<Icon
							size={svg}
							strokeWidth={isActive ? 1 : 1}
							className={isActive ? "text-white" : "text-[#555]"}
						/>
					</button>
				);
			})}
		</nav>
	);
}