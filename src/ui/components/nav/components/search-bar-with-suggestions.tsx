"use client";

import { useState, useRef, useEffect } from "react";
import { SearchIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 热门品牌推荐数据
const hotBrands = [
	{ name: "SAMSUNG", category: "MLCC Capacitors", href: "/categories" },
	{ name: "Murata", category: "MLCC · Inductors", href: "/categories" },
	{ name: "TDK", category: "Inductors · Beads", href: "/categories" },
	{ name: "YAGEO", category: "Chip Resistors", href: "/categories" },
	{ name: "TI", category: "Power Management IC", href: "/categories" },
	{ name: "ST", category: "MCU Microcontrollers", href: "/categories" },
	{ name: "ADI", category: "Data Acquisition", href: "/categories" },
	{ name: "Infineon", category: "Power Devices", href: "/categories" },
];

export const SearchBarWithSuggestions = ({
	locale,
	channel,
	placeholder,
	srOnlyLabel,
}: {
	locale: string;
	channel: string;
	placeholder: string;
	srOnlyLabel: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const containerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	// 点击外部关闭下拉框
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchValue.trim()) {
			router.push(`/${locale}/${channel}/search?query=${encodeURIComponent(searchValue)}`);
			setIsOpen(false);
		}
	};

	return (
		<div ref={containerRef} className="relative w-full max-w-md">
			<form onSubmit={handleSubmit} className="group relative">
				<label className="relative block">
					<span className="sr-only">{srOnlyLabel}</span>
					{/* Search icon */}
					<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
						<SearchIcon
							className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground"
							aria-hidden
						/>
					</span>
					{/* Input */}
					<input
						type="text"
						name="search"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onFocus={() => setIsOpen(true)}
						placeholder={placeholder}
						autoComplete="off"
						className="h-10 w-full rounded-lg border border-border/60 bg-background py-2 pl-11 pr-24 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-[#1a237e]/30 hover:shadow-md focus:border-[#1a237e] focus:bg-background focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20"
					/>
					{/* Search Button */}
					<button
						type="submit"
						className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-[#1a237e] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2b5ba9]"
					>
						Search
					</button>
				</label>
			</form>

			{/* 搜索推荐下拉框 */}
			{isOpen && (
				<div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-white shadow-lg">
					<div className="p-4">
						<h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Hot Brands</h3>
						<div className="space-y-1">
							{hotBrands.map((brand) => (
								<Link
									key={brand.name}
									href={`/${locale}/${channel}${brand.href}`}
									onClick={() => setIsOpen(false)}
									className="flex items-center justify-between rounded-md px-2 py-2 transition-colors hover:bg-gray-50"
								>
									<div className="flex items-center gap-3">
										<span className="font-semibold text-[#1a237e]">{brand.name}</span>
										<span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
											{brand.category}
										</span>
									</div>
									<span className="flex items-center text-sm text-gray-500 hover:text-[#1a237e]">
										View Products
										<ChevronRight className="ml-0.5 h-3 w-3" />
									</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
