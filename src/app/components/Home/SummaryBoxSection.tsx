import { stats } from "@/data/stats";

export default function SummaryBoxSection() {
	return (
		<section className="flex justify-center gap-10 md:gap-20 flex-wrap">
			{stats.map((stat) => (
				<div
					key={stat.label}
					className="w-64 h-24 border-3 border-white rounded-2xl flex-shrink-0 flex items-center justify-center gap-4 px-4"
				>
					<p className="text-4xl font-semibold text-teal-300">{stat.value}</p>
					<div className="w-px h-12 bg-white/30" />
					<p className="text-lg text-gray-300 max-w-[130px] leading-tight">{stat.label}</p>
				</div>
			))}
		</section>
	);
}
