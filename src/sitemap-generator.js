/** @format */

const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");

// Define the routes for the sitemap
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/alqasim", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/sayaarat", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/hadayiq", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/masabih", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/madakhil", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/likasan", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/madaris", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/aswaq", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/masajid", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/qumash", changefreq: "daily", priority: 0.8 },
  { url: "/alqasim/shinku", changefreq: "daily", priority: 0.8 },
  { url: "/sawatiralqasim", changefreq: "daily", priority: 0.8 },
  { url: "/sawatiralqasim/hadid", changefreq: "daily", priority: 0.8 },
  { url: "/sawatiralqasim/qumash1", changefreq: "daily", priority: 0.8 },
  { url: "/sawatiralqasim/bilastik", changefreq: "daily", priority: 0.8 },
  { url: "/sawatiralqasim/likasan1", changefreq: "daily", priority: 0.8 },
  { url: "/sawatiralqasim/masabih1", changefreq: "daily", priority: 0.8 },
  { url: "/manatiqalsueudia", changefreq: "daily", priority: 0.8 },
  { url: "/hanajiralqasim", changefreq: "daily", priority: 0.8 },
  { url: "/jalasatwaburjulat", changefreq: "daily", priority: 0.8 },
  { url: "/shubukalqasim", changefreq: "daily", priority: 0.8 },
  { url: "/biutshaer", changefreq: "daily", priority: 0.8 },
  { url: "/aitasilbina", changefreq: "daily", priority: 0.8 },
  { url: "/almazid", changefreq: "daily", priority: 0.8 },
  { url: "/wasawatirfialqasim", changefreq: "daily", priority: 0.8 },
];

// Set up the hostname for your website
const hostname = "https://tents-f9b9d.web.app/"; // Replace with your actual domain

// Initialize the SitemapStream
const sitemapStream = new SitemapStream({ hostname });

// Write each route link to the sitemap
links.forEach((link) => {
  sitemapStream.write(link);
});

// End the sitemap stream
sitemapStream.end();

// Generate the sitemap and write it to a file
streamToPromise(sitemapStream)
  .then((data) => {
    // Save the generated sitemap to the public directory
    fs.writeFileSync("./public/sitemap.xml", data.toString());
    console.log("Sitemap successfully generated!");
  })
  .catch((err) => {
    console.error("Error generating sitemap:", err);
  });
