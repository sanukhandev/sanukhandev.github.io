import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";

const NotFound = () => {
  return (
    <>
      <SeoMeta
        title="Page Not Found | Sanu Khan"
        description="The requested page could not be found. Explore Sanu Khan portfolio, services, developer tools, and technical blog content."
        canonicalPath="/404"
        keywords="404, page not found, sanu khan portfolio"
        noindex
      />
      <Navbar />
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-background px-4 pt-28 pb-16 text-center text-foreground">
        <div className="max-w-md">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Error 404</span>
          <h1 className="mt-3 text-6xl font-black tracking-tight text-foreground sm:text-7xl">
            Not Found
          </h1>
          <p className="mt-4 text-base text-foreground/70">
            The page you are looking for doesn&apos;t exist or has been relocated.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-95"
            >
              Return to Home
            </Link>
            <Link
              to="/blog"
              className="inline-flex rounded-md border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-foreground/40"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
