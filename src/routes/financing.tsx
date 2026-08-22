import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  Banknote,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileSignature,
  FileText,
  Landmark,
  PhoneCall,
  ShieldCheck,
  UserCheck,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "خرید اقساطی و تأمین مالی خودرو | کسری موتورز" },
      {
        name: "description",
        content:
          "محاسبه مبلغ وام و اقساط خرید خودرو، مشاهده شرایط و مدارک و ثبت درخواست تأمین مالی خودرو در کسری موتورز.",
      },
      { property: "og:title", content: "خرید اقساطی خودرو | کسری موتورز" },
      {
        property: "og:description",
        content:
          "قسط خودروی موردنظر را با نرخ و مدت دلخواه محاسبه و درخواست بررسی اعتبار ثبت کنید.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FinancingPage,
});

const tomanFormatter = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 1,
});

function formatToman(value: number) {
  return tomanFormatter.format(Math.max(0, Math.round(value)));
}

function FinancingPage() {
  const [carPrice, setCarPrice] = useState(2_000_000_000);
  const [downPayment, setDownPayment] = useState(800_000_000);
  const [annualRate, setAnnualRate] = useState(23);
  const [months, setMonths] = useState(36);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [city, setCity] = useState("");
  const [employment, setEmployment] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const safeCarPrice = Math.max(0, carPrice);
  const safeDownPayment = Math.min(Math.max(0, downPayment), safeCarPrice);

  const calculation = useMemo(() => {
    const principal = Math.max(0, safeCarPrice - safeDownPayment);
    const monthlyRate = Math.max(0, annualRate) / 100 / 12;
    let monthlyPayment = 0;

    if (principal > 0 && months > 0) {
      if (monthlyRate === 0) {
        monthlyPayment = principal / months;
      } else {
        const growth = (1 + monthlyRate) ** months;
        monthlyPayment = (principal * monthlyRate * growth) / (growth - 1);
      }
    }

    const totalRepayment = monthlyPayment * months;

    return {
      principal,
      monthlyPayment,
      totalRepayment,
      totalInterest: Math.max(0, totalRepayment - principal),
      totalPurchaseCost: safeDownPayment + totalRepayment,
      financedPercent: safeCarPrice > 0 ? (principal / safeCarPrice) * 100 : 0,
    };
  }, [annualRate, months, safeCarPrice, safeDownPayment]);

  const setPrice = (value: number) => {
    const nextPrice = Math.max(0, Number.isFinite(value) ? value : 0);
    setCarPrice(nextPrice);
    setDownPayment((current) => Math.min(current, nextPrice));
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !/^09\d{9}$/.test(mobile) || !consent) {
      toast.error("لطفاً نام، شماره موبایل معتبر و تأیید شرایط را تکمیل کنید.");
      return;
    }

    toast.success("درخواست شما ثبت شد؛ کارشناس تأمین مالی با شما تماس می‌گیرد.");
  };

  const steps = [
    {
      icon: Calculator,
      title: "محاسبه و انتخاب طرح",
      description: "بودجه، پیش‌پرداخت، نرخ و مدت بازپرداخت مناسب خود را مشخص کنید.",
    },
    {
      icon: UserCheck,
      title: "اعتبارسنجی اولیه",
      description: "توان بازپرداخت و مدارک هویتی و شغلی شما بررسی می‌شود.",
    },
    {
      icon: ClipboardCheck,
      title: "تأیید بانک یا لیزینگ",
      description: "پس از ارزیابی ضامن یا وثیقه، پیشنهاد نهایی تأمین مالی صادر می‌شود.",
    },
    {
      icon: FileSignature,
      title: "قرارداد و تحویل خودرو",
      description: "قراردادها امضا، وجه تسویه و خودرو طبق شرایط توافق‌شده تحویل می‌شود.",
    },
  ];

  const documents = [
    "اصل و تصویر کارت ملی و شناسنامه متقاضی",
    "گواهی اشتغال، فیش حقوقی یا جواز کسب معتبر",
    "گردش حساب بانکی سه تا شش ماه اخیر",
    "مدرک محل سکونت و شماره شبای بانکی",
    "مدارک ضامن، چک صیادی یا وثیقه متناسب با طرح",
  ];

  return (
    <SiteShell>
      <div dir="rtl">
        <section className="relative overflow-hidden border-b border-border bg-ink text-ink-foreground">
          <div className="absolute -left-20 -top-24 size-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-32 right-1/3 size-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                <Landmark className="size-4" />
                راهکار خرید اقساطی کسری موتورز
              </span>
              <h1 className="mt-5 max-w-2xl text-3xl font-black leading-[1.45] md:text-5xl">
                خودروی دلخواهت را امروز بخر، با برنامه پرداخت خودت
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-ink-foreground/75 md:text-base">
                مبلغ قسط را با نرخ سود و مدت دلخواه محاسبه کن، درخواست اعتبار بده و مسیر عقد قرارداد
                تا تحویل خودرو را با همراهی کارشناسان ما طی کن.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-ink-foreground/80">
                {["نرخ قابل تنظیم", "بازپرداخت تا ۶۰ ماه", "بررسی شفاف مدارک"].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2"
                  >
                    <CheckCircle2 className="size-4 text-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-ink-foreground/65">قسط ماهانه برآوردی</p>
                  <p className="num mt-2 text-3xl font-black text-primary md:text-4xl">
                    {formatToman(calculation.monthlyPayment)}
                  </p>
                  <p className="mt-1 text-xs text-ink-foreground/60">تومان در ماه</p>
                </div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <WalletCards className="size-6" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-sm">
                <div>
                  <p className="text-xs text-ink-foreground/55">مبلغ وام</p>
                  <p className="num mt-1 font-bold">{formatToman(calculation.principal)} تومان</p>
                </div>
                <div>
                  <p className="text-xs text-ink-foreground/55">مدت بازپرداخت</p>
                  <p className="num mt-1 font-bold">{tomanFormatter.format(months)} ماه</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="calculator" className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="mb-8 max-w-2xl">
            <span className="text-sm font-bold text-primary-deep">محاسبه‌گر خرید اقساطی</span>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">
              قسط متناسب با بودجه‌ات را پیدا کن
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              محاسبات بر پایه اقساط مساوی و مانده نزولی انجام می‌شود. همه اعداد بر حسب تومان هستند.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-card md:p-7">
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label htmlFor="car-price" className="font-bold">
                      قیمت خودرو
                    </Label>
                    <span className="num text-sm font-black text-primary-deep">
                      {formatToman(safeCarPrice)} تومان
                    </span>
                  </div>
                  <Input
                    id="car-price"
                    type="number"
                    min={100_000_000}
                    step={10_000_000}
                    value={carPrice}
                    onChange={(event) => setPrice(Number(event.target.value))}
                    className="num h-11 text-left"
                    dir="ltr"
                  />
                  <Slider
                    aria-label="قیمت خودرو"
                    value={[Math.min(Math.max(safeCarPrice, 300_000_000), 10_000_000_000)]}
                    min={300_000_000}
                    max={10_000_000_000}
                    step={50_000_000}
                    onValueChange={(values) => {
                      const value = values[0];
                      if (value !== undefined) setPrice(value);
                    }}
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>۳۰۰ میلیون</span>
                    <span>۱۰ میلیارد</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label htmlFor="down-payment" className="font-bold">
                      مبلغ پیش‌پرداخت
                    </Label>
                    <span className="num text-sm font-black text-primary-deep">
                      {formatToman(safeDownPayment)} تومان
                    </span>
                  </div>
                  <Input
                    id="down-payment"
                    type="number"
                    min={0}
                    max={safeCarPrice}
                    step={10_000_000}
                    value={downPayment}
                    onChange={(event) =>
                      setDownPayment(
                        Math.min(Math.max(0, Number(event.target.value)), safeCarPrice),
                      )
                    }
                    className="num h-11 text-left"
                    dir="ltr"
                  />
                  <Slider
                    aria-label="مبلغ پیش‌پرداخت"
                    value={[safeDownPayment]}
                    min={0}
                    max={Math.max(safeCarPrice, 1)}
                    step={Math.max(1_000_000, Math.round(safeCarPrice / 200))}
                    onValueChange={(values) => {
                      const value = values[0];
                      if (value !== undefined) setDownPayment(value);
                    }}
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>بدون پیش‌پرداخت</span>
                    <span>
                      {safeCarPrice > 0
                        ? `${decimalFormatter.format((safeDownPayment / safeCarPrice) * 100)}٪ از قیمت خودرو`
                        : "۰٪ از قیمت خودرو"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Label htmlFor="annual-rate" className="font-bold">
                        نرخ سود سالانه
                      </Label>
                      <span className="num text-sm font-black text-primary-deep">
                        {decimalFormatter.format(annualRate)}٪
                      </span>
                    </div>
                    <Input
                      id="annual-rate"
                      type="number"
                      min={0}
                      max={40}
                      step={0.5}
                      value={annualRate}
                      onChange={(event) =>
                        setAnnualRate(Math.min(40, Math.max(0, Number(event.target.value))))
                      }
                      className="num h-11 text-left"
                      dir="ltr"
                    />
                    <Slider
                      aria-label="نرخ سود سالانه"
                      value={[annualRate]}
                      min={0}
                      max={40}
                      step={0.5}
                      onValueChange={(values) => {
                        const value = values[0];
                        if (value !== undefined) setAnnualRate(value);
                      }}
                    />
                    <p className="text-[11px] leading-5 text-muted-foreground">
                      عدد پیش‌فرض فقط نمونه است؛ نرخ اعلامی بانک یا لیزینگ خود را وارد کنید.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-bold">مدت بازپرداخت</Label>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                      {[12, 24, 36, 48, 60].map((term) => (
                        <Button
                          key={term}
                          type="button"
                          variant={months === term ? "default" : "outline"}
                          size="sm"
                          onClick={() => setMonths(term)}
                          className="num"
                        >
                          {tomanFormatter.format(term)} ماه
                        </Button>
                      ))}
                    </div>
                    <Select
                      value={String(months)}
                      onValueChange={(value) => setMonths(Number(value))}
                    >
                      <SelectTrigger aria-label="انتخاب مدت بازپرداخت" className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[6, 12, 18, 24, 30, 36, 48, 60].map((term) => (
                          <SelectItem key={term} value={String(term)}>
                            {tomanFormatter.format(term)} ماه
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <aside className="overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:sticky lg:top-24">
              <div className="surface-teal p-6 text-primary-foreground">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Banknote className="size-5" />
                  نتیجه برآورد اقساط
                </div>
                <p className="num mt-5 text-3xl font-black">
                  {formatToman(calculation.monthlyPayment)}
                </p>
                <p className="mt-1 text-xs opacity-85">تومان قسط ماهانه</p>
              </div>

              <dl className="space-y-0 p-6 text-sm">
                {[
                  ["مبلغ وام", calculation.principal],
                  ["کل سود در دوره", calculation.totalInterest],
                  ["کل بازپرداخت وام", calculation.totalRepayment],
                  ["هزینه نهایی خرید با پیش‌پرداخت", calculation.totalPurchaseCost],
                ].map(([label, value], index) => (
                  <div
                    key={String(label)}
                    className={`flex items-center justify-between gap-4 py-3 ${index > 0 ? "border-t border-border" : ""}`}
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="num text-left font-bold">
                      {formatToman(value as number)} تومان
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mx-6 mb-6 rounded-2xl bg-secondary/70 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">سهم تأمین مالی از قیمت خودرو</span>
                  <span className="num font-black text-primary-deep">
                    {decimalFormatter.format(calculation.financedPercent)}٪
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-300"
                    style={{ width: `${Math.min(100, calculation.financedPercent)}%` }}
                  />
                </div>
              </div>

              <div className="mx-6 mb-6 flex items-start gap-2 rounded-2xl border border-warning/35 bg-warning/10 p-4 text-xs leading-6 text-warning-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <p>
                  این محاسبه صرفاً برآورد است. نرخ نهایی، کارمزدها، بیمه، شرایط وثیقه و مبلغ قابل
                  تأمین پس از اعتبارسنجی و توسط بانک یا مؤسسه تأمین مالی تعیین می‌شود.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/50 py-14">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-bold text-primary-deep">از درخواست تا تحویل</span>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">مسیر تأمین مالی خودرو</h2>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-card p-5 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary-deep">
                      <step.icon className="size-5" />
                    </span>
                    <span className="num text-3xl font-black text-border">
                      {tomanFormatter.format(index + 1)}
                    </span>
                  </div>
                  <h3 className="mt-5 font-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contract" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-14 md:px-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="bg-ink p-6 text-ink-foreground md:p-8">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <FileSignature className="size-6" />
                </span>
                <p className="mt-6 text-xs font-bold text-primary">پیش‌نمایش غیرالزام‌آور</p>
                <h2 className="mt-2 text-2xl font-black leading-10">
                  خلاصه پیشنهادی قرارداد خرید اقساطی
                </h2>
                <p className="mt-3 text-xs leading-7 text-ink-foreground/65">
                  اعداد این بخش هم‌زمان با محاسبه‌گر به‌روز می‌شوند و پس از اعتبارسنجی، انتخاب خودرو
                  و تأیید تأمین‌کننده در قرارداد نهایی درج خواهند شد.
                </p>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
                  <div>
                    <p className="text-xs text-muted-foreground">متقاضی</p>
                    <p className="mt-1 font-bold">
                      {fullName.trim() || "نام متقاضی پس از تکمیل فرم"}
                    </p>
                  </div>
                  <span className="rounded-full bg-warning/10 px-3 py-1.5 text-[11px] font-bold text-warning-foreground">
                    پیش‌نویس اولیه — فاقد اعتبار امضا
                  </span>
                </div>

                <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ["قیمت مبنای خودرو", safeCarPrice],
                    ["پیش‌پرداخت", safeDownPayment],
                    ["اصل مبلغ تأمین مالی", calculation.principal],
                    ["قسط ماهانه برآوردی", calculation.monthlyPayment],
                    ["کل بازپرداخت", calculation.totalRepayment],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="rounded-2xl bg-secondary/60 p-4">
                      <dt className="text-[11px] text-muted-foreground">{label}</dt>
                      <dd className="num mt-2 text-sm font-black text-primary-deep">
                        {formatToman(value as number)} تومان
                      </dd>
                    </div>
                  ))}
                  <div className="rounded-2xl bg-secondary/60 p-4">
                    <dt className="text-[11px] text-muted-foreground">مدت و نرخ ورودی</dt>
                    <dd className="num mt-2 text-sm font-black text-primary-deep">
                      {tomanFormatter.format(months)} ماه · {decimalFormatter.format(annualRate)}٪
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 grid gap-2 text-xs leading-6 text-muted-foreground sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-primary" />
                    مشخصات دقیق خودرو و فروشنده پیش از امضا ثبت می‌شود.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-primary" />
                    نرخ، کارمزد، وثایق و جرایم فقط طبق قرارداد نهایی معتبر است.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-primary" />
                    پرداخت‌ها پس از تأیید هویت طرفین و اصالت خودرو انجام می‌شود.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-primary" />
                    یک نسخه قرارداد و جدول اقساط به مشتری تحویل خواهد شد.
                  </li>
                </ul>

                <a
                  href="#finance-request"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  تکمیل اطلاعات و درخواست قرارداد
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="text-sm font-bold text-primary-deep">آماده‌سازی پرونده</span>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">مدارک موردنیاز</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              نوع و تعداد مدارک با توجه به شغل، مبلغ وام و سیاست اعتبارسنجی تأمین‌کننده متفاوت است.
            </p>
            <ul className="mt-6 space-y-3">
              {documents.map((document) => (
                <li
                  key={document}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5 text-sm"
                >
                  <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="leading-6">{document}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-secondary p-4 text-xs leading-6 text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary-deep" />
              مدارک شما فقط برای بررسی درخواست تأمین مالی استفاده می‌شود. از ارسال رمز کارت، رمز
              اینترنت‌بانک یا کدهای یک‌بارمصرف خودداری کنید.
            </div>
          </div>

          <div
            id="finance-request"
            className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 shadow-card md:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary-deep">
                <PhoneCall className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-black">درخواست مشاوره، اعتبارسنجی و قرارداد</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  ثبت درخواست رایگان است و تعهدی برای عقد قرارداد ایجاد نمی‌کند.
                </p>
              </div>
            </div>

            <form onSubmit={submitRequest} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">نام و نام خانوادگی *</Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="مثلاً علی رضایی"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">شماره موبایل *</Label>
                  <Input
                    id="mobile"
                    inputMode="tel"
                    dir="ltr"
                    value={mobile}
                    onChange={(event) =>
                      setMobile(event.target.value.replace(/\D/g, "").slice(0, 11))
                    }
                    placeholder="09xxxxxxxxx"
                    autoComplete="tel"
                    className="num text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="national-id">کد ملی</Label>
                  <Input
                    id="national-id"
                    inputMode="numeric"
                    dir="ltr"
                    value={nationalId}
                    onChange={(event) =>
                      setNationalId(event.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="اختیاری"
                    autoComplete="off"
                    className="num text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">شهر محل سکونت</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="مثلاً تهران"
                    autoComplete="address-level2"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>وضعیت شغلی</Label>
                  <Select value={employment} onValueChange={setEmployment}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">حقوق‌بگیر دولتی یا خصوصی</SelectItem>
                      <SelectItem value="self-employed">صاحب کسب‌وکار یا مشاغل آزاد</SelectItem>
                      <SelectItem value="retired">بازنشسته</SelectItem>
                      <SelectItem value="other">سایر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">توضیحات درخواست</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="خودروی مدنظر، بودجه یا شرایط خاص خود را بنویسید."
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-secondary/60 p-4 text-xs leading-6">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked === true)}
                  className="mt-1"
                />
                <span>
                  با ثبت این درخواست، اجازه می‌دهم کارشناسان کسری موتورز برای مشاوره و بررسی اولیه
                  اطلاعات با من تماس بگیرند. می‌دانم تأیید وام منوط به اعتبارسنجی نهایی است.
                </span>
              </label>

              <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
                <Banknote className="size-4" />
                ثبت درخواست و تشکیل پرونده قرارداد
              </Button>
            </form>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
