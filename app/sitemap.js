/** @format */

// Dynamic sitemap generation for Next.js 14
export default function sitemap() {
  const baseUrl = "https://alkhiyamalqassim.com";
  const currentDate = new Date().toISOString();

  // All static routes
  const routes = [
    "",
    "/alqasim",
    "/alqasim/sayaarat",
    "/alqasim/hadayiq",
    "/alqasim/masabih",
    "/alqasim/madakhil",
    "/alqasim/likasan",
    "/alqasim/madaris",
    "/alqasim/aswaq",
    "/alqasim/masajid",
    "/alqasim/qumash",
    "/alqasim/shinku",
    "/sawatiralqasim",
    "/sawatiralqasim/hadid",
    "/sawatiralqasim/qumash1",
    "/sawatiralqasim/bilastik",
    "/sawatiralqasim/likasan1",
    "/sawatiralqasim/masabih1",
    "/manatiqalsueudia",
    "/hanajiralqasim",
    "/jalasatwaburjulat",
    "/shubukalqasim",
    "/biutshaer",
    "/aitasilbina",
    "/almazid",
    "/wasawatirfialqasim",
    "/search",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
    alternates: {
      languages: {
        ar: `${baseUrl}${route}`,
        "ar-SA": `${baseUrl}${route}`,
        "x-default": `${baseUrl}${route}`,
      },
    },
  }));
}
