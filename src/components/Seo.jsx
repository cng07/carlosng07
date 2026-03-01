import { useEffect } from 'react';

const ensureMetaTag = (attr, key, content) => {
    if (!content) return;
    let tag = document.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
};

const ensureLinkTag = (rel, href) => {
    if (!href) return;
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
    }
    link.setAttribute('href', href);
};

const Seo = ({
    title,
    description,
    image,
    url,
    type = 'website',
    siteName = 'Carlos Ng',
    twitterHandle
}) => {
    useEffect(() => {
        const resolvedTitle = title ? `${siteName} | ${title}` : siteName;
        const resolvedDescription = description || '';
        const resolvedUrl = url || window.location.href;
        const resolvedImage = image
            ? new URL(image, window.location.origin).toString()
            : '';

        document.title = resolvedTitle;

        ensureMetaTag('name', 'description', resolvedDescription);
        ensureMetaTag('property', 'og:title', resolvedTitle);
        ensureMetaTag('property', 'og:description', resolvedDescription);
        ensureMetaTag('property', 'og:type', type);
        ensureMetaTag('property', 'og:url', resolvedUrl);
        ensureMetaTag('property', 'og:site_name', siteName);
        ensureMetaTag('property', 'og:image', resolvedImage);

        ensureMetaTag('name', 'twitter:card', 'summary_large_image');
        ensureMetaTag('name', 'twitter:title', resolvedTitle);
        ensureMetaTag('name', 'twitter:description', resolvedDescription);
        ensureMetaTag('name', 'twitter:image', resolvedImage);
        ensureMetaTag('name', 'twitter:creator', twitterHandle);

        ensureLinkTag('canonical', resolvedUrl);
    }, [title, description, image, url, type, siteName, twitterHandle]);

    return null;
};

export default Seo;
