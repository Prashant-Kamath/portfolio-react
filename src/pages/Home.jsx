import scrollDownGif from "../assets/scroll-down-circle.gif";

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto p-4 md:p-8">

			{/* Hero Section */}
			<div className="pt-8 md:pt-12 flex items-end justify-between relative">

				{/* Text */}
				<div className="z-10">
					<p className="font-black uppercase text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight">
						HI, I&apos;M
					</p>

					<h1
						className="font-black uppercase leading-none -ml-1 w-full"
						style={{ fontSize: "clamp(3rem, 16vw, 13.6rem)" }}
					>
						PRASHANT
					</h1>
				</div>
			</div>

			<iframe className="absolute top-24 left-74 z-15" src='https://my.spline.design/nexbotrobotcharacterconcept-wJJ4bilxLCbSvTemO9F3Edc0/' width='100%' height='100%'></iframe>

			{/* Description */}
			<p className="mt-8 md:mt-12 max-w-[280px] sm:max-w-xs md:max-w-sm font-bold uppercase text-[10px] sm:text-[11px] md:text-xs tracking-widest leading-loose text-center">
				I&apos;M A DESIGN GENERALIST THAT MEANS I CRAFT
				USER EXPERIENCE, USER INTERFACE, WEBSITES, ANIMATIONS,
				INTERACTIONS, VISUALS, PROTOTYPES, PRESENTATIONS,
				BRANDS AND SO ON...
			</p>

			{/* Scroll Down GIF */}
			<div className="flex justify-end">
				<img
					src={scrollDownGif}
					alt="Scroll down"
					className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
				/>
			</div>
		</div>
	);
}