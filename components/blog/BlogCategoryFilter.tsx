"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface Category {
  id: string;
  label: string;
}

interface BlogCategoryFilterProps {
  categories: Category[];
}

export function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "all";

  return (
    <nav className="flex items-center gap-0 overflow-x-auto scrollbar-hide -mb-px">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        const href =
          cat.id === "all" ? "/blog" : `/blog?category=${cat.id}`;
        return (
          <Link
            key={cat.id}
            href={href}
            className={cn(
              "shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap",
              isActive
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-brand-grey hover:text-brand-dark hover:border-gray-300"
            )}
          >
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
}
