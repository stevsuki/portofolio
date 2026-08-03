import { FiCalendar } from "react-icons/fi";
import { experiences } from "@/data/experience";
import Reveal from "./Reveal";
import SpotlightGroup from "./SpotlightGroup";

export default function ExperienceTimeline() {
	return (
		<SpotlightGroup className="relative flex flex-col gap-8 w-full max-w-3xl">
			{/* Rail fades out at both ends so it reads as a continuing thread
			    rather than a line that starts and stops abruptly */}
			<div className="absolute left-5 top-4 bottom-4 w-px timeline-line" aria-hidden="true" />

			{experiences.map((experience, index) => {
				const hasMultiplePositions = experience.positions.length > 1;
				const earliestPosition = experience.positions.at(-1);
				const overallRange =
					hasMultiplePositions && earliestPosition
						? `${earliestPosition.startDate} - ${experience.positions[0].endDate}`
						: null;
				const isCurrent = index === 0;

				return (
					<Reveal key={experience.company} delayMs={index * 120} variant="left" className="relative pl-14">
						<span
							className={`absolute left-0 top-5 flex items-center justify-center w-10 h-10 rounded-full border text-sm font-semibold ${
								isCurrent
									? "border-accent/50 bg-accent/15 text-accent"
									: "border-line bg-[var(--background)] text-muted"
							}`}
							aria-hidden="true"
						>
							{isCurrent && (
								<span className="absolute inset-0 rounded-full bg-accent/25 animate-ping opacity-60" />
							)}
							<span className="relative">{experience.company.charAt(0)}</span>
						</span>

						<div data-spot className="card card-sheen card-hover spot p-5 sm:p-6">
							<div className="relative flex items-start justify-between gap-3 flex-wrap">
								<h3 className="text-lg font-semibold">{experience.company}</h3>
								{overallRange && (
									<p className="font-mono text-xs text-muted whitespace-nowrap">{overallRange}</p>
								)}
							</div>

							<div
								className={
									hasMultiplePositions
										? "relative flex flex-col gap-6 mt-5 ml-[3px] pl-6"
										: "relative flex flex-col gap-2 mt-4"
								}
							>
								{hasMultiplePositions && (
									<div
										className="absolute left-0 top-2 bottom-2 w-px bg-accent/25"
										aria-hidden="true"
									/>
								)}
								{experience.positions.map((position) => (
									<div key={`${position.role}-${position.startDate}`} className="relative flex flex-col gap-2">
										{hasMultiplePositions && (
											<span
												className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-[var(--surface-solid)]"
												aria-hidden="true"
											/>
										)}
										<h4 className="text-base font-medium">{position.role}</h4>
										<span className="chip w-fit">
											<FiCalendar size={12} aria-hidden="true" />
											{position.startDate} - {position.endDate}
										</span>
										<ul className="flex flex-col gap-2 mt-1 list-disc pl-4 marker:text-accent/60">
											{position.highlights.map((highlight) => (
												<li key={highlight} className="text-sm leading-relaxed text-muted">
													{highlight}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					</Reveal>
				);
			})}
		</SpotlightGroup>
	);
}
