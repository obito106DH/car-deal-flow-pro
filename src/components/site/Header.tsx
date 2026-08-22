import { Link } from "@tanstack/react-router";
import { CarFront, ChevronDown, Globe, Menu, Phone } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  const primaryLinks = [
    { to: "/cars", label: t("nav.buy") },
    { to: "/sell", label: t("nav.sell") },
    { to: "/transfers", label: t("nav.transfers") },
    { to: "/financing", label: t("nav.financing") },
  ] as const;

  const serviceLinks = [
    { to: "/services", label: t("nav.services") },
    { to: "/parts", label: t("nav.parts") },
    { to: "/inspection", label: t("nav.inspection") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="surface-teal relative flex size-10 items-center justify-center rounded-xl text-primary-foreground shadow-card">
            <CarFront className="size-5" />
            <span className="absolute -end-0.5 -top-0.5 size-2.5 rounded-full border-2 border-background bg-warning" />
          </span>
          <span className="leading-none">
            <span className="block text-lg font-black tracking-tight">{t("brand.name")}</span>
            <span className="mt-1 hidden text-[10px] font-medium text-muted-foreground lg:block">
              {locale === "fa" ? "همراه مطمئن مسیر خودرو" : "Your trusted car partner"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{
                className: "rounded-lg px-3 py-2 text-sm font-semibold text-primary bg-secondary",
              }}
            >
              {l.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                {locale === "fa" ? "خدمات" : "Services"}
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              {serviceLinks.map((l) => (
                <DropdownMenuItem key={l.to} asChild>
                  <Link to={l.to} className="cursor-pointer py-2.5 font-medium">
                    {l.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocale(locale === "fa" ? "en" : "fa")}
            className="gap-1.5"
          >
            <Globe className="size-4" />
            <span className="text-xs font-semibold">{locale === "fa" ? "EN" : "فا"}</span>
          </Button>
          <a
            href="tel:+982145000045"
            className="hidden items-center gap-1.5 text-sm font-semibold text-muted-foreground lg:flex"
          >
            <Phone className="size-4" />
            <span className="num">۰۲۱-۴۵۰۰۰۰۴۵</span>
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/financing">{t("nav.financing")}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-6">
              <div className="flex flex-col gap-2">
                {[...primaryLinks, ...serviceLinks].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-secondary"
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href="tel:+982145000045"
                  className="mt-2 flex items-center gap-2 rounded-lg bg-secondary px-3 py-3 text-sm font-bold"
                >
                  <Phone className="size-4 text-primary" />
                  <span className="num">۰۲۱-۴۵۰۰۰۰۴۵</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
