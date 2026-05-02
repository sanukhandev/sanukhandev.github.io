import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

const posts = [
  {
    href: "/blog/javascript-algorithms",
    title: "JavaScript Algorithms",
    description: "Patterns, complexity, and production usage of javascript algorithms.",
  },
  {
    href: "/blog/nodejs-api-best-practices",
    title: "Node.js API Best Practices",
    description: "Design, reliability, security, and observability patterns for Node.js APIs.",
  },
];

export default function BlogIndex() {
  return (
    <>
      <SeoMeta
        title="Engineering Blog | Sanu Khan"
        description="Engineering blog with deep-dive guides on javascript algorithms and nodejs api best practices for scalable software teams."
        canonicalPath="/blog"
        keywords="engineering blog, javascript algorithms, nodejs api best practices, software architecture"
      />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-[#f0f1f4]">Engineering Blog</h1>
          <p className="mt-4 max-w-3xl text-[15px] text-[#8a90a8]">
            Long-form guides focused on architecture, backend patterns, and practical engineering execution.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <article key={post.href} className="premium-card p-5">
                <h2 className="text-[20px] font-bold text-[#f0f1f4]">{post.title}</h2>
                <p className="mt-2 text-[14px] text-[#8a90a8]">{post.description}</p>
                <Link className="mt-3 inline-flex text-[14px] font-semibold text-[#38c755] hover:underline" to={post.href}>
                  Read {post.title}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="text-[14px] font-semibold text-[#38c755] hover:underline" to="/tools">
              Explore Developer Tools
            </Link>
            <Link className="text-[14px] font-semibold text-[#38c755] hover:underline" to="/full-stack-consultant-uae">
              Full Stack Consultant UAE
            </Link>
            <Link className="text-[14px] font-semibold text-[#38c755] hover:underline" to="/">
              Back to Portfolio
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
