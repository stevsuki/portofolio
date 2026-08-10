"use client";

import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { readSwatch, setSwatch, type SwatchSetting } from "@/lib/swatchSetting";

type SwatchRowProps = Readonly<{
	setting: SwatchSetting;
	/** Prefix of the CSS class carrying each dot's colour, e.g. `swatch` gives
	    `swatch-teal`. The colours live in globals.css beside the tokens they
	    preview, so the two cannot drift apart. */
	swatchPrefix: string;
	legend: string;
	/** Background dots are all close neutrals, so they need a firmer edge than
	    the accent ones to read as separate chips */
	strongBorder?: boolean;
}>;

/**
 * One row of colour dots, driven entirely by its `setting`. The navbar popover
 * and the mobile menu both render these, and the setting's window event keeps
 * whichever is on screen in step with the other.
 */
export default function SwatchRow({ setting, swatchPrefix, legend, strongBorder = false }: SwatchRowProps) {
	// The stored value is only readable on the client, and rendering a guess on
	// the server would light up the wrong checkmark for a frame. The dots are
	// painted either way — only the tick waits for the real value.
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		setActive(readSwatch(setting));

		const handleChange = (event: Event) => {
			const next = (event as CustomEvent<string>).detail;
			if (next) setActive(next);
		};

		window.addEventListener(setting.event, handleChange);
		return () => window.removeEventListener(setting.event, handleChange);
	}, [setting]);

	// Same reasoning as the project filter row: a fieldset is the native
	// grouping element, so this needs no ARIA role — only its defaults cleared
	return (
		<fieldset className="flex items-center gap-2 m-0 p-0 border-0">
			<legend className="sr-only">{legend}</legend>
			{setting.options.map((option) => {
				const isActive = active === option.id;

				return (
					<button
						key={option.id}
						type="button"
						onClick={() => setSwatch(setting, option.id)}
						// aria-pressed rather than a radio group: these apply instantly and
						// have no submit step, so they read as toggles, not a choice pending
						aria-pressed={isActive}
						aria-label={option.label}
						title={option.label}
						className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 hover:scale-110 ${
							isActive ? "ring-2 ring-offset-2 ring-accent ring-offset-[var(--background)]" : ""
						}`}
					>
						<span
							className={`${swatchPrefix}-${option.id} absolute inset-0 rounded-full border ${
								strongBorder ? "border-line-strong" : "border-black/10 dark:border-white/15"
							}`}
							aria-hidden="true"
						/>
						{isActive && (
							// The tick flips with the mode, not with the swatch: in light mode
							// every dot here is a deep tone or a pale neutral, and in dark mode
							// the reverse, so one ink per mode covers all of them
							<FiCheck
								size={13}
								strokeWidth={3}
								className={`relative ${
									strongBorder ? "text-ink" : "text-white dark:text-black/75"
								}`}
								aria-hidden="true"
							/>
						)}
					</button>
				);
			})}
		</fieldset>
	);
}
