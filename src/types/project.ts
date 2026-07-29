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
};
