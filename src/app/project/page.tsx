import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { projectPageContent } from "@/constants/pages";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";

export const metadata: Metadata = {
	title: "Projects",
};

export default function Project() {
	return (
		<main className="pt-28 p-10 md:p-16 md:pt-32 flex flex-col items-center gap-10">
			<div className="flex flex-col items-center gap-4 text-center animate-fade-up">
				<span className="text-xs tracking-[0.2em] uppercase text-teal-600/80 dark:text-teal-300/80 font-medium">
					{projectPageContent.eyebrow}
				</span>
				<h1 className="text-4xl">
					{projectPageContent.headingPrefix}{" "}
					<span className="text-teal-600 dark:text-teal-300">{projectPageContent.headingHighlight}</span>
				</h1>
				<p className="text-lg text-slate-500 dark:text-gray-400">{projectPageContent.description}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
				{projects.map((project, index) => (
					<Reveal key={project.slug} delayMs={index * 80} className="h-full">
						<ProjectCard project={project} />
					</Reveal>
				))}
			</div>
		</main>
	);
}
