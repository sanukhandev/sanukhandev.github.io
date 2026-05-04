import { Link } from "react-router-dom";

const blogs = [
  {
    title: "JavaScript Algorithms for Practical Engineering",
    href: "/blog/javascript-algorithms",
    description: "Patterns and complexity-first thinking for production-grade algorithm design.",
  },
  {
    title: "Node.js API Best Practices for Scalable Teams",
    href: "/blog/nodejs-api-best-practices",
    description: "A blueprint for secure, testable, and observable API architecture in Node.js.",
  },
];

export default function BlogPreview() {
  return (
    <section className="section-pad" id="blog">
      <div className="container-narrow">
        <h2 className="text-[28px] font-bold leading-tight tracking-tight text-primary">Blog</h2>
        <p className="mt-3 max-w-3xl text-[15px] text-secondary">
          Technical writing focused on architecture, algorithms, and platform engineering.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {blogs.map((post) => (
            <article key={post.href} className="premium-card p-5">
              <h3 className="text-[18px] font-semibold text-primary">{post.title}</h3>
              <p className="mt-2 text-[14px] text-secondary">{post.description}</p>
              <Link className="mt-4 inline-flex text-[14px] font-semibold text-accent hover:underline" to={post.href}>
                Read {post.title}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
