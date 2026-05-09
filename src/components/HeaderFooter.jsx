import { useEffect, useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import Button from './Button';

export function Header() {
	const [timeData, setTimeData] = useState({ time: '', date: '' });
	useEffect(() => {
		const updateClock = () => {
			const now = new Date();
			const time = now.toLocaleTimeString('en-IN', {
				timeZone: 'Asia/Kolkata',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true,
			});
			const date = now.toLocaleDateString('en-US', {
				timeZone: 'Asia/Kolkata',
				month: 'short',
				day: 'numeric',
				year: 'numeric',
			}).toUpperCase();

			setTimeData({ time, date });
		};

		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<header>
			<div className='flex justify-between items-center mb-8 pb-5 animate__animated animate__fadeIn'>
				<div className='flex gap-3'>
					<img src='../src/assets/logo-white.webp' alt='' width={36} />
					<div className='flex-row'>
						<p className='text-sm text-neutral-200 uppercase tracking-tightest'>Prashant Kamath</p>
						<p className='text-[10px] text-neutral-400 uppercase tracking-tightest'>Visual Designer</p>
					</div>
				</div>
				<div>
					<Button disabled className='font-normal flex items-center justify-center transition-all duration-300 text-xs px-3 py-1 gap-2 md:text-sm md:px-4 md:py-2 cursor-svg' style={{ color: 'white', background: 'var(--background-color)', border: '2px solid rgba(255, 255, 255, 0.5)', filter: 'drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.25))', animation: 'flickering 2s linear infinite both', }}>
						<span className='w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-600 opacity-80 animate-pulse' />Available for Hire
					</Button>
					<div className='flex justify-around gap-3 text-[10px] text-neutral-400 uppercase tracking-tightest mt-2'>
						<p>{timeData.time} [IN]</p>
						<p>{timeData.date}</p>
					</div>
				</div>
			</div>
		</header>
	);
}

export function Footer() {
	return (
		<footer>
			<div className='flex sm:flex-row items-center justify-between pb-5 pt-8 border-t border-[#313131] gap-4 flex-wrap'>
				<p className='text-[#555] text-xs tracking-wider'>Hand crafted by<strong className='text-[#FFD600] font-bold tracking-widest'>{' '}PRASHANT</strong></p>
				<p className='flex gap-2 items-center text-[#555] text-xs tracking-wider'>With<strong className='text-[#FFD600] font-bold tracking-widest'><IoHeart /></strong>2026</p>
			</div>
		</footer>
	);
}