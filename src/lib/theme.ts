import { flushSync } from "react-dom";

/**
 * Applies a theme change through a view transition so the browser cross-fades
 * two GPU snapshots instead of repainting the live page. The page carries 30+
 * backdrop-filtered cards and 90px blurred glows, and animating their colours
 * directly meant re-blurring every one of them on each frame.
 *
 * The flush is not optional: next-themes sets the class on `<html>` from an
 * effect rather than inside `setTheme`, so without forcing React to commit
 * synchronously the transition would snapshot the new state before the class
 * has landed and there would be nothing to cross-fade.
 *
 * Browsers without the API just get the plain swap.
 */
export function switchTheme(setTheme: (theme: string) => void, next: string) {
	if (typeof document.startViewTransition !== "function") {
		setTheme(next);
		return;
	}

	document.startViewTransition(() => {
		flushSync(() => setTheme(next));
	});
}
