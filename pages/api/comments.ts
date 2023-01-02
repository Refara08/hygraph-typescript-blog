// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { GraphQLClient, gql } from "graphql-request";

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphQLToken = process.env.NEXT_PUBLIC_GRAPHQL_TOKEN;

// type Data = {
//   name: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body);

  const graphQLClient = new GraphQLClient(graphQLAPI, {
    headers: {
      authorization: `Bearer ${graphQLToken}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}
