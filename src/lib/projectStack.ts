import { techStacks } from "@/data/techStack";

/**
 * Splits a project's flat `tech` string into labelled groups.
 *
 * The card shows the stack as one undifferentiated row of chips, which is fine
 * at a glance. A case study is read more slowly, and "Golang and PostgreSQL on
 * the backend" says something the same names in a single row do not.
 */

const GROUPS = [
	{ label: "Frontend", members: ["Next.js", "React", "Vite.js", "Tailwind CSS", "Bootstrap"] },
	{ label: "Backend", members: ["Node.js", "Express.js", "Golang"] },
	{ label: "Database", members: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Redis"] },
	{ label: "Infrastructure", members: ["Docker", "Kubernetes", "Nginx", "Kafka"] },
	{ label: "Language", members: ["TypeScript", "JavaScript"] },
];

/** Anything not listed above still gets shown rather than silently dropped */
const FALLBACK_LABEL = "Other";

const iconsByName = new Map(techStacks.map((tech) => [tech.name, tech.icon]));

export function parseTech(tech: string) {
	return tech
		.split(",")
		.map((name) => name.trim())
		.filter(Boolean);
}

export function groupTech(tech: string) {
	const names = parseTech(tech);

	const grouped = GROUPS.map((group) => ({
		label: group.label,
		items: names
			.filter((name) => group.members.includes(name))
			.map((name) => ({ name, icon: iconsByName.get(name) })),
	})).filter((group) => group.items.length > 0);

	const claimed = new Set(GROUPS.flatMap((group) => group.members));
	const rest = names.filter((name) => !claimed.has(name));
	if (rest.length > 0) {
		grouped.push({
			label: FALLBACK_LABEL,
			items: rest.map((name) => ({ name, icon: iconsByName.get(name) })),
		});
	}

	return grouped;
}
