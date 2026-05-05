import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';

Modal.setAppElement('#root');

const ResumeModal = ({ isOpen, onClose }) => (
	<Modal isOpen={isOpen} onRequestClose={onClose} className='relative max-w-4xl w-[90%] h-[80vh] bg-zinc-900 border border-white/20 rounded-lg outline-none mx-auto mt-[10vh]' overlayClassName='fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex justify-center items-start'>
		<div className='flex justify-between items-center p-4 border-b border-white/10 bg-zinc-900'>
			<h2 className='text-white uppercase text-xs tracking-widest'>Resume Preview</h2>
			<button onClick={onClose} className='text-white hover:text-yellow-500 transition-colors'>
				<IoClose size={24} />
			</button>
		</div>
		<div className='w-full h-full pb-14'>
			<iframe src='../../public/Resume_Prashant-Kamath.pdf' className='w-full h-full' title='Resume' />
		</div>
	</Modal>
);

export default ResumeModal;