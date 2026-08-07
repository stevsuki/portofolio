import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal from "../../components/Reveal";
import LinkButton from "../../components/LinkButton";
import { projects } from "@/data/projects";
import { projectDetailContent } from "@/constants/pages";
import { pageMetadata } from "@/lib/metadata";
import { coverFor } from "@/lib/projectCover";
import { groupTech } from "@/lib/projectStack";

type ProjectPageProps = Readonly<{
	params: Promise<{ slug: string }>;
}>;

function findProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}

/** Every project is known at build time, so all case studies prerender */
export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = findProject(slug);
	if (!project) return {};

	return pageMetadata({
		title: project.title,
		description: project.description,
		path: `/project/${project.slug}`,
	});
}

/** A case-study section that disappears entirely when its copy is missing,
    so an unfinished write-up reads as a shorter page rather than a broken one. */
function NarrativeSection({
	heading,
	body,
	items,
	delayMs = 0,
}: Readonly<{ heading: string; body?: string; items?: readonly string[]; delayMs?: number }>) {
	if (!body && !items?.length) return null;

	return (
		<Reveal variant="up" delayMs={delayMs} className="w-full">
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl">{heading}</h2>
				{body && <p className="text-base sm:text-lg leading-relaxed text-muted">{body}</p>}
				{items && items.length > 0 && (
					<ul className="flex flex-col gap-3 list-disc pl-5 marker:text-accent/60">
						{items.map((item) => (
							<li key={item} className="text-base leading-relaxed text-muted">
								{item}
							</li>
						))}
					</ul>
				)}
			</div>
		</Reveal>
	);
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
	const { slug } = await params;
	const project = findProject(slug);
	// Unreachable through the proxy, which sends unknown paths home; kept as the
	// guard for a direct hit that somehow bypasses it.
	if (!project) notFound();

	const cover = coverFor(project.slug);
	const stackGroups = groupTech(project.tech);
	const initial = project.title.trim().charAt(0).toUpperCase();

	const index = projects.findIndex((entry) => entry.slug === project.slug);
	const previous = index > 0 ? projects[index - 1] : null;
	const next = index < projects.length - 1 ? projects[index + 1] : null;

	const facts = [
		{ label: projectDetailContent.roleLabel, value: project.role },
		{ label: projectDetailContent.statusLabel, value: project.status },
		{ label: projectDetailContent.periodLabel, value: project.period },
		{ label: projectDetailContent.teamLabel, value: project.team },
	].filter((fact) => Boolean(fact.value));

	return (
		<main className="relative px-5 sm:px-8 pt-28 pb-24 md:pt-32 overflow-hidden">
			<div className="bg-grid" aria-hidden="true" />
			<div className="glow glow-teal glow-drift w-[440px] h-[440px] -top-32 -left-24" aria-hidden="true" />
			<div className="glow glow-violet glow-drift-slow w-[380px] h-[380px] top-20 -right-24" aria-hidden="true" />

			<article className="relative z-10 flex flex-col items-center gap-12 w-full max-w-3xl mx-auto">
				<div className="flex flex-col gap-6 w-full">
					<Link
						href="/project"
						className="animate-hero group inline-flex items-center gap-2 w-fit text-sm text-muted hover:text-accent transition-colors duration-300"
						style={{ "--delay": "0ms" } as React.CSSProperties}
					>
						<FiArrowLeft
							size={15}
							aria-hidden="true"
							className="transition-transform duration-300 group-hover:-translate-x-0.5"
						/>
						{projectDetailContent.backLabel}
					</Link>

					{/* The same cover the card carries, widened — the detail page should
					    look like the card you clicked opened up, not a separate design */}
					<div
						className={`card-cover ${cover.bg} animate-hero relative flex items-end h-40 sm:h-52 px-6 sm:px-8 rounded-3xl border border-line overflow-hidden`}
						style={{ "--delay": "80ms" } as React.CSSProperties}
						aria-hidden="true"
					>
						<div className={`absolute -right-8 -top-10 w-40 h-40 ${cover.blobShapeA} ${cover.blob} blur-md`} />
						<div className={`absolute right-16 -bottom-12 w-24 h-24 ${cover.blobShapeB} ${cover.blob} blur-sm`} />
						<span className={`relative -mb-3 text-[7rem] sm:text-[9rem] font-bold leading-none ${cover.accent} opacity-90 select-none`}>
							{initial}
						</span>
					</div>

					<div className="flex flex-col gap-4">
						<span
							className="eyebrow animate-hero inline-flex items-center gap-2.5"
							style={{ "--delay": "160ms" } as React.CSSProperties}
						>
							<span className="w-6 h-px bg-current opacity-50" aria-hidden="true" />
							{projectDetailContent.eyebrow}
						</span>

						<h1
							className="animate-hero text-3xl sm:text-4xl md:text-5xl"
							style={{ "--delay": "220ms" } as React.CSSProperties}
						>
							{project.title}
						</h1>

						<p
							className="animate-hero text-base sm:text-lg leading-relaxed text-muted"
							style={{ "--delay": "280ms" } as React.CSSProperties}
						>
							{project.description}
						</p>
					</div>

					{facts.length > 0 && (
						<dl
							className="animate-hero grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl border border-line bg-line overflow-hidden"
							style={{ "--delay": "340ms" } as React.CSSProperties}
						>
							{facts.map((fact) => (
								<div key={fact.label} className="flex flex-col gap-1 px-4 py-4 bg-[var(--background)]">
									<dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
										{fact.label}
									</dt>
									<dd className="text-sm font-medium">{fact.value}</dd>
								</div>
							))}
						</dl>
					)}

					{(project.repoUrl || project.demoUrl) && (
						<div
							className="animate-hero flex flex-wrap gap-3"
							style={{ "--delay": "400ms" } as React.CSSProperties}
						>
							{project.demoUrl && (
								<LinkButton
									href={project.demoUrl}
									variant="primary"
									icon={<FiExternalLink size={16} aria-hidden="true" />}
								>
									{projectDetailContent.demoLabel}
								</LinkButton>
							)}
							{project.repoUrl && (
								<LinkButton href={project.repoUrl} icon={<FiGithub size={16} aria-hidden="true" />}>
									{projectDetailContent.repoLabel}
								</LinkButton>
							)}
						</div>
					)}
				</div>

				<hr className="hairline w-full" />

				<NarrativeSection heading={projectDetailContent.contextHeading} body={project.context} />
				<NarrativeSection
					heading={projectDetailContent.contributionsHeading}
					items={project.contributions}
				/>
				<NarrativeSection heading={projectDetailContent.decisionsHeading} items={project.decisions} />
				<NarrativeSection heading={projectDetailContent.outcomesHeading} items={project.outcomes} />

				<Reveal variant="up" className="w-full">
					<div className="flex flex-col gap-5">
						<h2 className="text-2xl">{projectDetailContent.stackHeading}</h2>
						<div className="flex flex-col gap-4">
							{stackGroups.map((group) => (
								<div key={group.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
									<span className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:w-24 sm:shrink-0">
										{group.label}
									</span>
									<div className="flex flex-wrap gap-2">
										{group.items.map((item) => (
											<span key={item.name} className="chip">
												{item.icon && <item.icon size={13} aria-hidden="true" />}
												{item.name}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</Reveal>

				<hr className="hairline w-full" />

				{/* Reads as "keep going" rather than a dead end at the bottom of a page */}
				<nav aria-label="More projects" className="grid sm:grid-cols-2 gap-4 w-full">
					{previous ? (
						<Link
							href={`/project/${previous.slug}`}
							className="card card-sheen card-hover group flex flex-col gap-1.5 p-5 text-start"
						>
							<span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
								<FiArrowLeft
									size={13}
									aria-hidden="true"
									className="transition-transform duration-300 group-hover:-translate-x-0.5"
								/>
								{projectDetailContent.prevLabel}
							</span>
							<span className="text-base font-medium group-hover:text-accent transition-colors duration-300">
								{previous.title}
							</span>
						</Link>
					) : (
						<span aria-hidden="true" className="hidden sm:block" />
					)}

					{next && (
						<Link
							href={`/project/${next.slug}`}
							className="card card-sheen card-hover group flex flex-col gap-1.5 p-5 text-start sm:items-end sm:text-end"
						>
							<span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
								{projectDetailContent.nextLabel}
								<FiArrowRight
									size={13}
									aria-hidden="true"
									className="transition-transform duration-300 group-hover:translate-x-0.5"
								/>
							</span>
							<span className="text-base font-medium group-hover:text-accent transition-colors duration-300">
								{next.title}
							</span>
						</Link>
					)}
				</nav>

				<LinkButton href="/project" withArrow>
					{projectDetailContent.ctaLabel}
				</LinkButton>
			</article>
		</main>
	);
}
