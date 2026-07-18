import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewsPageClient } from "./news-page-client";

interface NewsArticle {
	title: string;
	url: string;
	date: string;
	excerpt: string;
	category: string;
}

interface CategoryGroup {
	category: string;
	articles: (NewsArticle & { num: number })[];
}

async function loadNewsData(): Promise<{ articles: NewsArticle[]; updated: string; total: number }> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/news_data.json`, {
			cache: "force-cache",
		});
		return res.json() as Promise<{ articles: NewsArticle[]; updated: string; total: number }>;
	} catch {
		return { articles: [], updated: "", total: 0 };
	}
}

function groupByCategory(articles: NewsArticle[]): CategoryGroup[] {
	const categoryOrder = [
		"Latest",
		"Capacitors",
		"Inductors",
		"Resistors",
		"Circuit Protection Devices",
		"Fuses",
		"Filters",
		"Automotive",
		"Aerospace & Defence",
		"Antenna",
		"Market & Supply Chain",
		"Market Insights",
		"New Technologies",
		"New Materials & Supply",
		"RF & Microwave",
		"Telecommunication",
		"Medical",
		"Oscillators",
		"Passive Sensors News",
		"Non-linear Passives",
		"Integrated Passives",
		"Electro-mechanical News",
		"Inter-connect News",
		"Modelling and Simulation",
		"Weekly Digest",
		"Applications",
	];

	const grouped: Record<string, NewsArticle[]> = {};
	articles.forEach((a) => {
		if (!grouped[a.category]) grouped[a.category] = [];
		grouped[a.category].push(a);
	});

	return categoryOrder
		.filter((cat) => grouped[cat])
		.map((cat) => ({
			category: cat,
			articles: grouped[cat].map((a, i) => ({ ...a, num: i + 1 })),
		}));
}

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
	const { articles, updated, total } = await loadNewsData();
	const groups = groupByCategory(articles);

	const breadcrumbHome = t("breadcrumbHome");
	const breadcrumbCurrent = t("breadcrumbCurrent");
	const pageTitle = t("pageTitle");

	return (
		<NewsPageClient
			groups={groups}
			updated={updated}
			total={total}
			breadcrumbHome={breadcrumbHome}
			breadcrumbCurrent={breadcrumbCurrent}
			pageTitle={pageTitle}
			locale={locale}
		/>
	);
}
