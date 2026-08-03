import LinkButton from "./components/LinkButton";

export default function NotFound() {
	return (
		<main className="relative flex flex-col items-center justify-center gap-6 min-h-[calc(100svh-5rem)] px-5 sm:px-8 pt-32 pb-24 text-center overflow-hidden">
			<div className="bg-grid" aria-hidden="true" />
			<div
				className="glow glow-teal glow-drift w-[420px] h-[420px] -top-20 left-1/2 -translate-x-1/2"
				aria-hidden="true"
			/>

			<div className="relative z-10 flex flex-col items-center gap-5 animate-fade-up">
				<p className="text-7xl sm:text-8xl font-semibold gradient-text">404</p>
				<h1 className="text-3xl">Page Not Found</h1>
				<p className="max-w-md text-muted">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<LinkButton href="/" variant="primary" withArrow>
					Back to Home
				</LinkButton>
			</div>
		</main>
	);
}
