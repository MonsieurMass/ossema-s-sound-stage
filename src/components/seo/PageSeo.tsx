import { useEffect } from "react";

type PageSeoProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

const ensureMeta = (selector: string, key: "name" | "property", value: string) => {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(key, value);
    document.head.appendChild(node);
  }
  return node;
};

const ensureLink = (rel: string) => {
  let node = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  return node;
};

const resolveAssetUrl = (value?: string) => {
  if (!value) return undefined;
  if (/^https?:\/\//.test(value)) return value;
  if (typeof window === "undefined") return value;
  return new URL(value, window.location.origin).toString();
};

const PageSeo = ({
  title,
  description,
  image,
  url,
  type = "website",
  noIndex = false,
}: PageSeoProps) => {
  useEffect(() => {
    document.title = title;

    ensureMeta('meta[name="description"]', "name", "description").setAttribute("content", description);
    ensureMeta('meta[property="og:title"]', "property", "og:title").setAttribute("content", title);
    ensureMeta('meta[property="og:description"]', "property", "og:description").setAttribute("content", description);
    ensureMeta('meta[property="og:type"]', "property", "og:type").setAttribute("content", type);
    ensureMeta('meta[name="twitter:title"]', "name", "twitter:title").setAttribute("content", title);
    ensureMeta('meta[name="twitter:description"]', "name", "twitter:description").setAttribute("content", description);
    ensureMeta('meta[name="twitter:card"]', "name", "twitter:card").setAttribute("content", "summary_large_image");
    ensureMeta('meta[name="robots"]', "name", "robots").setAttribute(
      "content",
      noIndex ? "noindex, nofollow" : "index, follow"
    );

    const resolvedImage = resolveAssetUrl(image);
    if (resolvedImage) {
      ensureMeta('meta[property="og:image"]', "property", "og:image").setAttribute("content", resolvedImage);
      ensureMeta('meta[name="twitter:image"]', "name", "twitter:image").setAttribute("content", resolvedImage);
    }

    const resolvedUrl = resolveAssetUrl(url);
    if (resolvedUrl) {
      ensureMeta('meta[property="og:url"]', "property", "og:url").setAttribute("content", resolvedUrl);
      ensureLink("canonical").setAttribute("href", resolvedUrl);
    }
  }, [description, image, noIndex, title, type, url]);

  return null;
};

export default PageSeo;
