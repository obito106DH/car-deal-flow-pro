import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  BadgeCheck,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Headphones,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "بیمه و خدمات پس از فروش خودرو | کسری موتورز" },
      {
        name: "description",
        content:
          "خدمات بیمه خودرو، سرویس دوره‌ای، تعمیرات، کارشناسی، گارانتی و ثبت نوبت آنلاین در کسری موتورز.",
      },
      { property: "og:title", content: "خدمات مالکین خودرو | کسری موتورز" },
      {
        property: "og:description",
        content: "از صدور بیمه تا سرویس و گارانتی، همراه خودروی شما هستیم.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesPage,
});

const serviceGroups = [
  {
    id: "insurance",
    icon: ShieldCheck,
    eyebrow: "پوشش مطمئن",
    title: "بیمه خودرو",
    description:
      "مقایسه و صدور بیمه شخص ثالث و بدنه از شرکت‌های معتبر، همراه با یادآوری سررسید و راهنمای اعلام خسارت.",
    items: [
      "بیمه شخص ثالث و بدنه",
      "تمدید و یادآوری سررسید",
      "مشاوره انتخاب پوشش",
      "پیگیری پرونده خسارت",
    ],
  },
  {
    id: "after-sales",
    icon: HeartHandshake,
    eyebrow: "همراهی پس از خرید",
    title: "خدمات پس از فروش",
    description:
      "از نخستین روز تحویل تا نگهداری بلندمدت، سوابق خدمات خودرو را یکپارچه نگه می‌داریم و پیگیری می‌کنیم.",
    items: [
      "پشتیبانی و پاسخ‌گویی",
      "پرونده دیجیتال خودرو",
      "هماهنگی تعمیرگاه منتخب",
      "پیگیری رضایت پس از خدمت",
    ],
  },
  {
    id: "maintenance",
    icon: Wrench,
    eyebrow: "نگهداری اصولی",
    title: "سرویس دوره‌ای",
    description:
      "تعویض اقلام مصرفی و بازبینی فنی بر اساس کارکرد و دستورالعمل سازنده، با اعلام هزینه پیش از شروع کار.",
    items: [
      "تعویض روغن و فیلترها",
      "بازبینی ترمز و جلوبندی",
      "دیاگ و بررسی برق",
      "سرویس کولر و باتری",
    ],
  },
  {
    id: "warranty",
    icon: ClipboardCheck,
    eyebrow: "تصمیم آگاهانه",
    title: "کارشناسی و گارانتی",
    description:
      "بررسی فنی و بدنه با گزارش شفاف، امکان انتخاب پوشش گارانتی و راهنمای استفاده از تعهدات آن.",
    items: [
      "کارشناسی فنی و بدنه",
      "گزارش تصویری وضعیت",
      "پوشش‌های گارانتی منتخب",
      "ثبت و پیگیری درخواست گارانتی",
    ],
  },
];

const faqs = [
  {
    question: "برای ثبت نوبت چه اطلاعاتی لازم است؟",
    answer:
      "نام، شماره تماس، مدل خودرو، خدمت موردنظر و زمان ترجیحی کافی است. همکاران ما برای نهایی‌کردن مرکز و ساعت دقیق با شما تماس می‌گیرند.",
  },
  {
    question: "هزینه خدمت چه زمانی اعلام می‌شود؟",
    answer:
      "پس از بررسی اولیه خودرو، برآورد اقلام و اجرت پیش از شروع کار به شما اعلام می‌شود و انجام خدمات منوط به تأیید شماست.",
  },
  {
    question: "آیا سوابق سرویس خودرو نگهداری می‌شود؟",
    answer:
      "بله؛ خدمات انجام‌شده، کارکرد خودرو و اقلام تعویضی در پرونده خدماتی ثبت می‌شود تا برنامه نگهداری بعدی دقیق‌تر باشد.",
  },
  {
    question: "برای استفاده از گارانتی به چه مدارکی نیاز دارم؟",
    answer:
      "کارت خودرو، مدرک شناسایی مالک و سند یا گواهی پوشش گارانتی لازم است. مدارک تکمیلی بسته به نوع درخواست اعلام می‌شود.",
  },
];

function ServicesPage() {
  const [service, setService] = useState("سرویس دوره‌ای");
  const [branch, setBranch] = useState("نزدیک‌ترین مرکز");
  const [time, setTime] = useState("صبح (۹ تا ۱۲)");

  function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setService("سرویس دوره‌ای");
    setBranch("نزدیک‌ترین مرکز");
    setTime("صبح (۹ تا ۱۲)");
    toast.success("درخواست نوبت ثبت شد؛ برای هماهنگی نهایی با شما تماس می‌گیریم.");
  }

  return (
    <SiteShell>
      <div dir="rtl">
        <section className="relative overflow-hidden bg-ink text-ink-foreground">
          <div className="absolute -left-20 top-0 size-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                <Sparkles className="size-4" />
                خدمات یکپارچه مالکین خودرو
              </span>
              <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.45] md:text-5xl">
                از بیمه تا سرویس؛ یک همراه برای تمام مسیر خودرو
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-ink-foreground/70 md:text-base">
                در کسری موتورز، صدور بیمه، نگهداری دوره‌ای، کارشناسی و خدمات پس از فروش در یک مسیر
                شفاف و قابل پیگیری ارائه می‌شود.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-11">
                  <a href="#appointment">
                    <CalendarDays />
                    دریافت نوبت
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 border-ink-foreground/20 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
                >
                  <a href="tel:+982145000045">
                    <Phone />
                    مشاوره تلفنی
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BadgeCheck, title: "شفافیت کامل", text: "اعلام هزینه پیش از انجام کار" },
                { icon: Headphones, title: "پشتیبانی همراه", text: "پیگیری درخواست تا پایان" },
                { icon: CarFront, title: "پرونده خودرو", text: "ثبت منظم سوابق خدمات" },
                { icon: CheckCircle2, title: "مراکز منتخب", text: "کنترل کیفیت خدمت" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-4 backdrop-blur-sm"
                >
                  <item.icon className="size-5 text-primary" />
                  <p className="mt-3 text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-xs leading-6 text-ink-foreground/60">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-primary-deep">خدمات کسری موتورز</p>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">همه‌چیز برای آسودگی خیال شما</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              خدمت موردنظر را انتخاب کنید؛ هماهنگی مرکز، برآورد اولیه و پیگیری نتیجه را به ما
              بسپارید.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {serviceGroups.map((group) => (
              <article
                key={group.id}
                id={group.id}
                className="group rounded-3xl border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <div className="flex items-start gap-4">
                  <span className="surface-teal flex size-12 shrink-0 items-center justify-center rounded-2xl text-primary-foreground shadow-card">
                    <group.icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-primary-deep">{group.eyebrow}</p>
                    <h3 className="mt-1 text-lg font-black">{group.title}</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{group.description}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs leading-6">
                      <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="link" className="mt-3 h-auto px-0 font-bold">
                  <a href="#appointment" onClick={() => setService(group.title)}>
                    ثبت درخواست {group.title}
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-secondary/55 py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-sm font-bold text-primary-deep">فرایند ساده و قابل پیگیری</p>
                <h2 className="mt-2 text-2xl font-black md:text-3xl">سه قدم تا دریافت خدمت</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  بدون تماس‌های پراکنده و ابهام در هزینه؛ از انتخاب نوبت تا ثبت سوابق در کنار شما
                  هستیم.
                </p>
              </div>
              <ol className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: CalendarDays,
                    title: "ثبت درخواست",
                    text: "خدمت و زمان ترجیحی را مشخص کنید.",
                  },
                  {
                    icon: Phone,
                    title: "هماهنگی کارشناس",
                    text: "جزئیات، مرکز و برآورد اولیه تأیید می‌شود.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "انجام و پیگیری",
                    text: "نتیجه و سوابق خدمت در پرونده ثبت می‌شود.",
                  },
                ].map((step, index) => (
                  <li
                    key={step.title}
                    className="relative rounded-2xl border border-border bg-card p-5 shadow-card"
                  >
                    <span className="num absolute left-4 top-3 text-3xl font-black text-border">
                      {new Intl.NumberFormat("fa-IR").format(index + 1)}
                    </span>
                    <step.icon className="size-5 text-primary" />
                    <h3 className="mt-4 text-sm font-black">{step.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="appointment" className="scroll-mt-24 py-14 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-6 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="h-fit overflow-hidden rounded-3xl bg-ink p-6 text-ink-foreground md:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <CalendarDays className="size-5" />
              </span>
              <h2 className="mt-5 text-2xl font-black">نوبت خدمات خودرو</h2>
              <p className="mt-3 text-sm leading-7 text-ink-foreground/65">
                فرم را تکمیل کنید. کارشناس خدمات برای تأیید زمان، برآورد اولیه و انتخاب نزدیک‌ترین
                مرکز با شما تماس می‌گیرد.
              </p>
              <div className="mt-7 space-y-4 border-t border-ink-foreground/10 pt-6 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold">مرکز پاسخ‌گویی</p>
                    <a
                      href="tel:+982145000045"
                      dir="ltr"
                      className="num mt-1 block text-ink-foreground/65"
                    >
                      ۰۲۱-۴۵۰۰۰۰۴۵
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold">ساعت پاسخ‌گویی</p>
                    <p className="mt-1 text-ink-foreground/65">شنبه تا پنجشنبه، ۸ تا ۲۰</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold">انتخاب مرکز</p>
                    <p className="mt-1 text-ink-foreground/65">بر اساس شهر و نوع خدمت شما</p>
                  </div>
                </div>
              </div>
            </aside>

            <form
              onSubmit={submitAppointment}
              className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
            >
              <div>
                <h2 className="text-xl font-black">ثبت درخواست نوبت</h2>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  فیلدهای ستاره‌دار الزامی هستند. ثبت این فرم به معنی تأیید نهایی نوبت نیست.
                </p>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="appointment-name">نام و نام خانوادگی *</Label>
                  <Input
                    id="appointment-name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="مثلاً کسری احمدی"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-phone">شماره همراه *</Label>
                  <Input
                    id="appointment-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    dir="ltr"
                    required
                    pattern="09[0-9]{9}"
                    placeholder="09123456789"
                    className="num text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-car">خودرو *</Label>
                  <Input
                    id="appointment-car"
                    name="car"
                    required
                    placeholder="مثلاً پژو ۲۰۷ مدل ۱۴۰۲"
                  />
                </div>
                <div className="space-y-2">
                  <Label>نوع خدمت *</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger aria-label="نوع خدمت">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceGroups.map((group) => (
                        <SelectItem key={group.id} value={group.title}>
                          {group.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>مرکز ترجیحی</Label>
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger aria-label="مرکز ترجیحی">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نزدیک‌ترین مرکز">نزدیک‌ترین مرکز به من</SelectItem>
                      <SelectItem value="مرکز غرب تهران">مرکز غرب تهران</SelectItem>
                      <SelectItem value="مرکز شرق تهران">مرکز شرق تهران</SelectItem>
                      <SelectItem value="خدمات در محل">خدمات در محل (در صورت امکان)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-date">تاریخ ترجیحی *</Label>
                  <Input id="appointment-date" name="date" type="date" required className="num" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>بازه زمانی ترجیحی</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger aria-label="بازه زمانی ترجیحی">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="صبح (۹ تا ۱۲)">صبح (۹ تا ۱۲)</SelectItem>
                      <SelectItem value="ظهر (۱۲ تا ۱۵)">ظهر (۱۲ تا ۱۵)</SelectItem>
                      <SelectItem value="عصر (۱۵ تا ۱۸)">عصر (۱۵ تا ۱۸)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="appointment-notes">توضیحات درخواست</Label>
                  <Textarea
                    id="appointment-notes"
                    name="notes"
                    rows={4}
                    placeholder="نشانه‌های فنی، کارکرد فعلی یا توضیحی که به بررسی بهتر کمک می‌کند..."
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-6 text-muted-foreground">
                  اطلاعات شما فقط برای هماهنگی همین درخواست استفاده می‌شود.
                </p>
                <Button type="submit" size="lg" className="shrink-0">
                  ثبت درخواست نوبت
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-16 md:px-6">
          <div className="text-center">
            <p className="text-sm font-bold text-primary-deep">پرسش‌های متداول</p>
            <h2 className="mt-2 text-2xl font-black">پیش از ثبت نوبت</h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="mt-6 rounded-2xl border border-border bg-card px-5 shadow-card"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`service-faq-${index}`}>
                <AccordionTrigger className="text-start text-sm font-bold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </SiteShell>
  );
}
