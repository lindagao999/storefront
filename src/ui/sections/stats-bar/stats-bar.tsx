import { cn } from "@/lib/utils";

export interface StatItem {
	number: string;
	label: string;
}

export interface StatsBarProps {
	stats: StatItem[];
	className?: string;
}

export function StatsBar({ stats, className }: StatsBarProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap gap-12 rounded-xl bg-card px-10 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
				className,
			)}
		>
			{stats.map((stat, index) => (
				<div key={index} className="min-w-[120px] flex-1 text-center">
					<div className="text-[32px] font-bold leading-tight text-[#1a237e]">{stat.number}</div>
					<div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
				</div>
			))}
		</div>
	);
}
