import Link from "next/link";
import { PostType } from "../services";
import moment from "moment";

import { CalendarIcon } from "../icons";

const PostCard: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-xl mb-12 pb-8">
      <div className="mb-4 w-full aspect-video overflow-hidden relative">
        <img
          className="object-cover w-full h-full absolute object-top"
          src={post.featuredImage.url}
          alt={post.title}
        />
      </div>
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl font-semibold mb-2 hover:text-blue-600 transition duration-300">
          <Link href={`post/${post.slug}`}>{post.title}</Link>
        </h1>

        <div className="flex flex-col md:flex-row md:justify-evenly items-center w-full">
          <div className="flex items-center gap-2">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              width="30px"
              height="30px"
              className="border border-slate-200 rounded-full shadow-lg"
            />
            <h5>{post.author.name}</h5>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon size={"2rem"} />
            <span>{moment(post.createdAt).format("DD MMM YYYY")}</span>
          </div>
        </div>
        <p>{post.excerpt}</p>
        <Link href={`post/${post.slug}`}>
          <a className="bg-blue-600 text-white py-2 px-5 mt-4 rounded-full hover:scale-105 transition duration-300 hover:shadow-lg">
            Read more
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
