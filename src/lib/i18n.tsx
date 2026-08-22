import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "fa" | "en";

type Dict = Record<string, { fa: string; en: string }>;

export const dict: Dict = {
  "brand.name": { fa: "کسری موتورز", en: "Kasra Motors" },
  "brand.tagline": {
    fa: "مرجع یکپارچه خرید، فروش و خدمات خودرو",
    en: "Your complete destination for cars and ownership services",
  },
  "nav.buy": { fa: "خرید خودرو", en: "Buy a car" },
  "nav.sell": { fa: "فروش خودرو", en: "Sell your car" },
  "nav.inspection": { fa: "کارشناسی", en: "Inspection" },
  "nav.financing": { fa: "خرید اقساطی", en: "Financing" },
  "nav.transfers": { fa: "حواله خودرو", en: "Car allocations" },
  "nav.services": { fa: "بیمه و خدمات", en: "Insurance & service" },
  "nav.parts": { fa: "قطعات", en: "Parts" },
  "nav.panel": { fa: "پنل مدیریت", en: "Dealer panel" },
  "nav.login": { fa: "ورود / ثبت‌نام", en: "Log in" },

  "hero.title": {
    fa: "همه‌چیز برای انتخاب، خرید و نگهداری خودرو",
    en: "Everything you need to choose, buy and own a car",
  },
  "hero.sub": {
    fa: "خودروی کارشناسی‌شده، خرید اقساطی، معامله امن حواله، بیمه، سرویس و قطعات را یکجا از کسری موتورز دریافت کنید.",
    en: "Inspected cars, financing, secure allocation trades, insurance, service and parts—all from Kasra Motors.",
  },
  "hero.search": { fa: "برند، مدل یا شهر را جست‌وجو کنید", en: "Search brand, model or city" },
  "hero.cta": { fa: "جست‌وجوی خودرو", en: "Search cars" },
  "hero.sellCta": { fa: "کارشناسی و فروش خودرو من", en: "Inspect & sell my car" },

  "stat.cars": { fa: "خودرو آماده تحویل", en: "cars ready to deliver" },
  "stat.points": { fa: "نقطه کارشناسی", en: "inspection points" },
  "stat.cities": { fa: "شهر فعال", en: "active cities" },
  "stat.dealers": { fa: "نمایشگاه همکار", en: "partner dealerships" },

  "section.featured": { fa: "خودروهای منتخب", en: "Featured cars" },
  "section.featured.sub": {
    fa: "کارشناسی‌شده، قیمت‌گذاری‌شده و آماده تحویل",
    en: "Inspected, priced and ready to hand over",
  },
  "section.how": { fa: "چطور کار می‌کند؟", en: "How it works" },
  "section.brands": { fa: "برندهای محبوب", en: "Popular brands" },
  "section.services": { fa: "خدمات ما", en: "Our services" },

  "how.1.t": { fa: "انتخاب خودرو", en: "Pick a car" },
  "how.1.d": {
    fa: "از میان خودروهای کارشناسی‌شده با فیلتر دقیق انتخاب کنید.",
    en: "Filter through inspected cars and find your match.",
  },
  "how.2.t": { fa: "بازدید و تست", en: "Visit & test drive" },
  "how.2.d": {
    fa: "در نزدیک‌ترین مرکز، خودرو را از نزدیک ببینید و تست کنید.",
    en: "See and test the car at the nearest center.",
  },
  "how.3.t": { fa: "پرداخت امن", en: "Secure payment" },
  "how.3.d": {
    fa: "پرداخت در حساب امانی و تسویه پس از تحویل.",
    en: "Escrow payment, settled after delivery.",
  },
  "how.4.t": { fa: "انتقال سند", en: "Title transfer" },
  "how.4.d": {
    fa: "همه مراحل اداری و تعویض پلاک با ما.",
    en: "We handle paperwork and plate transfer.",
  },

  "svc.inspection": { fa: "کارشناسی ۱۶۷ نقطه", en: "167-point inspection" },
  "svc.inspection.d": {
    fa: "گزارش فنی و بدنه با عکس و امتیاز هر بخش.",
    en: "Body and mechanical report with photos and per-section scores.",
  },
  "svc.pricing": { fa: "قیمت‌گذاری کارشناسی", en: "Expert pricing" },
  "svc.pricing.d": {
    fa: "قیمت منصفانه بر پایه داده معاملات واقعی بازار.",
    en: "Fair price based on real market transaction data.",
  },
  "svc.warranty": { fa: "ضمانت و بازگشت", en: "Warranty & returns" },
  "svc.warranty.d": {
    fa: "۷ روز مهلت بازگشت و ۶ ماه ضمانت موتور و گیربکس.",
    en: "7-day return window and 6-month powertrain warranty.",
  },
  "svc.finance": { fa: "خرید اقساطی", en: "Financing" },
  "svc.finance.d": {
    fa: "محاسبه اقساط با نرخ و مدت دلخواه و ثبت درخواست قرارداد.",
    en: "Calculate installments with adjustable rates and apply for a contract.",
  },
  "svc.transfers": { fa: "خرید و فروش حواله", en: "Car allocations" },
  "svc.transfers.d": {
    fa: "معامله حواله خودروهای ایرانی و وارداتی با بررسی مدارک.",
    en: "Trade local and imported car allocations with document verification.",
  },
  "svc.insurance": { fa: "بیمه و خدمات پس از فروش", en: "Insurance & after-sales" },
  "svc.insurance.d": {
    fa: "مقایسه بیمه، نوبت سرویس، گارانتی و امداد خودرو.",
    en: "Compare insurance, book service, warranty and roadside assistance.",
  },
  "svc.parts": { fa: "قطعات مصرفی و یدکی", en: "Parts & consumables" },
  "svc.parts.d": {
    fa: "خرید قطعات اصیل و ثبت سفارش برای قطعات کمیاب.",
    en: "Buy verified parts or request hard-to-find components.",
  },

  "cars.title": { fa: "خرید خودرو", en: "Buy a car" },
  "cars.count": { fa: "خودرو یافت شد", en: "cars found" },
  "cars.filters": { fa: "فیلترها", en: "Filters" },
  "cars.brand": { fa: "برند", en: "Brand" },
  "cars.city": { fa: "شهر", en: "City" },
  "cars.body": { fa: "نوع بدنه", en: "Body type" },
  "cars.gearbox": { fa: "گیربکس", en: "Gearbox" },
  "cars.price": { fa: "بازه قیمت", en: "Price range" },
  "cars.sort": { fa: "مرتب‌سازی", en: "Sort" },
  "cars.sort.new": { fa: "جدیدترین", en: "Newest" },
  "cars.sort.cheap": { fa: "ارزان‌ترین", en: "Cheapest" },
  "cars.sort.expensive": { fa: "گران‌ترین", en: "Most expensive" },
  "cars.sort.km": { fa: "کم‌کارکردترین", en: "Lowest mileage" },
  "cars.reset": { fa: "حذف فیلترها", en: "Clear filters" },
  "cars.empty": { fa: "خودرویی با این فیلترها پیدا نشد.", en: "No cars match these filters." },
  "cars.all": { fa: "همه", en: "All" },

  "car.km": { fa: "کارکرد", en: "Mileage" },
  "car.year": { fa: "سال ساخت", en: "Year" },
  "car.color": { fa: "رنگ", en: "Color" },
  "car.fuel": { fa: "سوخت", en: "Fuel" },
  "car.score": { fa: "امتیاز کارشناسی", en: "Inspection score" },
  "car.installment": { fa: "قابل اقساط", en: "Financing available" },
  "car.contact": { fa: "درخواست بازدید", en: "Request a viewing" },
  "car.callback": { fa: "درخواست تماس کارشناس", en: "Request expert call" },
  "car.report": { fa: "گزارش کارشناسی", en: "Inspection report" },
  "car.specs": { fa: "مشخصات", en: "Specifications" },
  "car.similar": { fa: "خودروهای مشابه", en: "Similar cars" },
  "car.toman": { fa: "تومان", en: "IRT" },
  "car.leadSent": {
    fa: "درخواست شما ثبت شد. کارشناس تماس می‌گیرد.",
    en: "Request submitted. An expert will call you.",
  },

  "sell.title": { fa: "فروش خودرو", en: "Sell your car" },
  "sell.sub": {
    fa: "اطلاعات خودرو را وارد کنید، قیمت پیشنهادی و نوبت کارشناسی رایگان بگیرید.",
    en: "Enter your car details to get a price estimate and a free inspection slot.",
  },
  "sell.step1": { fa: "مشخصات خودرو", en: "Car details" },
  "sell.step2": { fa: "وضعیت خودرو", en: "Condition" },
  "sell.step3": { fa: "اطلاعات تماس", en: "Contact info" },
  "sell.estimate": { fa: "قیمت پیشنهادی ما", en: "Our estimated price" },
  "sell.submit": { fa: "ثبت درخواست کارشناسی", en: "Book inspection" },
  "sell.next": { fa: "مرحله بعد", en: "Next" },
  "sell.back": { fa: "مرحله قبل", en: "Back" },
  "sell.done": { fa: "درخواست فروش ثبت شد.", en: "Sell request submitted." },
  "sell.name": { fa: "نام و نام خانوادگی", en: "Full name" },
  "sell.phone": { fa: "شماره تماس", en: "Phone number" },

  "panel.title": { fa: "پنل مدیریت", en: "Dealer panel" },
  "panel.dashboard": { fa: "داشبورد", en: "Dashboard" },
  "panel.inventory": { fa: "انبار و قیمت‌گذاری", en: "Inventory & pricing" },
  "panel.leads": { fa: "سرنخ‌ها و فروش", en: "Leads & CRM" },
  "panel.inspections": { fa: "کارشناسی و مدارک", en: "Inspection & docs" },
  "panel.reports": { fa: "گزارش‌ها", en: "Reports" },
  "panel.users": { fa: "کاربران و نقش‌ها", en: "Users & roles" },
  "panel.backToSite": { fa: "بازگشت به سایت", en: "Back to site" },

  "kpi.revenue": { fa: "فروش ماه", en: "Monthly revenue" },
  "kpi.sold": { fa: "خودرو فروخته‌شده", en: "Cars sold" },
  "kpi.stock": { fa: "موجودی فعال", en: "Active stock" },
  "kpi.leads": { fa: "سرنخ جدید", en: "New leads" },
  "kpi.avgDays": { fa: "میانگین روز تا فروش", en: "Avg. days to sell" },
  "kpi.conversion": { fa: "نرخ تبدیل", en: "Conversion rate" },

  "chart.sales": { fa: "روند فروش", en: "Sales trend" },
  "chart.pipeline": { fa: "قیف فروش", en: "Sales pipeline" },
  "chart.brandMix": { fa: "ترکیب برند موجودی", en: "Stock mix by brand" },
  "table.recentLeads": { fa: "آخرین سرنخ‌ها", en: "Recent leads" },

  "col.car": { fa: "خودرو", en: "Car" },
  "col.price": { fa: "قیمت", en: "Price" },
  "col.status": { fa: "وضعیت", en: "Status" },
  "col.days": { fa: "روز در انبار", en: "Days in stock" },
  "col.customer": { fa: "مشتری", en: "Customer" },
  "col.stage": { fa: "مرحله", en: "Stage" },
  "col.source": { fa: "منبع", en: "Source" },
  "col.owner": { fa: "کارشناس", en: "Owner" },
  "col.date": { fa: "تاریخ", en: "Date" },
  "col.score": { fa: "امتیاز", en: "Score" },
  "col.expert": { fa: "کارشناس فنی", en: "Inspector" },
  "col.docs": { fa: "مدارک", en: "Documents" },
  "col.name": { fa: "نام", en: "Name" },
  "col.role": { fa: "نقش", en: "Role" },
  "col.branch": { fa: "شعبه", en: "Branch" },
  "col.actions": { fa: "عملیات", en: "Actions" },
  "col.phone": { fa: "تلفن", en: "Phone" },

  "status.published": { fa: "منتشر شده", en: "Published" },
  "status.draft": { fa: "پیش‌نویس", en: "Draft" },
  "status.reserved": { fa: "رزرو شده", en: "Reserved" },
  "status.sold": { fa: "فروخته شده", en: "Sold" },
  "status.pending": { fa: "در انتظار کارشناسی", en: "Awaiting inspection" },
  "status.passed": { fa: "تایید شده", en: "Passed" },
  "status.failed": { fa: "رد شده", en: "Rejected" },
  "status.complete": { fa: "کامل", en: "Complete" },
  "status.missing": { fa: "ناقص", en: "Incomplete" },
  "status.active": { fa: "فعال", en: "Active" },
  "status.disabled": { fa: "غیرفعال", en: "Disabled" },

  "stage.new": { fa: "سرنخ جدید", en: "New" },
  "stage.contacted": { fa: "تماس گرفته شد", en: "Contacted" },
  "stage.visit": { fa: "بازدید", en: "Visit booked" },
  "stage.negotiation": { fa: "مذاکره", en: "Negotiation" },
  "stage.won": { fa: "قرارداد", en: "Won" },
  "stage.lost": { fa: "از دست رفته", en: "Lost" },

  "role.admin": { fa: "مدیر سیستم", en: "Admin" },
  "role.sales": { fa: "کارشناس فروش", en: "Sales agent" },
  "role.inspector": { fa: "کارشناس فنی", en: "Inspector" },
  "role.finance": { fa: "مالی", en: "Finance" },

  "action.search": { fa: "جست‌وجو", en: "Search" },
  "action.new": { fa: "افزودن", en: "Add new" },
  "action.edit": { fa: "ویرایش", en: "Edit" },
  "action.view": { fa: "مشاهده", en: "View" },
  "action.export": { fa: "خروجی", en: "Export" },
  "action.save": { fa: "ذخیره", en: "Save" },
  demoData: { fa: "داده‌های نمایشی", en: "Demo data" },
  "footer.rights": { fa: "تمامی حقوق محفوظ است.", en: "All rights reserved." },
  "footer.company": { fa: "شرکت", en: "Company" },
  "footer.services": { fa: "خدمات", en: "Services" },
  "footer.support": { fa: "پشتیبانی", en: "Support" },
  "footer.about": { fa: "درباره ما", en: "About us" },
  "footer.contact": { fa: "تماس با ما", en: "Contact" },
  "footer.careers": { fa: "فرصت‌های شغلی", en: "Careers" },
  "footer.faq": { fa: "پرسش‌های متداول", en: "FAQ" },
  "footer.terms": { fa: "قوانین و مقررات", en: "Terms" },
  "footer.privacy": { fa: "حریم خصوصی", en: "Privacy" },
};

type Ctx = {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: (key: keyof typeof dict | string) => string;
  setLocale: (l: Locale) => void;
  fmt: (n: number) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    const saved = window.localStorage.getItem("locale");
    if (saved === "en" || saved === "fa") setLocaleState(saved);
  }, []);

  useEffect(() => {
    const dir = locale === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("locale", l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      dir: locale === "fa" ? "rtl" : "ltr",
      t: (key: string) => dict[key]?.[locale] ?? key,
      setLocale,
      fmt: (n: number) => new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
