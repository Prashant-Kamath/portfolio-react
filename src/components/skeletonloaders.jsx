import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DarkSkeletonTheme = ({ children }) => (
	<SkeletonTheme baseColor='#1a1a1a' highlightColor='#2a2a2a'>
		{children}
	</SkeletonTheme>
);

/* ─────────────────────────────────────────
   HOME PAGE SKELETON
   Mirrors:
   - Header nav
   - Hero: 'HI, I'M' + giant PRASHANT + italic tagline + bottom description row
   - Marquee strip
   - Selected Works: left list (5 rows) + right sticky image area
   - Footer: ruler + 'Let's build' text + contact button
───────────────────────────────────────── */
export const HomeSkeleton = () => (
	<DarkSkeletonTheme>
		{/* HERO */}
		<div className='relative'> {/* style={{
				backgroundImage:
					'linear-gradient(to right, rgba(158,158,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,158,158,0.08) 1px, transparent 1px)',
				backgroundSize: '60px 60px',
				backgroundPosition: 'top left',
			}} */}
			<div className='max-w-7xl mx-auto p-4 md:p-8 flex flex-col min-h-dvh'>
				<section className='flex flex-col justify-end flex-1'>
					{/* Header nav */}
					<div className='flex items-center justify-between mb-10'>
						<Skeleton width={110} height={12} borderRadius={4} />
						<div className='flex gap-4'>
							<Skeleton width={60} height={10} borderRadius={4} />
							<Skeleton width={60} height={10} borderRadius={4} />
							<Skeleton width={60} height={10} borderRadius={4} />
						</div>
					</div>

					{/* 'HI, I'M' label */}
					<Skeleton width={220} height={44} borderRadius={4} style={{ marginBottom: 8 }} />

					{/* Giant PRASHANT */}
					<Skeleton
						width='100%'
						height={140}
						borderRadius={6}
						style={{ marginBottom: 8 }}
					/>

					{/* Italic tagline two lines */}
					<div style={{ marginTop: 48, marginBottom: 48 }}>
						<Skeleton width='32%' height={52} borderRadius={4} style={{ marginBottom: 10 }} />
						<Skeleton width='28%' height={52} borderRadius={4} />
					</div>

					{/* Bottom row: description + spacer */}
					<div className='flex items-end justify-between pt-10 mt-2 border-t border-neutral-800'>
						<div>
							<Skeleton width={260} height={10} borderRadius={4} style={{ marginBottom: 6 }} />
							<Skeleton width={220} height={10} borderRadius={4} style={{ marginBottom: 6 }} />
							<Skeleton width={180} height={10} borderRadius={4} />
						</div>
					</div>
				</section>

				{/* Marquee strip */}
				<div className='mt-auto border-t border-b border-neutral-800 py-4 overflow-hidden'>
					<div className='flex gap-8'>
						{[...Array(7)].map((_, i) => (
							<Skeleton key={i} width={120} height={10} borderRadius={4} />
						))}
					</div>
				</div>
			</div>

			{/* Fade-out gradient */}
			<div
				className='pointer-events-none absolute bottom-0 left-0 w-full'
				style={{ height: '240px', background: 'linear-gradient(to top, var(--background-color), transparent)' }}
			/>
		</div>

		{/* ABOUT ME teaser */}
		<div className='max-w-7xl mx-auto p-4 md:p-8 mb-4'>
			<Skeleton width={340} height={56} borderRadius={6} style={{ marginBottom: 8 }} />
			<Skeleton width={240} height={56} borderRadius={6} />
		</div>

		{/* SELECTED WORKS */}
		<div className='max-w-7xl mx-auto p-4 md:p-8 mb-24'>
			{/* 'Area of expertise' label */}
			<Skeleton width={130} height={10} borderRadius={4} style={{ marginBottom: 24 }} />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
				{/* Left: title + project list */}
				<div>
					<Skeleton width={260} height={80} borderRadius={6} style={{ marginBottom: 32 }} />

					{/* 5 project rows */}
					{[...Array(5)].map((_, i) => (
						<div
							key={i}
							className='flex items-center justify-between py-4 border-b border-white/10'
						>
							<Skeleton width={`${40 + (i % 3) * 12}%`} height={14} borderRadius={4} />
							<div className='flex gap-3 ml-4 shrink-0'>
								<Skeleton width={70} height={10} borderRadius={4} />
								<Skeleton width={38} height={10} borderRadius={4} />
							</div>
						</div>
					))}

					{/* 'See All Projects' link */}
					<Skeleton width={160} height={12} borderRadius={4} style={{ marginTop: 36 }} />
				</div>

				{/* Right: sticky image preview area (desktop only) */}
				<div className='hidden md:flex items-center justify-center sticky top-24 self-start py-8'>
					<Skeleton width='100%' height='60vh' borderRadius={8} />
				</div>
			</div>
		</div>

		{/* FOOTER TEASER */}
		<div className='max-w-7xl mx-auto px-4 md:px-8 mb-14'>
			{/* Ruler */}
			<div className='h-8 border-b border-neutral-600 mb-10' />
			{/* 'Next Step?' */}
			<div className='text-center'>
				<Skeleton width={120} height={14} borderRadius={4} style={{ marginBottom: 24, display: 'inline-block' }} />
				{/* Giant 'Let's build an experience' */}
				<div>
					<Skeleton width='80%' height={90} borderRadius={6} style={{ marginBottom: 10, display: 'inline-block' }} />
					<Skeleton width='60%' height={90} borderRadius={6} style={{ display: 'inline-block' }} />
				</div>
				{/* Contact button */}
				<Skeleton width={200} height={52} borderRadius={4} style={{ marginTop: 40, marginBottom: 32, display: 'inline-block' }} />
			</div>
			{/* Bottom two-col strip */}
			<div className='grid grid-cols-1 md:grid-cols-2 border-t border-neutral-700'>
				<div className='px-8 py-7'>
					<Skeleton count={2} height={12} borderRadius={4} style={{ marginBottom: 6 }} />
					<Skeleton width='60%' height={12} borderRadius={4} />
				</div>
				<div className='px-8 py-7'>
					<Skeleton width='80%' height={30} borderRadius={4} />
				</div>
			</div>
		</div>
	</DarkSkeletonTheme>
);

/* ─────────────────────────────────────────
   WORKS PAGE SKELETON
   Mirrors:
   - Header nav
   - 'My Works' heading + divider
   - Canvas Mode button
   - Masonry grid (columns 1/2/3) with varied aspect ratios
   - Footer
───────────────────────────────────────── */
export const WorksSkeleton = () => (
	<DarkSkeletonTheme>
		{/* HEADER */}
		<section className='relative max-w-7xl mx-auto p-4 md:p-8'>
			{/* Nav */}
			<div className='flex items-center justify-between mb-10'>
				<Skeleton width={110} height={12} borderRadius={4} />
				<div className='flex gap-4'>
					<Skeleton width={60} height={10} borderRadius={4} />
					<Skeleton width={60} height={10} borderRadius={4} />
					<Skeleton width={60} height={10} borderRadius={4} />
				</div>
			</div>

			{/* 'My Works' serif heading */}
			<div className='flex justify-around mb-8'>
				<Skeleton width={280} height={72} borderRadius={6} />
			</div>

			{/* Divider */}
			<div className='border border-neutral-700 mb-8' />
		</section>

		{/* GRID */}
		<section className='relative max-w-7xl mx-auto px-4 py-1 md:px-8 md:py-2'>
			{/* Canvas Mode button */}
			<div className='mb-8'>
				<Skeleton width={148} height={36} borderRadius={20} />
			</div>

			{/* Masonry columns — varied aspect ratios matching WorksCard types */}
			<div className='columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-24'>
				{[
					'aspect-[4/3]',
					'aspect-square',
					'aspect-[3/4]',
					'aspect-[16/9]',
					'aspect-square',
					'aspect-[4/3]',
					'aspect-[3/4]',
					'aspect-[16/9]',
					'aspect-square',
				].map((aspectClass, i) => (
					<div
						key={i}
						className={`break-inside-avoid w-full rounded-2xl overflow-hidden ${aspectClass}`}
					>
						<Skeleton
							width='100%'
							height='100%'
							borderRadius={16}
							style={{ display: 'block' }}
						/>
					</div>
				))}
			</div>
		</section>

		{/* FOOTER */}
		<section className='relative max-w-7xl mx-auto p-4 md:p-8'>
			<div className='border-t border-neutral-700 pt-8 flex items-center justify-between'>
				<Skeleton width={80} height={12} borderRadius={4} />
				<Skeleton width={200} height={12} borderRadius={4} />
			</div>
		</section>
	</DarkSkeletonTheme>
);

/* ─────────────────────────────────────────
   ABOUT PAGE SKELETON
   Mirrors:
   - Header nav
   - Hero: big title (left) + circular avatar (right)
   - WavePath divider line
   - 2-col layout:
	 Left sticky (col-span-4): name, bio, 3 detail rows, download button
	 Right (col-span-8): work experience, education swiper + prev/next, skills pills, software skills box
   - Footer
───────────────────────────────────────── */
export const AboutSkeleton = () => (
	<DarkSkeletonTheme>
		<div
			className='relative'
			style={{
				backgroundImage:
					'linear-gradient(to right, rgba(158,158,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,158,158,0.08) 1px, transparent 1px)',
				backgroundSize: '60px 60px',
				backgroundPosition: 'top left',
			}}
		>
			<div className='max-w-7xl mx-auto p-4 md:p-8'>
				{/* Header nav */}
				<div className='flex items-center justify-between mb-14'>
					<Skeleton width={110} height={12} borderRadius={4} />
					<div className='flex gap-4'>
						<Skeleton width={60} height={10} borderRadius={4} />
						<Skeleton width={60} height={10} borderRadius={4} />
						<Skeleton width={60} height={10} borderRadius={4} />
					</div>
				</div>

				{/* Hero header: title + avatar */}
				<div className='mt-14 mb-12 flex flex-col-reverse items-center justify-between gap-10 md:flex-row'>
					<div className='w-full flex-1'>
						{/* 'Innovative Designer / Driven by Creativity.' */}
						<Skeleton width='85%' height={72} borderRadius={6} style={{ marginBottom: 12 }} />
						<Skeleton width='60%' height={72} borderRadius={6} />
					</div>
					{/* Circular avatar */}
					<Skeleton circle width={160} height={160} className='shrink-0' />
				</div>

				{/* WavePath divider */}
				<div className='mb-12 h-px w-full bg-white/10' />

				{/* Two-column body */}
				<div className='relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16'>
					{/* LEFT sticky panel */}
					<div className='lg:col-span-4 space-y-12 self-start'>
						{/* Name + bio */}
						<div>
							<Skeleton width={180} height={20} borderRadius={4} style={{ marginBottom: 16 }} />
							<Skeleton count={4} height={11} borderRadius={4} style={{ marginBottom: 6 }} />
							<Skeleton width='70%' height={11} borderRadius={4} />
						</div>

						{/* Detail rows */}
						<div className='space-y-4 border-t border-gray-600 pt-8'>
							{['[Profession]', '[Date of Birth]', '[Education]'].map((_, i) => (
								<div key={i} className='flex justify-between border-b border-gray-600 py-2'>
									<Skeleton width={100} height={11} borderRadius={4} />
									<Skeleton width={140} height={11} borderRadius={4} />
								</div>
							))}
						</div>

						{/* Download resume button */}
						<Skeleton width='100%' height={44} borderRadius={8} />
					</div>

					{/* RIGHT content */}
					<div className='lg:col-span-8 space-y-12'>
						{/* Work Experience */}
						<section>
							<Skeleton width={200} height={14} borderRadius={4} style={{ marginBottom: 24 }} />
							{[...Array(2)].map((_, i) => (
								<div key={i} style={{ marginBottom: 32 }}>
									<Skeleton width='55%' height={14} borderRadius={4} style={{ marginBottom: 14 }} />
									<Skeleton count={3} height={10} borderRadius={4} style={{ marginBottom: 6 }} />
								</div>
							))}
						</section>

						{/* Education (Swiper) */}
						<section>
							<Skeleton width={120} height={14} borderRadius={4} style={{ marginBottom: 24 }} />
							{/* 3 swiper cards side by side */}
							<div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
								{[...Array(3)].map((_, i) => (
									<div key={i}>
										<div className='flex items-center gap-4 mb-4'>
											<Skeleton width={72} height={36} borderRadius={4} />
											<div className='flex-1 h-px bg-gray-700' />
										</div>
										<Skeleton width='80%' height={11} borderRadius={4} style={{ marginBottom: 8 }} />
										<Skeleton count={2} height={10} borderRadius={4} style={{ marginBottom: 4 }} />
									</div>
								))}
							</div>
							{/* Prev / Next buttons */}
							<div className='flex justify-between mt-10'>
								<Skeleton width={100} height={40} borderRadius={24} />
								<Skeleton width={100} height={40} borderRadius={24} />
							</div>
						</section>

						{/* Skills pills */}
						<section>
							<Skeleton width={80} height={14} borderRadius={4} style={{ marginBottom: 24 }} />
							<div className='flex flex-wrap gap-3'>
								{[110, 160, 140].map((w, i) => (
									<Skeleton key={i} width={w} height={28} borderRadius={999} />
								))}
							</div>
						</section>

						{/* Software Skills box */}
						<section className='bg-zinc-900 p-8 rounded-lg'>
							<Skeleton width={180} height={14} borderRadius={4} style={{ marginBottom: 24 }} />
							<div className='flex flex-wrap gap-4'>
								{[60, 80, 70, 90, 65].map((w, i) => (
									<Skeleton key={i} width={w} height={60} borderRadius={8} />
								))}
							</div>
						</section>
					</div>
				</div>

				{/* Footer */}
				<div className='mt-14'>
					<div className='border-t border-gray-700 pt-8 flex justify-between'>
						<Skeleton width={80} height={12} borderRadius={4} />
						<Skeleton width={220} height={12} borderRadius={4} />
					</div>
				</div>
			</div>
		</div>
	</DarkSkeletonTheme>
);