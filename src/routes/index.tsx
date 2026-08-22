import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CarFront,
  ClipboardCheck,
  CreditCard,
  FileSignature,
  Gauge,
  PackageSearch,
  Repeat2,
  Search,
  ShieldPlus,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { CarCard } from "@/components/site/CarCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { bi, brands, cars } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "کسری موتورز | خرید، فروش و خدمات جامع خودرو" },
      {
        name: "description",
        content:
          "خرید و فروش خودروی کارشناسی‌شده با قیمت منصفانه، ضمانت بازگشت و انتقال سند؛ همراه پنل مدیریت نمایشگاه.",
      },
      { property: "og:title", content: "کسری موتورز | خرید، فروش و خدمات جامع خودرو" },
      {
        property: "og:description",
        content: "کارشناسی ۱۶۷ نقطه، قیمت‌گذاری کارشناسی و پنل مدیریت کامل نمایشگاه خودرو.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, locale, fmt } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const featured = cars.filter((c) => c.status === "published").slice(0, 8);

  const stats = [
    { value: 1_240, label: t("stat.cars") },
    { value: 167, label: t("stat.points") },
    { value: 24, label: t("stat.cities") },
    { value: 380, label: t("stat.dealers") },
  ];

  const steps = [
    { icon: Search, t: t("how.1.t"), d: t("how.1.d") },
    { icon: CarFront, t: t("how.2.t"), d: t("how.2.d") },
    { icon: Banknote, t: t("how.3.t"), d: t("how.3.d") },
    { icon: FileSignature, t: t("how.4.t"), d: t("how.4.d") },
  ];

  const services = [
    { icon: CreditCard, t: t("svc.finance"), d: t("svc.finance.d"), to: "/financing" },
    { icon: Repeat2, t: t("svc.transfers"), d: t("svc.transfers.d"), to: "/transfers" },
    { icon: ShieldPlus, t: t("svc.insurance"), d: t("svc.insurance.d"), to: "/services" },
    { icon: PackageSearch, t: t("svc.parts"), d: t("svc.parts.d"), to: "/parts" },
    { icon: ClipboardCheck, t: t("svc.inspection"), d: t("svc.inspection.d"), to: "/inspection" },
    { icon: Gauge, t: t("svc.pricing"), d: t("svc.pricing.d"), to: "/sell" },
  ] as const;

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-ink">
        <img
          src="/kasra-hero.svg"
          alt={locale === "fa" ? "خودرو سفید در نمایشگاه" : "White sedan in a showroom"}
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover opacity-80"
        />
        <div className="hero-veil absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-bold text-primary">
              <BadgeCheck className="size-4" />
              {t("brand.tagline")}
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight text-ink-foreground md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-8 text-ink-foreground/75 md:text-base">
              {t("hero.sub")}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/cars", search: { q: q || undefined } });
              }}
              className="mt-8 flex flex-col gap-3 rounded-2xl bg-card p-3 shadow-lift sm:flex-row"
            >
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("hero.search")}
                className="h-12 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
              />
              <Button type="submit" size="lg" className="h-12 gap-2 px-6">
                <Search className="size-4" />
                {t("hero.cta")}
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="link" className="px-0 text-primary">
                <Link to="/sell">{t("hero.sellCta")} →</Link>
              </Button>
              <Button asChild variant="link" className="text-ink-foreground/80">
                <Link to="/financing">{t("nav.financing")} ←</Link>
              </Button>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-4 md:max-w-3xl md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-4 backdrop-blur"
              >
                <dt className="num text-2xl font-black text-primary">{fmt(s.value)}</dt>
                <dd className="mt-1 text-xs text-ink-foreground/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">{t("section.featured")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("section.featured.sub")}</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/cars">{t("nav.buy")}</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-2xl font-black md:text-3xl">{t("section.how")}</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="surface-teal flex size-10 items-center justify-center rounded-xl text-primary-foreground">
                    <s.icon className="size-5" />
                  </span>
                  <span className="num text-2xl font-black text-border">{fmt(i + 1)}</span>
                </div>
                <h3 className="mt-4 font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h2 className="text-2xl font-black md:text-3xl">{t("section.services")}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.t}
              to={s.to}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
              <span className="mt-4 inline-block text-xs font-bold text-primary">
                {locale === "fa" ? "مشاهده و ثبت درخواست ←" : "Explore and apply →"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6">
        <h2 className="text-2xl font-black md:text-3xl">{t("section.brands")}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {brands.map((b) => (
            <Link
              key={b}
              to="/cars"
              search={{ brand: bi(b, "en") }}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-card transition-colors hover:border-primary hover:text-primary"
            >
              {bi(b, locale)}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="surface-teal flex flex-col items-start gap-5 rounded-3xl p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">{t("hero.sellCta")}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 opacity-90">{t("sell.sub")}</p>
          </div>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link to="/sell">
              <Wrench className="size-4" />
              {t("sell.submit")}
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
