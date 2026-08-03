import Image from "next/image";
import { FiArrowDown } from "react-icons/fi";
import { SiGo, SiNextdotjs, SiNodedotjs } from "react-icons/si";
import LinkButton from "../LinkButton";
import SocialIcon from "../SocialIcon";
import RotatingText from "../RotatingText";
import { siteConfig } from "@/constants/site";
import { heroContent } from "@/constants/home";

// Chips that orbit the portrait. The image is a 4:5 cutout letterboxed by
// object-contain, so each chip is placed against a container edge where that
// leaves empty space rather than over the subject. Positions tighten on small
// screens because the box shrinks from 540px to 320px tall.
const FLOATING_BADGES = [
	{ icon: SiNextdotjs, label: "Next.js", position: "top-1 -left-1 sm:top-6 sm:left-0", delay: "0s" },
	{ icon: SiGo, label: "Golang", position: "top-1/3 -right-1 sm:right-0", delay: "1.4s" },
	{ icon: SiNodedotjs, label: "Node.js", position: "bottom-4 left-0 sm:bottom-12 sm:left-4", delay: "2.6s" },
];

export default function MainSection() {
	return (
		<section className="relative flex flex-col justify-center min-h-[calc(100svh-5rem)] px-5 sm:px-8 pt-28 pb-20 md:pt-32 overflow-hidden">
			<div className="bg-grid" aria-hidden="true" />
			<div className="glow glow-teal glow-drift w-[520px] h-[520px] -top-40 -left-32" aria-hidden="true" />
			<div className="glow glow-blue glow-drift-slow w-[440px] h-[440px] top-4 -right-32" aria-hidden="true" />
			{/* Kept fully inside the section: the parent clips overflow, so a glow
			    that crossed the bottom edge would leave a hard horizontal seam */}
			<div
				className="glow glow-violet w-[380px] h-[380px] bottom-0 left-1/4 hidden md:block"
				aria-hidden="true"
			/>

			<div className="relative z-10 grid md:grid-cols-12 items-center gap-10 lg:gap-14 w-full max-w-6xl mx-auto">
				<div className="order-2 md:order-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-start">
					<span
						className="animate-hero"
						style={{ "--delay": "0ms" } as React.CSSProperties}
					>
						{heroContent.isOpenToWork ? (
							<span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/35 bg-accent/8 text-sm text-accent-ink dark:text-accent backdrop-blur-sm">
								<span className="relative flex w-2 h-2">
									<span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
									<span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
								</span>
								{heroContent.availability}
							</span>
						) : (
							<span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-line-strong bg-surface text-sm text-muted backdrop-blur-sm">
								<span className="w-2 h-2 rounded-full bg-muted" />
								{heroContent.unavailability}
							</span>
						)}
					</span>

					<p
						className="animate-hero mt-7 text-lg text-muted"
						style={{ "--delay": "90ms" } as React.CSSProperties}
					>
						{heroContent.greeting}
					</p>

					<h1
						className="animate-hero mt-1 text-5xl sm:text-6xl lg:text-7xl"
						style={{ "--delay": "160ms" } as React.CSSProperties}
					>
						<span className="gradient-text">{siteConfig.name}</span>
					</h1>

					<div
						className="animate-hero flex items-baseline gap-2.5 mt-4 text-2xl sm:text-3xl font-medium"
						style={{ "--delay": "240ms" } as React.CSSProperties}
					>
						<span className="font-mono text-base text-accent/70" aria-hidden="true">
							&lt;/&gt;
						</span>
						<RotatingText
							items={heroContent.roles}
							className="justify-items-center md:justify-items-start"
							itemClassName="text-accent whitespace-nowrap"
						/>
					</div>

					<p
						className="animate-hero mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted"
						style={{ "--delay": "320ms" } as React.CSSProperties}
					>
						{heroContent.bio}
					</p>

					<div
						className="animate-hero flex flex-wrap justify-center md:justify-start gap-3 mt-9"
						style={{ "--delay": "400ms" } as React.CSSProperties}
					>
						<LinkButton href="/contact" variant="primary" withArrow>
							{heroContent.ctaLabel}
						</LinkButton>
						<LinkButton href="/project">{heroContent.secondaryCtaLabel}</LinkButton>
					</div>

					<div
						className="animate-hero flex items-center gap-5 mt-9"
						style={{ "--delay": "480ms" } as React.CSSProperties}
					>
						<span className="hidden sm:block w-10 h-px bg-line-strong" aria-hidden="true" />
						<SocialIcon />
					</div>
				</div>

				<div className="order-1 md:order-2 md:col-span-5 flex justify-center">
					<div className="relative w-full max-w-[320px] h-[320px] md:max-w-none md:h-[540px] animate-fade-up">
						<svg width="0" height="0" className="absolute" aria-hidden="true">
							<filter id="avatar-feather" x="-10%" y="-10%" width="120%" height="120%">
								<feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="blurredAlpha" />
								<feComponentTransfer in="blurredAlpha" result="smoothAlpha">
									<feFuncA type="linear" slope="3.5" intercept="0" />
								</feComponentTransfer>
								<feComposite in="SourceGraphic" in2="smoothAlpha" operator="in" />
							</filter>
						</svg>
						<div className="avatar-ring" aria-hidden="true" />
						<div className="avatar-backdrop" aria-hidden="true" />
						<Image
							src="/assets/person.webp"
							alt={`${siteConfig.name}, ${siteConfig.role}`}
							fill
							sizes="(max-width: 768px) 320px, 400px"
							className="relative object-contain avatar-image"
							priority
							fetchPriority="high"
						/>

						{FLOATING_BADGES.map((badge) => (
							<span
								key={badge.label}
								className={`absolute ${badge.position} float flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-line bg-surface backdrop-blur-md text-[11px] sm:text-xs font-medium whitespace-nowrap shadow-lg`}
								style={{ animationDelay: badge.delay }}
								aria-hidden="true"
							>
								<badge.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
								{badge.label}
							</span>
						))}
					</div>
				</div>
			</div>

			<a
				href="#highlights"
				className="relative z-10 hidden md:flex flex-col items-center gap-2 mt-14 mx-auto text-xs text-muted hover:text-accent transition-colors duration-300"
			>
				<span className="font-mono tracking-[0.16em] uppercase">{heroContent.scrollLabel}</span>
				<FiArrowDown size={14} className="animate-scroll-cue" aria-hidden="true" />
			</a>
		</section>
	);
}
