import { stats } from "@/data/stats";
import Reveal from "../Reveal";

export default function SummaryBoxSection() {
	return (
		<section className="flex justify-center gap-10 md:gap-20 flex-wrap">
			{stats.map((stat, index) => (
				<Reveal key={stat.label} delayMs={index * 100}>
					<div className="w-64 h-24 border-2 border-slate-900/15 dark:border-white/20 rounded-2xl bg-white dark:bg-white/[2%] shadow-sm flex-shrink-0 flex items-center justify-center gap-4 px-4 hover:border-teal-600 dark:hover:border-teal-300 hover:bg-teal-600/5 dark:hover:bg-teal-300/5 hover:-translate-y-1 transition-all duration-300">
						<p className="text-4xl font-semibold text-teal-600 dark:text-teal-300">{stat.value}</p>
						<div className="w-px h-12 bg-slate-900/20 dark:bg-white/30" />
						<p className="text-lg text-slate-600 dark:text-gray-300 max-w-[130px] leading-tight">{stat.label}</p>
					</div>
				</Reveal>
			))}
		</section>
	);
}
