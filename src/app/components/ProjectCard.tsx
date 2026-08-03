"use client";

import { useEffect, useRef, useState } from "react";
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Project } from "@/types/project";

type ProjectCardProps = Readonly<{
	project: Project;
}>;

const COVER_VARIANTS = [
	{ bg: "card-cover-0", accent: "text-teal-700 dark:text-teal-200", blob: "bg-teal-900/10 dark:bg-white/10" },
	{ bg: "card-cover-1", accent: "text-sky-700 dark:text-sky-200", blob: "bg-sky-900/10 dark:bg-white/10" },
	{ bg: "card-cover-2", accent: "text-violet-700 dark:text-violet-200", blob: "bg-violet-900/10 dark:bg-white/10" },
];

// Irregular, hand-picked border-radius pairs so each cover reads as a
// unique organic shape rather than a repeated stock icon.
const BLOB_SHAPES = [
	"rounded-[60%_40%_55%_45%/45%_55%_40%_60%]",
	"rounded-[35%_65%_45%_55%/55%_40%_65%_35%]",
	"rounded-[55%_45%_35%_65%/40%_60%_55%_45%]",
];

function hashOf(slug: string) {
	return slug.split("").reduce((acc, char) => acc + (char.codePointAt(0) ?? 0), 0);
}

function coverVariantFor(slug: string) {
	return COVER_VARIANTS[hashOf(slug) % COVER_VARIANTS.length];
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const [expanded, setExpanded] = useState(false);
	const [isTruncated, setIsTruncated] = useState(false);
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const tags = project.tech.split(",").map((tag) => tag.trim());
	const initial = project.title.trim().charAt(0).toUpperCase();
	const hash = hashOf(project.slug);
	const cover = coverVariantFor(project.slug);
	const blobShapeA = BLOB_SHAPES[hash % BLOB_SHAPES.length];
	const blobShapeB = BLOB_SHAPES[(hash + 1) % BLOB_SHAPES.length];

	useEffect(() => {
		if (expanded) return;
		const el = descriptionRef.current;
		if (!el) return;

		const checkTruncation = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
		checkTruncation();
		window.addEventListener("resize", checkTruncation);
		return () => window.removeEventListener("resize", checkTruncation);
	}, [expanded]);

	return (
		<article
			data-spot
			className="card card-hover spot group flex flex-col gap-3 h-full p-6 overflow-hidden"
		>
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

			<div
				className={`card-cover ${cover.bg} relative -mx-6 -mt-6 h-28 flex items-center px-6 overflow-hidden z-10`}
				aria-hidden="true"
			>
				<div
					className={`absolute -right-6 -top-8 w-28 h-28 ${blobShapeA} ${cover.blob} blur-md transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12`}
				/>
				<div
					className={`absolute right-10 -bottom-8 w-16 h-16 ${blobShapeB} ${cover.blob} blur-sm transition-transform duration-700 group-hover:-translate-y-1.5`}
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

			<div className="relative z-10 flex items-start justify-between gap-2 mt-1">
				<div className="flex flex-col gap-0.5">
					<h3 className="text-lg leading-snug">{project.title}</h3>
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

			<p
				ref={descriptionRef}
				className={`relative z-10 text-sm leading-relaxed text-muted ${expanded ? "" : "line-clamp-3"}`}
			>
				{project.description}
			</p>

			{isTruncated && (
				<button
					type="button"
					onClick={() => setExpanded((prev) => !prev)}
					className="relative z-10 flex items-center gap-1 self-start mt-auto pt-1 text-sm text-accent hover:gap-2 transition-all duration-300"
				>
					{expanded ? "Read less" : "Read more"}
					{expanded ? (
						<FiChevronUp size={14} aria-hidden="true" />
					) : (
						<FiChevronDown size={14} aria-hidden="true" />
					)}
				</button>
			)}
		</article>
	);
}
