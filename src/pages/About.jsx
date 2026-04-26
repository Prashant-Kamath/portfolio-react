import React, { useLayoutEffect, useRef } from 'react';
import Button from '../components/button';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoDownload } from 'react-icons/io5';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
	const headerRef = useRef(null);
	const footerRef = useRef(null);
	const leftRef = useRef(null);
	const skills = [
		{ name: 'UI / UX', level: 80 },
		{ name: 'WEB DESGIN / DEV', level: 70 },
		{ name: 'GRAPHIC DESIGN', level: 85 },
	];

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: headerRef.current,
				start: "bottom top",
				endTrigger: footerRef.current,
				end: "top top",
				pin: leftRef.current,
				pinSpacing: false,
				markers: false,
			});
		}, headerRef);
		return () => ctx.revert();
	}, []);

	return (
		<div className='max-w-7xl mx-auto p-4 md:p-8'>
			<header ref={headerRef} className='border-b border-gray-600 pb-12 mb-12 flex flex-col md:flex-row justify-between items-center gap-8'>
				<h1 className='text-5xl md:text-7xl font-bold leading-tight'>
					Innovative Designer <br />
					Driven<span className='font-extralight'> by Creavity.</span>
				</h1>
				<div className='relative'>
					<div className='w-32 h-32 md:w-40 md:h-40 rounded-full bg-pink-400 overflow-hidden border-4 border-gray-600'>
						<img src='/api/placeholder/160/160' alt='Amelia Wong' className='w-full h-full object-cover' />
					</div>
				</div>
			</header>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
				<div ref={leftRef} className='lg:col-span-4 space-y-12'>
					<section>
						<h2 className='text-1xl mb-4'>Prashant Kamath</h2>
						<p>I'm a passionate UX/UI designer based in New York, dedicated to creating exceptional user experiences and building innovative products. With years of experience in the industry, I strive to bring value to every project and exceed client expectations.</p>
					</section>
					<section className='space-y-4 border-t border-gray-600 pt-8'>
						<div className='flex justify-between border-b border-gray-600 py-2'>
							<span>[Profession]</span>
							<span>FREELANCE VISUAL DESIGNER</span>
						</div>
						<div className='flex justify-between border-b border-gray-600 py-2'>
							<span>[Date of Birth]</span>
							<span>17 JULY 1996</span>
						</div>
						<div className='flex justify-between border-b border-gray-600 py-2'>
							<span>[Education]</span>
							<span className='text-right'>University of Arts</span>
						</div>
					</section>
					<Button icon={IoDownload}>Download My Resume</Button>
				</div>
				<div className='lg:col-span-8 space-y-16'>
					<section>
						<h3 className='flex items-center gap-4 mb-4'>
							<span className='text-1xl'><span className='me-2'>✦</span>Work Experience</span>
						</h3>
						<div className='space-y-8'>
							<div>
								<h4>Graphic Designer, XYZ Agency <span>[2017 — PRESENT]</span></h4>
								<ul className='mt-4 space-y-2 list-disc list-inside'>
									<li>Designed marketing materials for clients in various industries</li>
									<li>Developed brand guidelines for multiple clients</li>
									<li>Collaborated with a team of designers and copywriters</li>
								</ul>
							</div>
							<div>
								<h4>Freelance Graphic Designer <span>[2014 — 2017]</span></h4>
								<ul className='mt-4 space-y-2 list-disc list-inside'>
									<li>Designed logos and branding packages for small businesses</li>
									<li>Created marketing materials for local events and organizations</li>
								</ul>
							</div>
						</div>
					</section>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
						<section>
							<h3 className='mb-4'>Education</h3>
							<div className='space-y-2'>
								{[
									['Maya Academy of Advanced Cinematics (MAAC)'],
									['D.A.V Public School'],
								].map(([title]) => (
									<div key={title} className='flex justify-between border-b border-gray-600 py-2'>
										<span>{title}</span>
									</div>
								))}
							</div>
						</section>
						<section>
							<h3 className='mb-4'>Skills</h3>
							<div className='space-y-6'>
								{skills.map((skill) => (
									<div key={skill.name}>
										<div className='flex justify-between mb-2'>
											<span>{skill.name}</span>
											<span>[{skill.level}%]</span>
										</div>
										<div className='w-full bg-gray-900 h-1'>
											<div className='bg-white h-full transition-all duration-1000' style={{ width: `${skill.level}%` }}></div>
										</div>
									</div>
								))}
							</div>
						</section>
					</div>
					<section className='bg-zinc-900 p-8 rounded-lg'>
						<h3>Testimonials</h3>
						<p>'AMELIA IS A TALENTED DESIGNER WHO ALWAYS DELIVERS EXCEPTIONAL WORK. SHE'S PROFESSIONAL.'</p>
						<p className='mt-4'>— JANE SMITH, CEO OF COMPANY</p>
					</section>
				</div>
			</div>
			<footer ref={footerRef} className='mt-20 mb-20 pt-8 border-t border-gray-600 flex justify-between items-center'>
				<div>Resumely</div>
				<div>© 2024 Amelia Wong — Powered by Webflow</div>
			</footer>
		</div>
	);
};

export default About;