"use client";

import { useState, useMemo } from "react";

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

export function NewsPageClient({
	groups,
	updated,
	total,
	breadcrumbHome,
	breadcrumbCurrent,
	pageTitle,
	locale,
}: {
	groups: CategoryGroup[];
	updated: string;
	total: number;
	breadcrumbHome: string;
	breadcrumbCurrent: string;
	pageTitle: string;
	locale: string;
}) {
	const [activeCategory, setActiveCategory] = useState("Latest");

	// Category translation map
	const categoryTranslations: Record<string, string> = useMemo(() => {
		return {
			Latest: locale === "zh" ? "最新" : "Latest",
			Capacitors: locale === "zh" ? "电容" : "Capacitors",
			Inductors: locale === "zh" ? "电感" : "Inductors",
			Resistors: locale === "zh" ? "电阻" : "Resistors",
			Fuses: locale === "zh" ? "保险丝" : "Fuses",
			Filters: locale === "zh" ? "滤波器" : "Filters",
			Automotive: locale === "zh" ? "汽车电子" : "Automotive",
			"Aerospace & Defence": locale === "zh" ? "航空航天与国防" : "Aerospace & Defence",
			Antenna: locale === "zh" ? "天线" : "Antenna",
			"Market & Supply Chain": locale === "zh" ? "市场与供应链" : "Market & Supply Chain",
			"Market Insights": locale === "zh" ? "市场洞察" : "Market Insights",
			"New Technologies": locale === "zh" ? "新技术" : "New Technologies",
			"New Materials & Supply": locale === "zh" ? "新材料与供应" : "New Materials & Supply",
			"RF & Microwave": locale === "zh" ? "射频与微波" : "RF & Microwave",
			Telecommunication: locale === "zh" ? "电信" : "Telecommunication",
			Medical: locale === "zh" ? "医疗电子" : "Medical",
			Oscillators: locale === "zh" ? "振荡器" : "Oscillators",
			"Passive Sensors News": locale === "zh" ? "无源传感器" : "Passive Sensors News",
			"Non-linear Passives": locale === "zh" ? "非线性元件" : "Non-linear Passives",
			"Integrated Passives": locale === "zh" ? "集成无源器件" : "Integrated Passives",
			"Electro-mechanical News": locale === "zh" ? "机电元件" : "Electro-mechanical News",
			"Inter-connect News": locale === "zh" ? "互连元件" : "Inter-connect News",
			"Modelling and Simulation": locale === "zh" ? "建模与仿真" : "Modelling and Simulation",
			"Weekly Digest": locale === "zh" ? "每周文摘" : "Weekly Digest",
			Applications: locale === "zh" ? "应用" : "Applications",
		};
	}, [locale]);

	const allCategories = useMemo(() => {
		return [...new Set(groups.map((g) => g.category))];
	}, [groups]);

	return (
		<div className="container-content py-8 pb-16">
			{/* Breadcrumb */}
			<nav className="mb-6 text-sm">
				<span className="text-muted-foreground">{breadcrumbHome}</span>
				<span className="mx-2 text-muted-foreground">›</span>
				<span className="text-foreground">{breadcrumbCurrent}</span>
			</nav>

			{/* Page Title */}
			<h1 className="mb-2 text-3xl font-bold text-[#1a237e] md:text-4xl">{pageTitle}</h1>
			<p className="mb-8 text-sm text-muted-foreground">
				{locale === "zh"
					? "无源元件 · 技术前沿 · 行业资讯"
					: "Passive Components · Technology · Industry Insights"}
			</p>

			{/* Update Info */}
			{updated && (
				<p className="mb-6 text-xs text-muted-foreground">
					{locale === "zh" ? "更新于:" : "Updated:"} {updated} · {total}{" "}
					{locale === "zh" ? "篇文章" : "articles"}
				</p>
			)}

			{/* Filter Pills */}
			<div className="mb-8 flex flex-wrap gap-2">
				{allCategories.map((cat) => {
					const isActive = activeCategory === cat;
					const label = categoryTranslations[cat] || cat;
					return (
						<button
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className={`rounded-full border px-4 py-2 text-xs transition-all ${
								isActive
									? "border-[#1a237e] bg-[#1a237e] text-white"
									: "border-border text-foreground hover:border-[#1a237e] hover:text-[#1a237e]"
							}`}
						>
							{label}
						</button>
					);
				})}
			</div>

			{/* News Tables by Category */}
			{groups.map((group) => {
				const isActive = activeCategory === group.category;
				const label = categoryTranslations[group.category] || group.category;
				if (!isActive) return null;

				return (
					<div key={group.category} className="rounded-xl border border-border bg-background shadow-sm">
						<h2 className="mb-4 border-b border-border bg-[#1a237e] px-6 py-4 text-lg font-semibold text-white">
							{label}
						</h2>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-border">
										<th className="w-12 bg-[#1a237e] px-4 py-3 text-left font-semibold text-white">#</th>
										<th className="bg-[#1a237e] px-4 py-3 text-left font-semibold text-white">
											{locale === "zh" ? "文章标题" : "Article Title"}
										</th>
										<th className="w-32 bg-[#1a237e] px-4 py-3 text-left font-semibold text-white">
											{locale === "zh" ? "日期" : "Date"}
										</th>
										<th className="w-32 bg-[#1a237e] px-4 py-3 text-left font-semibold text-white">
											{locale === "zh" ? "分类" : "Category"}
										</th>
									</tr>
								</thead>
								<tbody>
									{group.articles.map((article, idx) => (
										<tr
											key={idx}
											className="cursor-pointer border-b border-border transition-colors hover:bg-blue-50"
											onClick={() => window.open(article.url, "_blank")}
										>
											<td className="px-4 py-3 text-muted-foreground">{article.num}</td>
											<td className="px-4 py-3">
												<a
													href={article.url}
													target="_blank"
													onClick={(e) => e.stopPropagation()}
													className="font-medium text-[#1a237e] hover:underline"
												>
													{article.title}
												</a>
												{article.excerpt && (
													<p className="mt-1 text-xs text-muted-foreground">{article.excerpt}</p>
												)}
											</td>
											<td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
												{article.date}
											</td>
											<td className="px-4 py-3">
												<span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-[#1a237e]">
													{categoryTranslations[article.category] || article.category}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				);
			})}
		</div>
	);
}
