import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";

import {
  PostDetail,
  Author,
  CommentsForm,
  Comments,
  PostWidget,
  Categories,
} from "../../components";

import {
  getPosts,
  getPostDetails,
  PostType,
  nodePostType,
  postDetailType,
} from "../../services";

const PostDetailsPage: React.FC<{ post: postDetailType }> = ({ post }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>{`Back Blog | ${post.title}`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="lg:col-span-8 col-span-1 ">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8 flex flex-col gap-4 mb-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const post = await getPostDetails(params.slug as string);

  return {
    props: {
      post: post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result: nodePostType[] = await getPosts();
  const posts: PostType[] = result.map((item) => item.node);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};
