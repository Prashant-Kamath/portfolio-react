import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { Header, Footer } from '../components/HeaderFooter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';
import { worksData } from '../components/Cards-Data';
import { sizeClasses } from '../components/WorksCard';
import 'animate.css';

gsap.registerPlugin(ScrollTrigger);

const projects = worksData
	.filter(w => w.selected)
	.map(w => ({ name: w.title, type: w.selectedType, year: w.date, gif: w.image, size: w.size, tags: w.tags, slug: w.slug }));

function Ruler() {
	const TICKS = 80;
	return (
		<div className='relative w-full h-8 border-b border-neutral-600 overflow-hidden'>
			<div className='flex w-full h-full items-start pt-1'>
				{Array.from({ length: TICKS }).map((_, i) => {
					const major = i % 10 === 0;
					return (
						<div key={i} className='relative shrink-0' style={{ width: `${100 / TICKS}%`, height: major ? '16px' : '8px', borderLeft: `1px solid ${major ? '#777' : '#2f2f2f'}` }} />
					);
				})}
			</div>
			<div className='absolute inset-0 pointer-events-none'>
				{[
					{ label: '-4', tick: 0 },
					{ label: '-3', tick: 10 },
					{ label: '-2', tick: 20 },
					{ label: '-1', tick: 30 },
					{ label: '0', tick: 40 },
					{ label: '1', tick: 50 },
					{ label: '2', tick: 60 },
					{ label: '3', tick: 70 },
					{ label: '4', tick: 80 },
				].map((item) => (
					<span key={item.label} className='absolute text-[9px] text-[#555] tracking-widest' style={{ left: `${(item.tick / TICKS) * 100}%`, top: '18px', transform: 'translateX(-50%)' }}>
						{item.label}
					</span>
				))}
			</div>
		</div>
	);
}

export default function Home({ onContactClick }) {
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const footerRef = useRef(null);
	const buttonRef = useRef(null);
	const marqRef = useRef(null);
	const navigate = useNavigate();

	const [activeIndex, setActiveIndex] = useState(null);
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const media = window.matchMedia('(pointer: coarse)');
		setIsTouch(media.matches);

		const handler = (e) => setIsTouch(e.matches);
		media.addEventListener('change', handler);

		return () => media.removeEventListener('change', handler);
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.utils.toArray('.marquee-track').forEach((el) => {
				gsap.to(el, {
					x: '-50%', duration: 18, ease: 'none', repeat: -1,
				});
			});
		});
		return () => ctx.revert();
	}, []);

	useLayoutEffect(() => {
		const footer = footerRef.current;
		const button = buttonRef.current;
		const xTo = gsap.quickTo(button, 'x', { duration: 8, ease: 'power1.out' });
		const yTo = gsap.quickTo(button, 'y', { duration: 8, ease: 'power1.out' });

		const handleMouseMove = (e) => {
			const { clientX, clientY } = e;
			const footerRect = footer.getBoundingClientRect();
			const btnRect = button.getBoundingClientRect();
			const centerX = btnRect.width / 2;
			const centerY = btnRect.height / 2;
			const x = clientX - (button.offsetLeft + footerRect.left) - centerX;
			const y = clientY - (button.offsetTop + footerRect.top) - centerY;

			xTo(x);
			yTo(y);
		};

		const handleMouseLeave = () => {
			xTo(0);
			yTo(0);
		};

		footer.addEventListener('mousemove', handleMouseMove);
		footer.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			footer.removeEventListener('mousemove', handleMouseMove);
			footer.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return (
		<>
			{/* HERO */}
			<header className='relative' style={{ backgroundImage: 'linear-gradient(to right, rgba(158,158,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,158,158,0.08) 1px, transparent 1px)', backgroundSize: '60px 60px', backgroundPosition: 'top left', }}>
				<div className='max-w-7xl mx-auto p-4 md:p-8 flex flex-col min-h-dvh'>
					<section className='flex flex-col justify-end'>
						<Header />
						<div>
							<p className='font-black uppercase text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight animate__animated animate__fadeIn ml-1'>HI, I&apos;M</p>
							<h1 className='font-black uppercase leading-none w-full animate__animated animate__fadeIn' style={{ fontSize: 'clamp(3rem, 16vw, 13.6rem)' }}>PRASHANT</h1>
						</div>
						<h1 className='leading-[0.88] my-12 animate__animated animate__fadeIn' style={{ fontFamily: '"DMSerifDisplay-Regular", serif', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
							<span className='block mb-4 font-thin'>Crafting<span style={{ color: 'var(--accent)', fontWeight: '700' }}>{' bold'}<span className='animate-blink'>_</span></span></span>
							<span className='block font-thin'>Digital<span className='text-neutral-600'> things.</span></span>
						</h1>
						<div className='flex items-end justify-between py-10 my-2 border-t border-neutral-800 animate__animated animate__fadeIn'>
							<p className='text-sm text-neutral-500 max-w-xs leading-relaxed'>
								I craft digital experiences that live at the intersection
								of design and engineering. Clean. Considered. Purposeful.
							</p>
						</div>
					</section>
					<div className='overflow-hidden py-5 border-y border-white/10 mt-auto mb-2 z-5'>
						<div className='marquee-track flex whitespace-nowrap gap-2' style={{ width: '200%' }}>
							{Array(10).fill(null).map((_, i) => (
								<span key={i} className='text-[12px] tracking-[0.3em] uppercase text-neutral-500 shrink-0'>
									WebGL · React.js · Framer Motion · Three.js · GSAP · Shader Art ·&nbsp;
								</span>
							))}
						</div>
					</div>
				</div>
				<div className='pointer-events-none absolute bottom-0 left-0 w-full' style={{ height: '240px', background: 'linear-gradient(to top, var(--background-color), transparent)'}} />
			</header>

			{/* ABOUTM ME */}
			<section className='max-w-7xl mx-auto p-4 md:p-8'>
				<h2 className='text-5xl md:text-6xl mb-8'>A <span style={{ fontFamily: '"DMSerifDisplay-Regular", serif' }}> Human</span><br/>before a <span style={{ fontFamily: '"DMSerifDisplay-Regular", serif' }}>User</span></h2>
			</section>

			{/* WORKS */}
			<main className='max-w-7xl mx-auto p-4 md:p-8 mb-24'>
				<section className='text-white'>
					<p className='text-xs tracking-widest uppercase text-gray-500 mb-6 font-light'>Area of Expertise</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
						<div>
							<h2 className='text-5xl md:text-6xl mb-8' style={{ fontFamily: '"DMSerifDisplay-Regular", serif' }}>Selected <br /> Works</h2>
							<ul>
								{projects.map((project, i) => {
									const isHovered = hoveredIndex === i;
									const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;
									const isActive = activeIndex === i;
									const handleClick = () => {
										if (isTouch) {setActiveIndex(prev => (prev === i ? null : i));}
									};
									return (
										<li key={i} onMouseEnter={() => !isTouch && setHoveredIndex(i)} onMouseLeave={() => !isTouch && setHoveredIndex(null)}
											onClick={() => {
												if (isTouch) {setActiveIndex(prev => (prev === i ? null : i));}
												else if (project.slug) {navigate(`/works/${project.slug}`);}
											}}
											className={`flex flex-col py-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${!isTouch && isOtherHovered ? 'opacity-30' : 'opacity-100'}`}>
											<div className='flex items-center justify-between'>
												<div className='flex flex-col'>
													<span className={`text-sm md:text-base transition-all duration-300 ${isHovered || isActive ? 'text-white font-medium tracking-wide' : 'text-slate-300 font-thin'}`}>
														{project.name}
													</span>
													<div className='flex flex-wrap gap-2 overflow-hidden transition-all duration-300' style={{ maxHeight: isHovered || isActive ? '40px' : '0px', opacity: isHovered || isActive ? 1 : 0, }}>
														{project.tags.map((tag, idx) => (
															<span key={idx} className='text-[10px] px-2 py-0.5 border border-white/20 rounded-full text-white/60 mt-2'>
																{tag}
															</span>
														))}
													</div>
												</div>
												<div className='flex items-center gap-3 ml-4 shrink-0'>
													<span className={`hidden md:block h-px bg-white transition-all duration-500 ${isHovered ? 'w-24 opacity-100' : 'w-0 opacity-0'}`} />
													<span className='text-xs text-neutral-500 whitespace-nowrap'>{project.type}</span>
													<span className='text-xs text-neutral-500 whitespace-nowrap'>{project.year}</span>
													<button onClick={(e) => {
														e.stopPropagation();
														if (project.slug) navigate(`/works/${project.slug}`);
													}} className='md:hidden flex items-center justify-center'>
														<IoArrowForwardCircle className={`text-white`} />
													</button>
												</div>
											</div>
											<div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
												<div className={`w-full rounded-sm overflow-hidden border border-white/10 bg-[#1a1a1a] transform transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-95'}`}>
													<img src={project.gif} alt={project.name} className='w-full h-auto object-contain' />
												</div>
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
									<p className='text-thin text-white/50 text-sm tracking-widest uppercase'>
										Hover on a project
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer ref={footerRef} className='max-w-7xl mx-auto overflow-hidden mb-14 relative'>
				<Ruler />
				<div className='text-center pt-10 pb-2 px-4'>
					<p className='text-white text-sm sm:text-base font-bold tracking-[0.15em] uppercase mb-4'>Next Step?</p>
					<span className='text-(--accent) uppercase leading-[0.85] whitespace-nowrap mb-18' style={{ fontWeight: 900, fontSize: 'clamp(15px, 10vw, 120px)', display: 'inline-block', transform: 'scaleY(2)', transformOrigin: 'top' }}>
						Let&#39;s build<br />an experience
					</span>
					<div className='flex justify-center items-center mt-5 mb-8'>
						<a onClick={onContactClick} ref={buttonRef} className='z-10 flex items-center no-underline'>
							<Button className='group relative overflow-hidden font-bold flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 cursor-pointer border-2 border-white transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]' style={{ color: 'white', background: 'var(--background-color)', filter: 'drop-shadow(0px 0px 20px rgba(26, 26, 26, 0.8))', }}>
								<span className='absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0' style={{ background: 'var(--accent)', }} />
								<span className='relative z-10 text-base px-3 py-1 md:text-2xl md:px-4 md:py-2 transition-colors duration-300 group-hover:text-black'>CONTACT</span>
								<IoArrowForwardCircle className='relative z-10 w-8 h-8 md:w-16 md:h-16 text-(--accent) group-hover:text-black group-hover:translate-x-1 transition-all duration-300' />
							</Button>
						</a>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] border-t border-neutral-700'>
					<div className='flex items-center px-8 py-7'>
						<p className='text-white uppercase text-xs sm:text-sm font-semibold tracking-widest leading-relaxed max-w-sm'>
							Got some exciting ideas? Let&apos;s connect and create something extraordinary together!
						</p>
					</div>
					<div className='hidden md:block bg-neutral-700' />
					<div className='flex items-center px-8 py-7 overflow-hidden border-t border-neutral-700 md:border-t-0'>
						<div className='w-full overflow-hidden'>
							<div className='marquee-track flex items-center gap-4 whitespace-nowrap text-white font-semibold tracking-wide' style={{ fontSize: 'clamp(18px, 3vw, 36px)' }}>
								<span className='text-[#FFD600]'>✦</span>
								<span>Click This Floating Button</span>
								<span className='text-[#FFD600] ml-8'>✦</span>
								<span>Or The Mail Icon On the Dock</span>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</footer>
		</>
	);
}