import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/ui/sections/section-header";

export interface BrandItem {
	name: string;
	logo?: string | null;
	description?: string;
	href: string;
}

export interface BrandShowcaseProps {
	heading?: string;
	subheading?: string;
	brands: BrandItem[];
	viewAllHref?: string;
	className?: string;
}

export function BrandShowcase({
	heading = "热门品牌",
	subheading = "精选全球知名电子元器件品牌",
	brands,
	viewAllHref = "/brands",
	className,
}: BrandShowcaseProps) {
	return (
		<section className={cn("mx-10 mb-10", className)}>
			<SectionHeader
				id="brands-heading"
				heading={heading}
				eyebrow={subheading}
				cta={viewAllHref ? { label: "查看全部", href: viewAllHref } : undefined}
				className="mb-5"
			/>

			<div className="grid grid-cols-2 gap-5 md:grid-cols-4">
				{brands.map((brand) => (
					<a
						key={brand.href}
						href={brand.href}
						className={cn(
							"group flex flex-col items-center rounded-xl bg-card p-7 text-center",
							"shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
							"transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
						)}
					>
						<div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
							{brand.logo ? (
								<Image src={brand.logo} alt={brand.name} width={64} height={64} className="object-contain" />
							) : (
								<span className="text-lg font-semibold text-[oklch(var(--primary))]">
									{brand.name.slice(0, 2).toUpperCase()}
								</span>
							)}
						</div>
						<h4 className="mb-1.5 text-base font-medium text-foreground">{brand.name}</h4>
						{brand.description && (
							<p className="line-clamp-2 text-sm text-muted-foreground">{brand.description}</p>
						)}
					</a>
				))}
			</div>
		</section>
	);
}
