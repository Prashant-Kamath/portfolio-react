import { useMemo, useState, useRef, useEffect } from "react";
import logo from "../assets/logo-white.webp";
import { IoHome, IoFolder, IoPerson, IoMail, IoMenu, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoLogoInstagram, IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const BASE = 48;
const PEAK = 76;
const SPREAD = 2;

const eased = (t) => Math.pow(Math.max(0, t), 1.8);

const buildDockItems = (onContactClick) => [
	{ id: "home", label: "Home", path: "/", icon: IoHome },
	{ id: "works", label: "Works", path: "/works", icon: IoFolder },
	{ id: "about", label: "About Me", path: "/about", icon: IoPerson },
	{ id: "contact", label: "Contact", icon: IoMail, onClick: onContactClick },
	{ id: "burger-menu", label: "Know More", icon: IoMenu },
];

const SOCIALS = [
	{ id: "github", label: "GitHub", icon: IoLogoGithub, href: "https://github.com/yourusername" },
	{ id: "linkedin", label: "LinkedIn", icon: IoLogoLinkedin, href: "https://linkedin.com/in/yourusername" },
	{ id: "twitter", label: "Twitter", icon: IoLogoTwitter, href: "https://twitter.com/yourusername" },
	{ id: "instagram", label: "Instagram", icon: IoLogoInstagram, href: "https://instagram.com/yourusername" },
];

function sizeForIndex(index, hoveredIndex) {
	if (hoveredIndex == null) return BASE;
	const dist = Math.abs(index - hoveredIndex);
	const t = Math.max(0, 1 - dist / (SPREAD + 1));
	return BASE + (PEAK - BASE) * eased(t);
}

function iconScale(size) {
	const pct = (size - BASE) / (PEAK - BASE);
	return 1 + 0.45 * pct;
}

export default function MacDockNavbar({ logoSrc = logo, onThemeToggle, onContactClick }) {
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [knowMoreOpen, setKnowMoreOpen] = useState(false);
	const popoverRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();
	const dockItems = useMemo(() => buildDockItems(onContactClick), [onContactClick]);
	const sizes = useMemo(
		() => dockItems.map((_, i) => sizeForIndex(i, hoveredIndex)),
		[hoveredIndex, dockItems]
	);

	useEffect(() => {
		if (!knowMoreOpen) return;
		const handle = (e) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target)) {
				setKnowMoreOpen(false);
			}
		};
		document.addEventListener("mousedown", handle);
		return () => document.removeEventListener("mousedown", handle);
	}, [knowMoreOpen]);

	return (
		<>
			<div ref={popoverRef} style={{backgroundColor: 'var(--dock-bg)', borderColor: 'var(--dock-border)', boxShadow: '0 4px 24px var(--dock-shadow), inset 0 1px 0 var(--dock-inner-shadow)', bottom: 'calc(24px + 68px + 12px)', left: '50%', transform: 'translateX(-50%)', transformOrigin: 'bottom center', opacity: knowMoreOpen ? 1 : 0, scale: knowMoreOpen ? '1' : '0.92', pointerEvents: knowMoreOpen ? 'all' : 'none', transition: 'opacity 220ms cubic-bezier(.4,0,.2,1), scale 220ms cubic-bezier(.4,0,.2,1)'}} className="fixed z-40 flex items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-md">
				{SOCIALS.map((social) => {
					const Icon = social.icon;
					return (
						<a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" title={social.label} style={{ width: BASE, height: BASE, color: 'var(--icon-color)'}} className="group relative flex items-center justify-center rounded-full hover:bg-[var(--item-bg)] transition-colors duration-150">
							<div style={{backgroundColor: 'var(--tooltip-bg)', color: 'var(--tooltip-text)', backdropFilter: 'blur(8px)'}} className="absolute -top-9 scale-0 transition-transform duration-200 rounded px-2 py-1 text-xs whitespace-nowrap z-50 group-hover:scale-100">
								{social.label}
							</div>
							<Icon size={22} />
						</a>
					);
				})}

				<div style={{ backgroundColor: 'var(--text-secondary)' }} className="h-8 w-px shrink-0 self-center opacity-30"/>
				<button onClick={() => setKnowMoreOpen(false)} title="Close" style={{width: BASE, height: BASE, color: 'var(--icon-color)',}} className="flex items-center justify-center rounded-full hover:bg-[var(--item-bg)] transition-colors duration-150">
					<IoClose size={20} />
				</button>
			</div>

			<nav style={{backgroundColor: 'var(--dock-bg)', borderColor: 'var(--dock-border)', boxShadow: '0 4px 24px var(--dock-shadow), inset 0 1px 0 var(--dock-inner-shadow)'}} className="fixed bottom-6 left-1/2 z-50 flex h-[68px] -translate-x-1/2 items-end gap-4 rounded-full border px-6 py-2 backdrop-blur-md">
				<div className="flex items-center self-center"><img src={logoSrc} alt="Logo" className="h-[35px] w-[35px]" /></div>
				<div style={{ backgroundColor: 'var(--text-secondary)' }} className="h-8 w-px shrink-0 self-center opacity-30"/>

				{dockItems.map((item, index) => {
					const size = sizes[index];
					const scale = iconScale(size);
					const isActive = item.path && location.pathname === item.path;
					const isKnowMore = item.id === "burger-menu";
					const isKnowMoreActive = isKnowMore && knowMoreOpen;
					const Icon = item.icon;

					return (
						<button key={item.id} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}
						onClick={() => {
								if (isKnowMore) {
									setKnowMoreOpen((prev) => !prev);
								} else if (item.onClick) {
									item.onClick();
								} else if (item.path) {
									navigate(item.path);
								}
							}}
							style={{width: size, height: size, transition: "width 200ms ease, height 200ms ease", backgroundColor: (isActive || isKnowMoreActive) ? 'var(--white-to-black)' : undefined}} className={`group relative flex items-center justify-center rounded-full ${!(isActive || isKnowMoreActive) ? "hover:bg-[var(--item-bg)]" : ""}`}>
							<div style={{backgroundColor: 'var(--tooltip-bg)', color: 'var(--tooltip-text)', backdropFilter: 'blur(8px)'}} className="absolute -top-10 scale-0 transition-transform duration-200 rounded px-2 py-1 text-xs whitespace-nowrap z-50 group-hover:scale-100">
								{item.label}
							</div>
							<Icon size={22} strokeWidth={1} style={{color: (isActive || isKnowMoreActive) ? 'var(--black-to-white)' : 'var(--icon-color)', transform: `scale(${scale})`, transition: "transform 200ms ease"}}/>
						</button>
					);
				})}
			</nav>
		</>
	);
}