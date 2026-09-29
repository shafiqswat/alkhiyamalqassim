/** @format */

import { siteConfig } from "../src/lib/siteConfig";

export const siteMetadata = {
  title: `${siteConfig.brandAr} | مظلات وسواتر وخيام ملكي في القصيم بريدة عنيزة`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  url: siteConfig.domain,
  siteName: siteConfig.brandAr,
  locale: "ar_SA",
  phone: `+${siteConfig.whatsapp}`,
  address: {
    country: "SA",
    region: siteConfig.region,
    cities: siteConfig.cities,
  },
};

export const generatePageMetadata = (pageTitle, pageDescription, path = "") => {
  const fullTitle = `${pageTitle} | ${siteMetadata.siteName}`;
  const canonicalUrl = `${siteMetadata.url}${path}`;

  return {
    title: fullTitle,
    description: pageDescription,
    keywords: siteMetadata.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ar-SA": canonicalUrl,
        ar: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      type: "website",
      images: [
        {
          url: `${siteMetadata.url}/images/slider3.jpg`,
          width: 1200,
          height: 630,
          alt: `${pageTitle} - ${siteConfig.brandAr}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: [`${siteMetadata.url}/images/slider3.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};
