"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  counts: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const count = counts[cat] ?? 0;

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span>{cat}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                isActive
                  ? "bg-slate-800 text-slate-300"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
