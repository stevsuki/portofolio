"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { switchTheme } from "@/lib/theme";

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="w-10 h-10" aria-hidden="true" />;
	}

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={() => switchTheme(setTheme, isDark ? "light" : "dark")}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			className="group relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full border border-line bg-surface text-muted hover:text-accent hover:border-accent/60 transition-colors duration-300"
		>
			<span
				className="absolute inset-0 rounded-full bg-accent/10 scale-0 group-hover:scale-100 transition-transform duration-300"
				aria-hidden="true"
			/>
			{/* Both icons stay mounted and swap by rotation, so the change reads as
			    one dial turning rather than a hard icon replacement */}
			<FiSun
				size={17}
				aria-hidden="true"
				className={`absolute transition-all duration-500 ${
					isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
				}`}
			/>
			<FiMoon
				size={17}
				aria-hidden="true"
				className={`absolute transition-all duration-500 ${
					isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
				}`}
			/>
		</button>
	);
}
