import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  BadgeCheck,
  BatteryCharging,
  Box,
  CheckCircle2,
  CircleGauge,
  Disc3,
  FileSearch,
  Filter,
  Minus,
  Package,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Trash2,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/parts")({
  head: () => ({
    meta: [
      { title: "خرید و سفارش قطعات خودرو | کسری موتورز" },
      {
        name: "description",
        content:
          "فروش قطعات مصرفی و یدکی خودرو، جست‌وجوی قطعه بر اساس خودرو و ثبت درخواست تأمین قطعات کمیاب در کسری موتورز.",
      },
      { property: "og:title", content: "فروشگاه قطعات خودرو | کسری موتورز" },
      {
        property: "og:description",
        content: "قطعه سازگار با خودرویتان را پیدا کنید یا درخواست تأمین قطعه کمیاب ثبت کنید.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PartsPage,
});

type PartCategory = "فیلتر و روغن" | "ترمز" | "برق و باتری" | "موتور" | "تعلیق و جلوبندی";
type Availability = "in-stock" | "low" | "order";

type Part = {
  id: string;
  name: string;
  category: PartCategory;
  vehicle: string;
  brand: string;
  code: string;
  price: number | null;
  availability: Availability;
  icon: LucideIcon;
};

const categories: Array<"همه" | PartCategory> = [
  "همه",
  "فیلتر و روغن",
  "ترمز",
  "برق و باتری",
  "موتور",
  "تعلیق و جلوبندی",
];

const parts: Part[] = [
  {
    id: "oil-filter-tu5",
    name: "فیلتر روغن موتور TU5",
    category: "فیلتر و روغن",
    vehicle: "پژو ۲۰۶، ۲۰۷ و رانا پلاس",
    brand: "ایساکو",
    code: "KM-OF-1042",
    price: 295_000,
    availability: "in-stock",
    icon: Filter,
  },
  {
    id: "air-filter-207",
    name: "فیلتر هوای موتور ۲۰۷",
    category: "فیلتر و روغن",
    vehicle: "پژو ۲۰۶ تیپ ۵ و ۲۰۷",
    brand: "سرکان",
    code: "KM-AF-2075",
    price: 245_000,
    availability: "in-stock",
    icon: Filter,
  },
  {
    id: "engine-oil-5w30",
    name: "روغن موتور 5W-30 چهار لیتری",
    category: "فیلتر و روغن",
    vehicle: "مناسب خودروهای بنزینی منتخب",
    brand: "بهران",
    code: "KM-EO-5304",
    price: 1_850_000,
    availability: "low",
    icon: Package,
  },
  {
    id: "front-pads-saipa",
    name: "لنت ترمز جلو سایپا",
    category: "ترمز",
    vehicle: "پراید، تیبا، ساینا و کوییک",
    brand: "امکو",
    code: "KM-BP-2310",
    price: 1_150_000,
    availability: "in-stock",
    icon: Disc3,
  },
  {
    id: "battery-66",
    name: "باتری اتمی ۶۶ آمپر",
    category: "برق و باتری",
    vehicle: "دنا، سمند، تارا و خودروهای مشابه",
    brand: "صبا باتری",
    code: "KM-BT-6601",
    price: 4_850_000,
    availability: "low",
    icon: BatteryCharging,
  },
  {
    id: "spark-plug-l90",
    name: "شمع موتور پایه‌بلند (دست ۴ عددی)",
    category: "برق و باتری",
    vehicle: "تندر ۹۰، ساندرو و مگان ۱۶۰۰",
    brand: "بوش",
    code: "KM-SP-4090",
    price: 1_980_000,
    availability: "in-stock",
    icon: Zap,
  },
  {
    id: "timing-kit-tu5",
    name: "کیت کامل تسمه تایم TU5",
    category: "موتور",
    vehicle: "پژو پارس TU5، ۲۰۶ و ۲۰۷",
    brand: "گتس",
    code: "KM-TB-5502",
    price: 3_950_000,
    availability: "in-stock",
    icon: CircleGauge,
  },
  {
    id: "rear-shock-dena",
    name: "کمک‌فنر عقب (جفت)",
    category: "تعلیق و جلوبندی",
    vehicle: "دنا و دنا پلاس",
    brand: "عظام",
    code: "KM-SA-8871",
    price: 5_600_000,
    availability: "low",
    icon: Wrench,
  },
  {
    id: "imported-abs-module",
    name: "یونیت ABS هیوندای النترا",
    category: "ترمز",
    vehicle: "هیوندای النترا ۲۰۱۴ تا ۲۰۱۶",
    brand: "سفارش وارداتی",
    code: "KM-ABS-EL16",
    price: null,
    availability: "order",
    icon: Box,
  },
];

const numberFormatter = new Intl.NumberFormat("fa-IR");

function normalizePersian(value: string) {
  return value
    .toLocaleLowerCase("fa-IR")
    .replaceAll("ي", "ی")
    .replaceAll("ك", "ک")
    .replace(/\s+/g, " ")
    .trim();
}

function availabilityLabel(availability: Availability) {
  if (availability === "in-stock") return "موجود";
  if (availability === "low") return "موجودی محدود";
  return "تأمین سفارشی";
}

function PartsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("همه");
  const [availability, setAvailability] = useState<"all" | Availability>("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartPhone, setCartPhone] = useState("");
  const [rarePart, setRarePart] = useState("");

  const filteredParts = useMemo(() => {
    const needle = normalizePersian(query);
    return parts.filter((part) => {
      const matchesQuery =
        !needle ||
        normalizePersian(`${part.name} ${part.vehicle} ${part.brand} ${part.code}`).includes(
          needle,
        );
      const matchesCategory = category === "همه" || part.category === category;
      const matchesAvailability = availability === "all" || part.availability === availability;
      return matchesQuery && matchesCategory && matchesAvailability;
    });
  }, [availability, category, query]);

  const cartItems = parts.flatMap((part) => {
    const quantity = cart[part.id] ?? 0;
    return quantity > 0 && part.price !== null ? [{ part, quantity }] : [];
  });
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.part.price ?? 0) * item.quantity,
    0,
  );

  function addToCart(partId: string) {
    setCart((current) => ({ ...current, [partId]: (current[partId] ?? 0) + 1 }));
    toast.success("قطعه به سبد سفارش اضافه شد.");
  }

  function updateQuantity(partId: string, delta: number) {
    setCart((current) => {
      const nextQuantity = (current[partId] ?? 0) + delta;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[partId];
      else next[partId] = nextQuantity;
      return next;
    });
  }

  function submitCart() {
    if (!cartCount) {
      toast.error("سبد سفارش شما خالی است.");
      return;
    }
    if (!/^09\d{9}$/.test(cartPhone)) {
      toast.error("شماره همراه معتبر وارد کنید.");
      return;
    }
    setCart({});
    setCartPhone("");
    toast.success("سفارش اولیه ثبت شد؛ موجودی و قیمت نهایی تلفنی تأیید می‌شود.");
  }

  function submitRarePart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setRarePart("");
    toast.success("درخواست تأمین قطعه ثبت شد؛ نتیجه جست‌وجو به شما اعلام می‌شود.");
  }

  function requestRarePart(part: Part) {
    setRarePart(`${part.name} — ${part.code}`);
  }

  return (
    <SiteShell>
      <div dir="rtl">
        <section className="relative overflow-hidden border-b border-border bg-secondary/55">
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1.5 text-xs font-bold text-primary-deep">
                <Sparkles className="size-4" />
                فروش قطعات مصرفی و یدکی
              </span>
              <h1 className="mt-5 text-3xl font-black leading-[1.45] md:text-5xl">
                قطعه درست برای خودروی شما، بدون حدس و خطا
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
                قطعات پرمصرف را جست‌وجو و سفارش دهید؛ برای قطعات خاص یا وارداتی هم درخواست تأمین
                اختصاصی ثبت کنید.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#catalog">
                    <Search />
                    جست‌وجوی قطعه
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#rare-part">
                    <FileSearch />
                    درخواست قطعه کمیاب
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: ShieldCheck,
                  title: "تطبیق با خودرو",
                  text: "بررسی کد قطعه و سازگاری پیش از ارسال",
                },
                {
                  icon: BadgeCheck,
                  title: "اصالت قابل پیگیری",
                  text: "شفافیت برند، بسته‌بندی و تأمین‌کننده",
                },
                {
                  icon: Truck,
                  title: "ارسال و تحویل منعطف",
                  text: "ارسال سفارش یا تحویل از مرکز منتخب",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary-deep">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="catalog"
          className="scroll-mt-24 mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-primary-deep">کاتالوگ قطعات</p>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">جست‌وجو و سفارش آنلاین</h2>
            </div>
            <p className="text-xs leading-6 text-muted-foreground">
              قیمت‌ها اولیه‌اند و هنگام تأیید موجودی نهایی می‌شوند.
            </p>
          </div>

          <div className="mt-7 grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-card md:grid-cols-[minmax(0,1fr)_220px_190px]">
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="نام قطعه، خودرو، برند یا کد کالا..."
                className="h-11 pe-10"
                aria-label="جست‌وجوی قطعه"
              />
            </div>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as (typeof categories)[number])}
            >
              <SelectTrigger className="h-11" aria-label="دسته‌بندی قطعه">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item === "همه" ? "همه دسته‌ها" : item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={availability}
              onValueChange={(value) => setAvailability(value as "all" | Availability)}
            >
              <SelectTrigger className="h-11" aria-label="وضعیت موجودی">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="in-stock">موجود</SelectItem>
                <SelectItem value="low">موجودی محدود</SelectItem>
                <SelectItem value="order">تأمین سفارشی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold">
                  {numberFormatter.format(filteredParts.length)} قطعه پیدا شد
                </p>
                {(query || category !== "همه" || availability !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setQuery("");
                      setCategory("همه");
                      setAvailability("all");
                    }}
                  >
                    حذف فیلترها
                  </Button>
                )}
              </div>

              {filteredParts.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredParts.map((part) => (
                    <article
                      key={part.id}
                      className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary-deep">
                          <part.icon className="size-6" />
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            part.availability === "in-stock"
                              ? "border-success/30 bg-success/10 text-success"
                              : part.availability === "low"
                                ? "border-warning/35 bg-warning/10 text-warning-foreground"
                                : "border-primary/30 bg-primary/10 text-primary-deep"
                          }
                        >
                          {availabilityLabel(part.availability)}
                        </Badge>
                      </div>
                      <p className="mt-4 text-xs font-bold text-primary-deep">{part.category}</p>
                      <h3 className="mt-1 text-base font-black leading-7">{part.name}</h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">{part.vehicle}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-secondary/55 p-3 text-xs">
                        <div>
                          <dt className="text-muted-foreground">برند</dt>
                          <dd className="mt-1 font-bold">{part.brand}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">کد کالا</dt>
                          <dd dir="ltr" className="num mt-1 text-right font-bold">
                            {part.code}
                          </dd>
                        </div>
                      </dl>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                        <div>
                          {part.price === null ? (
                            <p className="text-sm font-black text-primary-deep">استعلام قیمت</p>
                          ) : (
                            <>
                              <p className="num text-lg font-black">
                                {numberFormatter.format(part.price)}
                              </p>
                              <p className="text-[11px] text-muted-foreground">تومان</p>
                            </>
                          )}
                        </div>
                        {part.availability === "order" ? (
                          <Button asChild size="sm" variant="outline">
                            <a href="#rare-part" onClick={() => requestRarePart(part)}>
                              درخواست تأمین
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => addToCart(part.id)}>
                            <Plus />
                            افزودن
                          </Button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/35 p-8 text-center">
                  <FileSearch className="size-10 text-muted-foreground" />
                  <h3 className="mt-4 font-black">قطعه‌ای با این مشخصات پیدا نشد</h3>
                  <p className="mt-2 max-w-md text-xs leading-6 text-muted-foreground">
                    عبارت یا فیلترها را تغییر دهید؛ همچنین می‌توانید درخواست تأمین اختصاصی ثبت کنید.
                  </p>
                  <Button asChild variant="outline" className="mt-5">
                    <a href="#rare-part">ثبت درخواست قطعه</a>
                  </Button>
                </div>
              )}
            </div>

            <aside className="overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:sticky lg:top-24">
              <div className="flex items-center justify-between border-b border-border p-5">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="size-5 text-primary" />
                  <h2 className="font-black">سبد سفارش</h2>
                </div>
                <span className="num flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {numberFormatter.format(cartCount)}
                </span>
              </div>

              {cartItems.length ? (
                <div className="max-h-80 divide-y divide-border overflow-y-auto">
                  {cartItems.map(({ part, quantity }) => (
                    <div key={part.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold leading-6">{part.name}</p>
                          <p className="num mt-1 text-xs text-muted-foreground">
                            {numberFormatter.format(part.price ?? 0)} تومان
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => updateQuantity(part.id, -quantity)}
                          aria-label={`حذف ${part.name}`}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="size-8"
                          onClick={() => updateQuantity(part.id, 1)}
                          aria-label={`افزایش تعداد ${part.name}`}
                        >
                          <Plus />
                        </Button>
                        <span className="num min-w-8 text-center text-sm font-bold">
                          {numberFormatter.format(quantity)}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="size-8"
                          onClick={() => updateQuantity(part.id, -1)}
                          aria-label={`کاهش تعداد ${part.name}`}
                        >
                          <Minus />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-44 flex-col items-center justify-center p-6 text-center">
                  <ShoppingCart className="size-8 text-border" />
                  <p className="mt-3 text-sm font-bold">سبد شما خالی است</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    قطعات موردنیاز را از کاتالوگ اضافه کنید.
                  </p>
                </div>
              )}

              <div className="border-t border-border bg-secondary/40 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">جمع اولیه</span>
                  <span className="num text-lg font-black">
                    {numberFormatter.format(cartTotal)}{" "}
                    <span className="text-xs font-medium">تومان</span>
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                  هزینه ارسال و قیمت نهایی پس از بررسی موجودی اعلام می‌شود.
                </p>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="cart-phone">شماره همراه برای تأیید سفارش</Label>
                  <Input
                    id="cart-phone"
                    type="tel"
                    inputMode="numeric"
                    dir="ltr"
                    value={cartPhone}
                    onChange={(event) => setCartPhone(event.target.value)}
                    placeholder="09123456789"
                    className="num bg-card text-left"
                  />
                </div>
                <Button className="mt-3 w-full" onClick={submitCart}>
                  ثبت سفارش اولیه
                </Button>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-ink py-14 text-ink-foreground md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-primary">از انتخاب تا تحویل</p>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">سفارش با کنترل سازگاری قطعه</h2>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Search,
                  title: "قطعه را انتخاب کنید",
                  text: "با نام خودرو، کد قطعه یا دسته‌بندی جست‌وجو کنید.",
                },
                {
                  icon: Phone,
                  title: "کارشناس تأیید می‌کند",
                  text: "موجودی، اصالت و سازگاری قطعه با خودرو بررسی می‌شود.",
                },
                {
                  icon: Truck,
                  title: "تحویل بگیرید",
                  text: "ارسال به نشانی شما یا تحویل از مرکز هماهنگ می‌شود.",
                },
              ].map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-5"
                >
                  <div className="flex items-center justify-between">
                    <step.icon className="size-5 text-primary" />
                    <span className="num text-3xl font-black text-ink-foreground/10">
                      {numberFormatter.format(index + 1)}
                    </span>
                  </div>
                  <h3 className="mt-4 font-black">{step.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-ink-foreground/60">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="rare-part" className="scroll-mt-24 py-14 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:px-6 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="rounded-3xl bg-secondary/70 p-6 md:p-8">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary-deep">
                <FileSearch className="size-5" />
              </span>
              <h2 className="mt-5 text-2xl font-black">قطعه پیدا نمی‌شود؟</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                مشخصات خودرو و هر اطلاعاتی که از قطعه دارید برای ما بفرستید. تیم تأمین، بازار داخلی
                و مسیر واردات را بررسی می‌کند.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "جست‌وجو با شماره فنی یا شماره شاسی",
                  "اعلام گزینه‌های نو، اصلی یا جایگزین",
                  "ارائه زمان تقریبی و هزینه پیش از سفارش",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-6">
                    <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>

            <form
              onSubmit={submitRarePart}
              className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
            >
              <h2 className="text-xl font-black">درخواست تأمین قطعه کمیاب</h2>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                هرچه مشخصات دقیق‌تر باشد، استعلام سریع‌تر و مطمئن‌تر انجام می‌شود.
              </p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="rare-name">نام یا شرح قطعه *</Label>
                  <Input
                    id="rare-name"
                    name="partName"
                    required
                    value={rarePart}
                    onChange={(event) => setRarePart(event.target.value)}
                    placeholder="مثلاً پمپ بنزین کامل هیوندای سوناتا YF"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rare-car">برند، مدل و سال خودرو *</Label>
                  <Input
                    id="rare-car"
                    name="vehicle"
                    required
                    placeholder="مثلاً کیا اپتیما ۲۰۱۵"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rare-code">شماره فنی قطعه</Label>
                  <Input
                    id="rare-code"
                    name="partCode"
                    dir="ltr"
                    className="num text-left"
                    placeholder="Part number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rare-vin">شماره شاسی (VIN)</Label>
                  <Input
                    id="rare-vin"
                    name="vin"
                    dir="ltr"
                    minLength={17}
                    maxLength={17}
                    className="num text-left uppercase"
                    placeholder="17-character VIN"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rare-phone">شماره همراه *</Label>
                  <Input
                    id="rare-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    dir="ltr"
                    required
                    pattern="09[0-9]{9}"
                    className="num text-left"
                    placeholder="09123456789"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="rare-notes">توضیحات تکمیلی</Label>
                  <Textarea
                    id="rare-notes"
                    name="notes"
                    rows={4}
                    placeholder="نشانه ظاهری، سمت نصب، ترجیح برند یا هر اطلاعات دیگری را بنویسید..."
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-6 text-muted-foreground">
                  ارسال درخواست رایگان است و تعهدی برای خرید ایجاد نمی‌کند.
                </p>
                <Button type="submit" size="lg" className="shrink-0">
                  ثبت درخواست تأمین
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
