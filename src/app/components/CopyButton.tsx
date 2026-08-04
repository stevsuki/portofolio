"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

type CopyButtonProps = Readonly<{
	value: string;
	/** Names the target in the button's accessible label, e.g. "email address" */
	subject: string;
	className?: string;
	/** Shows the state next to the icon rather than only announcing it */
	withLabel?: boolean;
}>;

const RESET_MS = 2000;

/**
 * A mailto link is the wrong tool when the visitor writes mail somewhere other
 * than their default client — copying is what they actually want. Confirmation
 * is both visual and announced, so the result is never silent.
 */
export default function CopyButton({ value, subject, className = "", withLabel = false }: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), RESET_MS);
		return () => clearTimeout(timer);
	}, [copied]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
		} catch {
			// Clipboard access can be blocked (insecure context, denied permission).
			// The value stays visible and selectable on the page either way.
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			aria-label={copied ? `${subject} copied` : `Copy ${subject}`}
			className={`group inline-flex items-center gap-2 shrink-0 transition-colors duration-300 ${
				copied ? "text-accent" : "text-muted hover:text-accent"
			} ${className}`}
		>
			{copied ? (
				<FiCheck size={16} aria-hidden="true" />
			) : (
				<FiCopy size={16} aria-hidden="true" className="group-hover:-translate-y-0.5 transition-transform duration-300" />
			)}
			{withLabel && <span className="text-sm">{copied ? "Copied" : "Copy"}</span>}
			{/* `<output>` is the native live region — no ARIA role needed to have
			    the confirmation announced */}
			<output aria-live="polite" className="sr-only">
				{copied ? `${subject} copied to clipboard` : ""}
			</output>
		</button>
	);
}
