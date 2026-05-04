import { useRef, useCallback, useState, useEffect } from 'react';
import Button from './button';
import { IoSend } from 'react-icons/io5';

// ─── BorderGlow helpers (inlined) ────────────────────────────────────────────

function parseHSL(hslStr) {
	const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
	if (!match) return { h: 40, s: 80, l: 80 };
	return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor, intensity) {
	const { h, s, l } = parseHSL(glowColor);
	const base = `${h}deg ${s}% ${l}%`;
	const layers = [
		[0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
		[0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
		[0, 0, 50, 2, 10, true],
		[0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
		[0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
	];
	return layers.map(([x, y, blur, spread, alpha, inset]) => {
		const a = Math.min(alpha * intensity, 100);
		return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
	}).join(', ');
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

// Returns a cancel fn. onEnd is NOT called if cancelled.
function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
	let cancelled = false;
	const id = setTimeout(() => {
		const t0 = performance.now();
		function tick() {
			if (cancelled) return;
			const t = Math.min((performance.now() - t0) / duration, 1);
			onUpdate(start + (end - start) * ease(t));
			if (t < 1) requestAnimationFrame(tick);
			else if (onEnd) onEnd();
		}
		requestAnimationFrame(tick);
	}, delay);
	return () => { cancelled = true; clearTimeout(id); };
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors) {
	const gradients = [];
	for (let i = 0; i < 7; i++) {
		const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
		gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
	}
	gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
	return gradients;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const GLOW_CONFIG = {
	edgeSensitivity: 30,
	glowColor: '270 80 75',
	borderRadius: 16,
	glowRadius: 40,
	glowIntensity: 1.0,
	coneSpread: 25,
	fillOpacity: 0.5,
	colors: ['#c084fc', '#f472b6', '#38bdf8'],
};

const SWEEP_LOOP_GAP = 800; // ms pause between loop cycles

// ─── ContactModal ─────────────────────────────────────────────────────────────

function ContactModal({ show, onHide }) {
	const cardRef = useRef(null);
	const cancelsRef = useRef([]);    // cancel fns for in-flight animations
	const loopRef = useRef(null);  // setTimeout id for next loop

	const [isHovered, setIsHovered] = useState(false);
	const [cursorAngle, setCursorAngle] = useState(45);
	const [edgeProximity, setEdgeProximity] = useState(0);
	const [sweepActive, setSweepActive] = useState(false);

	const {
		edgeSensitivity, glowColor, borderRadius, glowRadius,
		glowIntensity, coneSpread, fillOpacity, colors,
	} = GLOW_CONFIG;

	// ── kill everything in flight ──
	const cancelAll = useCallback(() => {
		cancelsRef.current.forEach(fn => fn());
		cancelsRef.current = [];
		clearTimeout(loopRef.current);
		loopRef.current = null;
	}, []);

	// ── one sweep cycle; schedules itself on completion ──
	const runSweep = useCallback(() => {
		const angleStart = 110, angleEnd = 465;
		setSweepActive(true);
		setCursorAngle(angleStart);

		const fns = [
			// fade in proximity
			animateValue({
				duration: 500,
				onUpdate: v => setEdgeProximity(v / 100),
			}),
			// first half of rotation (ease-in)
			animateValue({
				ease: easeInCubic, duration: 1500, end: 50,
				onUpdate: v => setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart),
			}),
			// second half of rotation (ease-out)
			animateValue({
				ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100,
				onUpdate: v => setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart),
			}),
			// fade out proximity → schedule next loop on end
			animateValue({
				ease: easeInCubic, delay: 2750, duration: 1500, start: 100, end: 0,
				onUpdate: v => setEdgeProximity(v / 100),
				onEnd: () => {
					setSweepActive(false);
					loopRef.current = setTimeout(runSweep, SWEEP_LOOP_GAP);
				},
			}),
		];

		cancelsRef.current = fns;
	}, []);

	// ── start / stop loop with modal visibility ──
	useEffect(() => {
		if (!show) {
			cancelAll();
			setSweepActive(false);
			setIsHovered(false);
			setEdgeProximity(0);
			return;
		}
		runSweep();
		return () => cancelAll();
	}, [show]); // eslint-disable-line react-hooks/exhaustive-deps

	// ── pointer helpers ──
	const getCenterOfElement = useCallback((el) => {
		const { width, height } = el.getBoundingClientRect();
		return [width / 2, height / 2];
	}, []);

	const getEdgeProximity = useCallback((el, x, y) => {
		const [cx, cy] = getCenterOfElement(el);
		const dx = x - cx, dy = y - cy;
		let kx = Infinity, ky = Infinity;
		if (dx !== 0) kx = cx / Math.abs(dx);
		if (dy !== 0) ky = cy / Math.abs(dy);
		return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
	}, [getCenterOfElement]);

	const getCursorAngle = useCallback((el, x, y) => {
		const [cx, cy] = getCenterOfElement(el);
		const dx = x - cx, dy = y - cy;
		if (dx === 0 && dy === 0) return 0;
		let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
		if (deg < 0) deg += 360;
		return deg;
	}, [getCenterOfElement]);

	const handlePointerMove = useCallback((e) => {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		setEdgeProximity(getEdgeProximity(card, e.clientX - rect.left, e.clientY - rect.top));
		setCursorAngle(getCursorAngle(card, e.clientX - rect.left, e.clientY - rect.top));
	}, [getEdgeProximity, getCursorAngle]);

	const handlePointerEnter = useCallback(() => {
		cancelAll();           // stop the loop
		setSweepActive(false);
		setIsHovered(true);    // hand off to mouse tracking
	}, [cancelAll]);

	const handlePointerLeave = useCallback(() => {
		setIsHovered(false);
		runSweep();            // restart loop from the top
	}, [runSweep]);

	// ── derived glow values ──
	const colorSensitivity = edgeSensitivity + 20;
	const isVisible = isHovered || sweepActive;
	const borderOpacity = isVisible
		? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity))
		: 0;
	const glowOpacity = isVisible
		? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
		: 0;

	const meshGradients = buildMeshGradients(colors);
	const borderBg = meshGradients.map(g => `${g} border-box`);
	const fillBg = meshGradients.map(g => `${g} padding-box`);
	const angleDeg = `${cursorAngle.toFixed(3)}deg`;

	if (!show) return null;

	const inputClass = 'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-white/25 focus:bg-white/10';
	const inputStyle = { color: 'var(--text-primary, #fff)' };

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center p-4' onClick={onHide}>
			<div className='absolute inset-0 bg-black/60 backdrop-blur-lg' />

			{/* ── Modal card with inlined BorderGlow ── */}
			<div
				ref={cardRef}
				onPointerMove={handlePointerMove}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
				onClick={(e) => e.stopPropagation()}
				className='relative z-10 w-full max-w-5xl max-h-[90vh] isolate grid'
				style={{
					borderRadius: `${borderRadius}px`,
					background: 'var(--white-to-black)',
					border: '1px solid rgb(255 255 255 / 0.1)',
					boxShadow: 'rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.2) 0 8px 16px, rgba(0,0,0,0.2) 0 32px 64px',
					transform: 'translate3d(0, 0, 0.01px)',
					backdropFilter: 'blur(12px)',
				}}
			>
				{/* mesh gradient border layer */}
				<div
					className='absolute inset-0 rounded-[inherit] pointer-events-none'
					style={{
						zIndex: -1,
						border: '1px solid transparent',
						background: [
							'linear-gradient(var(--white-to-black, #1a1a2e) 0 100%) padding-box',
							'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
							...borderBg,
						].join(', '),
						opacity: borderOpacity,
						maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
						WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
						transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
					}}
				/>

				{/* mesh gradient fill near edges */}
				<div
					className='absolute inset-0 rounded-[inherit] pointer-events-none'
					style={{
						zIndex: -1,
						border: '1px solid transparent',
						background: fillBg.join(', '),
						maskImage: [
							'linear-gradient(to bottom, black, black)',
							'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
							'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
							'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
							'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
							'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
							`conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
						].join(', '),
						WebkitMaskImage: [
							'linear-gradient(to bottom, black, black)',
							'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
							'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
							'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
							'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
							'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
							`conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
						].join(', '),
						maskComposite: 'subtract, add, add, add, add, add',
						WebkitMaskComposite: 'source-out, source-over, source-over, source-over, source-over, source-over',
						opacity: borderOpacity * fillOpacity,
						mixBlendMode: 'soft-light',
						transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
					}}
				/>

				{/* outer glow */}
				<span
					className='absolute pointer-events-none rounded-[inherit]'
					style={{
						zIndex: 1,
						inset: `${-glowRadius}px`,
						maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
						WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
						opacity: glowOpacity,
						mixBlendMode: 'plus-lighter',
						transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
					}}
				>
					<span
						className='absolute rounded-[inherit]'
						style={{
							inset: `${glowRadius}px`,
							boxShadow: buildBoxShadow(glowColor, glowIntensity),
						}}
					/>
				</span>

				{/* ── actual modal content ── */}
				<div className='relative z-[2] flex flex-col overflow-auto'>
					<button
						onClick={onHide}
						className='absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none transition hover:bg-white/10 z-10'
						style={{ color: 'var(--text-secondary, #aaa)' }}
					>✖</button>

					<div className='p-8 md:p-12'>
						<div className='flex flex-col gap-12 lg:flex-row lg:items-start'>
							<div className='flex-1 lg:basis-7/12'>
								<h2 className='mb-8 text-3xl font-semibold leading-snug' style={{ color: 'var(--text-primary, #fff)' }}>
									Wanna contact me?<br />Fill the form.
								</h2>
								<div className='flex flex-col gap-4'>
									<div className='flex gap-4'>
										<input type='text' placeholder='First name' className={inputClass} style={inputStyle} />
										<input type='text' placeholder='Last name' className={inputClass} style={inputStyle} />
									</div>
									<input type='email' placeholder='Email' className={inputClass} style={inputStyle} />
									<textarea rows={5} placeholder='Write your message' className={`resize-none ${inputClass}`} style={inputStyle} />
									<div className='mt-1'>
										<Button icon={IoSend}>Send Message</Button>
									</div>
								</div>
							</div>
							<div className='hidden lg:block w-px self-stretch bg-white/10' />
							<div className='lg:hidden h-px w-full bg-white/10' />
							<div className='lg:basis-4/12'>
								<h3 className='mb-4 text-xl font-semibold' style={{ color: 'var(--text-primary, #fff)' }}>Let's talk about everything.</h3>
								<p className='text-sm leading-relaxed' style={{ color: 'var(--text-secondary, #aaa)' }}>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil deleniti itaque similique magni. Magni, laboriosam perferendis maxime!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactModal;