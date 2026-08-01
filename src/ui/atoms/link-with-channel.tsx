"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ComponentProps } from "react";
import { buildStorefrontPath } from "@/lib/storefront-path";

export const LinkWithChannel = ({
	href,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) => {
	const { locale, channel } = useParams<{ locale?: string; channel?: string }>();

	if (!href.startsWith("/")) {
		return <Link {...props} href={href} suppressHydrationWarning />;
	}

	// During hydration/recovery there can be a transient moment where params
	// are unavailable. Avoid generating malformed URLs in that case.
	// suppressHydrationWarning keeps the SSR href until params resolve on the client.
	if (!locale || !channel) {
		return <Link {...props} href={href} suppressHydrationWarning />;
	}

	return <Link {...props} href={buildStorefrontPath(locale, channel, href)} suppressHydrationWarning />;
};
