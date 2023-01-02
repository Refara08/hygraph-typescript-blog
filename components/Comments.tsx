import moment from "moment";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

import { CommentsPerPostType, getCommentsPerPost } from "../services";

const Comments: React.FC<{ slug: string }> = ({ slug }) => {
  const [comments, setComments] = useState<CommentsPerPostType[]>([]);
  console.log(slug);

  useEffect(() => {
    getCommentsPerPost(slug).then((res) => {
      setComments(res);
      console.log(res);
    });
  }, [slug]);

  return (
    <div className="bg-white p-8 rounded-lg">
      <h3 className="font-bold text-xl pb-4 mb-4 border-b border-slate-100">{`${
        comments.length
      } comment${comments.length > 1 ? "s" : ""}`}</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <div className="flex gap-x-2">
            <h4 className="font-semibold">{comment.name}</h4>
            <h5>{`on ${moment(comment.createdAt).format("DD MMM YYYY")}`}</h5>
          </div>
          <p>{parse(comment.comment)}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
