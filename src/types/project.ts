export type Project = {
	slug: string;
	title: string;
	tech: string;
	description: string;
	role?: string;
	status?: "Completed" | "Ongoing";
	featured?: boolean;
	repoUrl?: string;
	demoUrl?: string;
	/** Calendar span, e.g. "2025" or "Mar 2025 - Present" */
	period?: string;
	/** Team size or shape, e.g. "4 engineers, 1 designer" */
	team?: string;

	// ---------------------------------------------------------------------
	// Case-study copy. Every field below is optional and its section on the
	// detail page renders only once it is filled, so a project can start as a
	// one-line summary and grow into a full write-up without the page ever
	// showing an empty heading.
	// ---------------------------------------------------------------------

	/** The situation before the work started, and why it needed changing */
	context?: string;
	/** What this person did specifically — not what the team delivered */
	contributions?: string[];
	/** Technical calls worth defending in an interview, and their trade-offs */
	decisions?: string[];
	/** Measurable results. The section a reviewer trusts most, so it is worth
	    leaving empty rather than filling with adjectives. */
	outcomes?: string[];
};
