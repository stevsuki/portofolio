import LinkButton from "./components/LinkButton";

export default function NotFound() {
	return (
		<main className="relative pt-28 p-10 md:pt-32 flex flex-col items-center justify-center gap-6 min-h-[70vh] text-center overflow-hidden">
			<div className="glow glow-teal w-[320px] h-[320px] top-0 left-1/2 -translate-x-1/2" />
			<div className="relative z-10 flex flex-col items-center gap-4">
				<p className="text-6xl font-semibold text-teal-300">404</p>
				<h1 className="text-3xl">Page Not Found</h1>
				<p className="text-lg text-gray-400 max-w-md">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<LinkButton href="/">Back to Home</LinkButton>
			</div>
		</main>
	);
}
