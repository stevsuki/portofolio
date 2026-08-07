"use client";

import { useMemo, useState } from "react";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SpotlightGroup from "./SpotlightGroup";

type ProjectGalleryProps = Readonly<{
	projects: readonly Project[];
}>;

const ALL_TAG = "All";

function techOf(project: Project) {
	return project.tech.split(",").map((tag) => tag.trim());
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
	const [activeTag, setActiveTag] = useState(ALL_TAG);

	const tags = useMemo(() => {
		const counts = new Map<string, number>();
		for (const project of projects) {
			for (const tag of techOf(project)) {
				counts.set(tag, (counts.get(tag) ?? 0) + 1);
			}
		}

		const sorted = [...counts.entries()].sort(
			([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB)
		);

		return [{ tag: ALL_TAG, count: projects.length }, ...sorted.map(([tag, count]) => ({ tag, count }))];
	}, [projects]);

	const filtered = useMemo(
		() => (activeTag === ALL_TAG ? projects : projects.filter((project) => techOf(project).includes(activeTag))),
		[activeTag, projects]
	);

	return (
		<div className="flex flex-col items-center gap-10 w-full">
			{/* A fieldset is the native grouping element, so the filter row needs no
			    ARIA role of its own — only its browser defaults cleared */}
			<fieldset className="flex flex-wrap justify-center gap-2 m-0 p-0 border-0">
				<legend className="sr-only">Filter projects by technology</legend>
				{tags.map(({ tag, count }) => {
					const isActive = tag === activeTag;
					return (
						<button
							key={tag}
							type="button"
							onClick={() => setActiveTag(tag)}
							aria-pressed={isActive}
							className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm transition-all duration-300 ${
								isActive
									? "border-accent/50 bg-accent/12 text-accent-ink dark:text-accent"
									: "border-line bg-surface text-muted hover:text-ink hover:border-accent/40 hover:-translate-y-0.5"
							}`}
						>
							{tag}
							<span className="font-mono text-[0.7rem] opacity-60">{count}</span>
						</button>
					);
				})}
			</fieldset>

			<output aria-live="polite" className="sr-only">
				Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
				{activeTag === ALL_TAG ? "" : ` built with ${activeTag}`}
			</output>

			<SpotlightGroup tilt className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
				{filtered.map((project, index) => (
					// Keyed by the active filter as well as the slug: remounting is what
					// replays the reveal, so a change of filter reads as new content
					// arriving instead of cards silently swapping in place.
					<Reveal
						key={`${activeTag}-${project.slug}`}
						delayMs={index * 70}
						variant="blur"
						className="h-full"
					>
						<ProjectCard project={project} />
					</Reveal>
				))}
			</SpotlightGroup>
		</div>
	);
}
