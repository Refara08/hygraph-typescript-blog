import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts } from "../services";

const Home: NextPage<{ posts: any }> = ({ posts }) => {
  // console.log(posts);
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Black Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {posts.map((post: any, index: number) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1 mb-8">
          <div className="lg:sticky relative top-8 flex flex-col gap-4">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
};
