import React, { useLayoutEffect, useRef, useState, Suspense, lazy } from 'react';
import Modal from 'react-modal';
import Button from '../components/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoDownload } from 'react-icons/io5';
import { Header, Footer } from '../components/HeaderFooter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'animate.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
	const headerRef = useRef(null);
	const footerRef = useRef(null);
	const leftRef = useRef(null);

	const skills = [
		{ name: 'UI / UX' }, { name: 'WEB DESGIN / DEV' }, { name: 'GRAPHIC DESIGN' },
	];

	const ResumeModal = lazy(() => import('../components/ResumeModal'));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();
			mm.add('(min-width: 1024px)', () => {
				ScrollTrigger.create({
					trigger: headerRef.current,
					start: 'bottom top',
					endTrigger: footerRef.current,
					end: 'top 600',
					pin: leftRef.current,
					pinSpacing: false,
					markers: false,
				});
			});
		}, headerRef);
		return () => ctx.revert();
	}, []);

	const timelineData = [
		{ year: '2001', title: 'Terrified Rachael', desc: 'There was something in the tree...' },
		{ year: '2003', title: 'Magna', desc: 'They are playing the piano while flying in the plane.' },
		{ year: '2004', title: 'Mauris Pellentes', desc: 'The boy walked down the street in a carefree way...' },
		{ year: '2006', title: 'Hope', desc: 'Hopes and dreams were dashed that day...' },
	];

	return (
		<div className='relative' style={{ backgroundImage: 'linear-gradient(to right, rgba(158,158,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,158,158,0.08) 1px, transparent 1px)', backgroundSize: '60px 60px', backgroundPosition: 'top left', }}>
			<div className='max-w-7xl mx-auto p-4 md:p-8'>
				<Header />
				<header ref={headerRef} className='border-b border-white pb-22 mt-22 mb-12 flex flex-col-reverse md:flex-row justify-between items-center gap-8 animate__animated animate__fadeIn'>
					<h1 className='text-5xl md:text-8xl font-bold leading-tightest tracking-tight uppercase'>
						Innovative Designer <br />
						Driven<span className='font-extralight text-[var(--accent)]'> by Creavity.</span>
					</h1>
					<div className='relative'>
						<div className='w-32 h-32 md:w-40 md:h-40 rounded-full bg-black overflow-hidden border-4 border-gray-600'>
							<img src='/api/placeholder/160/160' alt='Prashant Kamath' className='w-full h-full object-cover' />
						</div>
					</div>
				</header>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16 text-lg'>
					<div ref={leftRef} className='lg:col-span-4 space-y-12 self-start animate__animated animate__fadeIn'>
						<section>
							<h2 className='text-2xl uppercase mb-4'>Prashant Kamath</h2>
							<p className='text-gray-400'>I'm a passionate UX/UI designer based in New York, dedicated to creating exceptional user experiences and building innovative products. With years of experience in the industry, I strive to bring value to every project and exceed client expectations.</p>
						</section>
						<section className='space-y-4 border-t border-gray-600 pt-8'>
							<div className='flex justify-between border-b border-gray-600 py-2'>
								<span className='text-left uppercase'>[Profession]</span>
								<span className='text-right text-gray-400'>Freelance Visual Designer</span>
							</div>
							<div className='flex justify-between border-b border-gray-600 py-2'>
								<span className='text-left uppercase'>[Date of Birth]</span>
								<span className='text-right text-gray-400'>17 july 1996</span>
							</div>
							<div className='flex justify-between border-b border-gray-600 py-2'>
								<span className='text-left uppercase'>[Education]</span>
								<span className='text-right text-gray-400'>MAAC</span>
							</div>
						</section>
						<Button onClick={toggleModal} className='cursor-pointer w-full flex items-center justify-center gap-2'><IoDownload size={20} />Download My Resume</Button>
						<Suspense fallback={null}>
							{isModalOpen && (<ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />)}
						</Suspense>
					</div>
					<div className='lg:col-span-8 space-y-12 animate__animated animate__fadeIn'>
						<section>
							<h3 className='flex items-center gap-4 mb-4'>
								<span className='uppercase border-b border-white pb-4 mb-4 w-full'><span className='me-2'>✦</span>Work Experience</span>
							</h3>
							<div className='space-y-8'>
								<div>
									<h4 className='uppercase'>Graphic Designer, XYZ Agency <span>[2017 — PRESENT]</span></h4>
									<ul className='mt-4 space-y-2 list-disc list-inside text-gray-400'>
										<li>Designed marketing materials for clients in various industries</li>
										<li>Developed brand guidelines for multiple clients</li>
										<li>Collaborated with a team of designers and copywriters</li>
									</ul>
								</div>
								<div>
									<h4 className='uppercase'>Freelance Graphic Designer <span>[2014 — 2017]</span></h4>
									<ul className='mt-4 space-y-2 list-disc list-inside text-gray-400'>
										<li>Designed logos and branding packages for small businesses</li>
										<li>Created marketing materials for local events and organizations</li>
									</ul>
								</div>
							</div>
						</section>
						<section>
							<h3 className='mb-4 uppercase border-b border-white pb-4 w-full'>Education</h3>
							<section className='w-full pt-8 '>
								<Swiper className='cursor-grab active:cursor-grabbing' spaceBetween={40} slidesPerView={3} mousewheel={{ passive: true }} onSwiper={(swiper) => (window.educationSwiper = swiper)}
									breakpoints={{
										320: { slidesPerView: 1 },
										768: { slidesPerView: 2 },
										1024: { slidesPerView: 3 },
									}}>
									{timelineData.map((item, index) => (
										<SwiperSlide key={index}>
											<div className='px-2'>
												<div className='flex items-center gap-4 mb-4'>
													<span className='text-3xl font-bold'>
														{item.year}
													</span>
													<div className='flex-1 h-px bg-gray-400'></div>
												</div>
												<h4 className='text-sm text-gray-400 mb-2'>
													{item.title}
												</h4>
												<p className='text-sm text-gray-400 leading-relaxed max-w-[240px]'>
													{item.desc}
												</p>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
								<div className='flex justify-between mt-10 text-black'>
									<Button onClick={() => window.educationSwiper?.slidePrev()} className='cursor-pointer rounded-full px-6 py-3 text-xs font-semibold uppercase hover:bg-yellow-500 transition duration-300' style={{ background: 'var(--accent)' }}>Previous</Button>
									<Button onClick={() => window.educationSwiper?.slideNext()} className='cursor-pointer rounded-full px-6 py-3 text-xs font-semibold uppercase hover:bg-yellow-500 transition duration-300' style={{ background: 'var(--accent)' }}>Next</Button>
								</div>
							</section>
						</section>
						<section>
							<h3 className='uppercase border-b border-white pb-4 mb-8 w-full'>Skills</h3>
							<div className='flex flex-wrap gap-3'>
								{skills.map((skill) => (
									<span key={skill.name} className='text-xs uppercase tracking-widest px-4 py-1 rounded-full border bg-blue-50 text-black border-blue-200'>
										{skill.name}
									</span>
								))}
							</div>
						</section>
						<section className='bg-zinc-900 p-8 rounded-lg'>
							<h3 className='uppercase border-b border-white pb-4 mb-8 w-full'>Sofwares Skills</h3>
						</section>
					</div>
				</div>
				<footer ref={footerRef} className='mt-14'>
					<Footer />
				</footer>
			</div>
		</div>
	);
};

export default About;