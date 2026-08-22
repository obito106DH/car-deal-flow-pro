import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { inspectionSections } from "@/lib/mock-data";

export const Route = createFileRoute("/inspection")({
  head: () => ({
    meta: [
      { title: "کارشناسی ۱۶۷ نقطه‌ای خودرو | کسری موتورز" },
      {
        name: "description",
        content:
          "فرایند کارشناسی ۱۶۷ نقطه‌ای خودرو، بخش‌های بررسی‌شده، مدارک لازم و پرسش‌های متداول.",
      },
      { property: "og:title", content: "کارشناسی ۱۶۷ نقطه‌ای خودرو | کسری موتورز" },
      { property: "og:description", content: "گزارش فنی و بدنه با عکس و امتیاز هر بخش." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InspectionPage,
});

function InspectionPage() {
  const { t, locale, fmt } = useI18n();

  const faqs =
    locale === "fa"
      ? [
          {
            q: "کارشناسی چقدر زمان می‌برد؟",
            a: "به‌طور میانگین ۴۵ دقیقه در مراکز کارشناسی و ۶۰ دقیقه در محل شما.",
          },
          {
            q: "هزینه کارشناسی چقدر است؟",
            a: "برای فروشندگانی که خودرو را در کسری موتورز عرضه می‌کنند رایگان است.",
          },
          {
            q: "چه مدارکی لازم است؟",
            a: "کارت خودرو، سند مالکیت، کارت ملی مالک و بیمه‌نامه معتبر.",
          },
          {
            q: "گزارش کارشناسی چه چیزی را پوشش می‌دهد؟",
            a: "موتور و انتقال قدرت، بدنه و رنگ، تعلیق و ترمز، برق، کابین و لاستیک.",
          },
        ]
      : [
          {
            q: "How long does an inspection take?",
            a: "About 45 minutes at our centers, 60 minutes at your location.",
          },
          {
            q: "How much does it cost?",
            a: "It is free for sellers who list their car with Kasra Motors.",
          },
          {
            q: "Which documents do I need?",
            a: "Vehicle card, ownership title, owner's national ID and valid insurance.",
          },
          {
            q: "What does the report cover?",
            a: "Powertrain, body & paint, suspension & brakes, electrics, interior and tyres.",
          },
        ];

  return (
    <SiteShell>
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1.5 text-xs font-bold text-primary-deep">
            <ClipboardCheck className="size-4" />
            {t("svc.inspection")}
          </span>
          <h1 className="mt-4 text-2xl font-black md:text-4xl">{t("nav.inspection")}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-muted-foreground">
            {t("svc.inspection.d")}
          </p>
          <Button asChild className="mt-6">
            <Link to="/sell">{t("sell.submit")}</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-xl font-black">
            {locale === "fa" ? "بخش‌های کارشناسی" : "Inspected sections"}
          </h2>
          <div className="mt-5 space-y-4">
            {inspectionSections.map((s) => (
              <div key={s.en}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{s[locale]}</span>
                  <span className="num text-muted-foreground">
                    {fmt(s.score)}/{fmt(100)}
                  </span>
                </div>
                <Progress value={s.score} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black">
            {locale === "fa" ? "چه چیزی دریافت می‌کنید" : "What you get"}
          </h2>
          <ul className="mt-5 space-y-3">
            {(locale === "fa"
              ? [
                  "گزارش PDF با عکس هر نقطه بازرسی",
                  "امتیاز کلی از ۱۰۰ و امتیاز هر بخش",
                  "قیمت‌گذاری کارشناسی بر پایه داده بازار",
                  "پیشنهاد تعمیرات پیش از فروش",
                  "اعتبار گزارش تا ۳۰ روز",
                ]
              : [
                  "PDF report with a photo for every checkpoint",
                  "Overall score out of 100 plus per-section scores",
                  "Expert pricing based on market data",
                  "Pre-sale repair recommendations",
                  "Report valid for 30 days",
                ]
            ).map((i) => (
              <li key={i} className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {i}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-black">{t("footer.faq")}</h2>
          <Accordion type="single" collapsible className="mt-3">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-start text-sm font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </SiteShell>
  );
}
