import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "brands" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "brands" });

	return (
		<div className="container-content py-8 pb-16">
			{/* Breadcrumb */}
			<nav className="mb-6 text-sm">
				<span className="text-muted-foreground">{t("breadcrumbHome")}</span>
				<span className="mx-2 text-muted-foreground">›</span>
				<span className="text-foreground">{t("breadcrumbCurrent")}</span>
			</nav>

			{/* Header */}
			<section className="mb-10 text-center">
				<h1 className="mb-4 text-3xl font-bold text-[#1a237e] md:text-4xl">{t("pageTitle")}</h1>
				<p className="mx-auto max-w-3xl text-muted-foreground">{t("heroDesc")}</p>
			</section>

			{/* Brand Cards */}
			<section className="space-y-8">
				<BrandCard
					title={t("murataTitle")}
					description={t("murataDesc")}
					highlight={t("murataHighlight")}
					specs={["MLCC", "Inductor", "Filter", "Sensor"]}
					series="GRM/GCJ/LQM/SAY"
					stock="3,200+"
					reverse={false}
				/>
				<BrandCard
					title={t("tdkTitle")}
					description={t("tdkDesc")}
					highlight={t("tdkHighlight")}
					specs={["MLCC", "Inductor", "Bead", "Transformer"]}
					series="C/MH/MLZ/MPZ"
					stock="2,800+"
					reverse={true}
				/>
				<BrandCard
					title={t("samsungTitle")}
					description={t("samsungDesc")}
					highlight={t("samsungHighlight")}
					specs={["MLCC", "Inductor", "Resistor", "Substrate"]}
					series="CL/CL-S/CL-P"
					stock="2,500+"
					reverse={false}
				/>
				<BrandCard
					title={t("yageoTitle")}
					description={t("yageoDesc")}
					highlight={t("yageoHighlight")}
					specs={["Resistor", "MLCC", "Inductor", "Array"]}
					series="RC/RL/CC/TC"
					stock="4,500+"
					reverse={true}
				/>
			</section>

			{/* All Brands Grid */}
			<section className="mt-12">
				<h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[#1a237e]">
					{t("allBrandsTitle")}
				</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{["Murata", "TDK", "Samsung", "YAGEO", "KEMET", "AVX", "TAIYO YUDEN", "Vishay"].map((name) => (
						<div
							key={name}
							className="rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-[#1a237e] hover:shadow-md"
						>
							<div className="mb-2 text-lg font-bold text-[#1a237e]">{name}</div>
							<p className="text-xs text-muted-foreground">{t("authorizedDistributor")}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

function BrandCard({
	title,
	description,
	highlight,
	specs,
	series,
	stock,
	reverse,
}: {
	title: string;
	description: string;
	highlight: string;
	specs: string[];
	series: string;
	stock: string;
	reverse: boolean;
}) {
	return (
		<div
			className={`overflow-hidden rounded-2xl bg-card shadow-sm ${reverse ? "md:flex-row-reverse" : ""} md:flex`}
		>
			<div className="flex-1 p-6 md:p-8">
				<h2 className="mb-3 text-2xl font-bold text-[#1a237e]">{title}</h2>
				<p className="mb-4 leading-relaxed text-muted-foreground">{description}</p>
				<div className="mb-4 rounded-lg bg-[#e8f0fe] p-4">
					<p className="text-sm text-[#1a237e]">{highlight}</p>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<SpecRow label="Main Products" value={specs.join("、")} />
					<SpecRow label="Agent Level" value="Authorized" />
					<SpecRow label="Stock Models" value={stock} />
					<SpecRow label="Main Series" value={series} />
				</div>
			</div>
			<div className="md:min-h-auto flex min-h-[160px] items-center justify-center bg-gradient-to-br from-[#e8f0fe] to-[#d0e0ff] md:w-[300px]">
				<span className="text-3xl font-extrabold text-[#1a237e]">{title}</span>
			</div>
		</div>
	);
}

function SpecRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between rounded-md bg-muted/50 px-3 py-2 text-sm">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium text-foreground">{value}</span>
		</div>
	);
}
