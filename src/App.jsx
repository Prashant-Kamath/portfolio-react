import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dock from './components/navbar';
import Button from './components/button';
import { IoSend } from 'react-icons/io5';
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './App.css';

const Works = lazy(() => import('./pages/Works'));
const About = lazy(() => import('./pages/About_Me'));

function ContactModal({ show, onHide }) {
	if (!show) return null;

	const inputClass = 'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-white/25 focus:bg-white/10';
	const inputStyle = { color: 'var(--text-primary, #fff)' };

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center p-4' onClick={onHide} >
			<div className='absolute inset-0 bg-black/60 backdrop-blur-lg' />
			<div className='relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[var(--white-to-black)] shadow-2xl backdrop-blur-md' onClick={(e) => e.stopPropagation()} >
				<button onClick={onHide} className='absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none transition hover:bg-white/10 z-10' style={{ color: 'var(--text-secondary, #aaa)' }} > ✖ </button>
				<div className='p-8 md:p-12'>
					<div className='flex flex-col gap-12 lg:flex-row lg:items-start'>
						<div className='flex-1 lg:basis-7/12'>
							<h2 className='mb-8 text-3xl font-semibold leading-snug' style={{ color: 'var(--text-primary, #fff)' }} >Wanna contact me?<br />Fill the form.</h2>
							<div className='flex flex-col gap-4'>
								<div className='flex gap-4'>
									<input type='text' placeholder='First name' className={inputClass} style={inputStyle} />
									<input type='text' placeholder='Last name' className={inputClass} style={inputStyle} />
								</div>
								<input type='email' placeholder='Email' className={inputClass} style={inputStyle} />
								<textarea rows={5} placeholder='Write your message' className={`resize-none ${inputClass}`} style={inputStyle} />
								<div className='mt-1'>
									<Button icon={IoSend}> Send Message </Button>
								</div>
							</div>
						</div>
						<div className='hidden lg:block w-px self-stretch bg-white/10' />
						<div className='lg:hidden h-px w-full bg-white/10' />

						<div className='lg:basis-4/12'>
							<h3 className='mb-4 text-xl font-semibold' style={{ color: 'var(--text-primary, #fff)' }} > Let's talk about everything. </h3>
							<p className='text-sm leading-relaxed' style={{ color: 'var(--text-secondary, #aaa)' }}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil deleniti itaque similique magni. Magni, laboriosam perferendis maxime! </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function App() {
	const [showContact, setShowContact] = useState(false);
	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
			<div className='min-h-screen'>
				<Suspense fallback={<div className='text-white p-10'>Loading...</div>}>
					<Routes>
						<Route path='/' element={''} />
						<Route path='/works' element={<Works />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</Suspense>
				<ContactModal show={showContact} onHide={() => setShowContact(false)} />
				<Dock onContactClick={() => setShowContact(true)} />
			</div>
		</ReactLenis>
	);
}

export default App;