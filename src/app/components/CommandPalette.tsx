"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import type { IconType } from "react-icons";
import {
	FiCheck,
	FiCopy,
	FiCornerDownLeft,
	FiDownload,
	FiFileText,
	FiFolder,
	FiHome,
	FiMail,
	FiMoon,
	FiSearch,
	FiSun,
	FiUser,
} from "react-icons/fi";
import { navItems } from "@/constants/nav";
import { socials } from "@/data/socials";
import { siteConfig } from "@/constants/site";
import { COMMAND_PALETTE_EVENT } from "@/lib/commandPalette";

type CommandGroup = "Go to" | "Actions" | "Elsewhere";

type Command = Readonly<{
	id: string;
	group: CommandGroup;
	label: string;
	hint?: string;
	/** Extra terms the row should match on, beyond its visible label */
	keywords?: string;
	icon: IconType;
	/** Rows that give feedback in place (copy, theme) stay open to show it */
	keepOpen?: boolean;
	run: () => void;
}>;

const GROUP_ORDER: CommandGroup[] = ["Go to", "Actions", "Elsewhere"];

const NAV_ICONS: Record<string, IconType> = {
	"/": FiHome,
	"/about": FiUser,
	"/project": FiFolder,
	"/contact": FiMail,
};

const COPIED_RESET_MS = 1800;

function groupHeadingId(group: CommandGroup) {
	return `command-group-${group.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Built from native elements rather than ARIA roles: a real `<dialog>` opened
 * with `showModal()` brings its own focus trap, Escape handling, top layer and
 * focus restore, and the rows are real buttons moved through with a roving
 * tabindex. Nothing here has to reimplement modal semantics on a `<div>`.
 */
export default function CommandPalette() {
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();

	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const [copied, setCopied] = useState(false);

	const dialogRef = useRef<HTMLDialogElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const close = useCallback(() => setIsOpen(false), []);

	const commands = useMemo<Command[]>(() => {
		const isDark = resolvedTheme === "dark";

		return [
			...navItems.map((item) => ({
				id: `nav:${item.href}`,
				group: "Go to" as const,
				label: item.label === "Home" ? "Home" : `${item.label} page`,
				keywords: item.href,
				icon: NAV_ICONS[item.href] ?? FiFileText,
				run: () => router.push(item.href),
			})),
			{
				id: "action:theme",
				group: "Actions",
				label: isDark ? "Switch to light mode" : "Switch to dark mode",
				keywords: "theme dark light appearance mode toggle",
				icon: isDark ? FiSun : FiMoon,
				keepOpen: true,
				run: () => setTheme(isDark ? "light" : "dark"),
			},
			{
				id: "action:copy-email",
				group: "Actions",
				label: copied ? "Email copied to clipboard" : "Copy email address",
				hint: copied ? undefined : siteConfig.email,
				keywords: `copy clipboard mail ${siteConfig.email}`,
				icon: copied ? FiCheck : FiCopy,
				keepOpen: true,
				run: () => {
					void navigator.clipboard?.writeText(siteConfig.email).then(() => setCopied(true));
				},
			},
			{
				id: "action:email",
				group: "Actions",
				label: "Send an email",
				keywords: `mailto contact reach out ${siteConfig.email}`,
				icon: FiMail,
				run: () => {
					window.location.href = `mailto:${siteConfig.email}`;
				},
			},
			{
				id: "action:cv",
				group: "Actions",
				label: "Download CV",
				keywords: "resume curriculum vitae pdf",
				icon: FiDownload,
				run: () => {
					const link = document.createElement("a");
					link.href = siteConfig.cvUrl;
					link.download = "";
					link.click();
				},
			},
			...socials.map((social) => ({
				id: `social:${social.label}`,
				group: "Elsewhere" as const,
				label: social.label,
				hint: "Opens in a new tab",
				keywords: `social profile ${social.label}`,
				icon: social.icon,
				run: () => window.open(social.href, "_blank", "noopener,noreferrer"),
			})),
		];
	}, [copied, resolvedTheme, router, setTheme]);

	const results = useMemo(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return commands;
		return commands.filter((command) =>
			`${command.label} ${command.hint ?? ""} ${command.keywords ?? ""}`.toLowerCase().includes(needle)
		);
	}, [commands, query]);

	// Rendered in sections but walked as one list, so the arrow keys never have
	// to know a group boundary exists.
	const groups = useMemo(
		() =>
			GROUP_ORDER.map((group) => ({
				group,
				items: results.filter((command) => command.group === group),
			})).filter((section) => section.items.length > 0),
		[results]
	);

	useEffect(() => {
		const handleOpen = () => setIsOpen(true);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
			event.preventDefault();
			setIsOpen((open) => !open);
		};

		window.addEventListener(COMMAND_PALETTE_EVENT, handleOpen);
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener(COMMAND_PALETTE_EVENT, handleOpen);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// The element is always mounted so the browser owns the open/closed state;
	// React only keeps it in step.
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen && !dialog.open) dialog.showModal();
		else if (!isOpen && dialog.open) dialog.close();
	}, [isOpen]);

	// Every visit starts on a clean search. Scroll is still locked by hand:
	// a modal dialog makes the page inert but does not stop it scrolling.
	useEffect(() => {
		if (!isOpen) return;

		setQuery("");
		setActiveIndex(0);
		setCopied(false);
		inputRef.current?.focus();

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen]);

	// Clicks on the backdrop and on the padding around the panel both land on
	// the dialog itself, so anything outside the panel closes it.
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleClick = (event: MouseEvent) => {
			if (!panelRef.current?.contains(event.target as Node)) close();
		};

		dialog.addEventListener("click", handleClick);
		return () => dialog.removeEventListener("click", handleClick);
	}, [close]);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), COPIED_RESET_MS);
		return () => clearTimeout(timer);
	}, [copied]);

	// A shrinking result set must never leave the highlight past its end
	useEffect(() => {
		setActiveIndex((index) => Math.min(index, Math.max(results.length - 1, 0)));
	}, [results.length]);

	const focusItem = (index: number) => {
		if (results.length === 0) return;
		const next = ((index % results.length) + results.length) % results.length;
		setActiveIndex(next);
		itemRefs.current[next]?.focus();
	};

	const runCommand = (command: Command) => {
		command.run();
		// Rows that report back in place hand focus to the input, so the palette
		// is ready for the next search instead of stranding it on a stale row.
		if (command.keepOpen) inputRef.current?.focus();
		else close();
	};

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				focusItem(activeIndex);
				break;
			case "ArrowUp":
				event.preventDefault();
				focusItem(results.length - 1);
				break;
			case "Enter": {
				event.preventDefault();
				const command = results[activeIndex];
				if (command) runCommand(command);
				break;
			}
		}
	};

	const handleItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				focusItem(index + 1);
				return;
			case "ArrowUp":
				event.preventDefault();
				focusItem(index - 1);
				return;
			case "Home":
				event.preventDefault();
				focusItem(0);
				return;
			case "End":
				event.preventDefault();
				focusItem(results.length - 1);
				return;
			case "Backspace":
				event.preventDefault();
				setQuery((current) => current.slice(0, -1));
				inputRef.current?.focus();
				return;
		}

		// Keeps typing continuous once focus has moved into the list: the
		// character is handed to the search field rather than swallowed by a row.
		// Space is left alone so it still activates the focused button.
		const isTypedCharacter =
			event.key.length === 1 && event.key !== " " && !event.metaKey && !event.ctrlKey && !event.altKey;

		if (isTypedCharacter) {
			event.preventDefault();
			setQuery((current) => current + event.key);
			setActiveIndex(0);
			inputRef.current?.focus();
		}
	};

	itemRefs.current.length = results.length;
	let flatIndex = -1;

	return (
		<dialog ref={dialogRef} aria-label="Command palette" onClose={close} className="palette-dialog">
			{/* The element itself is always mounted so `showModal()` has something to
			    open, but its contents are not. They depend on the resolved theme,
			    which the server cannot know — rendering them into the HTML would
			    hydrate to a different icon than was sent. Building them on open also
			    keeps every page's markup free of a palette nobody has asked for. */}
			{isOpen && (
				<div
					ref={panelRef}
					// max-h-full, not a viewport unit: the dialog's own padding already
					// defines the space, so the panel adapts to any screen height
					className="palette-panel card card-sheen flex flex-col w-full max-w-[560px] max-h-full overflow-hidden"
				>
					<div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-line">
						<FiSearch size={17} className="shrink-0 text-accent" aria-hidden="true" />
						<input
							ref={inputRef}
							type="text"
							value={query}
							onChange={(event) => {
								setQuery(event.target.value);
								setActiveIndex(0);
							}}
							onKeyDown={handleInputKeyDown}
							placeholder="Search pages, actions, links…"
							aria-label="Search pages, actions and links"
							aria-controls="command-palette-list"
							autoComplete="off"
							spellCheck={false}
							className="grow bg-transparent text-base outline-none placeholder:text-muted"
						/>
						<span className="kbd shrink-0">Esc</span>
					</div>

					<ul id="command-palette-list" className="grow overflow-y-auto overscroll-contain p-2">
						{groups.map((section) => (
							<li key={section.group}>
								<p
									id={groupHeadingId(section.group)}
									className="px-3 pt-3 pb-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted"
								>
									{section.group}
								</p>
								<ul aria-labelledby={groupHeadingId(section.group)}>
									{section.items.map((command) => {
										flatIndex += 1;
										const index = flatIndex;
										const isActive = index === activeIndex;

										return (
											<li key={command.id}>
												<button
													ref={(node) => {
														itemRefs.current[index] = node;
													}}
													type="button"
													// Roving tabindex: one stop for the whole list, so
													// Tab never has to walk every command.
													tabIndex={isActive ? 0 : -1}
													data-active={isActive}
													onClick={() => runCommand(command)}
													onFocus={() => setActiveIndex(index)}
													onMouseMove={() => setActiveIndex(index)}
													onKeyDown={(event) => handleItemKeyDown(event, index)}
													className="palette-item flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-start text-muted transition-colors duration-200"
												>
													<span className="palette-item-icon flex items-center justify-center w-8 h-8 shrink-0 rounded-lg border border-line bg-surface transition-colors duration-200">
														<command.icon size={15} aria-hidden="true" />
													</span>
													<span className="grow truncate">{command.label}</span>
													{command.hint && (
														<span className="hidden sm:block shrink-0 font-mono text-xs text-muted truncate max-w-[45%]">
															{command.hint}
														</span>
													)}
													{isActive && (
														<FiCornerDownLeft
															size={14}
															className="shrink-0 text-accent"
															aria-hidden="true"
														/>
													)}
												</button>
											</li>
										);
									})}
								</ul>
							</li>
						))}

						{results.length === 0 && (
							<li className="px-3 py-10 text-center text-sm text-muted">
								No matches for <span className="text-ink">&ldquo;{query}&rdquo;</span>
							</li>
						)}
					</ul>

					<div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-t border-line text-xs text-muted">
						<span className="flex items-center gap-1.5">
							<span className="kbd">↑</span>
							<span className="kbd">↓</span>
							<span>navigate</span>
						</span>
						<span className="flex items-center gap-1.5">
							<span className="kbd">↵</span>
							<span>select</span>
						</span>
						<output aria-live="polite" className="ml-auto">
							{results.length} {results.length === 1 ? "result" : "results"}
						</output>
					</div>
				</div>
			)}
		</dialog>
	);
}
