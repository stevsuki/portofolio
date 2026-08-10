import type { SwatchOption } from "@/types/swatch";

/**
 * A colour choice that lives on `<html>` as a `data-*` attribute, is remembered
 * across visits, and repaints through a view transition.
 *
 * Accent and background are the same mechanism pointed at different tokens, so
 * the behaviour is described once here and each setting is a small
 * configuration of it. Adding a third axis later means one more `create` call.
 */
export type SwatchSetting = {
	/** localStorage key */
	storageKey: string;
	/** Attribute name without the `data-` prefix */
	attribute: string;
	options: SwatchOption[];
	ids: string[];
	fallback: string;
	/** Fired after a change so every mounted row can move its checkmark, the
	    same window-event approach the command palette uses instead of a provider */
	event: string;
};

export function createSwatchSetting(config: {
	storageKey: string;
	attribute: string;
	options: SwatchOption[];
	fallback: string;
}): SwatchSetting {
	return {
		...config,
		ids: config.options.map((option) => option.id),
		event: `portfolio:${config.attribute}-change`,
	};
}

export function readSwatch(setting: SwatchSetting): string {
	try {
		const stored = localStorage.getItem(setting.storageKey);
		return stored && setting.ids.includes(stored) ? stored : setting.fallback;
	} catch {
		// Private mode and blocked storage throw on access rather than returning
		// null, and neither is a reason to fail rendering
		return setting.fallback;
	}
}

/**
 * The swap runs inside a view transition for the same reason the light/dark
 * toggle does: the page carries 30+ backdrop-filtered cards and 90px blurred
 * glows, and recolouring them live means re-blurring the lot on every frame,
 * where a transition cross-fades two GPU snapshots instead.
 *
 * Unlike the theme toggle this needs no `flushSync` — the attribute is written
 * straight to the DOM, so it has already landed when the callback returns.
 */
export function setSwatch(setting: SwatchSetting, id: string) {
	const apply = () => {
		document.documentElement.setAttribute(`data-${setting.attribute}`, id);
		try {
			localStorage.setItem(setting.storageKey, id);
		} catch {
			// A visitor who cannot persist the choice should still get to see it
		}
		window.dispatchEvent(new CustomEvent(setting.event, { detail: id }));
	};

	if (typeof document.startViewTransition !== "function") {
		apply();
		return;
	}

	document.startViewTransition(apply);
}
