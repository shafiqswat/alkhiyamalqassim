/** @format */

export default function Head() {
  const siteUrl = "https://tents-f9b9d.web.app/";
  const title =
    "الخيام القصيم | مظلات سواتر خيام ملكي القصيم بريدة عنيزة";
  const description =
    "الخيام القصيم: تفصيل وتركيب خيام ملكي، مظلات سيارات وحدائق ومسابح، سواتر وبرجولات في القصيم (بريدة، عنيزة). جودة عالية وخدمة سريعة. اتصل الآن 0500886893";
  const keywords = [
    "مظلات",
    "سواتر",
    "خيام",
    "خيام ملكي",
    "مظلات سيارات",
    "مظلات حدائق",
    "مظلات مسابح",
    "سواتر حديد",
    "سواتر قماش",
    "برجولات",
    "القصيم",
    "بريدة",
    "عنيزة",
    "tents",
    "car shades",
    "shelters",
    "pergola",
    "riyadh tents",
  ].join(", ");

  return (
    <>
      <meta charSet='utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1'
      />
      <title>{title}</title>
      <meta
        name='description'
        content={description}
      />
      <meta
        name='keywords'
        content={keywords}
      />
      <meta
        name='robots'
        content='index,follow'
      />
      <link
        rel='canonical'
        href={siteUrl}
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:url'
        content={siteUrl}
      />
      <meta
        property='og:locale'
        content='ar_SA'
      />
      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content={title}
      />
      <meta
        name='twitter:description'
        content={description}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "الخيام القصيم",
            description,
            areaServed: ["القصيم", "بريدة", "عنيزة"],
            url: siteUrl,
            telephone: "0500886893",
            sameAs: [
              "https://www.instagram.com/farmankhan473488",
              "https://www.facebook.com/share/E42VrQoFkhzNf7Fx/?mibextid=qi2Omg",
            ],
          }),
        }}
      />
    </>
  );
}
