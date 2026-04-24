import scrollDownGif from '../assets/scroll-down-circle.gif';

export default function Home() {
	return (
		<div>
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

			{/* 2nd div */}
			<div style={{ height: '100dvh', height: '100vh', backgroundColor: '#0d3116' }}>
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