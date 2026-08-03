import { techStacks } from "@/data/techStack";
import { techStackContent } from "@/constants/home";
import { TechStack } from "@/types/techStack";
import Reveal from "../Reveal";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import DragMarquee from "../DragMarquee";

function TechPill({ tech }: Readonly<{ tech: TechStack }>) {
	return (
		<div className="shrink-0 mr-4 flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-line bg-surface backdrop-blur-md hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300">
			<tech.icon
				size={24}
				color={tech.color}
				className={tech.color ? undefined : "text-ink"}
				aria-hidden="true"
			/>
			<span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
		</div>
	);
}

function TechRow({ items }: Readonly<{ items: TechStack[] }>) {
	return (
		<>
			{items.map((tech) => (
				<TechPill key={tech.name} tech={tech} />
			))}
		</>
	);
}

export default function TechStackSection() {
	const reversedStacks = [...techStacks].reverse();

	return (
		<Section
			decoration={
				<div
					className="glow glow-teal w-[380px] h-[380px] top-1/4 left-1/2 -translate-x-1/2"
					aria-hidden="true"
				/>
			}
			innerClassName="gap-10"
		>
			<Reveal>
				<SectionHeading
					eyebrow={techStackContent.eyebrow}
					prefix={techStackContent.headingPrefix}
					highlight={techStackContent.headingHighlight}
					description={techStackContent.hint}
				/>
			</Reveal>

			{/* The visual rows repeat every entry, so they are hidden from assistive
			    tech in favour of a single clean list */}
			<ul className="sr-only">
				{techStacks.map((tech) => (
					<li key={tech.name}>{tech.name}</li>
				))}
			</ul>
			{/* No gap: each row carries its own vertical padding so the hover lift is
			    not clipped, which doubles as the row spacing */}
			<div className="flex flex-col w-full" aria-hidden="true">
				<DragMarquee speed={34}>
					<TechRow items={techStacks} />
				</DragMarquee>
				<DragMarquee speed={26} reverse>
					<TechRow items={reversedStacks} />
				</DragMarquee>
			</div>
		</Section>
	);
}
