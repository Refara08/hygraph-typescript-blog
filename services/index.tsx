import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export type nodePostType = {
  node: {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    featuredImage: {
      url: string;
    };
    author: {
      id: string;
      name: string;
      bio: string;
      photo: {
        url: string;
      };
    };
    categories: {
      id: string;
      name: string;
      slug: string;
    };
  };
};

export type PostType = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  featuredImage: {
    url: string;
  };
  author: {
    id: string;
    name: string;
    bio: string;
    photo: {
      url: string;
    };
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  };
};

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            id
            title
            excerpt
            slug
            createdAt
            updatedAt
            featuredImage {
              url
            }
            author {
              id
              name
              bio
              photo {
                url
              }
            }
            categories {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

//====================================================================
export const getPostsByCategory = async (slug: string) => {
  const query = gql`
    query GetPostByCategory($slug: String!) {
      categoriesConnection(where: { slug: $slug }) {
        edges {
          node {
            posts {
              id
              title
              excerpt
              createdAt
              slug
              featuredImage {
                url
              }
              author {
                name
                photo {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.categoriesConnection.edges;
};

//====================================================================
export type postDetailType = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  featuredImage: {
    url: string;
  };
  author: {
    id: string;
    name: string;
    bio: string;
    photo: {
      url: string;
    };
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  content: {
    raw: any;
  };
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        excerpt
        slug
        createdAt
        updatedAt
        featuredImage {
          url
        }
        author {
          id
          name
          bio
          photo {
            url
          }
        }
        categories {
          id
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

//===================================================================

export type recentPostType = {
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts() {
      posts(orderBy: publishedAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query = gql`
    query getSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

//=====================================================================================

export type categoryType = {
  slug: string;
  name: string;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        slug
        name
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

//=====================================================================================
export const submitComment = async (obj: {
  name: string;
  email: string;
  comment: string;
  slug: string;
}) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

//===============================================================================
export type CommentsPerPostType = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

export const getCommentsPerPost = async (slug: string) => {
  const query = gql`
    query GetComment($slug: String) {
      comments(where: { post: { slug: $slug } }, orderBy: publishedAt_ASC) {
        id
        name
        comment
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};
