import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Project } from "@/types/project";

type ProjectCardProps = Readonly<{
	project: Project;
}>;

export default function ProjectCard({ project }: ProjectCardProps) {
	const tags = project.tech.split(",").map((tag) => tag.trim());

	return (
		<article className="group relative flex flex-col gap-3 p-6 h-full border-2 border-slate-900/15 dark:border-white/20 rounded-2xl bg-white dark:bg-white/[2%] shadow-sm overflow-hidden hover:border-teal-600 dark:hover:border-teal-300 hover:-translate-y-1 transition-all duration-300">
			<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-600/0 via-teal-600 to-teal-600/0 dark:from-teal-300/0 dark:via-teal-300 dark:to-teal-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<div className="flex items-start justify-between gap-2">
				<h2 className="text-xl">{project.title}</h2>
				{(project.repoUrl || project.demoUrl) && (
					<div className="flex gap-2 flex-shrink-0">
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${project.title} source code`}
								className="text-slate-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
							>
								<FiGithub size={20} aria-hidden="true" />
							</a>
						)}
						{project.demoUrl && (
							<a
								href={project.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${project.title} live demo`}
								className="text-slate-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
							>
								<FiExternalLink size={20} aria-hidden="true" />
							</a>
						)}
					</div>
				)}
			</div>

			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span
						key={tag}
						className="px-2.5 py-0.5 text-xs rounded-full border border-teal-600/30 dark:border-teal-300/30 text-teal-600 dark:text-teal-300 bg-teal-600/5 dark:bg-teal-300/5"
					>
						{tag}
					</span>
				))}
			</div>

			<p className="text-base text-slate-600 dark:text-gray-300">{project.description}</p>
		</article>
	);
}
