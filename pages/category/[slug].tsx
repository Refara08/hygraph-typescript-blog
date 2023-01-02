import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { PostCard } from "../../components";
import {
  categoryType,
  getCategories,
  getPostsByCategory,
} from "../../services";

const CategoryPage: React.FC<{ posts: any; categories: categoryType[] }> = ({
  posts,
  categories,
}) => {
  const router = useRouter();
  const slug = router.query.slug;
  const category = categories.find((item) => item.slug === slug);

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>{`${category!.name} posts`}</title>
        <meta
          name="description"
          content={`All posts related to ${category!.name}`}
        />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.posts.map((post: any, index: number) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const posts = (await getPostsByCategory(params.slug as string)) || [];
  const categories: categoryType[] = (await getCategories()) || [];

  return {
    props: { posts: posts[0].node, categories },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: categoryType[] = await getCategories();
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};
