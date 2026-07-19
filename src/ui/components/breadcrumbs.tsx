import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export type BreadcrumbsSurface = "default" | "pill" | "dark";

export interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	ariaLabel: string;
	/** `pill` places crumbs on a compact surface for busy backgrounds (default: white). `dark` uses white text for dark backgrounds. */
	surface?: BreadcrumbsSurface;
	className?: string;
}

/**
 * Functional chrome breadcrumbs — code-owned i18n labels (ADR 0002).
 * Use `surface="pill"` on photo heroes; `surface="dark"` on dark solid backgrounds;
 * `default` on solid page backgrounds.
 */
export function Breadcrumbs({ items, ariaLabel, surface = "default", className }: BreadcrumbsProps) {
	const isPill = surface === "pill";
	const isDark = surface === "dark";

	let crumbClass: string | undefined = "text-muted-foreground";
	let currentClass = "font-medium text-foreground";
	let linkClass = "text-muted-foreground transition-colors hover:text-foreground";
	let chevronClass: string | undefined = undefined;

	if (isPill) {
		crumbClass = undefined;
		currentClass = "font-medium text-foreground";
		linkClass = "text-foreground transition-opacity hover:opacity-70";
		chevronClass = "text-foreground";
	} else if (isDark) {
		crumbClass = "text-white/60";
		currentClass = "font-medium text-white";
		linkClass = "text-white/60 transition-colors hover:text-white";
		chevronClass = "text-white/40";
	}

	return (
		<nav
			aria-label={ariaLabel}
			className={cn(
				"text-xs",
				isPill && "inline-flex w-fit items-center rounded-full bg-background/85 px-3 py-1.5 shadow-sm",
				isDark && "inline-flex w-fit items-center px-3 py-1.5",
				className,
			)}
		>
			<ol className={cn("flex items-center gap-1.5", !isPill && crumbClass)}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const showLink = Boolean(item.href) && !isLast;

					return (
						<li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
							{index > 0 && <ChevronRight className={cn("h-3.5 w-3.5", chevronClass)} aria-hidden="true" />}
							{/* Plain next/link by design: item.href is already locale+channel resolved by callers. */}
							{showLink ? (
								<Link href={item.href!} className={linkClass}>
									{item.label}
								</Link>
							) : (
								<span className={currentClass}>{item.label}</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
