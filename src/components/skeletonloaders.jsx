// SkeletonLoaders.jsx
// Install: npm install react-loading-skeleton
// Usage: import { HomeSkeleton, WorksSkeleton, AboutSkeleton } from './SkeletonLoaders';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Shared theme wrapper matching your dark theme (#0F0F0F bg, #1a1a1a surface)
const DarkSkeletonTheme = ({ children }) => (
	<SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
		{children}
	</SkeletonTheme>
);

/* ─────────────────────────────────────────
   HOME PAGE SKELETON
   Mirrors: big name, description text, project list + image panel
───────────────────────────────────────── */
export const HomeSkeleton = () => (
	<DarkSkeletonTheme>
		<div className="max-w-7xl mx-auto px-4 md:px-8" style={{ height: '100vh' }}>
			{/* "HI, I'M" + giant name */}
			<div className="pt-4 md:pt-8">
				<Skeleton width={120} height={28} borderRadius={4} />
				<Skeleton width="80%" height={120} borderRadius={6} style={{ marginTop: 8 }} />
			</div>

			{/* Description blurb */}
			<div className="mt-8 max-w-sm">
				<Skeleton count={3} height={10} borderRadius={4} style={{ marginBottom: 6 }} />
			</div>

			{/* Scroll gif placeholder */}
			<div className="flex justify-end mt-4">
				<Skeleton circle width={80} height={80} />
			</div>
		</div>

		{/* Selected Works section */}
		<div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
			<Skeleton width={100} height={10} borderRadius={4} style={{ marginBottom: 24 }} />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
				{/* Left: heading + project list */}
				<div>
					<Skeleton width={260} height={72} borderRadius={6} style={{ marginBottom: 32 }} />
					{[...Array(5)].map((_, i) => (
						<div key={i} className="flex justify-between items-center py-4 border-b border-white/10">
							<Skeleton width={`${55 + (i % 3) * 10}%`} height={14} borderRadius={4} />
							<div className="flex gap-3 ml-4">
								<Skeleton width={70} height={10} borderRadius={4} />
								<Skeleton width={40} height={10} borderRadius={4} />
							</div>
						</div>
					))}
					<Skeleton width={150} height={12} borderRadius={4} style={{ marginTop: 32 }} />
				</div>

				{/* Right: image preview panel (hidden on mobile) */}
				<div className="hidden md:flex items-center justify-center">
					<Skeleton width="100%" height="60vh" borderRadius={8} />
				</div>
			</div>
		</div>
	</DarkSkeletonTheme>
);

/* ─────────────────────────────────────────
   WORKS PAGE SKELETON
   Mirrors: header block + masonry card grid
───────────────────────────────────────── */
export const WorksSkeleton = () => (
	<DarkSkeletonTheme>
		<section className="max-w-7xl mx-auto p-4 md:p-8">
			{/* Header: title + meta */}
			<div className="mb-10">
				<Skeleton width="55%" height={80} borderRadius={6} style={{ marginBottom: 24 }} />
				<div className="flex flex-col lg:flex-row justify-between gap-10">
					<div className="max-w-xl">
						<Skeleton count={2} height={12} borderRadius={4} style={{ marginBottom: 8 }} />
						<Skeleton width="60%" height={12} borderRadius={4} />
					</div>
					<div className="flex flex-col gap-3">
						{[90, 140, 200, 120].map((w, i) => (
							<Skeleton key={i} width={w} height={10} borderRadius={4} />
						))}
					</div>
				</div>
				{/* Button */}
				<Skeleton width={160} height={36} borderRadius={20} style={{ marginTop: 32 }} />
			</div>

			{/* Masonry card grid — 3 columns */}
			<div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
				{[
					'aspect-[16/9]', 'aspect-square', 'aspect-[9/16]',
					'aspect-square', 'aspect-[16/9]', 'aspect-square',
					'aspect-[9/16]', 'aspect-[16/9]', 'aspect-square',
				].map((aspectClass, i) => (
					<div key={i} className={`break-inside-avoid w-full rounded-2xl overflow-hidden ${aspectClass}`}>
						<Skeleton width="100%" height="100%" borderRadius={16} style={{ display: 'block' }} />
					</div>
				))}
			</div>
		</section>
	</DarkSkeletonTheme>
);

/* ─────────────────────────────────────────
   ABOUT PAGE SKELETON
   Mirrors: header, left sticky panel, right content (experience, skills, testimonial)
───────────────────────────────────────── */
export const AboutSkeleton = () => (
	<DarkSkeletonTheme>
		<div className="max-w-7xl mx-auto p-4 md:p-8">
			{/* Header: big title + avatar */}
			<div className="border-b border-gray-700 pb-12 mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
				<div className="flex-1">
					<Skeleton width="80%" height={64} borderRadius={6} style={{ marginBottom: 12 }} />
					<Skeleton width="50%" height={64} borderRadius={6} />
				</div>
				<Skeleton circle width={160} height={160} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
				{/* Left sticky panel */}
				<div className="lg:col-span-4 space-y-10">
					<div>
						<Skeleton width={140} height={16} borderRadius={4} style={{ marginBottom: 12 }} />
						<Skeleton count={4} height={11} borderRadius={4} style={{ marginBottom: 6 }} />
					</div>
					<div className="space-y-4 border-t border-gray-700 pt-8">
						{[...Array(3)].map((_, i) => (
							<div key={i} className="flex justify-between border-b border-gray-700 py-2">
								<Skeleton width={90} height={11} borderRadius={4} />
								<Skeleton width={130} height={11} borderRadius={4} />
							</div>
						))}
					</div>
					<Skeleton width={180} height={38} borderRadius={20} />
				</div>

				{/* Right content */}
				<div className="lg:col-span-8 space-y-14">
					{/* Work experience */}
					<div>
						<Skeleton width={160} height={14} borderRadius={4} style={{ marginBottom: 24 }} />
						{[...Array(2)].map((_, i) => (
							<div key={i} style={{ marginBottom: 28 }}>
								<Skeleton width="50%" height={14} borderRadius={4} style={{ marginBottom: 12 }} />
								<Skeleton count={3} height={10} borderRadius={4} style={{ marginBottom: 6 }} />
							</div>
						))}
					</div>

					{/* Education + Skills grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div>
							<Skeleton width={100} height={14} borderRadius={4} style={{ marginBottom: 16 }} />
							{[...Array(2)].map((_, i) => (
								<div key={i} className="flex justify-between border-b border-gray-700 py-2">
									<Skeleton width="70%" height={11} borderRadius={4} />
								</div>
							))}
						</div>
						<div>
							<Skeleton width={60} height={14} borderRadius={4} style={{ marginBottom: 16 }} />
							{[...Array(3)].map((_, i) => (
								<div key={i} style={{ marginBottom: 20 }}>
									<div className="flex justify-between mb-2">
										<Skeleton width={100} height={10} borderRadius={4} />
										<Skeleton width={36} height={10} borderRadius={4} />
									</div>
									<Skeleton width="100%" height={4} borderRadius={2} />
								</div>
							))}
						</div>
					</div>

					{/* Testimonial */}
					<div className="bg-zinc-900 p-8 rounded-lg">
						<Skeleton width={120} height={14} borderRadius={4} style={{ marginBottom: 16 }} />
						<Skeleton count={2} height={11} borderRadius={4} style={{ marginBottom: 6 }} />
						<Skeleton width={160} height={10} borderRadius={4} style={{ marginTop: 16 }} />
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="mt-20 mb-20 pt-8 border-t border-gray-700 flex justify-between">
				<Skeleton width={80} height={12} borderRadius={4} />
				<Skeleton width={220} height={12} borderRadius={4} />
			</div>
		</div>
	</DarkSkeletonTheme>
);