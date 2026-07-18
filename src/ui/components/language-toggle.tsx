"use client";

import { useParams, usePathname } from "next/navigation";
import { buildStorefrontPath, parseStorefrontPathname } from "@/lib/storefront-path";
import { getLocaleDefinition } from "@/config/locale";
import { getPairedChannelForLocale } from "@/config/locale-channel";
import { cn } from "@/lib/utils";

const LOCALE_SLUGS = ["en", "zh"] as const;
type LocaleSlug = (typeof LOCALE_SLUGS)[number];

/**
 * Inline language toggle for the header.
 *
 * Preserves the current path suffix and channel (or the channel paired to the
 * target locale) when switching languages — exactly the same behaviour as the
 * region picker's `navigateToLocale`.
 */
export function LanguageToggle({ className }: { className?: string }) {
	const params = useParams<{ locale?: string; channel?: string }>();
	const pathname = usePathname();

	const currentLocale = (params.locale ?? "en") as LocaleSlug;
	const currentChannel = params.channel ?? "";

	return (
		<div
			className={cn(
				"hidden items-center gap-1 rounded-full border border-border px-2 py-1 sm:flex",
				className,
			)}
		>
			{LOCALE_SLUGS.map((slug) => {
				const isActive = slug === currentLocale;
				const def = getLocaleDefinition(slug);
				const targetChannel = getPairedChannelForLocale(slug, currentChannel);
				const parsed = parseStorefrontPathname(pathname);

				const href = parsed
					? buildStorefrontPath(slug, targetChannel, parsed.suffix)
					: buildStorefrontPath(slug, targetChannel);

				return (
					<a
						key={slug}
						href={href}
						className={cn(
							"rounded-full px-3 py-1 text-sm transition-colors",
							isActive ? "bg-[#1a237e] text-white" : "text-muted-foreground hover:bg-muted",
						)}
						lang={def?.bcp47 ?? slug}
					>
						{slug.toUpperCase()}
					</a>
				);
			})}
		</div>
	);
}
