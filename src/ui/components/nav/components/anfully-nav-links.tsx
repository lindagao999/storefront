"use client";

import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { stripStorefrontPrefix } from "@/lib/storefront-path";

// 导航数据 - 匹配原始 AnFully 样式
const navItems = [
	{ labelKey: "home", href: "/", exact: true },
	{ labelKey: "products", href: "/products" },
	{ labelKey: "brands", href: "/brands" },
	{ labelKey: "news", href: "/news" },
	{ labelKey: "support", href: "/support" },
	{ labelKey: "inquiry", href: "/inquiry" },
	{ labelKey: "sample", href: "/sample" },
	{ labelKey: "about", href: "/about" },
	{ labelKey: "contact", href: "/contact" },
];

export function AnFullyNavLinksDesktop() {
	const pathname = usePathname();
	const { locale, channel } = useParams<{ locale?: string; channel?: string }>();
	const t = useTranslations("nav") as unknown as (key: string) => string;

	const matchedPath = locale && channel ? stripStorefrontPrefix(pathname, locale, channel) : pathname;

	const isActive = (item: (typeof navItems)[number]) => {
		if (item.exact) {
			return matchedPath === item.href;
		}
		return matchedPath.startsWith(item.href);
	};

	return (
		<nav className="flex h-full items-center justify-center">
			{navItems.map((item) => {
				const active = isActive(item);
				return (
					<LinkWithChannel
						key={item.href}
						href={item.href}
						className={cn(
							"flex h-full items-center px-6 text-sm font-medium transition-colors hover:text-[#2b5ba9]",
							active ? "border-b-2 border-[#1a237e] text-[#1a237e]" : "text-gray-700",
						)}
						prefetch={false}
					>
						{t(item.labelKey)}
					</LinkWithChannel>
				);
			})}
		</nav>
	);
}

export function AnFullyNavLinksMobile() {
	const pathname = usePathname();
	const { locale, channel } = useParams<{ locale?: string; channel?: string }>();
	const t = useTranslations("nav") as unknown as (key: string) => string;

	const matchedPath = locale && channel ? stripStorefrontPrefix(pathname, locale, channel) : pathname;

	const isActive = (item: (typeof navItems)[number]) => {
		if (item.exact) {
			return matchedPath === item.href;
		}
		return matchedPath.startsWith(item.href);
	};

	return (
		<ul className="space-y-1">
			{navItems.map((item) => {
				const active = isActive(item);
				return (
					<li key={item.href}>
						<LinkWithChannel
							key={item.href}
							href={item.href}
							className={cn(
								"block rounded-md px-3 py-2 text-sm font-medium transition-colors",
								active ? "bg-[#1a237e] text-white" : "text-foreground hover:bg-muted",
							)}
							prefetch={false}
						>
							{t(item.labelKey)}
						</LinkWithChannel>
					</li>
				);
			})}
		</ul>
	);
}
