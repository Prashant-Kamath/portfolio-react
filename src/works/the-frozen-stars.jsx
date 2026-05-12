import React from 'react';
import { Header, Footer } from '../components/HeaderFooter';

export default function BlankPage() {
	return (
		<>
			<header className='max-w-7xl mx-auto p-4 md:p-8'>
				<Header />
				<h2>Page Title</h2>
			</header>
			<main className='max-w-7xl mx-auto p-4 md:p-8'>
				<p>This is a clean slate for your new content.</p>
				<Footer />
			</main>
		</>
	);
}