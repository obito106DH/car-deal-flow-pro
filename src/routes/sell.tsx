import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
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
import { useI18n } from "@/lib/i18n";
import { bi, brands } from "@/lib/mock-data";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "فروش خودرو با کارشناسی رایگان | کسری موتورز" },
      {
        name: "description",
        content:
          "اطلاعات خودرو را ثبت کنید، قیمت پیشنهادی کارشناسی‌شده بگیرید و نوبت کارشناسی رایگان بگذارید.",
      },
      { property: "og:title", content: "فروش خودرو با کارشناسی رایگان | کسری موتورز" },
      { property: "og:description", content: "قیمت‌گذاری کارشناسی و نوبت کارشناسی رایگان خودرو." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const { t, locale, fmt } = useI18n();
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("Peugeot");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(1400);
  const [km, setKm] = useState(60_000);
  const [condition, setCondition] = useState("clean");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const estimate = useMemo(() => {
    const base = 1_500_000_000;
    const yearFactor = 1 + (year - 1395) * 0.09;
    const kmFactor = Math.max(0.55, 1 - km / 400_000);
    const cond = condition === "clean" ? 1 : condition === "minor" ? 0.9 : 0.78;
    return Math.round((base * yearFactor * kmFactor * cond) / 5_000_000) * 5_000_000;
  }, [year, km, condition]);

  const steps = [t("sell.step1"), t("sell.step2"), t("sell.step3")];

  return (
    <SiteShell>
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <h1 className="text-2xl font-black md:text-3xl">{t("sell.title")}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{t("sell.sub")}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:px-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <ol className="flex items-center gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    i <= step
                      ? "surface-teal text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="size-4" /> : fmt(i + 1)}
                </span>
                <span className="hidden text-xs font-semibold sm:block">{s}</span>
                {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
              </li>
            ))}
          </ol>

          <div className="mt-8 space-y-5">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label>{t("cars.brand")}</Label>
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b} value={bi(b, "en")}>
                          {bi(b, locale)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{locale === "fa" ? "مدل" : "Model"}</Label>
                  <Input value={model} onChange={(e) => setModel(e.target.value)} />
                </div>
                <div className="space-y-3">
                  <Label>
                    {t("car.year")}: <span className="num">{fmt(year)}</span>
                  </Label>
                  <Slider
                    value={[year]}
                    min={1385}
                    max={1404}
                    step={1}
                    onValueChange={(values) => {
                      const value = values[0];
                      if (value !== undefined) setYear(value);
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <Label>
                    {t("car.km")}: <span className="num">{fmt(km)}</span> km
                  </Label>
                  <Slider
                    value={[km]}
                    min={0}
                    max={400_000}
                    step={5_000}
                    onValueChange={(values) => {
                      const value = values[0];
                      if (value !== undefined) setKm(value);
                    }}
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label>{locale === "fa" ? "وضعیت بدنه و رنگ" : "Body & paint condition"}</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clean">
                        {locale === "fa" ? "بدون رنگ" : "No repaint"}
                      </SelectItem>
                      <SelectItem value="minor">
                        {locale === "fa" ? "یک تا دو لکه رنگ" : "One or two panels repainted"}
                      </SelectItem>
                      <SelectItem value="major">
                        {locale === "fa" ? "رنگ‌شدگی زیاد / تصادفی" : "Heavy repaint / accident"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{locale === "fa" ? "توضیحات فنی" : "Technical notes"}</Label>
                  <Textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>{t("sell.name")}</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t("sell.phone")}</Label>
                  <Input
                    inputMode="tel"
                    className="num"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              {t("sell.back")}
            </Button>
            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)}>{t("sell.next")}</Button>
            ) : (
              <Button onClick={() => toast.success(t("sell.done"))}>{t("sell.submit")}</Button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-muted-foreground">{t("sell.estimate")}</p>
          <p className="num mt-3 text-3xl font-black text-primary-deep">{fmt(estimate)}</p>
          <p className="text-xs text-muted-foreground">{t("car.toman")}</p>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            {locale === "fa"
              ? "قیمت نهایی پس از کارشناسی ۱۶۷ نقطه‌ای و بازدید حضوری تعیین می‌شود."
              : "The final price is set after the 167-point inspection and an on-site visit."}
          </p>
        </aside>
      </div>
    </SiteShell>
  );
}
