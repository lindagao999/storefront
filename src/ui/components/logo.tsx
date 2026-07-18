import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { Logo as SharedLogo } from "./shared/logo";
import { getTranslations } from "next-intl/server";

/**
 * Site logo with link to homepage.
 * AnFully style: icon + brand text
 */
export const Logo = async () => {
	const t = await getTranslations("brand");
	return (
		<LinkWithChannel href="/" className="flex shrink-0 items-center" aria-label="Homepage">
			<SharedLogo showSubtitle={true} subtitle={t("subtitle")} />
		</LinkWithChannel>
	);
};
