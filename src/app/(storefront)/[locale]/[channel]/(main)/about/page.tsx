import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "about" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "about" });

	return (
		<div className="container-content py-8 pb-16">
			{/* Hero Section */}
			<section className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] px-8 py-16 text-center text-white md:px-16">
				<h1 className="mb-4 text-3xl font-bold md:text-4xl">{t("heroTitle")}</h1>
				<p className="mx-auto max-w-3xl text-base opacity-90 md:text-lg">{t("heroDesc")}</p>
			</section>

			{/* Mission & Vision */}
			<section className="mb-10 grid gap-6 md:grid-cols-2">
				<div className="rounded-xl bg-card p-6 shadow-sm">
					<h2 className="mb-4 text-xl font-semibold text-[#1a237e]">{t("missionTitle")}</h2>
					<p className="leading-relaxed text-muted-foreground">{t("missionDesc")}</p>
				</div>
				<div className="rounded-xl bg-card p-6 shadow-sm">
					<h2 className="mb-4 text-xl font-semibold text-[#1a237e]">{t("visionTitle")}</h2>
					<p className="leading-relaxed text-muted-foreground">{t("visionDesc")}</p>
				</div>
			</section>

			{/* Core Values */}
			<section className="mb-10">
				<h2 className="mb-6 text-center text-2xl font-bold text-[#1a237e]">{t("valuesTitle")}</h2>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					<ValueCard icon="✓" title={t("value1Title")} description={t("value1Desc")} />
					<ValueCard icon="🔧" title={t("value2Title")} description={t("value2Desc")} />
					<ValueCard icon="💡" title={t("value3Title")} description={t("value3Desc")} />
					<ValueCard icon="🤝" title={t("value4Title")} description={t("value4Desc")} />
				</div>
			</section>

			{/* Philosophy */}
			<section className="mb-10 rounded-xl bg-card p-6 shadow-sm">
				<h2 className="mb-6 text-xl font-semibold text-[#1a237e]">{t("philosophyTitle")}</h2>
				<div className="grid gap-6 md:grid-cols-2">
					<div>
						<h3 className="mb-2 font-medium text-[#2b5ba9]">{t("servicePhilosophyTitle")}</h3>
						<p className="text-sm leading-relaxed text-muted-foreground">{t("servicePhilosophyDesc")}</p>
					</div>
					<div>
						<h3 className="mb-2 font-medium text-[#2b5ba9]">{t("businessPhilosophyTitle")}</h3>
						<p className="text-sm leading-relaxed text-muted-foreground">{t("businessPhilosophyDesc")}</p>
					</div>
				</div>
			</section>

			{/* Company Intro & Advantages */}
			<section className="mb-10 grid gap-6 md:grid-cols-2">
				<div className="rounded-xl bg-card p-6 shadow-sm">
					<h2 className="mb-4 text-xl font-semibold text-[#1a237e]">{t("companyIntroTitle")}</h2>
					<p className="mb-3 text-sm leading-relaxed text-muted-foreground">{t("companyIntroDesc1")}</p>
					<p className="text-sm leading-relaxed text-muted-foreground">{t("companyIntroDesc2")}</p>
				</div>
				<div className="rounded-xl bg-card p-6 shadow-sm">
					<h2 className="mb-4 text-xl font-semibold text-[#1a237e]">{t("advantagesTitle")}</h2>
					<ul className="space-y-2">
						<li className="flex items-start gap-2 text-sm text-muted-foreground">
							<span className="font-bold text-[#1a237e]">•</span>
							{t("advantage1")}
						</li>
						<li className="flex items-start gap-2 text-sm text-muted-foreground">
							<span className="font-bold text-[#1a237e]">•</span>
							{t("advantage2")}
						</li>
						<li className="flex items-start gap-2 text-sm text-muted-foreground">
							<span className="font-bold text-[#1a237e]">•</span>
							{t("advantage3")}
						</li>
						<li className="flex items-start gap-2 text-sm text-muted-foreground">
							<span className="font-bold text-[#1a237e]">•</span>
							{t("advantage4")}
						</li>
						<li className="flex items-start gap-2 text-sm text-muted-foreground">
							<span className="font-bold text-[#1a237e]">•</span>
							{t("advantage5")}
						</li>
						<li className="flex items-start gap-2 text-sm text-muted-foreground">
							<span className="font-bold text-[#1a237e]">•</span>
							{t("advantage6")}
						</li>
					</ul>
				</div>
			</section>

			{/* Application Areas */}
			<section>
				<h2 className="mb-6 text-center text-2xl font-bold text-[#1a237e]">{t("appSectionTitle")}</h2>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					<AppCard icon="📱" title={t("app1Title")} description={t("app1Desc")} />
					<AppCard icon="📡" title={t("app2Title")} description={t("app2Desc")} />
					<AppCard icon="🚗" title={t("app3Title")} description={t("app3Desc")} />
					<AppCard icon="⚙️" title={t("app4Title")} description={t("app4Desc")} />
					<AppCard icon="🏥" title={t("app5Title")} description={t("app5Desc")} />
					<AppCard icon="🔋" title={t("app6Title")} description={t("app6Desc")} />
				</div>
			</section>
		</div>
	);
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
	return (
		<div className="rounded-xl bg-card p-5 text-center shadow-sm transition-shadow hover:shadow-md">
			<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0fe] text-2xl">
				{icon}
			</div>
			<h3 className="mb-2 font-semibold text-foreground">{title}</h3>
			<p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
		</div>
	);
}

function AppCard({ icon, title, description }: { icon: string; title: string; description: string }) {
	return (
		<div className="rounded-xl bg-gradient-to-br from-card to-muted/30 p-5 transition-all hover:-translate-y-1 hover:shadow-md">
			<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#1a237e] to-[#2b5ba9] text-xl text-white">
				{icon}
			</div>
			<h3 className="mb-2 font-semibold text-[#1a237e]">{title}</h3>
			<p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
		</div>
	);
}
