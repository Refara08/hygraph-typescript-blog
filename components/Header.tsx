import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories, categoryType } from "../services";

const Header = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="flex justify-between items-center py-4 text-white border-b border-white">
        <Link href={"/"}>
          <span className="cursor-pointer text-xl font-semibold">
            Graphql CMS
          </span>
        </Link>
        <ul className="hidden md:flex gap-4 ">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/category/${category.slug}`}>
                <span className="cursor-pointer">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
