/**
 * A template remounts on every navigation (a layout would not), which is what
 * lets each route fade in instead of appearing in a single hard frame. It also
 * gives the skip link one stable target across all pages.
 */
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div id="main-content" tabIndex={-1} className="animate-page-in outline-none">
			{children}
		</div>
	);
}
