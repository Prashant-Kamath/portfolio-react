import React from 'react';

const About = () => {
	const skills = [
		{ name: 'GRAPHIC DESIGN', level: 80 },
		{ name: 'LEAD GENERATION', level: 41 },
		{ name: 'PHOTOSHOP', level: 75 },
		{ name: 'ILLUSTRATION', level: 100 },
	];

	return (
		<div className="min-h-screen bg-black text-white font-sans">
			<div className="max-w-7xl mx-auto p-8 md:p-16">
				{/* Header Section */}
				<header className="border-b border-gray-800 pb-12 mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
					<h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
						INNOVATIVE DESIGNER <br />
						DRIVEN BY CREATIVITY.
					</h1>
					<div className="relative">
						<div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-pink-400 overflow-hidden border-4 border-white">
							{/* Replace with actual image path */}
							<img src="/api/placeholder/160/160" alt="Amelia Wong" className="w-full h-full object-cover" />
						</div>
						<div className="absolute -bottom-2 -right-2 bg-white text-black rounded-full p-2">
							<div className="w-4 h-4 bg-black rounded-full"></div>
						</div>
					</div>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
					{/* Left Column: Bio & Info */}
					<div className="lg:col-span-4 space-y-12">
						<section>
							<h2 className="text-xl font-bold mb-4 uppercase tracking-widest">Amelia Wong</h2>
							<p className="text-gray-400 leading-relaxed text-sm">
								I'M A PASSIONATE UX/UI DESIGNER BASED IN NEW YORK, DEDICATED TO CREATING EXCEPTIONAL USER EXPERIENCES AND BUILDING INNOVATIVE PRODUCTS. WITH YEARS OF EXPERIENCE IN THE INDUSTRY, I STRIVE TO BRING VALUE TO EVERY PROJECT AND EXCEED CLIENT EXPECTATIONS.
							</p>
						</section>

						<section className="space-y-4 text-sm border-t border-gray-800 pt-8">
							<div className="flex justify-between border-b border-gray-900 py-2">
								<span className="text-gray-500 uppercase">[Profession]</span>
								<span className="font-medium">DIGITAL DESIGNER</span>
							</div>
							<div className="flex justify-between border-b border-gray-900 py-2">
								<span className="text-gray-500 uppercase">[Date of Birth]</span>
								<span className="font-medium">14 JULY 1994</span>
							</div>
							<div className="flex justify-between border-b border-gray-900 py-2">
								<span className="text-gray-500 uppercase">[Education]</span>
								<span className="font-medium text-right uppercase">University of Arts</span>
							</div>
						</section>

						<button className="w-full bg-white text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors uppercase text-xs tracking-widest">
							Download My Resume
						</button>
					</div>

					{/* Right Column: Experience, Awards, Skills */}
					<div className="lg:col-span-8 space-y-16">
						{/* Work Experience */}
						<section>
							<h3 className="text-lg font-bold mb-6 flex items-center gap-4">
								<span className="text-xl">+</span> WORK EXPERIENCE
							</h3>
							<div className="space-y-8">
								<div>
									<h4 className="font-bold text-sm uppercase">Graphic Designer, XYZ Agency <span className="text-gray-500 font-normal ml-2">[2017 — PRESENT]</span></h4>
									<ul className="mt-4 space-y-2 text-xs text-gray-400 list-disc list-inside uppercase">
										<li>Designed marketing materials for clients in various industries</li>
										<li>Developed brand guidelines for multiple clients</li>
										<li>Collaborated with a team of designers and copywriters</li>
									</ul>
								</div>
								<div>
									<h4 className="font-bold text-sm uppercase">Freelance Graphic Designer <span className="text-gray-500 font-normal ml-2">[2014 — 2017]</span></h4>
									<ul className="mt-4 space-y-2 text-xs text-gray-400 list-disc list-inside uppercase">
										<li>Designed logos and branding packages for small businesses</li>
										<li>Created marketing materials for local events and organizations</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Awards and Skills Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
							<section>
								<h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Awards</h3>
								<div className="space-y-2 text-xs uppercase">
									{[
										['Site of the Day', '05'],
										['Developer Award', '07'],
										['Honorable Mention', '11'],
										['Mobile Excellence', '02']
									].map(([title, count]) => (
										<div key={title} className="flex justify-between border-b border-gray-900 py-2">
											<span className="text-gray-400">{title}</span>
											<span>[{count}]</span>
										</div>
									))}
								</div>
							</section>

							<section>
								<h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Skills</h3>
								<div className="space-y-6">
									{skills.map((skill) => (
										<div key={skill.name}>
											<div className="flex justify-between text-xs mb-2 uppercase">
												<span>{skill.name}</span>
												<span className="text-gray-500">[{skill.level}%]</span>
											</div>
											<div className="w-full bg-gray-900 h-1">
												<div
													className="bg-white h-full transition-all duration-1000"
													style={{ width: `${skill.level}%` }}
												></div>
											</div>
										</div>
									))}
								</div>
							</section>
						</div>

						{/* Testimonial */}
						<section className="bg-zinc-900 p-8 rounded-lg">
							<h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-gray-500">Testimonials</h3>
							<p className="text-xl italic font-serif leading-relaxed">
								"AMELIA IS A TALENTED DESIGNER WHO ALWAYS DELIVERS EXCEPTIONAL WORK. SHE'S PROFESSIONAL."
							</p>
							<p className="mt-4 text-xs font-bold uppercase">— JANE SMITH, CEO OF COMPANY</p>
						</section>
					</div>
				</div>

				{/* Footer */}
				<footer className="mt-20 pt-8 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-[0.2em]">
					<div>Resumely</div>
					<div>© 2024 Amelia Wong — Powered by Webflow</div>
				</footer>
			</div>
		</div>
	);
};

export default About;