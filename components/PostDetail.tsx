import React from "react";
import moment from "moment";
import { postDetailType } from "../services";
import { CalendarIcon } from "../icons";

const PostDetail: React.FC<{ post: postDetailType }> = ({ post }) => {
  const getContentFragment = (
    index: number,
    text: string,
    obj: any,
    type?: string
  ) => {
    let modifiedText: any = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white rounded-xl mb-12 pb-8 overflow-hidden">
      <img src={post.featuredImage.url} alt={post.title} />
      <div className="py-4 px-6">
        <div className="flex flex-row justify-between md:justify-start items-center w-full mb-2 gap-4">
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
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        {post.content.raw.children.map((typeObj: any, index: number) => {
          const children = typeObj.children.map(
            (item: any, itemindex: number) =>
              getContentFragment(itemindex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
