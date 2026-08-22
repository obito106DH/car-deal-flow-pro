import { Link } from "@tanstack/react-router";
import { Car as CarIcon, CreditCard, Gauge, MapPin, ShieldCheck } from "lucide-react";
import type { Car } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";

export function CarThumb({ hue, className = "" }: { hue: number; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(140deg, oklch(0.9 0.05 ${hue}), oklch(0.75 0.09 ${hue}))`,
      }}
    >
      <CarIcon
        className="size-24 opacity-60"
        style={{ color: `oklch(0.35 0.07 ${hue})` }}
        strokeWidth={1.2}
      />
      <div
        className="absolute -bottom-10 h-20 w-[140%] rounded-[50%] opacity-30"
        style={{ background: `oklch(0.35 0.07 ${hue})` }}
      />
    </div>
  );
}

export function CarCard({ car }: { car: Car }) {
  const { t, locale, fmt } = useI18n();

  return (
    <Link
      to="/cars/$slug"
      params={{ slug: car.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative">
        <CarThumb hue={car.hue} className="h-44 w-full" />
        <div className="absolute top-3 start-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-bold text-primary-deep">
          <ShieldCheck className="size-3.5" />
          {fmt(car.score)}
        </div>
        {car.installment && (
          <div className="absolute top-3 end-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            <CreditCard className="size-3.5" />
            {t("car.installment")}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-bold leading-6">
            {car.brand[locale]} {car.model[locale]}
          </h3>
          <p className="mt-1 num text-xs text-muted-foreground">
            {fmt(car.year)} · {fmt(car.km)} km
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1">
            <MapPin className="size-3.5" /> {car.city[locale]}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1">
            <Gauge className="size-3.5" />
            {car.gearbox === "auto"
              ? locale === "fa"
                ? "اتوماتیک"
                : "Automatic"
              : locale === "fa"
                ? "دنده‌ای"
                : "Manual"}
          </span>
        </div>
        <div className="mt-auto flex items-baseline justify-between border-t border-border pt-3">
          <span className="num text-lg font-extrabold text-primary-deep">{fmt(car.price)}</span>
          <span className="text-xs text-muted-foreground">{t("car.toman")}</span>
        </div>
      </div>
    </Link>
  );
}
