/**
 * AnFully Style Logo Component
 *
 * Logo icon (SVG) + Brand text with subtitle
 * Based on the original AnFully website design
 */

interface LogoProps {
	className?: string;
	/** Accessible label for the logo */
	ariaLabel?: string;
	/** Light logo for dark/inverted backgrounds (footer) */
	inverted?: boolean;
	/** Show subtitle text */
	showSubtitle?: boolean;
}

// AnFully SVG logo path (from original styles.css)
const ANFULLY_SVG_PATH =
	"M481 213l14 31 14-23 23-16 15-4h103l17-30-132 2-30 13-16 14zM453 146l13 30 15-25 29-23 170-3 18-12 10-18-195 1-33 15zM187 381l37-7 111-231 55 127-76 1-23 32h111l31 61 34 20 35-4 27-24 20-107 71-4 23-28-117 10-16 26-5 86-35 15-21-19-100-233-21-6zM433 102l12 29 27-33 30-15 214-3 16-30-232 2-35 15zM367 58l-41-8-37 22-152 309 34 0 139-287 22-15 30 17 103 237 27 0-101-245z";

export const Logo = ({
	className,
	ariaLabel = "AnFully - One-Stop Electronic Components Platform",
	inverted = false,
	showSubtitle = true,
}: LogoProps) => {
	const textColor = inverted ? "text-white" : "text-[oklch(var(--primary))]";
	const subtitleColor = inverted ? "text-white/70" : "text-muted-foreground";
	const iconFill = inverted ? "%23ffffff" : "%231a237e";

	return (
		<div className={`flex items-center gap-3 ${className ?? ""}`} aria-label={ariaLabel}>
			{/* Logo Icon */}
			<div
				className="h-10 w-10 shrink-0 bg-contain bg-center bg-no-repeat"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 850 424'%3E%3Cpath d='${ANFULLY_SVG_PATH}' fill='${iconFill}'/%3E%3C/svg%3E")`,
				}}
			/>

			{/* Logo Text */}
			<div className="flex flex-col">
				<span className={`text-xl font-bold leading-tight ${textColor}`}>AnFully</span>
				{showSubtitle && (
					<span className={`text-xs ${subtitleColor}`}>One-Stop Electronic Components Platform</span>
				)}
			</div>
		</div>
	);
};
