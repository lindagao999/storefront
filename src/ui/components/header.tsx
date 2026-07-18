import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Logo } from "./logo";
import { AnFullyNavLinksDesktop, AnFullyNavLinksMobile } from "./nav/components/anfully-nav-links";
import { CartNavItem } from "./nav/components/cart-nav-item";
import { LanguageToggle } from "./language-toggle";
import { UserMenuContainer } from "./nav/components/user-menu/user-menu-container";
import { MobileMenu } from "./nav/components/mobile-menu";
import { SearchBarWithSuggestions } from "./nav/components/search-bar-with-suggestions";

export async function Header({ locale, channel }: { locale: string; channel: string }) {
	const tSearchBar = await getTranslations({ locale, namespace: "search.bar" });

	return (
		<header id="storefront-header" className="sticky top-0 z-40 bg-background">
			{/* Top Bar */}
			<div className="bg-[#1a237e] text-white">
				<div className="container-nav flex h-10 items-center justify-between text-sm">
					<span className="flex items-center gap-1">
						<span className="text-white/90">✓ Premium Quality · Quality Assurance · Fast Shipping</span>
					</span>
					<span className="hidden text-white/80 sm:inline">100,000+ SKUs in Stock, Ships in 1-3 Days</span>
				</div>
			</div>

			{/* Main Header */}
			<div className="border-b border-border">
				<div className="container-nav py-4">
					<div className="flex items-center justify-between gap-6">
						{/* Logo */}
						<Logo />

						{/* Search Bar - Desktop */}
						<div className="hidden max-w-xl flex-1 md:block">
							<SearchBarWithSuggestions
								locale={locale}
								channel={channel}
								placeholder={tSearchBar("placeholder")}
								srOnlyLabel={tSearchBar("srOnlyLabel")}
							/>
						</div>

						{/* Right Side: Phone + User + Cart */}
						<div className="flex items-center gap-4">
							{/* Phone */}
							<div className="hidden text-right lg:block">
								<div className="text-lg font-bold text-[#1a237e]">0755-28198292</div>
								<div className="text-xs text-muted-foreground">Mon-Fri 9:00-20:00</div>
							</div>

							{/* Language Toggle */}
							<LanguageToggle />

							{/* User Menu */}
							<UserMenuContainer locale={locale} channel={channel} />

							{/* Cart */}
							<Suspense fallback={<div className="h-10 w-10" />}>
								<CartNavItem channel={channel} localeSlug={locale} />
							</Suspense>

							{/* Mobile Menu */}
							<Suspense>
								<MobileMenu>
									<AnFullyNavLinksMobile />
									<li className="py-3">
										<SearchBarWithSuggestions
											locale={locale}
											channel={channel}
											placeholder={tSearchBar("placeholder")}
											srOnlyLabel={tSearchBar("srOnlyLabel")}
										/>
									</li>
								</MobileMenu>
							</Suspense>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<div className="border-b border-border">
				<div className="container-nav">
					<AnFullyNavLinksDesktop />
				</div>
			</div>
		</header>
	);
}
