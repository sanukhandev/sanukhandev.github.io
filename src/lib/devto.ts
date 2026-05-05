export type DevToArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  coverImage: string | null;
  publishedAt: string;
  tags: string[];
  slug: string;
  localPath: string;
  body_html?: string;
};

type DevToApiArticle = {
  id: number;
  title: string;
  description?: string;
  url: string;
  cover_image?: string | null;
  published_at?: string;
  tag_list?: string[] | string;
  slug: string;
  body_html?: string;
};

export const DEVTO_USERNAME = "sanukhandev";

const toTags = (tagList: DevToApiArticle["tag_list"]): string[] => {
  if (Array.isArray(tagList)) {
    return tagList.filter(Boolean);
  }

  if (typeof tagList === "string") {
    return tagList
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

const mapArticle = (article: DevToApiArticle): DevToArticle => ({
  id: article.id,
  title: article.title,
  description:
    article.description || "Read this engineering article on Dev.to.",
  url: article.url,
  coverImage: article.cover_image || null,
  publishedAt: article.published_at || "",
  tags: toTags(article.tag_list),
  slug: article.slug,
  localPath: `/blog/${article.slug}`,
  body_html: article.body_html || undefined,
});

export const fetchDevToArticles = async (
  perPage = 12,
): Promise<DevToArticle[]> => {
  const safePerPage = Math.max(1, Math.min(30, perPage));
  const response = await fetch(
    `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=${safePerPage}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Dev.to articles (${response.status})`);
  }

  const json = (await response.json()) as DevToApiArticle[];
  return json.map(mapArticle);
};

export const fetchDevToArticleBySlug = async (
  slug: string,
): Promise<DevToArticle | null> => {
  if (!slug) return null;

  const response = await fetch(
    `https://dev.to/api/articles/${DEVTO_USERNAME}/${slug}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch Dev.to article (${response.status})`);
  }

  const json = (await response.json()) as DevToApiArticle;
  return mapArticle(json);
};
