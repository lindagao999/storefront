import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contact" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contact" });

	const contacts = [
		{
			key: "sales",
			icon: "👤",
			name: "Sky",
			role: t("skySales"),
			phone: "0755-28198292",
			email: "sales@anfully.com",
		},
		{
			key: "tech",
			icon: "🔧",
			name: "Fifi",
			role: t("fifiSupport"),
			phone: "0755-28198283",
			email: "Fifi.support@anfully.com",
		},
		{
			key: "service",
			icon: "💬",
			name: "Sister",
			role: t("sisterService"),
			phone: "0755-28198292",
			email: "service@anfully.com",
		},
		{
			key: "business",
			icon: "📊",
			name: "Box",
			role: t("boxBiz"),
			phone: "0755-28198283",
			email: "business@anfully.com",
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

			{/* Hero */}
			<section className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] px-8 py-12 text-center text-white md:px-16">
				<h1 className="mb-3 text-3xl font-bold md:text-4xl">{t("heroTitle")}</h1>
				<p className="mx-auto max-w-2xl opacity-90">{t("heroDesc")}</p>
			</section>

			{/* Contact Cards */}
			<section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				<ContactCard icon="📞" title={t("hotlineTitle")} content="0755-28198292" subContent="0755-28198283" />
				<ContactCard
					icon="📧"
					title={t("emailTitle")}
					content="sales@anfully.com"
					subContent="support@anfully.com"
				/>
				<ContactCard
					icon="🕐"
					title={t("workTimeTitle")}
					content={t("workTimeContent")}
					subContent={t("workTimeSub")}
				/>
				<ContactCard
					icon="📍"
					title={t("addressTitle")}
					content={t("addressContent")}
					subContent={t("addressSub")}
				/>
			</section>

			<div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
				{/* Contact Persons */}
				<section>
					<h2 className="mb-5 text-xl font-semibold text-[#1a237e]">{t("personsTitle")}</h2>
					<div className="space-y-4">
						{contacts.map((contact) => (
							<div
								key={contact.key}
								className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1a237e] to-[#2b5ba9] text-xl text-white">
									{contact.icon}
								</div>
								<div className="flex-1">
									<div className="font-medium">
										{contact.name} · {contact.role}
									</div>
									<div className="text-sm text-muted-foreground">{contact.phone}</div>
									<div className="text-xs text-muted-foreground">{contact.email}</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Contact Form */}
				<section className="rounded-xl bg-card p-6 shadow-sm">
					<h2 className="mb-5 text-xl font-semibold text-[#1a237e]">{t("formTitle")}</h2>
					<form className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("formName")} *</label>
								<input
									type="text"
									required
									placeholder={t("formNamePlaceholder")}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
								/>
							</div>
							<div>
								<label className="mb-1.5 block text-sm font-medium">{t("formPhone")} *</label>
								<input
									type="tel"
									required
									placeholder={t("formPhonePlaceholder")}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
								/>
							</div>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">{t("formEmail")} *</label>
							<input
								type="email"
								required
								placeholder={t("formEmailPlaceholder")}
								className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
							/>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">{t("formSubject")} *</label>
							<select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]">
								<option>{t("subjectInquiry")}</option>
								<option>{t("subjectSample")}</option>
								<option>{t("subjectTech")}</option>
								<option>{t("subjectFeedback")}</option>
							</select>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium">{t("formMessage")} *</label>
							<textarea
								rows={5}
								required
								placeholder={t("formMessagePlaceholder")}
								className="resize-vertical w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
							/>
						</div>

						<button
							type="submit"
							className="w-full rounded-md bg-[#1a237e] py-3 font-medium text-white transition-colors hover:bg-[#2b5ba9]"
						>
							{t("formSubmit")}
						</button>
					</form>
				</section>
			</div>
		</div>
	);
}

function ContactCard({
	icon,
	title,
	content,
	subContent,
}: {
	icon: string;
	title: string;
	content: string;
	subContent: string;
}) {
	return (
		<div className="rounded-xl bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
			<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0fe] text-2xl">
				{icon}
			</div>
			<h3 className="mb-2 font-medium">{title}</h3>
			<p className="text-sm font-medium text-[#1a237e]">{content}</p>
			<p className="text-xs text-muted-foreground">{subContent}</p>
		</div>
	);
}
