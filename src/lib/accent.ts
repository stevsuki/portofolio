import { DEFAULT_ACCENT, accentIds } from "@/data/accents";

export const ACCENT_STORAGE_KEY = "portfolio-accent";

/** Lets a picker in the navbar and one in the mobile menu stay in step without
    a provider wrapping the tree, the same way the command palette is wired. */
export const ACCENT_CHANGE_EVENT = "portfolio:accent-change";

export function isAccentId(value: unknown): value is string {
	return typeof value === "string" && accentIds.includes(value);
}

export function readStoredAccent(): string {
	try {
		const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
		return isAccentId(stored) ? stored : DEFAULT_ACCENT;
	} catch {
		// Private mode and blocked storage both throw on access rather than
		// returning null, and neither is a reason to fail rendering
		return DEFAULT_ACCENT;
	}
}

/**
 * Writes the accent to `<html>` and remembers it, then tells any mounted picker
 * so it can move its checkmark.
 *
 * The swap runs inside a view transition for the same reason the light/dark one
 * does: the page carries 30+ backdrop-filtered cards and 90px blurred glows,
 * and every one of them is tinted by `--accent-rgb`. Recolouring them live
 * means re-blurring the lot on each frame, where a transition cross-fades two
 * GPU snapshots instead. Unlike the theme toggle this needs no `flushSync` —
 * the attribute is set directly on the DOM, so it has already landed by the
 * time the callback returns.
 */
export function setAccent(id: string) {
	const apply = () => {
		document.documentElement.dataset.accent = id;
		try {
			localStorage.setItem(ACCENT_STORAGE_KEY, id);
		} catch {
			// A visitor who cannot persist the choice should still get to see it
		}
		window.dispatchEvent(new CustomEvent(ACCENT_CHANGE_EVENT, { detail: id }));
	};

	if (typeof document.startViewTransition !== "function") {
		apply();
		return;
	}

	document.startViewTransition(apply);
}
