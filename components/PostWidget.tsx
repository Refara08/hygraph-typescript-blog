import Link from "next/link";
import moment from "moment";
import { useState, useEffect } from "react";
import { getRecentPosts, getSimilarPosts, recentPostType } from "../services";

const PostWidget: React.FC<{ categories?: string[]; slug?: string }> = ({
  categories,
  slug,
}) => {
  const [relatedPosts, setRelatedPosts] = useState<recentPostType[]>([]);

  useEffect(() => {
    if (slug && categories) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <aside className="bg-white text-black rounded-lg p-4">
      <h1 className="mb-4 font-bold pb-4 border-b border-slate-200">
        {slug ? "Related Posts" : "Recent Posts"}
      </h1>

      {relatedPosts.map((post, index) => (
        <Link key={index} href={`/post/${post.slug}`}>
          <div className="cursor-pointer grid grid-cols-3 gap-4 mb-3 h-20 overflow-hidden">
            <div className="col-span-1 w-full h-full relative">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="object-cover w-full h-full absolute object-center"
              />
            </div>
            <div className="col-span-2">
              <h5>{moment(post.createdAt).format("DD MMM YYYY")}</h5>
              <h3 className="font-semibold text-sm">{post.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default PostWidget;
