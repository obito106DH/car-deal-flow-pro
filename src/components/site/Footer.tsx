import { Link } from "@tanstack/react-router";
import { CarFront, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, locale } = useI18n();

  const groups = [
    {
      title: t("footer.company"),
      items: [
        { label: t("footer.about"), to: "/" },
        { label: t("footer.contact"), to: "/services" },
        { label: t("nav.inspection"), to: "/inspection" },
      ],
    },
    {
      title: t("footer.services"),
      items: [
        { label: t("nav.buy"), to: "/cars" },
        { label: t("nav.sell"), to: "/sell" },
        { label: t("nav.financing"), to: "/financing" },
        { label: t("nav.transfers"), to: "/transfers" },
      ],
    },
    {
      title: t("footer.support"),
      items: [
        { label: t("nav.services"), to: "/services" },
        { label: t("nav.parts"), to: "/parts" },
        { label: t("footer.faq"), to: "/services" },
      ],
    },
  ];

  return (
    <footer className="mt-20 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="surface-teal flex size-9 items-center justify-center rounded-xl text-primary-foreground">
              <CarFront className="size-5" />
            </span>
            <span className="text-lg font-extrabold">{t("brand.name")}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-ink-foreground/70">
            {t("brand.tagline")}
          </p>
          <div className="mt-5 space-y-2 text-xs text-ink-foreground/70">
            <a
              href="tel:+982145000045"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="size-4" /> <span className="num">۰۲۱-۴۵۰۰۰۰۴۵</span>
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="size-4" /> {t("brand.name")}،{" "}
              {locale === "fa" ? "تهران" : "Tehran"}
            </p>
          </div>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-bold">{g.title}</h3>
            <ul className="mt-4 space-y-3">
              {g.items.map((i) => (
                <li key={i.label}>
                  <Link
                    to={i.to}
                    className="text-sm text-ink-foreground/70 transition-colors hover:text-primary"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-foreground/10 py-5 text-center text-xs text-ink-foreground/60">
        © {t("brand.name")} — {t("footer.rights")}
      </div>
    </footer>
  );
}
