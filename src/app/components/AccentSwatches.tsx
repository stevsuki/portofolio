"use client";

import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { accents } from "@/data/accents";
import { ACCENT_CHANGE_EVENT, readStoredAccent, setAccent } from "@/lib/accent";

/**
 * The row of colour dots, shared by the navbar popover and the mobile menu so
 * the two cannot drift apart. Whichever one is on screen listens for the change
 * event, so picking a colour in either updates both.
 */
export default function AccentSwatches({ className = "" }: Readonly<{ className?: string }>) {
	// The stored accent is only readable on the client, and rendering a guess on
	// the server would light up the wrong checkmark for a frame. The dots are
	// painted either way — only the tick waits for the real value.
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		setActive(readStoredAccent());

		const handleChange = (event: Event) => {
			const next = (event as CustomEvent<string>).detail;
			if (next) setActive(next);
		};

		window.addEventListener(ACCENT_CHANGE_EVENT, handleChange);
		return () => window.removeEventListener(ACCENT_CHANGE_EVENT, handleChange);
	}, []);

	// Same reasoning as the project filter row: a fieldset is the native
	// grouping element, so this needs no ARIA role — only its defaults cleared
	return (
		<fieldset className={`flex items-center gap-2 m-0 p-0 border-0 ${className}`}>
			<legend className="sr-only">Accent colour</legend>
			{accents.map((accent) => {
				const isActive = active === accent.id;

				return (
					<button
						key={accent.id}
						type="button"
						onClick={() => setAccent(accent.id)}
						// aria-pressed rather than a radio group: these apply instantly and
						// have no submit step, so they read as toggles, not a choice pending
						aria-pressed={isActive}
						aria-label={accent.label}
						title={accent.label}
						className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 hover:scale-110 ${
							isActive ? "ring-2 ring-offset-2 ring-accent ring-offset-[var(--background)]" : ""
						}`}
					>
						<span
							className={`swatch-${accent.id} absolute inset-0 rounded-full border border-black/10 dark:border-white/15`}
							aria-hidden="true"
						/>
						{isActive && (
							// The tick flips with the mode, not with the swatch: light-mode
							// swatches are all deep 600/700 tones and dark-mode ones are all
							// pale 300s, so one ink per mode covers every colour
							<FiCheck
								size={13}
								strokeWidth={3}
								className="relative text-white dark:text-black/75"
								aria-hidden="true"
							/>
						)}
					</button>
				);
			})}
		</fieldset>
	);
}
