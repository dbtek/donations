import type { GatsbyConfig } from "gatsby";

require('dotenv').config({
  path: `.env`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Donations`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GA_TRACKING_ID || 'nana', // Google Analytics / GA
        ],
      },
    }
  ]
};

export default config;
