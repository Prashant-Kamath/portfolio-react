import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHeart, IoArrowForwardCircle } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/button';
import { worksData } from '../components/cards-data';
import { sizeClasses } from '../components/workscard';
import 'animate.css';

gsap.registerPlugin(ScrollTrigger);

const projects = worksData
	.filter(w => w.selected)
	.map(w => ({
		name: w.title,
		type: w.selectedType,
		year: w.date,
		gif: w.image,
		size: w.size,
	}));

function Ruler() {
	const TICKS = 80;
	return (
		<div className='relative w-full h-8 border-b border-[#222] overflow-hidden flex items-start pt-1'>
			<div className='flex w-full'>
				{Array.from({ length: TICKS }).map((_, i) => (
					<div key={i} style={{ width: `${100 / TICKS}%`, height: i % 10 === 0 ? '16px' : '8px', borderLeft: `1px solid ${i % 10 === 0 ? '#888' : '#333'}`, flexShrink: 0 }} />
				))}
			</div>
			{/* Labels */}
			<div className='absolute top-4 left-0 w-full flex justify-around px-[10%]'>
				{['-02', '-01', '00', '01', '02'].map((l) => (
					<span key={l} className='text-[#555] text-[9px] font-mono tracking-widest'>
						{l}
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
		<div>
			{/* HERO */}
			<div className='relative' style={{ backgroundImage: 'linear-gradient(to right, rgba(158,158,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,158,158,0.08) 1px, transparent 1px)', backgroundSize: '60px 60px', backgroundPosition: 'top left', }}>
				<div className='max-w-7xl mx-auto p-4 md:p-8 flex flex-col min-h-[100dvh]'>
					<section className='flex flex-col justify-end'>
						<div>
							<div className='flex justify-between items-center mb-8 animate__animated animate__fadeIn'>
								<p className='text-xs text-neutral-500 uppercase tracking-widest'>Creative Studio / Digital Craft</p>
								<Button className='font-normal flex items-center justify-center transition-all duration-300 text-xs px-3 py-1 gap-2 md:text-sm md:px-4 md:py-2 cursor-svg' style={{ color: 'white', background: 'var(--background-color)', border: '2px solid rgba(255, 255, 255, 0.5)', filter: 'drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.25))', animation: 'flickering 2s linear infinite both' }}>
									<span className='w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-600 opacity-80 animate-pulse'></span>Available for work
								</Button>
							</div>
							<div>
								<p className='font-black uppercase text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight animate__animated animate__fadeIn'>HI, I&apos;M</p>
								<h1 className='font-black uppercase leading-none -ml-1 w-full animate__animated animate__fadeIn' style={{ fontSize: 'clamp(3rem, 16vw, 13.6rem)' }}>PRASHANT</h1>
							</div>
							<h1 className='leading-[0.88] mt-12 animate__animated animate__fadeIn' style={{ fontFamily: '"DMSerifDisplay-Regular", serif', fontSize: 'clamp(3.5rem,2vw,4rem)', }}>
								<span className='block mb-4 font-thin'>Crafting<span style={{ color: 'var(--accent)', fontWeight: '700' }}> bold<span className='animate-blink'>_</span></span></span>
								<span className='block font-thin'>Digital<span className='text-neutral-600'> things.</span></span>
							</h1>
						</div>

						<div className='flex items-end justify-between mt-16 pb-10 border-t border-neutral-800 pt-6 animate__animated animate__fadeIn'>
							<p className='text-sm text-neutral-500 max-w-xs leading-relaxed'>
								I craft digital experiences that live at the intersection
								of design and engineering. Clean. Considered. Purposeful.
							</p>
						</div>
					</section>
					<div className='overflow-hidden py-5 border-y border-white/[0.1] my-6 z-5'>
						<div className='marquee-track flex whitespace-nowrap gap-2' style={{ width: '200%' }}>
							{Array(10).fill(null).map((_, i) => (
								<span key={i} className='mono text-[11px] tracking-[0.3em] uppercase text-neutral-500 shrink-0'>
									WebGL · React.js · Framer Motion · Three.js · GSAP · Shader Art ·&nbsp;
								</span>
							))}
						</div>
					</div>
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
									<p className='text-thin text-white/50 text-sm tracking-widest uppercase'>
										Hover on a project
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			{/* Footer */}
			<footer ref={footerRef} className='max-w-7xl mx-auto overflow-hidden mb-14 relative'>
				<Ruler />
				<div className='text-center pt-10 pb-2 px-4'>
					<p className='text-white text-sm sm:text-base font-bold tracking-[0.15em] uppercase mb-0'>are you ready?</p>
					<span className='text-[var(--accent)] uppercase leading-[0.85] whitespace-nowrap mb-14' style={{ fontWeight: 900, fontSize: 'clamp(15px, 12vw, 120px)', display: 'inline-block', transform: 'scaleY(2)', transformOrigin: 'top' }}>
						Let&#39;s build<br />an experience
					</span>
					<div className='flex justify-center items-center mt-5 mb-8'>
						<a onClick={onContactClick} ref={buttonRef} className='z-10 flex items-center no-underline'>
							<Button className='font-bold flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 cursor-pointer' style={{ color: 'white', background: 'var(--background-color)', border: '2px solid rgba(255, 255, 255, 1)', filter: 'drop-shadow(0px 0px 20px rgba(26, 26, 26, 0.8))' }}>
								<span className='text-base px-3 py-1 md:text-2xl md:px-4 md:py-2'>CONTACT</span>
								<IoArrowForwardCircle className='w-8 h-8 md:w-16 md:h-16 text-[var(--accent)]' />
							</Button>
						</a>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] border-t border-[#222]'>
					<div className='flex items-center px-8 py-7'>
						<p className='text-white uppercase text-xs sm:text-sm font-semibold tracking-widest leading-relaxed max-w-sm'>
							Got some exciting ideas? Let&apos;s connect and create something extraordinary together!
						</p>
					</div>
					<div className='hidden md:block bg-[#222]' />
					<div className='flex items-center px-8 py-7 overflow-hidden border-t border-[#222] md:border-t-0'>
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
				<div className='flex sm:flex-row items-center justify-between py-5 border-t border-[#1a1a1a] gap-4 flex-wrap'>
					<p className='text-[#555] text-xs tracking-wider'>Hand crafted by<strong className='text-[#FFD600] font-bold tracking-widest'> PRASHANT</strong></p>
					<p className='flex gap-2 text-[#555] text-xs tracking-wider'>With<strong className='text-[#FFD600] font-bold tracking-widest'> <IoHeart /></strong> 2026</p>
				</div>
			</footer>
		</div>
	);
}