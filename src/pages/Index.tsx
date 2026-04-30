import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Works from "@/components/sections/Works";
import Articles from "@/components/sections/Articles";
import Certifications from "@/components/sections/Certifications";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <TechStack />
        <Services />
        <Works />
        <Articles />
        <Certifications />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
