import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import scrollDownGif from '../assets/scroll-down-circle.gif';
import { worksData } from '../components/cards-data';
import { sizeClasses } from '../components/workscard'

const projects = worksData
	.filter(w => w.selected)
	.map(w => ({ name: w.title, type: w.selectedType, year: w.date, gif: w.image, size: w.size }))

function useInView(threshold = 0.15) {
	const ref = useRef(null);
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
		if (ref.current) obs.observe(ref.current);
		return () => obs.disconnect();
	}, []);
	return [ref, inView];
}

const MARQUEE_ITEMS = [
	"Brand Identity", "Digital Experience", "Motion Design", "Art Direction",
	"Product Design", "Visual Systems", "Creative Strategy", "UI / UX",
];
function Marquee() {
	return (
		<div className='mt-auto flex justify-end'>
			<div className="overflow-hidden border-t border-b border-neutral-800 py-3 my-0">
				<div className="flex gap-0 animate-marquee whitespace-nowrap">
					{[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
						<span key={i} className="text-xs text-neutral-600 uppercase tracking-widest mx-8">
							{item} <span className="text-neutral-700 mx-1">◆</span>
						</span>
					))}
				</div>
			</div>
		</div>
	);
}


export default function Home() {
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [heroRef, heroInView] = useInView(0.1);
	const [statsRef, statsInView] = useInView();
	return (
		<div >
			<div className='max-w-7xl mx-auto p-4 md:p-8 flex flex-col min-h-[100dvh]' style={{ height: '100dvh' }}>
				<section ref={heroRef} className="flex flex-col justify-end">
					<div><style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } } .animate-marquee { animation: marquee 24s linear infinite; } @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } .animate-blink { animation: blink 1.1s step-end infinite; } @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style></div>
					<div> {/*  className="max-w-7xl" */}
						<p className="text-xs text-neutral-600 uppercase tracking-widest mb-8" style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "none" : "translateY(16px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
							Creative Studio / Digital Craft
						</p>
						<div>
							<p className='font-black uppercase text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight' style={{ opacity: heroInView ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>HI, I&apos;M</p>
							<h1 className='font-black uppercase leading-none -ml-1 w-full' style={{ fontSize: 'clamp(3rem, 16vw, 13.6rem)', opacity: heroInView ? 1 : 0, transform: heroInView ? "none" : "translateY(40px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s", }}>PRASHANT</h1>
						</div>
						<h1 className="font-black leading-[0.88] tracking-tighter text-[clamp(3.5rem,2vw,4rem)] mb-0 mt-12" style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "none" : "translateY(40px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s", fontFamily: "'SpaceGrotesk', serif" }}>
							<span className="block mb-4">Crafting<span style={{ color: "#C8FF00" }}> bold<span className="animate-blink">_</span></span></span>
							<span className="block">Digital<span className="text-neutral-700"> things.</span></span>
						</h1>
					</div>
					<div className="flex items-end justify-between mt-16 pb-10 border-t border-neutral-800 pt-6" style={{ opacity: heroInView ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
						<p className="font-light text-sm text-neutral-500 max-w-xs leading-relaxed">
							Hi, I'm Prashant. I craft digital experiences that live at the intersection of design and engineering. Clean. Considered. Purposeful.
						</p>
					</div>
				</section>
				<Marquee />
			</div>
			{/* 2nd div */}
			<div className='max-w-7xl mx-auto px-4 md:px-8 min-h-[100dvh]' style={{ height: '100dvh' }}>
				<section className="text-white">
					<p className="text-xs tracking-widest uppercase text-gray-500 mb-6 font-light">Area of Expertise</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
						<div>
							<h2 className="text-6xl md:text-7xl mb-8" style={{ fontFamily: "'DMSerifDisplay-Regular', serif" }}>Selected<br />Works</h2>
							{/* <p className="text-sm text-gray-400 leading-relaxed mb-16 max-w-sm">
								Over the past 6 years, I've had the privilege to work on so many cool projects,
								I've worked in areas including APIs and Integration, responsive web design,
								eCommerce, CMS, SEO... Here's a few.
							</p> */}
							<ul className="divide-y divide-white/10">
								{projects.map((project, i) => {
									const isHovered = hoveredIndex === i;
									const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;
									return (
										<li key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className={`flex items-center justify-between py-4 cursor-pointer transition-all duration-300 group ${isOtherHovered ? "opacity-30" : "opacity-100"}`}>
											<span className={`text-sm md:text-base font-medium transition-all duration-300 ${isHovered ? "text-white font-bold tracking-wide" : "text-slate-300 font-thin"}`}>{project.name}</span>
											<div className="flex items-center gap-3 ml-4 shrink-0">
												<span className={`hidden md:block h-px bg-white transition-all duration-500 ${isHovered ? "w-24 opacity-100" : "w-0 opacity-0"}`} />
												<span className="text-xs text-gray-500 whitespace-nowrap">{project.type}</span>
												<span className="text-xs text-gray-500 whitespace-nowrap">{project.year}</span>
											</div>
										</li>
									);
								})}
							</ul>
							<div className="mt-12">
								<Link to="/works" className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 tracking-widest uppercase hover:opacity-60 transition-opacity duration-200">
									<span className="text-base">↗</span>See All Projects
								</Link>
							</div>
						</div>
						<div className="hidden md:flex items-center justify-center sticky top-24 self-start py-8">
							<div className="relative w-full h-[70vh] flex items-center justify-center">
								{projects.map((project, i) => (
									<div key={i} className={`absolute transition-all duration-300 ${sizeClasses[project.size] ?? "aspect-video"} ${hoveredIndex === i ? "opacity-100 scale-75" : "opacity-0 scale-0 pointer-events-none"}`}>
										<div className="w-full h-full rounded-sm overflow-hidden border border-white/10 bg-[#1a1a1a]">
											<img src={project.gif} alt={project.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
										</div>
									</div>
								))}
								<div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex !== null ? "opacity-0" : "opacity-100"}`}>
									<p className="text-white/10 text-sm tracking-widest uppercase">Hover on a project</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}