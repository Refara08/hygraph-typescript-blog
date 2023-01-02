import Link from "next/link";
import { useState, useEffect } from "react";
import { categoryType, getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <aside className="bg-white text-black rounded-lg p-4">
      <h1 className="mb-4 font-bold pb-4 border-b border-slate-200">
        Categories
      </h1>
      <div className="flex flex-col gap-3">
        {categories.map((category, index) => (
          <Link href={`/category/${category.slug}`} key={index}>
            {category.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Categories;
