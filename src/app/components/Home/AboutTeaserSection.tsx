import Link from "next/link";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import LinkButton from "../LinkButton";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import { aboutTeaserContent } from "@/constants/home";
import { siteConfig } from "@/constants/site";

export default function AboutTeaserSection() {
	return (
		<Section
			decoration={<div className="glow glow-blue glow-drift w-[420px] h-[420px] top-0 -left-24" aria-hidden="true" />}
			innerClassName="!items-stretch"
		>
			<div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16 w-full">
				<Reveal variant="left" className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-start">
					<SectionHeading
						eyebrow={aboutTeaserContent.eyebrow}
						prefix={aboutTeaserContent.headingPrefix}
						highlight={aboutTeaserContent.headingHighlight}
						align="responsive"
					/>
					<p className="text-base sm:text-lg leading-relaxed text-muted max-w-xl">
						{aboutTeaserContent.description}
					</p>
					<div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
						<LinkButton href="/about" variant="primary" withArrow>
							{aboutTeaserContent.ctaLabel}
						</LinkButton>
						<LinkButton
							href={siteConfig.cvUrl}
							download
							icon={<FiDownload size={16} aria-hidden="true" />}
						>
							{aboutTeaserContent.downloadCvLabel}
						</LinkButton>
					</div>
				</Reveal>

				<Reveal variant="right">
					<div className="card card-sheen p-6 sm:p-8">
						<div className="flex items-center gap-1.5 mb-6" aria-hidden="true">
							<span className="w-3 h-3 rounded-full bg-red-400/70" />
							<span className="w-3 h-3 rounded-full bg-amber-400/70" />
							<span className="w-3 h-3 rounded-full bg-accent/70" />
							<span className="ml-3 font-mono text-xs text-muted">profile.json</span>
						</div>
						<dl className="flex flex-col">
							{aboutTeaserContent.quickFacts.map((fact, index) => (
								<div
									key={fact.label}
									className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3.5 ${
										index === 0 ? "" : "border-t border-line"
									}`}
								>
									<dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted sm:w-32 shrink-0">
										{fact.label}
									</dt>
									<dd className="text-sm sm:text-base">{fact.value}</dd>
								</div>
							))}
						</dl>
						<Link
							href="/about"
							className="inline-flex items-center gap-1.5 mt-5 text-sm text-accent hover:gap-2.5 transition-all duration-300"
						>
							Full background
							<FiArrowUpRight size={15} aria-hidden="true" />
						</Link>
					</div>
				</Reveal>
			</div>
		</Section>
	);
}
