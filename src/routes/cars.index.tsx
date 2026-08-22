import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { CarCard } from "@/components/site/CarCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { bi, brands, cars } from "@/lib/mock-data";

const searchSchema = z.object({
  q: z.string().optional(),
  brand: z.string().optional(),
});

export const Route = createFileRoute("/cars/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "خرید خودرو کارشناسی‌شده | کسری موتورز" },
      {
        name: "description",
        content: "جست‌وجو در خودروهای کارشناسی‌شده با فیلتر برند، شهر، گیربکس، بدنه و بازه قیمت.",
      },
      { property: "og:title", content: "خرید خودرو کارشناسی‌شده | کسری موتورز" },
      {
        property: "og:description",
        content: "فیلتر دقیق روی خودروهای کارشناسی‌شده و قیمت‌گذاری‌شده.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarsPage,
});

const ALL = "all";
const MAX_PRICE = 5_000_000_000;

function CarsPage() {
  const { t, locale, fmt } = useI18n();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [q, setQ] = useState(search.q ?? "");
  const [brand, setBrand] = useState(search.brand ?? ALL);
  const [city, setCity] = useState(ALL);
  const [body, setBody] = useState(ALL);
  const [gearbox, setGearbox] = useState(ALL);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState("new");

  const cities = useMemo(
    () => Array.from(new Set(cars.map((c) => `${c.city.fa}|${c.city.en}`))),
    [],
  );

  const bodyLabels: Record<string, { fa: string; en: string }> = {
    sedan: { fa: "سدان", en: "Sedan" },
    suv: { fa: "شاسی‌بلند", en: "SUV" },
    hatchback: { fa: "هاچبک", en: "Hatchback" },
    pickup: { fa: "وانت", en: "Pickup" },
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = cars.filter((c) => c.status === "published" || c.status === "reserved");
    if (term)
      list = list.filter((c) =>
        [c.brand.fa, c.brand.en, c.model.fa, c.model.en, c.city.fa, c.city.en]
          .join(" ")
          .toLowerCase()
          .includes(term),
      );
    if (brand !== ALL) list = list.filter((c) => c.brand.en === brand);
    if (city !== ALL) list = list.filter((c) => c.city.en === city);
    if (body !== ALL) list = list.filter((c) => c.body === body);
    if (gearbox !== ALL) list = list.filter((c) => c.gearbox === gearbox);
    list = list.filter((c) => c.price <= maxPrice);

    const sorted = [...list];
    if (sort === "cheap") sorted.sort((a, b) => a.price - b.price);
    if (sort === "expensive") sorted.sort((a, b) => b.price - a.price);
    if (sort === "km") sorted.sort((a, b) => a.km - b.km);
    if (sort === "new") sorted.sort((a, b) => a.daysInStock - b.daysInStock);
    return sorted;
  }, [q, brand, city, body, gearbox, maxPrice, sort]);

  const reset = () => {
    setQ("");
    setBrand(ALL);
    setCity(ALL);
    setBody(ALL);
    setGearbox(ALL);
    setMaxPrice(MAX_PRICE);
    navigate({ to: "/cars", search: {} });
  };

  return (
    <SiteShell>
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <h1 className="text-2xl font-black md:text-3xl">{t("cars.title")}</h1>
          <p className="num mt-2 text-sm text-muted-foreground">
            {fmt(results.length)} {t("cars.count")}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:px-6 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 font-bold">
            <SlidersHorizontal className="size-4 text-primary" />
            {t("cars.filters")}
          </div>

          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label>{t("action.search")}</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute top-2.5 start-3 size-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="ps-9"
                  placeholder={t("hero.search")}
                />
              </div>
            </div>

            <FilterSelect
              label={t("cars.brand")}
              value={brand}
              onChange={setBrand}
              all={t("cars.all")}
              options={brands.map((b) => ({ value: bi(b, "en"), label: bi(b, locale) }))}
            />
            <FilterSelect
              label={t("cars.city")}
              value={city}
              onChange={setCity}
              all={t("cars.all")}
              options={cities.map((c) => ({ value: bi(c, "en"), label: bi(c, locale) }))}
            />
            <FilterSelect
              label={t("cars.body")}
              value={body}
              onChange={setBody}
              all={t("cars.all")}
              options={Object.entries(bodyLabels).map(([value, l]) => ({
                value,
                label: l[locale],
              }))}
            />
            <FilterSelect
              label={t("cars.gearbox")}
              value={gearbox}
              onChange={setGearbox}
              all={t("cars.all")}
              options={[
                { value: "auto", label: locale === "fa" ? "اتوماتیک" : "Automatic" },
                { value: "manual", label: locale === "fa" ? "دنده‌ای" : "Manual" },
              ]}
            />

            <div className="space-y-3">
              <Label>{t("cars.price")}</Label>
              <Slider
                value={[maxPrice]}
                min={300_000_000}
                max={MAX_PRICE}
                step={50_000_000}
                onValueChange={(values) => {
                  const value = values[0];
                  if (value !== undefined) setMaxPrice(value);
                }}
              />
              <p className="num text-xs text-muted-foreground">
                ≤ {fmt(maxPrice)} {t("car.toman")}
              </p>
            </div>

            <Button variant="outline" className="w-full" onClick={reset}>
              {t("cars.reset")}
            </Button>
          </div>
        </aside>

        <div>
          <div className="flex justify-end">
            <div className="w-56">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue placeholder={t("cars.sort")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">{t("cars.sort.new")}</SelectItem>
                  <SelectItem value="cheap">{t("cars.sort.cheap")}</SelectItem>
                  <SelectItem value="expensive">{t("cars.sort.expensive")}</SelectItem>
                  <SelectItem value="km">{t("cars.sort.km")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted-foreground">{t("cars.empty")}</p>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  all,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  all: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{all}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
