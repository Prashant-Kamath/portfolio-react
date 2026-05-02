import React, { useRef, useEffect, forwardRef } from "react";
import { gsap } from "gsap";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Button = forwardRef(
	({ icon: Icon, children, onClick, className = "", style, variant = "default", size = "md", tilt = true, ...props }, ref) => {
		const btnRef = useRef(null);
		const combinedRef = (node) => {
			btnRef.current = node;
			if (typeof ref === "function") ref(node);
			else if (ref) ref.current = node;
		};

		useEffect(() => {
			if (!tilt) return;
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
		}, [tilt]);

		const baseStyles = "flex items-center gap-2 rounded-full font-bold transition-transform duration-200 ease-out shadow-lg will-change-transform [transform-style:preserve-3d]";
		const variants = {
			default: "bg-[var(--black-to-white)] text-[var(--white-to-black)]",
			primary: "bg-blue-500 text-white hover:bg-blue-600",
			danger: "bg-red-500 text-white hover:bg-red-600",
			ghost: "bg-transparent shadow-none",
		};

		const sizes = {
			sm: "px-3 py-1.5 text-xs",
			md: "px-5 py-2.5 text-sm",
			lg: "px-6 py-3 text-base",
		};

		return (
			<button ref={combinedRef} onClick={onClick} className={cn(baseStyles, variants[variant], sizes[size], className)} style={style} {...props}>
				{Icon && <Icon size={18} />}
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;