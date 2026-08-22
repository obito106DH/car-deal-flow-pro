import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CarFront,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileSignature,
  Fingerprint,
  Gavel,
  Info,
  Landmark,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Upload,
  UserCheck,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/transfers")({
  head: () => ({
    meta: [
      { title: "خرید و فروش حواله خودرو | کسری موتورز" },
      {
        name: "description",
        content:
          "بازار امن خرید و فروش حواله خودروهای ایرانی و وارداتی؛ بررسی اصالت، احراز هویت و تنظیم قرارداد در کسری موتورز.",
      },
      { property: "og:title", content: "بازار حواله خودرو | کسری موتورز" },
      {
        property: "og:description",
        content: "حواله‌های کارشناسی‌شده خودروهای ایرانی و وارداتی با فرایند معامله امن.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TransfersPage,
});

type TransferKind = "all" | "iranian" | "imported";
type DeliveryStatus = "all" | "ready" | "soon" | "later";

type Transfer = {
  id: number;
  title: string;
  company: string;
  kind: Exclude<TransferKind, "all">;
  deliveryStatus: Exclude<DeliveryStatus, "all">;
  delivery: string;
  color: string;
  city: string;
  transferPrice: number;
  paidAmount: number;
  remainingAmount: number;
  verified: boolean;
  code: string;
};

const transfers: Transfer[] = [
  {
    id: 1,
    title: "تارا اتوماتیک V4 LX",
    company: "ایران‌خودرو",
    kind: "iranian",
    deliveryStatus: "ready",
    delivery: "تحویل فوری",
    color: "سفید",
    city: "تهران",
    transferPrice: 185_000_000,
    paidAmount: 520_000_000,
    remainingAmount: 410_000_000,
    verified: true,
    code: "KM-1048",
  },
  {
    id: 2,
    title: "لاماری ایما HEV",
    company: "آرین پارس موتور",
    kind: "imported",
    deliveryStatus: "soon",
    delivery: "۳۰ تا ۶۰ روز",
    color: "مشکی",
    city: "کرج",
    transferPrice: 340_000_000,
    paidAmount: 1_250_000_000,
    remainingAmount: 1_060_000_000,
    verified: true,
    code: "KM-1072",
  },
  {
    id: 3,
    title: "شاهین پلاس اتوماتیک",
    company: "سایپا",
    kind: "iranian",
    deliveryStatus: "soon",
    delivery: "۴۵ روز کاری",
    color: "خاکستری",
    city: "اصفهان",
    transferPrice: 128_000_000,
    paidAmount: 385_000_000,
    remainingAmount: 312_000_000,
    verified: true,
    code: "KM-1091",
  },
  {
    id: 4,
    title: "تویوتا کرولا کراس هیبرید",
    company: "برساوش",
    kind: "imported",
    deliveryStatus: "later",
    delivery: "مهر ۱۴۰۵",
    color: "نقره‌ای",
    city: "شیراز",
    transferPrice: 610_000_000,
    paidAmount: 2_100_000_000,
    remainingAmount: 1_780_000_000,
    verified: false,
    code: "KM-1106",
  },
  {
    id: 5,
    title: "دنا پلاس توربو اتوماتیک",
    company: "ایران‌خودرو",
    kind: "iranian",
    deliveryStatus: "ready",
    delivery: "آماده تخصیص",
    color: "مشکی",
    city: "مشهد",
    transferPrice: 205_000_000,
    paidAmount: 610_000_000,
    remainingAmount: 375_000_000,
    verified: true,
    code: "KM-1120",
  },
  {
    id: 6,
    title: "کیا K3 مدل ۲۰۲۵",
    company: "کوشا خودرو",
    kind: "imported",
    deliveryStatus: "later",
    delivery: "۹۰ روز کاری",
    color: "سفید صدفی",
    city: "تبریز",
    transferPrice: 465_000_000,
    paidAmount: 1_640_000_000,
    remainingAmount: 1_290_000_000,
    verified: true,
    code: "KM-1143",
  },
];

const kindFilters: { value: TransferKind; label: string }[] = [
  { value: "all", label: "همه حواله‌ها" },
  { value: "iranian", label: "خودروهای ایرانی" },
  { value: "imported", label: "خودروهای وارداتی" },
];

const secureSteps = [
  {
    icon: Fingerprint,
    title: "احراز هویت طرفین",
    description: "تطبیق هویت فروشنده با قرارداد ثبت‌نام و استعلام ممنوعیت انتقال حواله.",
  },
  {
    icon: FileCheck2,
    title: "بررسی اصالت حواله",
    description: "کنترل شماره قرارداد، مبالغ پرداختی و شرایط واگذاری نزد شرکت عرضه‌کننده.",
  },
  {
    icon: FileSignature,
    title: "قرارداد شفاف",
    description: "درج موعد تحویل، مانده پرداخت، خسارت تأخیر و تعهدات طرفین در قرارداد.",
  },
  {
    icon: WalletCards,
    title: "پرداخت مرحله‌ای",
    description: "پرداخت وجه فقط پس از تأیید هر مرحله و ثبت رسید معتبر در پرونده معامله.",
  },
];

const formatPrice = (value: number) => new Intl.NumberFormat("fa-IR").format(value);

function TransfersPage() {
  const [kind, setKind] = useState<TransferKind>("all");
  const [delivery, setDelivery] = useState<DeliveryStatus>("all");
  const [query, setQuery] = useState("");
  const [accepted, setAccepted] = useState(false);

  const filteredTransfers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fa");

    return transfers.filter((transfer) => {
      const matchesKind = kind === "all" || transfer.kind === kind;
      const matchesDelivery = delivery === "all" || transfer.deliveryStatus === delivery;
      const matchesQuery =
        !normalizedQuery ||
        `${transfer.title} ${transfer.company} ${transfer.city}`
          .toLocaleLowerCase("fa")
          .includes(normalizedQuery);

      return matchesKind && matchesDelivery && matchesQuery;
    });
  }, [delivery, kind, query]);

  const scrollToForm = (title?: string) => {
    document.getElementById("register-transfer")?.scrollIntoView({ behavior: "smooth" });
    if (title) toast.info(`درخواست بررسی «${title}» ثبت اولیه شد؛ اطلاعات تماس را تکمیل کنید.`);
  };

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute -left-24 -top-36 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 right-1/3 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              <ShieldCheck className="size-4" />
              معامله شفاف، پس از بررسی اصالت
            </span>
            <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.5] md:text-5xl">
              بازار خرید و فروش حواله خودرو
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-ink-foreground/70 md:text-base">
              حواله خودروهای ایرانی و وارداتی را با اطلاعات روشن، بررسی مدارک و قرارداد امن در کسری
              موتورز معامله کنید.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollToForm()} className="h-12 gap-2 px-6">
                <Upload className="size-4" />
                ثبت حواله برای فروش
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
                onClick={() =>
                  document.getElementById("transfer-list")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                مشاهده حواله‌ها
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur md:p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm text-ink-foreground/60">حواله فعال امروز</p>
                <p className="num mt-2 text-4xl font-black text-primary">۶۴</p>
              </div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <CarFront className="size-6" />
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="num text-xl font-black">۳۸</p>
                <p className="mt-1 text-xs text-ink-foreground/55">حواله ایرانی</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="num text-xl font-black">۲۶</p>
                <p className="mt-1 text-xs text-ink-foreground/55">حواله وارداتی</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 p-3 text-xs leading-6 text-ink-foreground/75">
              <BadgeCheck className="size-5 shrink-0 text-primary" />
              اصالت آگهی‌های نشان‌دار پیش از انتشار بررسی شده است.
            </div>
          </div>
        </div>
      </section>

      <section id="transfer-list" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 md:px-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold text-primary-deep">فرصت‌های به‌روز بازار</p>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">حواله‌های منتخب</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              مبلغ انتقال، پرداختی قبلی و مانده حساب را پیش از انتخاب مقایسه کنید.
            </p>
          </div>
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 pe-10"
              placeholder="جست‌وجوی خودرو، شرکت یا شهر"
              aria-label="جست‌وجوی حواله"
            />
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-border bg-card p-3 shadow-card">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" aria-label="فیلتر نوع حواله">
              {kindFilters.map((filter) => (
                <Button
                  key={filter.value}
                  type="button"
                  size="sm"
                  variant={kind === filter.value ? "default" : "ghost"}
                  className="shrink-0"
                  onClick={() => setKind(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Label className="shrink-0 text-xs text-muted-foreground">زمان تحویل:</Label>
              <Select
                value={delivery}
                onValueChange={(value) => setDelivery(value as DeliveryStatus)}
              >
                <SelectTrigger className="h-9 w-full sm:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه زمان‌ها</SelectItem>
                  <SelectItem value="ready">فوری و آماده</SelectItem>
                  <SelectItem value="soon">تا ۶۰ روز</SelectItem>
                  <SelectItem value="later">بیش از ۶۰ روز</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            <strong className="num text-foreground">{formatPrice(filteredTransfers.length)}</strong>{" "}
            حواله مطابق فیلتر شما
          </span>
          {(kind !== "all" || delivery !== "all" || query) && (
            <button
              type="button"
              className="font-bold text-primary-deep hover:underline"
              onClick={() => {
                setKind("all");
                setDelivery("all");
                setQuery("");
              }}
            >
              پاک کردن فیلترها
            </button>
          )}
        </div>

        {filteredTransfers.length ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTransfers.map((transfer) => (
              <TransferCard key={transfer.id} transfer={transfer} onRequest={scrollToForm} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-border bg-secondary/30 px-4 py-16 text-center">
            <Search className="mx-auto size-8 text-muted-foreground" />
            <h3 className="mt-4 font-bold">حواله‌ای با این مشخصات پیدا نشد</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              فیلترها را تغییر دهید یا درخواست خرید ثبت کنید.
            </p>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-secondary/55 py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-primary-deep">همراهی تا پایان انتقال</p>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">روند معامله امن در کسری موتورز</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              هر معامله در چهار ایستگاه کنترل می‌شود تا هویت، اصالت قرارداد و جریان پرداخت روشن
              باشد.
            </p>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {secureSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="surface-teal flex size-11 items-center justify-center rounded-xl text-primary-foreground">
                    <step.icon className="size-5" />
                  </span>
                  <span className="num text-3xl font-black text-border">
                    {formatPrice(index + 1)}
                  </span>
                </div>
                <h3 className="mt-5 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="text-xs font-bold text-primary-deep">پیش از پرداخت وجه</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">اصالت، مهم‌تر از قیمت</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            امکان انتقال همه حواله‌ها یکسان نیست. ضوابط شرکت عرضه‌کننده و متن قرارداد اولیه باید
            جداگانه بررسی شود.
          </p>

          <div className="mt-6 space-y-3">
            {[
              "اصل قرارداد ثبت‌نام و تمام رسیدهای بانکی را ببینید.",
              "نام مالک قرارداد باید با مدارک هویتی فروشنده یکسان باشد.",
              "وضعیت صلح، وکالت یا ممنوعیت انتقال را کتبی استعلام کنید.",
              "وجه معامله را به حساب شخص ثالث یا واسطه ناشناس واریز نکنید.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-7">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-warning/40 bg-warning/10 p-4">
            <div className="flex items-start gap-3">
              <Gavel className="mt-0.5 size-5 shrink-0 text-warning-foreground" />
              <div>
                <h3 className="text-sm font-bold text-warning-foreground">هشدار حقوقی</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  انتشار آگهی به معنی تضمین قطعی انتقال حواله نیست. معامله را فقط پس از استعلام رسمی
                  از شرکت عرضه‌کننده و بررسی قرارداد توسط کارشناس حقوقی انجام دهید.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          id="register-transfer"
          className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 shadow-card md:p-7"
          onSubmit={(event) => {
            event.preventDefault();
            if (!accepted) {
              toast.error("برای ثبت درخواست، تأیید صحت اطلاعات و قوانین الزامی است.");
              return;
            }
            toast.success("درخواست شما ثبت شد؛ کارشناس کسری موتورز برای بررسی مدارک تماس می‌گیرد.");
            event.currentTarget.reset();
            setAccepted(false);
          }}
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 className="text-xl font-black md:text-2xl">ثبت حواله برای فروش</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                اطلاعات اولیه را وارد کنید؛ انتشار فقط بعد از بررسی مدارک انجام می‌شود.
              </p>
            </div>
            <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-deep sm:flex">
              <FileSignature className="size-5" />
            </span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="transfer-kind">نوع خودرو</Label>
              <Select name="kind" required defaultValue="iranian">
                <SelectTrigger id="transfer-kind" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iranian">ایرانی</SelectItem>
                  <SelectItem value="imported">وارداتی</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-company">شرکت عرضه‌کننده</Label>
              <Input
                id="transfer-company"
                required
                placeholder="مثلاً ایران‌خودرو"
                className="h-11"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="transfer-car">نام خودرو و تیپ</Label>
              <Input
                id="transfer-car"
                required
                placeholder="مثلاً تارا اتوماتیک V4"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-delivery">وضعیت تحویل</Label>
              <Select name="delivery" required defaultValue="ready">
                <SelectTrigger id="transfer-delivery" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ready">فوری / آماده تخصیص</SelectItem>
                  <SelectItem value="soon">تا ۶۰ روز</SelectItem>
                  <SelectItem value="later">بیش از ۶۰ روز</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-price">مبلغ پیشنهادی واگذاری (تومان)</Label>
              <Input
                id="transfer-price"
                required
                inputMode="numeric"
                className="num h-11"
                placeholder="مثلاً ۱۸۵,۰۰۰,۰۰۰"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-name">نام و نام خانوادگی</Label>
              <Input id="transfer-name" required autoComplete="name" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-phone">شماره همراه</Label>
              <Input
                id="transfer-phone"
                required
                inputMode="tel"
                autoComplete="tel"
                className="num h-11 text-right"
                placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                pattern="[0۰][0-9۰-۹]{10}"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="transfer-note">توضیحات تکمیلی</Label>
              <Textarea
                id="transfer-note"
                rows={4}
                placeholder="تاریخ ثبت‌نام، موعد تحویل، مبلغ پرداخت‌شده و شرایط خاص قرارداد را بنویسید."
              />
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-secondary/60 p-3 text-xs leading-6">
            <Checkbox
              className="mt-1"
              checked={accepted}
              onCheckedChange={(value) => setAccepted(value === true)}
            />
            <span>
              صحت اطلاعات را تأیید می‌کنم و می‌پذیرم که کسری موتورز پیش از انتشار، اصالت مدارک و
              امکان قانونی انتقال حواله را بررسی کند.
            </span>
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" className="h-11 gap-2">
              ثبت درخواست بررسی
              <ChevronLeft className="size-4" />
            </Button>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="size-4 text-primary" />
              پاسخ‌گویی کارشناسان: شنبه تا پنج‌شنبه، ۹ تا ۱۸
            </span>
          </div>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="grid gap-4 rounded-3xl bg-ink p-6 text-ink-foreground md:grid-cols-3 md:p-8">
          {[
            {
              icon: Landmark,
              title: "استعلام شرکت",
              text: "کنترل ضوابط انتقال از مرجع عرضه‌کننده",
            },
            {
              icon: UserCheck,
              title: "کارشناس اختصاصی",
              text: "همراهی یک کارشناس تا امضای قرارداد",
            },
            {
              icon: CircleDollarSign,
              title: "شفافیت مالی",
              text: "تفکیک مبلغ واگذاری، پرداختی و مانده",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
              <item.icon className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="mt-1 text-xs leading-6 text-ink-foreground/60">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function TransferCard({
  transfer,
  onRequest,
}: {
  transfer: Transfer;
  onRequest: (title: string) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
      <div className="relative flex min-h-32 items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-secondary via-background to-primary/15 p-5">
        <div className="absolute -left-10 -top-10 size-28 rounded-full bg-primary/10" />
        <CarFront
          className="size-20 text-primary-deep/65 transition-transform group-hover:scale-105"
          strokeWidth={1.35}
        />
        <Badge
          variant="secondary"
          className="absolute right-4 top-4 border border-border bg-card/90 text-[11px] backdrop-blur"
        >
          {transfer.kind === "iranian" ? "ایرانی" : "وارداتی"}
        </Badge>
        <span className="num absolute bottom-3 left-4 text-[10px] font-bold text-muted-foreground">
          {transfer.code}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black leading-7">{transfer.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{transfer.company}</p>
          </div>
          {transfer.verified ? (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[10px] font-bold text-success">
              <BadgeCheck className="size-3.5" />
              اصالت بررسی‌شده
            </span>
          ) : (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-warning/15 px-2 py-1 text-[10px] font-bold text-warning-foreground">
              <Clock3 className="size-3.5" />
              در حال بررسی
            </span>
          )}
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-secondary/55 p-3 text-center">
          <div>
            <dt className="text-[10px] text-muted-foreground">تحویل</dt>
            <dd className="mt-1 text-xs font-bold">{transfer.delivery}</dd>
          </div>
          <div className="border-x border-border px-1">
            <dt className="text-[10px] text-muted-foreground">رنگ</dt>
            <dd className="mt-1 text-xs font-bold">{transfer.color}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground">محل قرارداد</dt>
            <dd className="mt-1 flex items-center justify-center gap-1 text-xs font-bold">
              <MapPin className="size-3" />
              {transfer.city}
            </dd>
          </div>
        </dl>

        <div className="mt-5 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">پرداخت‌شده به شرکت</span>
            <span className="num font-bold">{formatPrice(transfer.paidAmount)} تومان</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">مانده پرداخت</span>
            <span className="num font-bold">{formatPrice(transfer.remainingAmount)} تومان</span>
          </div>
        </div>

        <div className="mt-auto border-t border-border pt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] text-muted-foreground">مبلغ واگذاری حواله</p>
              <p className="num mt-1 text-lg font-black text-primary-deep">
                {formatPrice(transfer.transferPrice)}
                <span className="mr-1 text-[10px] font-medium text-muted-foreground">تومان</span>
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => onRequest(transfer.title)}
              disabled={!transfer.verified}
            >
              {transfer.verified ? "درخواست بررسی" : "منتظر تأیید"}
              {transfer.verified && <ChevronLeft className="size-3.5" />}
            </Button>
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-5 text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            قیمت نهایی پس از استعلام قرارداد و توافق طرفین مشخص می‌شود.
          </p>
        </div>
      </div>
    </article>
  );
}
