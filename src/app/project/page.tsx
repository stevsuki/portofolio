import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { projectPageContent } from "@/constants/pages";

export const metadata: Metadata = {
	title: "Projects",
};

export default function Project() {
	return (
		<main className="pt-28 p-10 md:p-16 md:pt-32 flex flex-col items-center gap-10">
			<div className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-4xl">
					{projectPageContent.headingPrefix}{" "}
					<span className="text-teal-300">{projectPageContent.headingHighlight}</span>
				</h1>
				<p className="text-lg text-gray-400">{projectPageContent.description}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
				{projects.map((project) => (
					<article
						key={project.slug}
						className="flex flex-col gap-3 p-6 border-2 border-white/20 rounded-2xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300"
					>
						<h2 className="text-xl">{project.title}</h2>
						<p className="text-sm text-teal-300">{project.tech}</p>
						<p className="text-base text-gray-300">{project.description}</p>
					</article>
				))}
			</div>
		</main>
	);
}
