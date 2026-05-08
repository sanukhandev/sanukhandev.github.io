import { Link } from "react-router-dom";
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
      <main className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            Oops! Page not found
          </p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
