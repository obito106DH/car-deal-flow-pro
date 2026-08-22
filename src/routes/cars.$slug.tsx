import { createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, Fuel, Gauge, MapPin, Palette, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { CarCard, CarThumb } from "@/components/site/CarCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { cars, inspectionSections } from "@/lib/mock-data";

export const Route = createFileRoute("/cars/$slug")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.slug === params.slug);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => {
    const car = loaderData?.car;
    return {
      meta: car
        ? [
            { title: `${car.brand.fa} ${car.model.fa} | کسری موتورز` },
            {
              name: "description",
              content: `${car.brand.fa} ${car.model.fa} مدل ${car.year} با کارکرد ${car.km} کیلومتر در ${car.city.fa}؛ امتیاز کارشناسی ${car.score}.`,
            },
            { property: "og:title", content: `${car.brand.fa} ${car.model.fa} | کسری موتورز` },
            {
              property: "og:description",
              content: `خودروی کارشناسی‌شده در ${car.city.fa} با امتیاز ${car.score} از ۱۰۰.`,
            },
            { property: "og:type", content: "product" },
            { name: "twitter:card", content: "summary_large_image" },
          ]
        : [{ title: "خودرو یافت نشد" }, { name: "robots", content: "noindex" }],
    };
  },
  component: CarDetail,
});

function CarDetail() {
  const { car } = Route.useLoaderData();
  const { t, locale, fmt } = useI18n();

  const specs = [
    { icon: CalendarDays, label: t("car.year"), value: fmt(car.year) },
    { icon: Gauge, label: t("car.km"), value: `${fmt(car.km)} km` },
    { icon: Palette, label: t("car.color"), value: car.color[locale] },
    { icon: Fuel, label: t("car.fuel"), value: car.fuel[locale] },
    { icon: MapPin, label: t("cars.city"), value: car.city[locale] },
    {
      icon: ShieldCheck,
      label: t("cars.gearbox"),
      value:
        car.gearbox === "auto"
          ? locale === "fa"
            ? "اتوماتیک"
            : "Automatic"
          : locale === "fa"
            ? "دنده‌ای"
            : "Manual",
    },
  ];

  const similar = cars
    .filter((c) => c.id !== car.id && (c.body === car.body || c.brand.en === car.brand.en))
    .slice(0, 4);

  return (
    <SiteShell>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <CarThumb hue={car.hue} className="h-72 w-full rounded-3xl md:h-96" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <CarThumb key={i} hue={car.hue + i * 8} className="h-20 rounded-xl" />
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-black">{t("car.specs")}</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
                >
                  <s.icon className="size-5 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-foreground">{s.label}</dt>
                    <dd className="num text-sm font-bold">{s.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">{t("car.report")}</h2>
            <div className="mt-4 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
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
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h1 className="text-2xl font-black leading-8">
              {car.brand[locale]} {car.model[locale]}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="gap-1">
                <ShieldCheck className="size-3.5" /> {fmt(car.score)}/{fmt(100)}
              </Badge>
              {car.installment && <Badge variant="secondary">{t("car.installment")}</Badge>}
              {car.highlights.map((h) => (
                <Badge key={h.en} variant="outline">
                  {h[locale]}
                </Badge>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs text-muted-foreground">{t("col.price")}</p>
              <p className="num mt-1 text-3xl font-black text-primary-deep">{fmt(car.price)}</p>
              <p className="text-xs text-muted-foreground">{t("car.toman")}</p>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full" size="lg" onClick={() => toast.success(t("car.leadSent"))}>
                {t("car.contact")}
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                size="lg"
                onClick={() => toast.success(t("car.leadSent"))}
              >
                <Phone className="size-4" />
                {t("car.callback")}
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <h2 className="text-xl font-black">{t("car.similar")}</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
