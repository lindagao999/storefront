import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "support" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "support" });

	return (
		<div className="container-content py-8 pb-16">
			{/* Breadcrumb */}
			<nav className="mb-6 text-sm">
				<span className="text-muted-foreground">{t("breadcrumbHome")}</span>
				<span className="mx-2 text-muted-foreground">›</span>
				<span className="text-foreground">{t("breadcrumbCurrent")}</span>
			</nav>

			<h1 className="mb-8 text-center text-3xl font-bold text-[#1a237e] md:text-4xl">{t("pageTitle")}</h1>

			<div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
				{/* FAQ Section */}
				<section>
					<div className="overflow-hidden rounded-xl bg-card shadow-sm">
						<details className="group border-b border-border last:border-b-0">
							<summary className="flex cursor-pointer items-center justify-between p-5 font-medium transition-colors hover:bg-muted/50">
								<span>{t("faq1Q")}</span>
								<span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">
									▼
								</span>
							</summary>
							<div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t("faq1A")}</div>
						</details>
						<details className="group border-b border-border last:border-b-0">
							<summary className="flex cursor-pointer items-center justify-between p-5 font-medium transition-colors hover:bg-muted/50">
								<span>{t("faq2Q")}</span>
								<span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">
									▼
								</span>
							</summary>
							<div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t("faq2A")}</div>
						</details>
						<details className="group border-b border-border last:border-b-0">
							<summary className="flex cursor-pointer items-center justify-between p-5 font-medium transition-colors hover:bg-muted/50">
								<span>{t("faq3Q")}</span>
								<span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">
									▼
								</span>
							</summary>
							<div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t("faq3A")}</div>
						</details>
						<details className="group border-b border-border last:border-b-0">
							<summary className="flex cursor-pointer items-center justify-between p-5 font-medium transition-colors hover:bg-muted/50">
								<span>{t("faq4Q")}</span>
								<span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">
									▼
								</span>
							</summary>
							<div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t("faq4A")}</div>
						</details>
						<details className="group border-b border-border last:border-b-0">
							<summary className="flex cursor-pointer items-center justify-between p-5 font-medium transition-colors hover:bg-muted/50">
								<span>{t("faq5Q")}</span>
								<span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">
									▼
								</span>
							</summary>
							<div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t("faq5A")}</div>
						</details>
						<details className="group border-b border-border last:border-b-0">
							<summary className="flex cursor-pointer items-center justify-between p-5 font-medium transition-colors hover:bg-muted/50">
								<span>{t("faq6Q")}</span>
								<span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">
									▼
								</span>
							</summary>
							<div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{t("faq6A")}</div>
						</details>
					</div>
				</section>

				{/* Sidebar */}
				<aside className="space-y-5">
					<SupportCard
						icon="📞"
						title={t("hotlineTitle")}
						description={t("hotlineDesc")}
						button={t("hotlineBtn")}
					/>
					<SupportCard
						icon="💬"
						title={t("onlineTitle")}
						description={t("onlineDesc")}
						button={t("onlineBtn")}
					/>
					<SupportCard
						icon="📧"
						title={t("emailTitle")}
						description={t("emailDesc")}
						button={t("emailBtn")}
					/>

					<div className="rounded-xl bg-gradient-to-br from-[#1a237e] to-[#2b5ba9] p-5 text-white">
						<h3 className="mb-3 font-semibold">{t("techSupportTitle")}</h3>
						<p className="mb-4 text-sm opacity-90">{t("techSupportDesc")}</p>
						<div className="space-y-2 text-sm">
							<div className="flex items-center gap-2">
								<span>👤</span>
								<span>{t("supportStaff1")}</span>
							</div>
							<div className="flex items-center gap-2">
								<span>👤</span>
								<span>{t("supportStaff2")}</span>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}

function SupportCard({
	icon,
	title,
	description,
	button,
}: {
	icon: string;
	title: string;
	description: string;
	button: string;
}) {
	return (
		<div className="rounded-xl bg-card p-5 text-center shadow-sm">
			<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f0fe] text-2xl">
				{icon}
			</div>
			<h3 className="mb-1 font-medium">{title}</h3>
			<p className="mb-3 text-sm text-muted-foreground">{description}</p>
			<button className="rounded-md bg-[#1a237e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2b5ba9]">
				{button}
			</button>
		</div>
	);
}
