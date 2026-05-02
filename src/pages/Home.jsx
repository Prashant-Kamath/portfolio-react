import { useState } from 'react';
import { Link } from 'react-router-dom';
import { worksData } from '../components/cards-data';
import { sizeClasses } from '../components/workscard';
import 'animate.css';

const projects = worksData
	.filter(w => w.selected)
	.map(w => ({
		name: w.title,
		type: w.selectedType,
		year: w.date,
		gif: w.image,
		size: w.size,
	}));

const MARQUEE_ITEMS = ['Brand Identity', 'Digital Experience', 'Motion Design', 'Art Direction', 'Product Design', 'Visual Systems', 'Creative Strategy', 'UI / UX',];

function Marquee() {
	return (
		<div className='mt-auto flex justify-end z-2'>
			<div className='overflow-hidden border-t border-b border-neutral-800 py-3 my-0'>
				<div className='flex gap-0 animate-marquee whitespace-nowrap'>
					{[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
						<span key={i} className='text-xs text-neutral-600 uppercase tracking-widest mx-8'>
							{item} <span className='text-neutral-700 mx-1'>◆</span>
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

export default function Home() {
	const [hoveredIndex, setHoveredIndex] = useState(null);

	return (
		<div>
			{/* HERO */}
			<div className='relative' style={{ backgroundImage: 'linear-gradient(to right, rgba(158,158,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,158,158,0.08) 1px, transparent 1px)', backgroundSize: '60px 60px', backgroundPosition: 'top left', }}>
				<div className='max-w-7xl mx-auto p-4 md:p-8 flex flex-col min-h-[100dvh]'>
					<section className='flex flex-col justify-end'>
						<div>
							<p className='text-xs text-neutral-600 uppercase tracking-widest mb-8 animate__animated animate__fadeInUp'>Creative Studio / Digital Craft</p>
							<div>
								<p className='font-black uppercase text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight animate__animated animate__fadeIn'>HI, I&apos;M</p>
								<h1 className='font-black uppercase leading-none -ml-1 w-full animate__animated animate__fadeIn' style={{ fontSize: 'clamp(3rem, 16vw, 13.6rem)' }}>PRASHANT</h1>
							</div>
							<h1 className='font-black leading-[0.88] tracking-tighter mt-12 animate__animated animate__fadeIn' style={{ fontFamily: '"SpaceGrotesk", serif', fontSize: 'clamp(3.5rem,2vw,4rem)', }}>
								<span className='block mb-4 font-thin'>Crafting<span style={{ color: '#C8FF00', fontWeight: '700' }}> bold<span className='animate-blink'>_</span></span></span>
								<span className='block font-thin'>Digital<span className='text-neutral-600'> things.</span></span>
							</h1>
						</div>

						<div className='flex items-end justify-between mt-16 pb-10 border-t border-neutral-800 pt-6 animate__animated animate__fadeIn'>
							<p className='text-sm text-neutral-500 max-w-xs leading-relaxed'>
								Hi, I&apos;m Prashant. I craft digital experiences that live at
								the intersection of design and engineering. Clean. Considered.
								Purposeful.
							</p>
						</div>
					</section>
					<Marquee />
				</div>
				<div className='pointer-events-none absolute bottom-0 left-0 w-full' style={{ height: '240px', background: 'linear-gradient(to top, var(--background-color), transparent)', }} />
			</div>

			{/* WORKS */}
			<div className='max-w-7xl mx-auto p-4 md:p-8 min-h-[100dvh]'>
				<section className='text-white'>
					<p className='text-xs tracking-widest uppercase text-gray-500 mb-6 font-light'>Area of Expertise</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
						<div>
							<h2 className='text-5xl md:text-6xl mb-8' style={{ fontFamily: '"DMSerifDisplay-Regular", serif' }}>Selected <br /> Works</h2>
							<ul className='divide-y divide-white/10'>
								{projects.map((project, i) => {
									const isHovered = hoveredIndex === i;
									const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;
									return (
										<li key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className={`flex items-center justify-between py-4 cursor-pointer transition-all duration-300 group ${isOtherHovered ? 'opacity-30' : 'opacity-100'}`}>
											<span className={`text-sm md:text-base transition-all duration-300 ${isHovered ? 'text-white font-bold tracking-wide' : 'text-slate-300 font-thin'}`}>
												{project.name}
											</span>
											<div className='flex items-center gap-3 ml-4 shrink-0'>
												<span className={`hidden md:block h-px bg-white transition-all duration-500 ${isHovered ? 'w-24 opacity-100' : 'w-0 opacity-0'}`} />
												<span className='text-xs text-gray-500 whitespace-nowrap'>
													{project.type}
												</span>
												<span className='text-xs text-gray-500 whitespace-nowrap'>
													{project.year}
												</span>
											</div>
										</li>
									);
								})}
							</ul>

							<div className='mt-12'>
								<Link to='/works' className='inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 tracking-widest uppercase hover:opacity-60 transition-opacity duration-200'>
									<span className='text-base'>↗</span>See All Projects
								</Link>
							</div>
						</div>

						<div className='hidden md:flex items-center justify-center sticky top-24 self-start py-8'>
							<div className='relative w-full h-[70vh] flex items-center justify-center'>
								{projects.map((project, i) => (
									<div key={i} className={`absolute transition-all duration-300 ${sizeClasses[project.size] ?? 'aspect-video'} ${hoveredIndex === i ? 'opacity-100 scale-75' : 'opacity-0 scale-0 pointer-events-none'}`}>
										<div className='w-full h-full rounded-sm overflow-hidden border border-white/10 bg-[#1a1a1a]'>
											<img src={project.gif} alt={project.name} className='w-full h-full object-cover' onError={e => { e.target.style.display = 'none'; }} />
										</div>
									</div>
								))}

								<div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
									<p className='text-white/10 text-sm tracking-widest uppercase'>
										Hover on a project
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}