import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export function SEO({ title, description, path }: SEOProps) {
  const fullTitle = title.includes("RightHer") ? title : `${title} | RightHer`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={path} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={path} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
