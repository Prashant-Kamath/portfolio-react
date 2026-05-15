import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { Header, Footer } from '../components/HeaderFooter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Button from '../components/Button';
import { worksData } from '../components/Cards-Data';
import { sizeClasses } from '../components/WorksCard';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = worksData
	.filter(w => w.selected)
	.map(w => ({ name: w.title, type: w.selectedType, year: w.date, gif: w.image, size: w.size, tags: w.tags, slug: w.slug }));

function FaceCard() {
	return (
		<>
			<style>
				{`
					.face-wrap {z-index: 10; transform-origin: top center;}
					.face {position: relative; rotate: 5deg; width: min(300px, 78vw); height: min(350px, 91vw); background: linear-gradient(180deg, #452824 184px, #f2bbad 34px); border-top-right-radius: 250px 350px; border-top-left-radius: 250px 350px; border-bottom-left-radius: 250px 250px; border-bottom-right-radius: 250px 250px; border: 5px solid black;}
					.face-hairs {position: absolute; top: 25px; width: calc(100% - 10px); height: 180px; background-color: #f2bbad; border-top-right-radius: 250px 350px; border-top-left-radius: 250px 350px;}
					.face-snow {transform: translateX(150px); transform-origin: right;}
					.mountain-cap {position: absolute; top: 20px; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 40px solid #452824;}
					.mountain-cap-1 { left: -65px; }
					.mountain-cap-2 { left: -35px; }
					.mountain-cap-3 { left: -5px; }
					.mountain-cap-4 { left: 25px; }
					.face-earL, .face-earR {position: absolute; width: 50px; height: 70px; background-color: #f2bbad; border: 5px solid black; border-top-right-radius: 250px 350px;border-top-left-radius: 250px 350px; border-bottom-left-radius: 250px 250px; border-bottom-right-radius: 250px 250px;}
					.face-earL {left: -30px; top: 150px; z-index: -1;}
					.face-earR {right: -30px; top: 150px; z-index: -4;}
					.face-eyeL, .face-eyeR {position: absolute; top: 120px; width: 10px; height: 10px; background-color: black; border-radius: 9999px; z-index: 2; animation: faceBlink 5s infinite linear;}
					.face-eyeL {right: 128px;}
					.face-eyeR {left: 128px;}
					@keyframes faceBlink {98% { height: 10px; width: 10px; } 100% {height: 3px; width: 11px; }}
					.face-mouth {position: absolute; top: 300px; left: 140px; width: 25px; height: 18px; background: #a36655; border: 5px solid black; border-radius: 50%; transition: all .3s linear;}
					.face:hover .face-mouth {top: 290px; left: 123px; width: 60px; height: 25px; border-radius: 7px 7px 130px 130px;}
					.face-smileL, .face-smileR {position: absolute; width: 0; height: 0; top: 180px; rotate: 310deg; transition: all .15s linear;}
					.face-smileL {left: 70px;}
					.face-smileR {right: 70px;}
					.face:hover .face-smileL, .face:hover .face-smileR {width: 30px; height: 30px;}
					@media (max-width: 640px) {
						.face {border-width: 4px;}
						.face-earL, .face-earR, .face-mouth {border-width: 4px;}
					}
				`}
			</style>
			<div className='face-wrap mt-2 scale-64 sm:scale-68 lg:scale-80'>
				<div className='face'>
					<div className='face-earL' />
					<div className='face-earR' />
					<div className='face-eyeL' />
					<div className='face-eyeR' />
					<div className='face-hairs' />
					<div className='face-mouth' />
					<div className='face-smileL'>
						<svg xmlSpace='preserve' viewBox='0 0 65 65' xmlns='http://www.w3.org/2000/svg'>
							<path d='M25 19c-6 2-12 4-18 5-2 0-4-2-6-3 1-1 2-3 3-4 11-3 22-7 32-10 2-1 4 1 6 2-1 1-2 4-3 4-4 2-9 4-14 6z' fill='#EF7F71' filter='url(#blurMe1)' />
							<path d='M35 35c-6 2-12 4-18 5-2 0-4-2-6-3 1-1 2-3 3-4 11-3 22-7 32-10 2-1 4 1 6 2-1 1-2 4-3 4-4 2-9 4-14 6z' fill='#EF7F71' filter='url(#blurMe1)' />
							<path d='M45 50c-6 2-12 4-18 5-2 0-4-2-6-3 1-1 2-3 3-4 11-3 22-7 32-10 2-1 4 1 6 2-1 1-2 4-3 4-4 2-9 4-14 6z' fill='#EF7F71' filter='url(#blurMe1)' />
						</svg>
					</div>
					<div className='face-smileR'>
						<svg xmlSpace='preserve' viewBox='0 0 65 65' xmlns='http://www.w3.org/2000/svg'>
							<path d='M25 19c-6 2-12 4-18 5-2 0-4-2-6-3 1-1 2-3 3-4 11-3 22-7 32-10 2-1 4 1 6 2-1 1-2 4-3 4-4 2-9 4-14 6z' fill='#EF7F71' filter='url(#blurMe2)' />
							<path d='M35 35c-6 2-12 4-18 5-2 0-4-2-6-3 1-1 2-3 3-4 11-3 22-7 32-10 2-1 4 1 6 2-1 1-2 4-3 4-4 2-9 4-14 6z' fill='#EF7F71' filter='url(#blurMe2)' />
							<path d='M45 50c-6 2-12 4-18 5-2 0-4-2-6-3 1-1 2-3 3-4 11-3 22-7 32-10 2-1 4 1 6 2-1 1-2 4-3 4-4 2-9 4-14 6z' fill='#EF7F71' filter='url(#blurMe2)' />
						</svg>
					</div>
					<div className='face-snow'>
						<div className='mountain-cap mountain-cap-1' />
						<div className='mountain-cap mountain-cap-2' />
						<div className='mountain-cap mountain-cap-3' />
						<div className='mountain-cap mountain-cap-4' />
					</div>
				</div>
			</div>
		</>
	);
}

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
	const aboutSmallLabelRef = useRef(null);
	const aboutHeadingRef = useRef(null);
	const aboutParaRef = useRef(null);
	const navigate = useNavigate();

	const [activeIndex, setActiveIndex] = useState(null);
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-in-out-cubic',
			once: false,
		});
	}, []);

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
				gsap.to(el, { x: '-50%', duration: 18, ease: 'none', repeat: -1 });
			});
		});
		return () => ctx.revert();
	}, []);

	useEffect(() => {
		const el = aboutHeadingRef.current;
		if (!el) return;
		el.style.setProperty('--fill-progress', '0%');
		const ctx = gsap.context(() => {
			gsap.to(el, {
				'--fill-progress': '100%',
				ease: 'none',
				scrollTrigger: {
					trigger: el,
					start: 'top 80%',
					end: 'bottom 40%',
					scrub: 1,
				},
			});
		});
		return () => ctx.revert();
	}, []);
	useEffect(() => {
		const ctx = gsap.context(() => {
			const aLittleSplit = new SplitText(aboutSmallLabelRef.current, { type: 'chars' });
			gsap.from(aLittleSplit.chars, {
				opacity: 0,
				y: 20,
				stagger: 0.05,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: aboutSmallLabelRef.current,
					start: 'top 85%',
					end: 'center 50%',
					scrub: 1.2,
				},
			});
			const paraSplit = new SplitText(aboutParaRef.current, { type: 'lines' });
			gsap.from(paraSplit.lines, {
				opacity: 0,
				// filter: "blur(4px)",
				y: 24,
				stagger: 0.08,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: aboutParaRef.current,
					start: 'top 80%', //was 85%
					end: 'center 50%',
					scrub: 1.2,
				},
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
		const handleMouseLeave = () => { xTo(0); yTo(0); };
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
			<header className='relative' style={{ backgroundImage: 'linear-gradient(to right, rgba(158,158,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,158,158,0.08) 1px, transparent 1px)', backgroundSize: '60px 60px', backgroundPosition: 'top left' }}>
				<div className='max-w-7xl mx-auto p-4 md:p-8 flex flex-col min-h-dvh'>
					<section className='flex flex-col justify-end gap-6 md:gap-8 lg:gap-8'>
						<Header />
						<div>
							<p className='font-black uppercase text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight animate__animated animate__fadeIn ml-1'>HI, I&apos;M</p>
							<h1 className='font-black uppercase leading-none w-full animate__animated animate__fadeIn' style={{ fontSize: 'clamp(3rem, 16vw, 13.6rem)' }}>PRASHANT</h1>
						</div>
						<h2 className='leading-[0.88] animate__animated animate__fadeIn' style={{ fontFamily: '"DMSerifDisplay-Regular", serif', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
							<span className='block mb-4 font-thin'>Crafting<span style={{ color: 'var(--accent)', fontWeight: '700' }}>{' bold'}<span className='animate-blink'>_</span></span></span>
							<span className='block font-thin'>Digital<span className='text-neutral-600'> things.</span></span>
						</h2>
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
				<div className='pointer-events-none absolute bottom-0 left-0 w-full' style={{ height: '240px', background: 'linear-gradient(to top, var(--background-color), transparent)' }} />
			</header>

			{/* ABOUT ME */}
			<section className='max-w-7xl mx-auto p-4 md:p-8 min-h-dvh flex justify-center items-center'>
				<div className='text-center flex flex-col items-center w-full'>
					<p ref={aboutSmallLabelRef} className='text-xl'>A Little</p>
					<style>{`.about-heading {--fill-progress: 0%; color: transparent; -webkit-text-stroke: 2px white; background-image: linear-gradient(to right, white var(--fill-progress), transparent var(--fill-progress)); -webkit-background-clip: text; background-clip: text;}`}</style>
					<h1 ref={aboutHeadingRef} className='about-heading text-7xl md:text-[10rem] font-black uppercase tracking-tight mb-8'>About Me</h1>
					<div className='grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 w-full'> {/* items-center */}
						{/* Left Column — 70% */}
						<div className='flex flex-col space-y-6 items-center my-4 md:my-6 lg:my-8'>
							<p ref={aboutParaRef} className='text-lg md:text-2xl leading-relaxed text-neutral-300 font-medium text-center'>
								With over five years of experience in design,<br />
								I specialize in branding, web design, and user experience.<br />
								I love collaborating with businesses that want to stand out and showcase their best side.<br />
								Let&apos;s create something amazing together!
							</p>
						</div>
						{/* Right Column — 30% */}
						<div className='relative w-full flex items-center justify-center'>
							<FaceCard />
						</div>
					</div>
				</div>
			</section>

			{/* WORKS */}
			<main className='max-w-7xl mx-auto p-4 md:p-8 mb-24'>
				<section className='text-white'>
					<p data-aos='fade-up' className='text-xs tracking-widest uppercase text-gray-500 mb-6 font-light'>Area of Expertise</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
						<div data-aos='fade-up'>
							<h2 className='text-5xl md:text-6xl mb-8' style={{ fontFamily: '"DMSerifDisplay-Regular", serif' }}>Selected <br /> Works</h2>
							<ul>
								{projects.map((project, i) => {
									const isHovered = hoveredIndex === i;
									const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;
									const isActive = activeIndex === i;
									return (
										<li key={i}
											onMouseEnter={() => !isTouch && setHoveredIndex(i)}
											onMouseLeave={() => !isTouch && setHoveredIndex(null)}
											onClick={() => {
												if (isTouch) { setActiveIndex(prev => (prev === i ? null : i)); }
												else if (project.slug) { navigate(`/works/${project.slug}`); }
											}}
											className={`flex flex-col py-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group ${!isTouch && isOtherHovered ? 'opacity-80 blur-[2px]' : 'opacity-100'}`}>
											<div className='flex items-center justify-between'>
												<div className='flex flex-col'>
													<span className={`text-sm md:text-base transition-all duration-300 ${isHovered || isActive ? 'text-white font-medium tracking-wide' : 'text-slate-300 font-thin'}`}>
														{project.name}
													</span>
													<div className='flex flex-wrap gap-2 overflow-hidden transition-all duration-300' style={{ maxHeight: isHovered || isActive ? '40px' : '0px', opacity: isHovered || isActive ? 1 : 0 }}>
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
														<IoArrowForwardCircle className='text-white' />
													</button>
												</div>
											</div>
											<div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
												<div className={`w-full rounded-sm overflow-hidden border border-white/10 bg-[#1a1a1a] transform transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-95'}`}>
													{isActive && (
														<img src={project.gif} alt={project.name} className='w-full h-auto object-contain' />
													)}
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
											{hoveredIndex === i && (
												<img src={project.gif} alt={project.name} className='w-full h-full object-cover' />
											)}
										</div>
									</div>
								))}
								<div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
									<p className='text-thin text-white/50 text-sm tracking-widest uppercase'>Hover on a project</p>
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
							<Button className='group relative overflow-hidden font-bold flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 cursor-pointer border-2 border-white transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]' style={{ color: 'white', background: 'var(--background-color)', filter: 'drop-shadow(0px 0px 20px rgba(26, 26, 26, 0.8))' }}>
								<span className='absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0' style={{ background: 'var(--accent)' }} />
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