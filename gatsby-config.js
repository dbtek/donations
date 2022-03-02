require('dotenv').config({
  path: `.env`,
});

console.log(`Using environment config .env'`)

module.exports = {
  flags: {
    FUNCTIONS: true
  },
  siteMetadata: {
    title: "pekdemirn",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    //"gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    "gatsby-plugin-typescript"
  ].concat(process.env.GA_TRACKING_ID ? [{
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: process.env.GA_TRACKING_ID,
    },
  }] : []),
};