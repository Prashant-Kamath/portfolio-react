import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Button = ({ icon: Icon, children, onClick, className = "" }) => {
	const btnRef = useRef(null);

	useEffect(() => {
		const el = btnRef.current;
		if (!el) return;

		const handleMouseMove = (e) => {
			const rect = el.getBoundingClientRect();

			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;

			gsap.to(el, {
				x: x * 0.3,
				y: y * 0.3,
				rotationX: -y * 0.1,
				rotationY: x * 0.1,
				scale: 1.05,
				ease: "power2.out",
				duration: 0.3,
			});
		};

		const handleMouseLeave = () => {
			gsap.to(el, {
				x: 0,
				y: 0,
				rotationX: 0,
				rotationY: 0,
				scale: 1,
				ease: "elastic.out(1, 0.4)",
				duration: 1,
			});
		};

		el.addEventListener("mousemove", handleMouseMove);
		el.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			el.removeEventListener("mousemove", handleMouseMove);
			el.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<button ref={btnRef} onClick={onClick} style={{ backgroundColor: "var(--black-to-white)", color: "var(--white-to-black)", willChange: "transform", transformStyle: "preserve-3d" }} className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform duration-200 ease-out shadow-lg ${className}`}>
			{Icon && <Icon size={18} />}
			{children}
		</button>
	);
};

export default Button;