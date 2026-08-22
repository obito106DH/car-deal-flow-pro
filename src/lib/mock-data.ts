export type Car = {
  id: string;
  slug: string;
  brand: { fa: string; en: string };
  model: { fa: string; en: string };
  year: number;
  km: number;
  price: number; // toman
  city: { fa: string; en: string };
  color: { fa: string; en: string };
  gearbox: "auto" | "manual";
  body: "sedan" | "suv" | "hatchback" | "pickup";
  fuel: { fa: string; en: string };
  score: number; // /100
  installment: boolean;
  status: "published" | "draft" | "reserved" | "sold";
  daysInStock: number;
  hue: number; // used for the generated card artwork
  highlights: { fa: string; en: string }[];
};

const c = (fa: string, en: string) => ({ fa, en });

export const cars: Car[] = [
  {
    id: "1",
    slug: "peugeot-207-1401",
    brand: c("پژو", "Peugeot"),
    model: c("۲۰۷ اتوماتیک پانوراما", "207 Automatic Panorama"),
    year: 1401,
    km: 24000,
    price: 985_000_000,
    city: c("تهران", "Tehran"),
    color: c("سفید", "White"),
    gearbox: "auto",
    body: "hatchback",
    fuel: c("بنزینی", "Petrol"),
    score: 92,
    installment: true,
    status: "published",
    daysInStock: 9,
    hue: 190,
    highlights: [c("بدون رنگ", "No repaint"), c("سرویس دوره‌ای کامل", "Full service history")],
  },
  {
    id: "2",
    slug: "kia-sportage-2017",
    brand: c("کیا", "Kia"),
    model: c("اسپورتیج GT Line", "Sportage GT Line"),
    year: 1396,
    km: 118000,
    price: 3_450_000_000,
    city: c("اصفهان", "Isfahan"),
    color: c("مشکی", "Black"),
    gearbox: "auto",
    body: "suv",
    fuel: c("بنزینی", "Petrol"),
    score: 87,
    installment: true,
    status: "published",
    daysInStock: 21,
    hue: 220,
    highlights: [c("لاستیک نو", "New tyres"), c("گیربکس سالم", "Healthy gearbox")],
  },
  {
    id: "3",
    slug: "samand-lx-1399",
    brand: c("ایران خودرو", "Iran Khodro"),
    model: c("سمند LX EF7", "Samand LX EF7"),
    year: 1399,
    km: 62000,
    price: 465_000_000,
    city: c("مشهد", "Mashhad"),
    color: c("نقره‌ای", "Silver"),
    gearbox: "manual",
    body: "sedan",
    fuel: c("دوگانه‌سوز", "Bi-fuel"),
    score: 78,
    installment: false,
    status: "published",
    daysInStock: 34,
    hue: 30,
    highlights: [c("دوگانه کارخانه", "Factory bi-fuel"), c("موتور بدون نشتی", "No engine leaks")],
  },
  {
    id: "4",
    slug: "hyundai-tucson-2016",
    brand: c("هیوندای", "Hyundai"),
    model: c("توسان IX35", "Tucson IX35"),
    year: 1395,
    km: 143000,
    price: 2_980_000_000,
    city: c("شیراز", "Shiraz"),
    color: c("خاکستری", "Grey"),
    gearbox: "auto",
    body: "suv",
    fuel: c("بنزینی", "Petrol"),
    score: 81,
    installment: true,
    status: "reserved",
    daysInStock: 12,
    hue: 250,
    highlights: [c("تعویض روغن به‌روز", "Fresh oil change"), c("بدنه سالم", "Straight body")],
  },
  {
    id: "5",
    slug: "quick-s-1402",
    brand: c("سایپا", "Saipa"),
    model: c("کوییک S", "Quick S"),
    year: 1402,
    km: 11000,
    price: 512_000_000,
    city: c("تهران", "Tehran"),
    color: c("آبی", "Blue"),
    gearbox: "manual",
    body: "hatchback",
    fuel: c("بنزینی", "Petrol"),
    score: 95,
    installment: true,
    status: "published",
    daysInStock: 4,
    hue: 205,
    highlights: [c("در حد صفر", "Almost new"), c("گارانتی شرکتی", "Factory warranty")],
  },
  {
    id: "6",
    slug: "toyota-corolla-2015",
    brand: c("تویوتا", "Toyota"),
    model: c("کرولا GLI", "Corolla GLI"),
    year: 1394,
    km: 167000,
    price: 3_150_000_000,
    city: c("تبریز", "Tabriz"),
    color: c("سفید", "White"),
    gearbox: "auto",
    body: "sedan",
    fuel: c("بنزینی", "Petrol"),
    score: 85,
    installment: false,
    status: "published",
    daysInStock: 17,
    hue: 160,
    highlights: [c("موتور بی‌نقص", "Flawless engine"), c("مصرف پایین", "Low consumption")],
  },
  {
    id: "7",
    slug: "dena-plus-1401",
    brand: c("ایران خودرو", "Iran Khodro"),
    model: c("دنا پلاس توربو", "Dena Plus Turbo"),
    year: 1401,
    km: 38000,
    price: 895_000_000,
    city: c("کرج", "Karaj"),
    color: c("سفید", "White"),
    gearbox: "auto",
    body: "sedan",
    fuel: c("بنزینی", "Petrol"),
    score: 89,
    installment: true,
    status: "published",
    daysInStock: 7,
    hue: 178,
    highlights: [c("سانروف", "Sunroof"), c("کارکرد کم", "Low mileage")],
  },
  {
    id: "8",
    slug: "nissan-zamyad-1400",
    brand: c("نیسان", "Nissan"),
    model: c("زامیاد وانت", "Zamyad Pickup"),
    year: 1400,
    km: 91000,
    price: 720_000_000,
    city: c("اهواز", "Ahvaz"),
    color: c("آبی", "Blue"),
    gearbox: "manual",
    body: "pickup",
    fuel: c("دوگانه‌سوز", "Bi-fuel"),
    score: 74,
    installment: false,
    status: "draft",
    daysInStock: 45,
    hue: 210,
    highlights: [c("مناسب کار", "Work-ready"), c("شاسی سالم", "Solid chassis")],
  },
  {
    id: "9",
    slug: "chery-tiggo-8-1401",
    brand: c("چری", "Chery"),
    model: c("تیگو ۸ پرو", "Tiggo 8 Pro"),
    year: 1401,
    km: 29000,
    price: 4_650_000_000,
    city: c("تهران", "Tehran"),
    color: c("مشکی", "Black"),
    gearbox: "auto",
    body: "suv",
    fuel: c("بنزینی", "Petrol"),
    score: 93,
    installment: true,
    status: "published",
    daysInStock: 6,
    hue: 265,
    highlights: [c("۷ نفره", "7 seats"), c("فول آپشن", "Fully loaded")],
  },
  {
    id: "10",
    slug: "peugeot-pars-1398",
    brand: c("پژو", "Peugeot"),
    model: c("پارس سال", "Pars Sal"),
    year: 1398,
    km: 104000,
    price: 520_000_000,
    city: c("قم", "Qom"),
    color: c("نقره‌ای", "Silver"),
    gearbox: "manual",
    body: "sedan",
    fuel: c("بنزینی", "Petrol"),
    score: 76,
    installment: false,
    status: "sold",
    daysInStock: 28,
    hue: 40,
    highlights: [c("قیمت مناسب", "Good value"), c("بیمه کامل", "Full insurance")],
  },
  {
    id: "11",
    slug: "mvm-x33-1399",
    brand: c("ام وی ام", "MVM"),
    model: c("X33 اسپرت", "X33 Sport"),
    year: 1399,
    km: 77000,
    price: 1_320_000_000,
    city: c("رشت", "Rasht"),
    color: c("سفید", "White"),
    gearbox: "auto",
    body: "suv",
    fuel: c("بنزینی", "Petrol"),
    score: 80,
    installment: true,
    status: "published",
    daysInStock: 19,
    hue: 145,
    highlights: [c("داخل تمیز", "Clean interior"), c("کولر قوی", "Strong A/C")],
  },
  {
    id: "12",
    slug: "kia-cerato-2017",
    brand: c("کیا", "Kia"),
    model: c("سراتو ۲۰۰۰", "Cerato 2000"),
    year: 1396,
    km: 132000,
    price: 2_450_000_000,
    city: c("تهران", "Tehran"),
    color: c("خاکستری", "Grey"),
    gearbox: "auto",
    body: "sedan",
    fuel: c("بنزینی", "Petrol"),
    score: 84,
    installment: true,
    status: "published",
    daysInStock: 14,
    hue: 195,
    highlights: [c("مونتاژ سایپا", "Saipa assembled"), c("سرویس شده", "Recently serviced")],
  },
];

export const brands = [
  "پژو|Peugeot",
  "کیا|Kia",
  "هیوندای|Hyundai",
  "تویوتا|Toyota",
  "سایپا|Saipa",
  "ایران خودرو|Iran Khodro",
  "چری|Chery",
  "ام وی ام|MVM",
  "نیسان|Nissan",
];

export type Lead = {
  id: string;
  customer: string;
  phone: string;
  car: string;
  stage: "new" | "contacted" | "visit" | "negotiation" | "won" | "lost";
  source: { fa: string; en: string };
  owner: string;
  date: string;
  value: number;
};

export const leads: Lead[] = [
  {
    id: "L-1042",
    customer: "علی رضایی | Ali Rezaei",
    phone: "0912***4410",
    car: "Peugeot 207 · 1401",
    stage: "negotiation",
    source: c("سایت", "Website"),
    owner: "سارا محمدی | Sara Mohammadi",
    date: "1405/05/28",
    value: 985_000_000,
  },
  {
    id: "L-1041",
    customer: "مریم کاظمی | Maryam Kazemi",
    phone: "0935***8871",
    car: "Kia Sportage · 1396",
    stage: "visit",
    source: c("تماس تلفنی", "Phone call"),
    owner: "رضا امینی | Reza Amini",
    date: "1405/05/28",
    value: 3_450_000_000,
  },
  {
    id: "L-1040",
    customer: "حسین نوری | Hossein Nouri",
    phone: "0901***2233",
    car: "Quick S · 1402",
    stage: "new",
    source: c("اینستاگرام", "Instagram"),
    owner: "—",
    date: "1405/05/27",
    value: 512_000_000,
  },
  {
    id: "L-1039",
    customer: "زهرا فتحی | Zahra Fathi",
    phone: "0917***9021",
    car: "Tiggo 8 Pro · 1401",
    stage: "contacted",
    source: c("سایت", "Website"),
    owner: "سارا محمدی | Sara Mohammadi",
    date: "1405/05/27",
    value: 4_650_000_000,
  },
  {
    id: "L-1038",
    customer: "امیر شریفی | Amir Sharifi",
    phone: "0938***1177",
    car: "Dena Plus · 1401",
    stage: "won",
    source: c("معرفی مشتری", "Referral"),
    owner: "رضا امینی | Reza Amini",
    date: "1405/05/26",
    value: 895_000_000,
  },
  {
    id: "L-1037",
    customer: "نگار احمدی | Negar Ahmadi",
    phone: "0919***4502",
    car: "Corolla GLI · 1394",
    stage: "lost",
    source: c("سایت", "Website"),
    owner: "مهدی کریمی | Mehdi Karimi",
    date: "1405/05/25",
    value: 3_150_000_000,
  },
  {
    id: "L-1036",
    customer: "بابک صادقی | Babak Sadeghi",
    phone: "0921***3390",
    car: "Cerato 2000 · 1396",
    stage: "visit",
    source: c("دیوار", "Divar"),
    owner: "مهدی کریمی | Mehdi Karimi",
    date: "1405/05/25",
    value: 2_450_000_000,
  },
  {
    id: "L-1035",
    customer: "فاطمه یزدی | Fatemeh Yazdi",
    phone: "0930***7754",
    car: "X33 Sport · 1399",
    stage: "negotiation",
    source: c("سایت", "Website"),
    owner: "سارا محمدی | Sara Mohammadi",
    date: "1405/05/24",
    value: 1_320_000_000,
  },
];

export type Inspection = {
  id: string;
  car: string;
  expert: string;
  score: number;
  result: "pending" | "passed" | "failed";
  docs: "complete" | "missing";
  date: string;
};

export const inspections: Inspection[] = [
  {
    id: "INS-8841",
    car: "Peugeot 207 · 1401",
    expert: "کارشناس: محسن پاکدل | M. Pakdel",
    score: 92,
    result: "passed",
    docs: "complete",
    date: "1405/05/22",
  },
  {
    id: "INS-8840",
    car: "Tiggo 8 Pro · 1401",
    expert: "کارشناس: محسن پاکدل | M. Pakdel",
    score: 93,
    result: "passed",
    docs: "complete",
    date: "1405/05/21",
  },
  {
    id: "INS-8839",
    car: "Zamyad Pickup · 1400",
    expert: "کارشناس: لیلا صبوری | L. Sabouri",
    score: 74,
    result: "pending",
    docs: "missing",
    date: "1405/05/21",
  },
  {
    id: "INS-8838",
    car: "Samand LX · 1399",
    expert: "کارشناس: لیلا صبوری | L. Sabouri",
    score: 78,
    result: "passed",
    docs: "missing",
    date: "1405/05/20",
  },
  {
    id: "INS-8837",
    car: "Tucson IX35 · 1395",
    expert: "کارشناس: آرش وحیدی | A. Vahidi",
    score: 81,
    result: "passed",
    docs: "complete",
    date: "1405/05/19",
  },
  {
    id: "INS-8836",
    car: "Pride 131 · 1392",
    expert: "کارشناس: آرش وحیدی | A. Vahidi",
    score: 48,
    result: "failed",
    docs: "missing",
    date: "1405/05/18",
  },
];

export const inspectionSections = [
  { fa: "موتور و انتقال قدرت", en: "Engine & powertrain", score: 94 },
  { fa: "بدنه و رنگ", en: "Body & paint", score: 88 },
  { fa: "سیستم تعلیق و ترمز", en: "Suspension & brakes", score: 91 },
  { fa: "برق و تجهیزات", en: "Electrical & equipment", score: 96 },
  { fa: "داخل کابین", en: "Interior", score: 90 },
  { fa: "لاستیک و رینگ", en: "Tyres & wheels", score: 84 },
];

export type StaffUser = {
  id: string;
  name: string;
  role: "admin" | "sales" | "inspector" | "finance";
  branch: { fa: string; en: string };
  phone: string;
  status: "active" | "disabled";
};

export const staff: StaffUser[] = [
  {
    id: "U-01",
    name: "سارا محمدی | Sara Mohammadi",
    role: "sales",
    branch: c("تهران - سعادت‌آباد", "Tehran - Saadatabad"),
    phone: "0912***1180",
    status: "active",
  },
  {
    id: "U-02",
    name: "رضا امینی | Reza Amini",
    role: "sales",
    branch: c("تهران - شریعتی", "Tehran - Shariati"),
    phone: "0912***4471",
    status: "active",
  },
  {
    id: "U-03",
    name: "محسن پاکدل | Mohsen Pakdel",
    role: "inspector",
    branch: c("تهران - مرکز کارشناسی", "Tehran - Inspection hub"),
    phone: "0935***9902",
    status: "active",
  },
  {
    id: "U-04",
    name: "لیلا صبوری | Leila Sabouri",
    role: "inspector",
    branch: c("اصفهان", "Isfahan"),
    phone: "0913***2214",
    status: "active",
  },
  {
    id: "U-05",
    name: "مهدی کریمی | Mehdi Karimi",
    role: "sales",
    branch: c("مشهد", "Mashhad"),
    phone: "0915***7788",
    status: "disabled",
  },
  {
    id: "U-06",
    name: "نیما برزگر | Nima Barzegar",
    role: "finance",
    branch: c("ستاد مرکزی", "HQ"),
    phone: "0921***5510",
    status: "active",
  },
  {
    id: "U-07",
    name: "شیما راد | Shima Rad",
    role: "admin",
    branch: c("ستاد مرکزی", "HQ"),
    phone: "0938***3301",
    status: "active",
  },
];

export const salesTrend = [
  { month: "فروردین|Far", sales: 42, revenue: 68 },
  { month: "اردیبهشت|Ord", sales: 51, revenue: 81 },
  { month: "خرداد|Kho", sales: 47, revenue: 74 },
  { month: "تیر|Tir", sales: 63, revenue: 98 },
  { month: "مرداد|Mor", sales: 58, revenue: 92 },
  { month: "شهریور|Sha", sales: 71, revenue: 118 },
];

export const pipeline = [
  { stage: "stage.new", count: 128 },
  { stage: "stage.contacted", count: 94 },
  { stage: "stage.visit", count: 61 },
  { stage: "stage.negotiation", count: 34 },
  { stage: "stage.won", count: 19 },
];

export const brandMix = [
  { name: "Peugeot", value: 28 },
  { name: "Kia", value: 21 },
  { name: "Iran Khodro", value: 18 },
  { name: "Hyundai", value: 14 },
  { name: "Chery", value: 11 },
  { name: "Other", value: 8 },
];

export function bi(value: string, locale: "fa" | "en") {
  const parts = value.split("|");
  const fa = parts[0] ?? value;
  const en = parts[1] ?? fa;
  return locale === "fa" ? fa : en;
}
