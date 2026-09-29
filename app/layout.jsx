/** @format */
"use client";
import React from "react";
import "typicons.font";
import "../src/index.css";
import "../src/App.css";
import "../src/styles/sr-only.css";
import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer";
import BreadCrumb from "../src/Components/BreadCrumb";
import Ticker from "../src/Components/Ticker";
import { SearchProvider } from "../src/Components/context/SearchContext";
import styled from "styled-components";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import dynamic from "next/dynamic";
import { UserProvider } from "../src/Context/userContext";
import { PostProvider } from "../src/Context/postContext";
import { siteConfig } from "../src/lib/siteConfig";

const MapLeaflet = dynamic(() => import("../src/Components/MapLeaflet"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  const domain = siteConfig.domain;
  const phoneE164 = `+${siteConfig.whatsapp}`;

  return (
    <html
      lang='ar'
      dir='rtl'
      translate='no'
      className='notranslate'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />
        <title>
          {`${siteConfig.brandAr} | مظلات وسواتر وخيام ملكي في القصيم بريدة عنيزة`}
        </title>
        <meta
          name='description'
          content={siteConfig.description}
        />
        <meta
          name='keywords'
          content={siteConfig.keywords}
        />
        <meta
          name='theme-color'
          content='#0f4c3a'
        />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta
          name='googlebot'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta
          name='language'
          content='Arabic'
        />
        <meta
          name='geo.region'
          content='SA-05'
        />
        <meta
          name='geo.placename'
          content='القصيم، بريدة'
        />
        <meta
          name='geo.position'
          content={`${siteConfig.geo.lat};${siteConfig.geo.lng}`}
        />
        <meta
          name='ICBM'
          content={`${siteConfig.geo.lat}, ${siteConfig.geo.lng}`}
        />
        <meta
          name='author'
          content={siteConfig.brandAr}
        />
        <link
          rel='canonical'
          href={`${domain}/`}
        />
        <link
          rel='alternate'
          hrefLang='ar-SA'
          href={`${domain}/`}
        />
        <link
          rel='alternate'
          hrefLang='ar'
          href={`${domain}/`}
        />
        <link
          rel='alternate'
          hrefLang='x-default'
          href={`${domain}/`}
        />
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap'
          rel='stylesheet'
        />
        <meta
          property='og:locale'
          content='ar_SA'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:site_name'
          content={`${siteConfig.brandAr} | ${siteConfig.brandEn}`}
        />
        <meta
          property='og:title'
          content={`${siteConfig.brandAr} | مظلات وسواتر وخيام ملكي في القصيم بريدة عنيزة`}
        />
        <meta
          property='og:description'
          content={siteConfig.description}
        />
        <meta
          property='og:image'
          content={`${domain}/images/slider3.jpg`}
        />
        <meta
          property='og:image:width'
          content='1200'
        />
        <meta
          property='og:image:height'
          content='630'
        />
        <meta
          property='og:image:alt'
          content={`${siteConfig.brandAr} - مظلات وسواتر وخيام ملكي القصيم`}
        />
        <meta
          property='og:url'
          content={`${domain}/`}
        />
        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          name='twitter:title'
          content={`${siteConfig.brandAr} | مظلات وسواتر القصيم`}
        />
        <meta
          name='twitter:description'
          content={siteConfig.description}
        />
        <meta
          name='twitter:image'
          content={`${domain}/images/slider3.jpg`}
        />
        <link
          rel='stylesheet'
          href='/font%20icons/typicons.min.css'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${domain}/#business`,
              name: siteConfig.brandAr,
              alternateName: [
                siteConfig.brandEn,
                "Al Khiyam Al Qassim",
                "خيام القصيم",
                "مظلات القصيم",
                "سواتر بريدة",
              ],
              description: siteConfig.description,
              image: [
                `${domain}/images/slider3.jpg`,
                `${domain}/images/logo.jpg`,
              ],
              url: `${domain}/`,
              telephone: [phoneE164, `+966${siteConfig.phoneSecondary.replace(/\s/g, "").replace(/^0/, "")}`],
              email: [siteConfig.emailPrimary, siteConfig.emailSecondary],
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "40",
                addressLocality: "بريدة",
                postalCode: "52211",
                addressRegion: "القصيم",
                addressCountry: "SA",
              },
              areaServed: siteConfig.cities.map((name) => ({
                "@type": "City",
                name,
              })),
              geo: {
                "@type": "GeoCoordinates",
                latitude: siteConfig.geo.lat,
                longitude: siteConfig.geo.lng,
              },
              openingHours: ["Mo-Su 08:00-22:00"],
              sameAs: [
                domain,
                siteConfig.instagram,
                siteConfig.snapchat,
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "مظلات وسواتر وخيام",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "مظلات سيارات" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "مظلات حدائق" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "مظلات مسابح" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "سواتر حديد" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "خيام ملكي" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "جلسات وبرجولات" },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${domain}/#website`,
              name: siteConfig.brandAr,
              alternateName: [siteConfig.brandEn, "Al Khiyam Al Qassim"],
              url: `${domain}/`,
              inLanguage: "ar-SA",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${domain}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${domain}/#organization`,
              name: siteConfig.brandAr,
              url: `${domain}/`,
              logo: `${domain}/images/logo.jpg`,
              email: siteConfig.emailPrimary,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: phoneE164,
                  contactType: "customer service",
                  areaServed: "SA",
                  availableLanguage: ["Arabic", "ar"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: `+966${siteConfig.phoneSecondary.replace(/^0/, "")}`,
                  contactType: "customer service",
                  areaServed: "SA",
                  availableLanguage: ["Arabic", "ar"],
                },
              ],
              sameAs: [siteConfig.instagram, siteConfig.snapchat],
            }),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: (siteConfig.faq || []).map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "الرئيسية",
                  item: `${domain}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "مظلات القصيم",
                  item: `${domain}/alqasim`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "سواتر القصيم",
                  item: `${domain}/sawatiralqasim`,
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SearchProvider>
          <UserProvider>
            <PostProvider>
              <StyledComponentsRegistry>
                <DashboardContainer>
                  <Header />
                  <ContentArea id='center'>
                    <BreadCrumb />
                    {children}
                    <FullWidthMap>
                      <MapLeaflet />
                    </FullWidthMap>
                  </ContentArea>
                  <Ticker />
                  <Footer />
                </DashboardContainer>
              </StyledComponentsRegistry>
            </PostProvider>
          </UserProvider>
        </SearchProvider>
      </body>
    </html>
  );
}

const DashboardContainer = styled.div`
  overflow: visible;
  min-height: 100vh;
  background:
    radial-gradient(ellipse at top, rgba(15, 76, 58, 0.08), transparent 42%),
    linear-gradient(180deg, #f4efe4 0%, #ebe4d6 100%);
`;

const ContentArea = styled.main`
  padding: 20px;
  background: rgba(255, 252, 245, 0.92);
  border-radius: 18px;
  border: 1px solid rgba(15, 76, 58, 0.08);
  box-shadow: 0 12px 40px rgba(6, 40, 32, 0.08);
  padding-bottom: 56px;
  overflow: visible;
  margin: 0 12px;

  @media (max-width: 640px) {
    margin: 0 6px;
    padding: 12px;
    padding-bottom: 56px;
    border-radius: 14px;
  }
`;

const FullWidthMap = styled.div`
  width: 100%;
  margin-top: 24px;
  border-radius: 14px;
  overflow: hidden;
`;
