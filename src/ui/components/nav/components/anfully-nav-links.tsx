"use client";

import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { stripStorefrontPrefix } from "@/lib/storefront-path";

// 导航数据 - 匹配原始 AnFully 样式
const navItems = [
	{ label: "Home", href: "/", exact: true },
	{ label: "Products", href: "/products" },
	{ label: "Brands", href: "/brands" },
	{ label: "News", href: "/news" },
	{ label: "Support", href: "/support" },
	{ label: "Inquiry", href: "/inquiry" },
	{ label: "Samples", href: "/sample" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

export function AnFullyNavLinksDesktop() {
	const pathname = usePathname();
	const { locale, channel } = useParams<{ locale?: string; channel?: string }>();

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
						{item.label}
					</LinkWithChannel>
				);
			})}
		</nav>
	);
}

export function AnFullyNavLinksMobile() {
	const pathname = usePathname();
	const { locale, channel } = useParams<{ locale?: string; channel?: string }>();

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
							{item.label}
						</LinkWithChannel>
					</li>
				);
			})}
		</ul>
	);
}
