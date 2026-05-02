import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SeoMeta from "@/components/SeoMeta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SeoMeta
        title="Page Not Found | Sanu Khan"
        description="The requested page could not be found. Explore Sanu Khan portfolio, services, developer tools, and technical blog content."
        canonicalPath="/404"
        keywords="404, page not found, sanu khan portfolio"
        noindex
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
