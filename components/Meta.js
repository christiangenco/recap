import Head from "next/head";

export default function Meta({
  title,
  date,
  image,
  description,
  url,
  updatedAt,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:type" content="article" />
      <meta
        property="article:section"
        itemprop="articleSection"
        content="Business"
      />
      {date && (
        <meta
          property="article:published"
          itemprop="datePublished"
          content={new Date(date)}
        />
      )}
      {updatedAt && (
        <meta
          property="article:modified"
          itemprop="dateModified"
          content={new Date(updatedAt)}
        />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:site" value="@microconf" />
      {url && <meta property="twitter:url" content={url} />}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}
      {image && <meta name="twitter:card" value="summary_large_image" />}

      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}
