import { FiBriefcase, FiCalendar } from "react-icons/fi";
import { experiences } from "@/data/experience";

export default function ExperienceTimeline() {
	return (
		<div className="relative flex flex-col gap-10 max-w-2xl w-full">
			<div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-teal-300/40" />
			{experiences.map((experience) => {
				const hasMultiplePositions = experience.positions.length > 1;
				const overallRange = hasMultiplePositions
					? `${experience.positions[experience.positions.length - 1].startDate} - ${experience.positions[0].endDate}`
					: null;

				return (
					<div key={experience.company} className="relative flex gap-6 pl-6">
						<span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-teal-300 border-2 border-slate-900 ring-4 ring-teal-300/15" />
						<div className="flex flex-col w-full p-5 border-2 border-white/10 rounded-2xl bg-white/[2%] hover:border-teal-300/50 transition-colors duration-300">
							<div className="flex items-start justify-between gap-3 flex-wrap">
								<div className="flex items-center gap-2">
									<FiBriefcase className="text-teal-300 flex-shrink-0" size={18} aria-hidden="true" />
									<h3 className="text-lg font-semibold text-white">{experience.company}</h3>
								</div>
								{overallRange && <p className="text-xs text-gray-500">{overallRange}</p>}
							</div>

							<div
								className={
									hasMultiplePositions
										? "relative flex flex-col gap-5 mt-4 ml-[3px] pl-6"
										: "flex flex-col gap-1.5 mt-3"
								}
							>
								{hasMultiplePositions && (
									<div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-teal-300/25" />
								)}
								{experience.positions.map((position) => (
									<div key={`${position.role}-${position.startDate}`} className="relative flex flex-col gap-1.5">
										{hasMultiplePositions && (
											<span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal-300/70 border-2 border-slate-900" />
										)}
										<h4 className="text-base font-medium text-gray-100">{position.role}</h4>
										<span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-0.5 text-xs rounded-full border border-teal-300/30 text-teal-300 bg-teal-300/5">
											<FiCalendar size={12} aria-hidden="true" />
											{position.startDate} - {position.endDate}
										</span>
										<p className="text-sm text-justify mt-0.5 text-gray-400">{position.description}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
