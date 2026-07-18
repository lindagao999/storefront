import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "news" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "news" });

	const newsItems = [
		{
			date: "2024-07-15",
			title: t("news1Title"),
			desc: t("news1Desc"),
			tagLabel: t("tag_company"),
		},
		{
			date: "2024-07-10",
			title: t("news2Title"),
			desc: t("news2Desc"),
			tagLabel: t("tag_product"),
		},
		{
			date: "2024-07-05",
			title: t("news3Title"),
			desc: t("news3Desc"),
			tagLabel: t("tag_industry"),
		},
		{
			date: "2024-06-28",
			title: t("news4Title"),
			desc: t("news4Desc"),
			tagLabel: t("tag_company"),
		},
	];

	return (
		<div className="container-content py-8 pb-16">
			{/* Breadcrumb */}
			<nav className="mb-6 text-sm">
				<span className="text-muted-foreground">{t("breadcrumbHome")}</span>
				<span className="mx-2 text-muted-foreground">›</span>
				<span className="text-foreground">{t("breadcrumbCurrent")}</span>
			</nav>

			<h1 className="mb-8 text-center text-3xl font-bold text-[#1a237e] md:text-4xl">{t("pageTitle")}</h1>

			{/* News Grid */}
			<div className="grid gap-6 md:grid-cols-2">
				{newsItems.map((news, index) => (
					<article
						key={index}
						className="group overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
					>
						<div className="h-2 bg-gradient-to-r from-[#1a237e] to-[#2b5ba9]" />
						<div className="p-6">
							<div className="mb-3 flex items-center gap-3">
								<span className="rounded-full bg-[#e8f0fe] px-3 py-1 text-xs font-medium text-[#1a237e]">
									{news.tagLabel}
								</span>
								<span className="text-sm text-muted-foreground">{news.date}</span>
							</div>
							<h2 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-[#1a237e]">
								{news.title}
							</h2>
							<p className="text-sm leading-relaxed text-muted-foreground">{news.desc}</p>
							<div className="mt-4">
								<span className="text-sm font-medium text-[#2b5ba9]">{t("readMore")} →</span>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
