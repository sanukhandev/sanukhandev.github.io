type MediaPlaceholderProps = {
  kind?: "portrait" | "project" | "article";
  index?: string;
  className?: string;
};

/**
 * Temporary editorial media slot. No synthetic screenshots or likenesses.
 * Keep existing assets in public/ for restoration once approved.
 */
export function MediaPlaceholder({
  kind = "project",
  index = "01",
  className = "",
}: MediaPlaceholderProps) {
  const portrait = kind === "portrait";
  const descriptiveLabel =
    portrait ? "Portrait image placeholder" :
    kind === "article" ? "Article cover image placeholder" :
    "Project image placeholder";

  return (
    <div
      className={`editorial-placeholder editorial-placeholder--${kind} ${className}`}
      role="img"
      aria-label={descriptiveLabel}
    >
      <span className="editorial-placeholder__index" aria-hidden="true">
        {portrait ? "PORTRAIT / 001" : `FRAME / ${index}`}
      </span>
      <span className="editorial-placeholder__corners" aria-hidden="true" />
      <span className="editorial-placeholder__glyph" aria-hidden="true">
        {portrait ? "SK" : index}
      </span>
      <span className="editorial-placeholder__label" aria-hidden="true">
        {descriptiveLabel}
      </span>
    </div>
  );
}
