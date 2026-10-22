import { describe, expect, it } from "vitest";
import {
  generateKnowledgeScope,
  getSmartContentResponse,
  tokenize,
} from "@/lib/zaakiy-knowledge";
import { getContent } from "@/lib/i18n";

describe("zaakiy-knowledge", () => {
  it("tokenizes English and Arabic text properly", () => {
    const enTokens = tokenize("High-throughput Apache Kafka event streaming!");
    expect(enTokens).toContain("throughput");
    expect(enTokens).toContain("kafka");

    const arTokens = tokenize("منصة تجارة التجزئة وحلول الطيران");
    expect(arTokens).toContain("منصة");
    expect(arTokens).toContain("تجارة");
    expect(arTokens).toContain("الطيران");
  });

  it("generates comprehensive knowledge scope directly from content JSON", () => {
    const enScope = generateKnowledgeScope("en");
    expect(enScope).toContain("Sanu Khan");
    expect(enScope).toContain("Dubai, UAE");
    expect(enScope).toContain("Enterprise Retail Integration");
    expect(enScope).toContain("Airline Retailing & Aggregation");
    expect(enScope).toContain("Zaakiy V3RSE");
    expect(enScope).toContain("hello@sanukhan.dev");

    const arScope = generateKnowledgeScope("ar");
    expect(arScope).toContain("دبي، الإمارات");
    expect(arScope).toContain("hello@sanukhan.dev");
  });

  it("answers greetings politely in English and Arabic", () => {
    const enReply = getSmartContentResponse("Hello there", "en");
    expect(enReply).toMatch(/Zaakiy/i);
    expect(enReply).toMatch(/Sanu Khan/i);

    const arReply = getSmartContentResponse("مرحبا كيف حالك", "ar");
    expect(arReply).toMatch(/Zaakiy/i);
    expect(arReply).toMatch(/سانو خان/i);
  });

  it("matches FAQ questions with ground truth answers from content JSON", () => {
    const enFaq = getContent("en").faq.items[0];
    const enReply = getSmartContentResponse("What kind of technology challenges do you help solve?", "en");
    expect(enReply).toContain(enFaq.a);

    const arFaq = getContent("ar").faq.items[0];
    const arReply = getSmartContentResponse("ما نوع التحديات التقنية التي تساعد في حلها؟", "ar");
    expect(arReply).toContain(arFaq.a);
  });

  it("answers project queries with real projects from content JSON", () => {
    const enProjects = getContent("en").projects;
    const enReply = getSmartContentResponse("What production systems or projects has Sanu built?", "en");
    expect(enReply).toContain(enProjects.items[0].title);
    expect(enReply).toContain(enProjects.items[1].title);
    expect(enReply).toMatch(/kafka/i);

    const arProjects = getContent("ar").projects;
    const arReply = getSmartContentResponse("ما هي المشاريع والأنظمة التي بناها سانو؟", "ar");
    expect(arReply).toContain(arProjects.items[0].title);
  });

  it("answers methodology and architecture approach queries using process steps from content JSON", () => {
    const enProcess = getContent("en").process;
    const enReply = getSmartContentResponse("How does Sanu approach system design and architecture?", "en");
    expect(enReply).toContain(enProcess.steps[0].title);
    expect(enReply).toContain(enProcess.steps[1].title);
    expect(enReply).toContain(enProcess.steps[2].title);
    expect(enReply).toContain(enProcess.steps[3].title);

    const arProcess = getContent("ar").process;
    const arReply = getSmartContentResponse("ما هي منهجية سانو في تصميم الأنظمة والمعمارية؟", "ar");
    expect(arReply).toContain(arProcess.steps[0].title);
  });

  it("answers tech stack questions with capabilities from content JSON", () => {
    const enReply = getSmartContentResponse("What is your core tech stack and tools?", "en");
    expect(enReply).toContain("Node.js");
    expect(enReply).toContain("TypeScript");
    expect(enReply).toContain("Azure Cloud");
    expect(enReply).toContain("Kafka");

    const arReply = getSmartContentResponse("ما هي الحزمة التقنية والمهارات؟", "ar");
    expect(arReply).toContain("Node.js");
    expect(arReply).toContain("Kafka");
  });

  it("answers metrics and scale queries from content JSON", () => {
    const enReply = getSmartContentResponse("Tell me about verified metrics, uptime, and scale", "en");
    expect(enReply).toContain("13+");
    expect(enReply).toContain("100+");
    expect(enReply).toContain("9");
    expect(enReply).toContain("99.9%");
  });

  it("answers Zaakiy V3RSE R&D queries from content JSON", () => {
    const enZaakiy = getContent("en").zaakiy;
    const enReply = getSmartContentResponse("What is Zaakiy V3RSE AI agent project?", "en");
    expect(enReply).toContain("Zaakiy V3RSE");
    expect(enReply).toContain(enZaakiy.chips[0]);
    expect(enReply).toContain(enZaakiy.chips[1]);
  });

  it("answers contact and hire queries with verified email", () => {
    const enReply = getSmartContentResponse("How can I hire or contact Sanu Khan?", "en");
    expect(enReply).toContain("hello@sanukhan.dev");
    expect(enReply).toContain("Dubai, UAE");

    const arReply = getSmartContentResponse("كيف يمكنني التواصل مع سانو أو توظيفه؟", "ar");
    expect(arReply).toContain("hello@sanukhan.dev");
    expect(arReply).toContain("دبي، الإمارات");
  });
});
