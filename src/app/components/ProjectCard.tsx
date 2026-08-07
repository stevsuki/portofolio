import Link from "next/link";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Project } from "@/types/project";
import { coverFor } from "@/lib/projectCover";
import { projectDetailContent } from "@/constants/pages";

type ProjectCardProps = Readonly<{
	project: Project;
}>;

/**
 * The card used to expand its own description in place, which meant tracking
 * truncation against a resize listener per card. The case-study page carries
 * the full write-up now, so the card links out instead — and with the state
 * gone it renders on the server.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
	const tags = project.tech.split(",").map((tag) => tag.trim());
	const initial = project.title.trim().charAt(0).toUpperCase();
	const cover = coverFor(project.slug);

	return (
		<article
			data-spot
			className="card card-hover spot tilt group flex flex-col gap-3 h-full p-6 overflow-hidden"
		>
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

			{/* Makes the whole card a click target for a pointer. It has to be a
			    direct child of the article: an overlay nested any deeper anchors to
			    the closest positioned ancestor instead, which is how it ended up
			    covering only the title row.
			    Hidden from assistive tech and skipped by Tab on purpose — the title
			    below is the real, named link, and announcing both would be the same
			    destination twice. */}
			<Link
				href={`/project/${project.slug}`}
				aria-hidden="true"
				tabIndex={-1}
				className="absolute inset-0 z-20"
			/>

			<div
				className={`card-cover ${cover.bg} relative -mx-6 -mt-6 h-28 flex items-center px-6 overflow-hidden z-10`}
				aria-hidden="true"
			>
				<div
					className={`absolute -right-6 -top-8 w-28 h-28 ${cover.blobShapeA} ${cover.blob} blur-md transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12`}
				/>
				<div
					className={`absolute right-10 -bottom-8 w-16 h-16 ${cover.blobShapeB} ${cover.blob} blur-sm transition-transform duration-700 group-hover:-translate-y-1.5`}
				/>
				<span className={`relative text-5xl font-bold ${cover.accent} opacity-90 select-none`}>{initial}</span>
				{project.status && (
					<span
						className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs rounded-full font-medium backdrop-blur-sm ${
							project.status === "Ongoing"
								? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
								: "bg-teal-600/15 text-teal-700 dark:text-teal-200"
						}`}
					>
						{project.status === "Ongoing" && (
							<span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
						)}
						{project.status}
					</span>
				)}
			</div>

			{/* Above the overlay, so the title and the external links stay clickable
			    in their own right. z-30 has to sit on this row rather than on the
			    links inside it: this row's own z-index makes it a stacking context,
			    which would trap any higher value set on a descendant. */}
			<div className="relative z-30 flex items-start justify-between gap-2 mt-1">
				<div className="flex flex-col gap-0.5">
					<h3 className="text-lg leading-snug">
						{/* The named link for keyboard and screen-reader users */}
						<Link
							href={`/project/${project.slug}`}
							className="group-hover:text-accent transition-colors duration-300"
						>
							{project.title}
						</Link>
					</h3>
					{project.role && <p className="font-mono text-xs text-muted">{project.role}</p>}
				</div>
				{(project.repoUrl || project.demoUrl) && (
					<div className="flex gap-2 shrink-0">
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${project.title} source code`}
								className="text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
							>
								<FiGithub size={18} aria-hidden="true" />
							</a>
						)}
						{project.demoUrl && (
							<a
								href={project.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${project.title} live demo`}
								className="text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
							>
								<FiExternalLink size={18} aria-hidden="true" />
							</a>
						)}
					</div>
				)}
			</div>

			<div className="relative z-10 flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span key={tag} className="chip">
						{tag}
					</span>
				))}
			</div>

			<p className="relative z-10 text-sm leading-relaxed text-muted line-clamp-3">{project.description}</p>

			{/* A cue, not a second link: the title above already navigates here, and
			    two links to one place is an extra stop for a screen reader. */}
			<span
				aria-hidden="true"
				className="relative z-10 flex items-center gap-1.5 self-start mt-auto pt-1 text-sm text-accent"
			>
				{projectDetailContent.eyebrow}
				<FiArrowRight
					size={14}
					className="transition-transform duration-300 group-hover:translate-x-1"
				/>
			</span>
		</article>
	);
}
