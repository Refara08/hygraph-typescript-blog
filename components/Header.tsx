import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories, categoryType } from "../services";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";

const Header = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  const IconsComponent = (
    <div className="icons flex items-center gap-4">
      <div className="icon">
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <EmailIcon />
        </a>
      </div>
      <div className="icon">
        <a
          href="http://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
      </div>
      <div className="icon">
        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </a>
      </div>
      <div className="icon">
        <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="flex justify-between items-center py-4 border-b border-sage">
        <Link href={"/"}>
          <span className="cursor-pointer text-xl font-semibold uppercase tracking-widest">
            Back Blog
          </span>
        </Link>
        <ul className="hidden md:flex gap-4 ">
          {categories.map((category) => (
            <li
              key={category.slug}
              className="border-b border-transparent mb-2 pb-0 hover:border-sage hover:pb-2 hover:mb-0 transition-all duration-300"
            >
              <Link href={`/category/${category.slug}`}>
                <span className="cursor-pointer">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <>{IconsComponent}</>
      </div>
    </div>
  );
};

export default Header;
