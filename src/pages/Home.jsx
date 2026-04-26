import { useState } from "react";
import { Link } from "react-router-dom";
import scrollDownGif from '../assets/scroll-down-circle.gif';
import { worksData } from '../components/cards-data';
import { sizeClasses } from '../components/workscard'

const projects = worksData
	.filter(w => w.selected)
	.map(w => ({ name: w.title, type: w.selectedType, year: w.date, gif: w.image, size: w.size }))

export default function Home() {
	const [hoveredIndex, setHoveredIndex] = useState(null);
	return (
		<div>
			{/* 1st div */}
			<div className='max-w-7xl mx-auto px-4 md:px-8' style={{ height: '100dvh', height: '100vh' }}>
				<div className='pt-4 md:pt-8 flex items-end justify-between relative' >
					<div className='z-10'>
						<p className='font-black uppercase text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight'>HI, I&apos;M</p>
						<h1 className='font-black uppercase leading-none -ml-1 w-full' style={{ fontSize: 'clamp(3rem, 16vw, 13.6rem)' }}>PRASHANT</h1>
					</div>
				</div>
				<div className='mt-8 md:mt-12 max-w-[280px] sm:max-w-xs md:max-w-sm pr-7'>
					<p className='font-bold uppercase text-[12px] sm:text-[11px] md:text-xs tracking-widest leading-loose text-left'>
						I&apos;M A DESIGN GENERALIST, THAT MEANS I CRAFT USER EXPERIENCE, USER INTERFACE, WEBSITES, INTERACTIONS, VISUALS, PROTOTYPES & SO ON...
					</p>
				</div>
				<div className='flex justify-end'>
					<img src={scrollDownGif} alt='Scroll down' className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24' />
				</div>
			</div>
			{/* 2rd div */}
			<div className='max-w-7xl mx-auto px-4 md:px-8'>
				<section className="text-white">
					<p className="text-xs tracking-widest uppercase text-gray-500 mb-6 font-light">Area of Expertise</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
						<div>
							<h2 className="text-6xl md:text-7xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Selected<br />Works</h2>
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
											<span className={`text-sm md:text-base font-medium transition-all duration-300 ${isHovered ? "text-white font-bold tracking-wide" : "text-slate-300 font-thin"}`}>
												{project.name}
											</span>
											<div className="flex items-center gap-3 ml-4 shrink-0">
												<span className={`hidden md:block h-px bg-white transition-all duration-500 ${isHovered ? "w-24 opacity-100" : "w-0 opacity-0"}`} />
												<span className="text-xs text-gray-500 whitespace-nowrap">
													{project.type}
												</span>
												<span className="text-xs text-gray-500 whitespace-nowrap">
													{project.year}
												</span>
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
									<div key={i} className={`absolute transition-all duration-300 ${sizeClasses[project.size] ?? "aspect-video"} ${hoveredIndex === i ? "opacity-100 scale-85" : "opacity-0 scale-0 pointer-events-none"}`}>
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

			{/* 3nd div */}
			<div style={{ height: '100dvh', height: '100vh' }}>
				<div>
					{/* IMAGES WILL GO HERE FOR SCROLL TIGGER */}
					<img src={scrollDownGif} alt='Scroll down' />
				</div>
				<div className='max-w-7xl mx-auto px-4 md:px-8'>
					{/* TEXT CONTENTS WILL GO HERE*/}
					<div className="mt-8 md:mt-12 max-w-[320px] sm:max-w-xs md:max-w-sm mx-auto bg-neutral-900/60 p-5 md:p-6 rounded-lg shadow-lg">
						<p className="font-bold uppercase text-[10px] sm:text-[11px] md:text-xs tracking-widest leading-loose text-center text-white/90">
							I&apos;M A DESIGN GENERALIST THAT MEANS I CRAFT USER EXPERIENCE, USER INTERFACE, WEBSITES, ANIMATIONS, INTERACTIONS, VISUALS, PROTOTYPES, PRESENTATIONS, BRANDS AND SO ON...
						</p>
					</div>
				</div>
			</div>

			

		</div>
	);
}