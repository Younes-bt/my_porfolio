import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function SEO({
    title,
    description,
    keywords = [],
    image = '/og-image.png',
    url
}) {
    const { t } = useTranslation();
    const siteTitle = "Younes El Bettate | Full-Stack Developer";
    const fullTitle = title ? `${title} | Younes El Bettate` : siteTitle;
    const metaDescription = description || t('seo.defaultDescription', "Full-Stack Developer specializing in React, Node.js, and modern web technologies.");
    const metaKeywords = keywords.length > 0 ? keywords.join(', ') : "web development, full-stack, react, javascript, portfolio";

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            {image && <meta property="og:image" content={image} />}
            {url && <meta property="og:url" content={url} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
}
