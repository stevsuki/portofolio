/**
 * The palette lives in the root layout while its trigger sits in the navbar.
 * A window event keeps those two apart — neither has to know the other exists,
 * and no provider has to wrap the whole tree just to share one boolean.
 */
export const COMMAND_PALETTE_EVENT = "portfolio:open-command-palette";

export function openCommandPalette() {
	window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT));
}
