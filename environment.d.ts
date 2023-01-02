declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GRAPHCMS_ENDPOINT: string; // this is the line you want
      NEXT_PUBLIC_GRAPHQL_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
