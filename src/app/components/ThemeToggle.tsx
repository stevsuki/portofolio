"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="w-9 h-9" aria-hidden="true" />;
	}

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			className="flex items-center justify-center w-9 h-9 border-2 rounded-full border-slate-400 dark:border-gray-600 text-slate-500 dark:text-gray-600 hover:border-teal-600 dark:hover:border-teal-300 hover:text-teal-600 dark:hover:text-teal-300 transition-colors duration-300"
		>
			{isDark ? <FiSun size={18} aria-hidden="true" /> : <FiMoon size={18} aria-hidden="true" />}
		</button>
	);
}
