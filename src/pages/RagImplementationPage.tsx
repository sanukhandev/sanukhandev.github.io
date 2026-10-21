import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema, buildTechArticleSchema } from "@/lib/schema";
import { ArrowLeft, ArrowUpRight, Database, FileText, GitBranch, LockKeyhole, Workflow } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

const stages = [
  { number: "01", title: "Knowledge ingestion", description: "Import documents and web sources, extract readable content, split it into retrievable chunks, and retain source metadata.", icon: FileText },
  { number: "02", title: "Vector retrieval", description: "Generate embeddings and search pgvector for relevant, tenant-scoped context before constructing an answer.", icon: Database },
  { number: "03", title: "Intent orchestration", description: "Route detected intents to approved n8n workflows while keeping application APIs and workflow actions separate.", icon: Workflow },
  { number: "04", title: "Governance and isolation", description: "Apply tenant boundaries, source authorization, scoped API access, and traceable operations across the pipeline.", icon: LockKeyhole },
];
const stack = ["React / Next.js", "Angular", "Node.js", "TypeScript", "Python", "PostgreSQL", "pgvector", "n8n", "Docker", "Azure AI Foundry"];
export default function RagImplementationPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <>
      <SeoMeta
        title="Agentic RAG Implementation — Multi-Tenant AI Architecture | Sanu Khan"
        description="A technical case study of a multi-tenant retrieval-augmented generation platform with document ingestion, pgvector retrieval, n8n orchestration and tenant-scoped AI."
        canonicalPath="/projects/agentic-rag-implementation"
        keywords={["Agentic RAG", "RAG implementation", "multi-tenant AI", "pgvector", "n8n", "AI architecture", "Sanu Khan"]}
        schema={[
          buildBreadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: "Agentic RAG Implementation", path: "/projects/agentic-rag-implementation" }]),
          buildTechArticleSchema({ title: "Agentic RAG Implementation", description: "Architecture and implementation approach for a tenant-isolated retrieval-augmented generation platform.", path: "/projects/agentic-rag-implementation" }),
        ]}
      />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-28 pb-20">
        <article className="container-narrow max-w-5xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-primary hover:underline"><ArrowLeft size={16} /> {ar ? "العودة إلى المشاريع" : "Back to projects"}</Link>
          <header className="mt-12 border-b border-border pb-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Selected engineering / AI systems</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">Agentic RAG.<br/><span className="text-accent">Knowledge into action.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-secondary">A multi-tenant AI platform designed to turn approved enterprise knowledge into grounded conversations and orchestrated business workflows.</p>
            <div className="mt-8 flex flex-wrap gap-2">{["Retrieval-augmented generation", "Multi-tenancy", "Workflow automation"].map(item => <span key={item} className="rounded-full border border-border px-3 py-1 text-xs text-primary">{item}</span>)}</div>
          </header>
          <section className="grid gap-8 border-b border-border py-14 md:grid-cols-[1fr_2fr]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent">01 / The challenge</h2>
            <div><h3 className="text-2xl font-semibold text-primary">Useful answers require trusted context.</h3><p className="mt-4 leading-8 text-secondary">Generic chat models cannot reliably answer organization-specific questions without access to approved source material. The platform separates knowledge ingestion, retrieval, response generation and workflow execution so that each layer can be governed independently.</p></div>
          </section>
          <section className="border-b border-border py-14">
            <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-semibold text-primary">02 / System architecture</h2><span className="font-mono text-xs text-secondary">Conceptual flow · not a live system diagram</span></div>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-secondary/10 p-6 sm:p-10">
              <div className="grid min-w-[480px] gap-3 text-center font-mono text-xs sm:text-sm">
                <div className="rounded-lg border border-border bg-background p-4 text-primary">Web chat / tenant application / admin console</div>
                <div className="text-accent">↓ Tenant identity + API authorization</div>
                <div className="rounded-lg border border-border bg-background p-4 text-primary">Node.js API · sessions · intent routing · access controls</div>
                <div className="grid grid-cols-2 gap-3"><div className="rounded-lg border border-border bg-background p-4 text-primary">Python ingestion → embeddings → PostgreSQL / pgvector</div><div className="rounded-lg border border-border bg-background p-4 text-primary">n8n workflows → approved business actions</div></div>
                <div className="text-accent">↓ Retrieved, authorized context</div>
                <div className="rounded-lg border border-border bg-background p-4 text-primary">Azure AI Foundry model → grounded response</div>
              </div>
            </div>
          </section>
          <section className="py-14 border-b border-border">
            <h2 className="text-2xl font-semibold text-primary">03 / Implementation layers</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">{stages.map(stage => <div key={stage.number} className="rounded-xl border border-border p-6"><div className="flex items-center justify-between"><span className="font-mono text-xs text-accent">{stage.number}</span><stage.icon className="h-5 w-5 text-primary" aria-hidden="true" /></div><h3 className="mt-8 text-xl font-semibold text-primary">{stage.title}</h3><p className="mt-3 text-sm leading-7 text-secondary">{stage.description}</p></div>)}</div>
          </section>
          <section className="grid gap-8 border-b border-border py-14 md:grid-cols-[1fr_2fr]"><h2 className="font-mono text-xs uppercase tracking-widest text-accent">04 / Design decisions</h2><div className="space-y-6 text-secondary leading-8"><p><strong className="text-primary">Tenant-scoped retrieval.</strong> Knowledge search and tool access must be restricted by the active tenant and source permissions, not merely by instructions to the model.</p><p><strong className="text-primary">Grounding before generation.</strong> Relevant document chunks are supplied with provenance so the assistant can distinguish sourced facts from unsupported claims.</p><p><strong className="text-primary">Workflows as explicit capabilities.</strong> n8n is invoked for configured intents; it does not receive unrestricted access to the underlying data store.</p><p><strong className="text-primary">Graceful failure.</strong> Missing sources, empty retrieval results and unavailable downstream workflows must yield clear errors or safe fallbacks rather than fabricated answers.</p></div></section>
          <section className="py-14 border-b border-border"><h2 className="text-2xl font-semibold text-primary">05 / Technology stack</h2><div className="mt-6 flex flex-wrap gap-2">{stack.map(s => <span key={s} className="border border-border rounded-md px-3 py-2 text-sm text-primary">{s}</span>)}</div><p className="mt-6 text-sm leading-7 text-secondary">Implementation scope includes a web chat interface, administration workspace, API service, document processing pipeline and workflow integrations. This case study describes architecture and active engineering work; it does not claim production certification or unverified performance metrics.</p></section>
          <footer className="flex flex-wrap items-center justify-between gap-4 pt-10"><Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><GitBranch size={16}/> Explore other projects</Link><Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">Discuss an AI integration <ArrowUpRight size={16}/></Link></footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
