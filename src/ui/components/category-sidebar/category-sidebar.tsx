"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Layers } from "lucide-react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export interface CategoryItem {
	id?: string;
	name: string;
	href: string;
	children?: CategoryItem[];
	productCount?: number;
}

export interface CategorySidebarProps {
	heading?: string;
	categories: CategoryItem[];
	allCategoriesHref?: string;
	className?: string;
}

export function CategorySidebar({
	heading = "Products",
	categories,
	allCategoriesHref = "/products",
	className,
}: CategorySidebarProps) {
	return (
		<aside className={cn("w-64 shrink-0 overflow-hidden rounded-lg bg-white shadow-lg", className)}>
			{/* Header */}
			<div className="flex items-center justify-between bg-gradient-to-r from-[#1a237e] to-[#2b5ba9] px-4 py-3.5 text-white">
				<div className="flex items-center gap-2">
					<Layers className="h-4 w-4" />
					<span className="font-semibold">{heading}</span>
				</div>
				<LinkWithChannel
					href={allCategoriesHref}
					className="text-xs opacity-80 transition-opacity hover:underline hover:opacity-100"
					prefetch={false}
				>
					View All
				</LinkWithChannel>
			</div>

			{/* Category List */}
			<div className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent max-h-[640px] overflow-y-auto">
				<ul className="divide-y divide-gray-100">
					{categories.map((category) => (
						<li key={category.href || category.id}>
							<CategoryLink item={category} />
						</li>
					))}
				</ul>
			</div>

			{/* 底部快捷链接 */}
			<div className="border-t border-gray-100 bg-gray-50/50 p-3">
				<div className="grid grid-cols-2 gap-2">
					<LinkWithChannel
						href="/inquiry"
						className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-medium text-[#1a237e] shadow-sm transition-all hover:bg-[#1a237e] hover:text-white"
						prefetch={false}
					>
						📋 Quick Quote
					</LinkWithChannel>
					<LinkWithChannel
						href="/sample"
						className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-medium text-[#1a237e] shadow-sm transition-all hover:bg-[#1a237e] hover:text-white"
						prefetch={false}
					>
						🧪 Free Sample
					</LinkWithChannel>
				</div>
			</div>
		</aside>
	);
}

function CategoryLink({ item, depth = 0 }: { item: CategoryItem; depth?: number }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const hasChildren = item.children && item.children.length > 0;

	return (
		<div>
			<div
				className={cn(
					"group flex items-center justify-between px-4 py-3 text-sm transition-all",
					"hover:bg-gradient-to-r hover:from-[#1a237e]/5 hover:to-transparent",
					depth > 0 && "bg-gray-50/50 pl-8",
				)}
			>
				<LinkWithChannel
					href={item.href}
					className="flex flex-1 items-center gap-2 text-gray-700 transition-colors group-hover:text-[#1a237e]"
					prefetch={false}
				>
					{/* 缩进指示器 */}
					{depth > 0 && <span className="h-1.5 w-1.5 rounded-full bg-[#1a237e]/30" />}

					{/* 分类名称 */}
					<span className="flex-1 truncate font-medium">{item.name}</span>

					{/* 产品数量徽章 */}
					{item.productCount !== undefined && item.productCount > 0 && (
						<span className="ml-2 rounded-full bg-[#1a237e]/10 px-2 py-0.5 text-xs text-[#1a237e]">
							{item.productCount}
						</span>
					)}
				</LinkWithChannel>

				{/* 展开/折叠按钮 */}
				{hasChildren && (
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className="ml-1 rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#1a237e]"
					>
						<ChevronRight
							className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-90")}
						/>
					</button>
				)}
			</div>

			{/* Sub-categories */}
			{hasChildren && isExpanded && (
				<ul className="ml-4 border-l-2 border-[#1a237e]/10">
					{item.children!.map((child) => (
						<li key={child.href || child.id}>
							<CategoryLink item={child} depth={depth + 1} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
