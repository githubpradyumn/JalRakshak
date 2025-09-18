import { useEffect, useMemo, useState } from "react";
import { Droplets, Gauge, MapPin, Users, Ruler, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

type Inputs = {
  name: string;
  location: string;
  lat?: number;
  lon?: number;
  roofArea: number; // m^2
  dwellers: number;
  openSpace: number; // m^2
  annualRainfall?: number; // mm, optional override
};

type RainAlert = {
  expected: boolean;
  mmNext24h: number;
  message?: string;
};

const glass =
  "rounded-2xl border border-black bg-white/20 shadow-xl ring-1 ring-black/20 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:ring-white/10";

export default function Analysis() {
  const [inputs, setInputs] = useState<Inputs>({
    name: "Resident",
    location: "New Delhi, IN",
    lat: undefined,
    lon: undefined,
    roofArea: 0,
    dwellers: 0,
    openSpace: 0,
    annualRainfall: 0,
  });
  const [alert, setAlert] = useState<RainAlert>({ expected: false, mmNext24h: 0 });
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [geoBusy, setGeoBusy] = useState(false);

  const litersPerYear = useMemo(() => {
    const k = 0.8; // runoff coefficient for hard roofs
    const mm = inputs.annualRainfall ?? 800;
    return Math.max(0, Math.round(inputs.roofArea * mm * k)); // 1 mm per m^2 = 1 liter
  }, [inputs.roofArea, inputs.annualRainfall]);

  const structure = useMemo(() => {
    const volumeM3 = Math.max(1, Math.round(litersPerYear / 1000));
    if (volumeM3 <= 10) return `RCC tank ${volumeM3} m³ with first-flush and filter`; 
    return `Recharge pit + storage ${volumeM3} m³ with silt trap`;
  }, [litersPerYear]);

  const estimate = useMemo(() => {
    const volumeM3 = litersPerYear / 1000;
    const tankCostPerM3 = 60; // arbitrary cost index unit
    const rechargeCostBase = 500; // additional works index
    const cost = Math.round(volumeM3 * tankCostPerM3 + rechargeCostBase);
    const dims = `${Math.max(1, Math.round(Math.sqrt(inputs.openSpace)))}m x ${Math.max(1, Math.round(
      Math.sqrt(Math.min(inputs.openSpace, Math.max(1, litersPerYear / 1000)))
    ))}m x 2m (approx)`;
    return { cost, dims };
  }, [litersPerYear, inputs.openSpace]);

  const benefit = useMemo(() => {
    const pricePerKL = 30; // cost index per 1000 liters
    const annualValue = Math.round((litersPerYear / 1000) * pricePerKL);
    const paybackYears = Math.max(1, Math.round(estimate.cost / Math.max(1, annualValue)));
    return { annualValue, paybackYears };
  }, [litersPerYear, estimate.cost]);

  async function geolocate() {
    if (!navigator.geolocation) return;
    setGeoBusy(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setInputs((s) => ({ ...s, lat: latitude, lon: longitude, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
        await fetchAlert(latitude, longitude);
        setGeoBusy(false);
      },
      () => setGeoBusy(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  async function geocodeAndFetch() {
    try {
      if (!inputs.location?.trim()) return;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputs.location)}`;
      const res = await fetch(url);
      const data = (await res.json()) as Array<{ lat: string; lon: string }>;
      if (data[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setInputs((s) => ({ ...s, lat, lon }));
        await fetchAlert(lat, lon);
      }
    } catch (e) {}
  }

  async function fetchAlert(lat?: number, lon?: number) {
    if (lat == null || lon == null) return;
    setLoadingAlert(true);
    try {
      // Using Open-Meteo (no key) to simulate a 24h rain alert
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation&forecast_days=2&timezone=auto`;
      const res = await fetch(url);
      const data = await res.json();
      const pr: number[] = data?.hourly?.precipitation ?? [];
      const mmNext24h = pr.slice(0, 24).reduce((a: number, b: number) => a + (Number(b) || 0), 0);
      const expected = mmNext24h >= 1; // threshold 1 mm
      setAlert({ expected, mmNext24h, message: expected ? "Rain expected in next 24 hours! Prepare your rooftop system." : undefined });
    } catch (e) {
      setAlert({ expected: false, mmNext24h: 0 });
    } finally {
      setLoadingAlert(false);
    }
  }

  useEffect(() => {
    if (inputs.lat && inputs.lon) fetchAlert(inputs.lat, inputs.lon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Local top nav (reuses global navbar overall, this section adds sticky summary) */}
      <div className="mb-6 flex items-center justify-between text-black dark:text-blue-100">
        <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
          <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          <span className="text-xl font-bold">Analysis</span>
        </div>
        <div className="text-xs text-black/70 dark:text-blue-100/70">Rainwater Harvesting Feasibility</div>
      </div>

      {alert.expected && (
        <div className={`${glass} mb-6 flex items-center gap-3 px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
          <Bell className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          <p className="text-sm text-blue-900/90 dark:text-blue-100/90">
            🌧 Rain expected in next 24 hours (~{alert.mmNext24h.toFixed(1)} mm). Prepare your rooftop harvesting system.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form */}
        <section className={`lg:col-span-1 p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-black dark:text-blue-100">
            <Gauge className="h-5 w-5" /> Input Details
          </h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); fetchAlert(inputs.lat, inputs.lon); }}>
            <Field label="Name">
              <input
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                className="w-full h-10 rounded-lg border border-black bg-white/40 px-3 text-sm text-black placeholder-black/50 outline-none ring-1 ring-black/20 backdrop-blur focus:border-black focus:ring-black/30 dark:border-white/10 dark:bg-white/10 dark:text-blue-100"
                placeholder="Your name"
              />
            </Field>
            <Field label="Location">
              <div className="flex items-stretch gap-2">
                <input
                  value={inputs.location}
                  onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                  className="flex-1 h-10 rounded-lg border border-white/30 bg-white/40 px-3 text-sm text-blue-900 placeholder-blue-900/50 outline-none ring-1 ring-white/40 backdrop-blur focus:border-blue-300 focus:ring-blue-200 dark:border-white/10 dark:bg-white/10 dark:text-blue-100"
                  placeholder="City or address"
                />
                <Button type="button" onClick={geocodeAndFetch} className="h-10 shrink-0 rounded-lg bg-blue-600 px-3 text-white hover:bg-blue-700">
                  <MapPin className="mr-2 h-4 w-4" /> Set
                </Button>
              </div>
            </Field>
            <Field label="Roof area (m²)">
              <NumberInput value={inputs.roofArea} onChange={(n) => setInputs({ ...inputs, roofArea: n })} />
            </Field>
            <Field label="Number of dwellers">
              <NumberInput value={inputs.dwellers} onChange={(n) => setInputs({ ...inputs, dwellers: n })} />
            </Field>
            <Field label="Available open space (m²)">
              <NumberInput value={inputs.openSpace} onChange={(n) => setInputs({ ...inputs, openSpace: n })} />
            </Field>
            <Field label="Annual rainfall (mm)">
              <NumberInput value={inputs.annualRainfall ?? 800} onChange={(n) => setInputs({ ...inputs, annualRainfall: n })} />
            </Field>
          </form>
        </section>

        {/* Results */}
        <section className="lg:col-span-2 grid grid-cols-1 gap-6">
          <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
            <h3 className="mb-2 text-base font-semibold text-black dark:text-blue-100">Harvest potential</h3>
            <p className="text-3xl font-extrabold text-black dark:text-blue-300">
              {litersPerYear.toLocaleString()} L/year
            </p>
            <p className="mt-1 text-xs text-black/70 dark:text-blue-100/70">Assumes runoff coefficient 0.8 and selected rainfall.</p>
          </div>
          <div className={`grid grid-cols-1 gap-6 md:grid-cols-2`}>
            <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-black dark:text-blue-100">
                <Ruler className="h-4 w-4" /> Suggested recharge structure
              </h3>
              <p className="text-black/90 dark:text-blue-100/90">{structure}</p>
            </div>
            <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
              <h3 className="mb-2 text-base font-semibold text-black dark:text-blue-100">Dimensions & cost estimate</h3>
              <p className="text-black/90 dark:text-blue-100/90">Approx. dimensions: {estimate.dims}</p>
              <p className="text-black/90 dark:text-blue-100/90">Estimated installation cost: {estimate.cost.toLocaleString()}</p>
            </div>
          </div>
          <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
            <h3 className="mb-2 text-base font-semibold text-black dark:text-blue-100">Cost-benefit analysis</h3>
            <p className="text-black/90 dark:text-blue-100/90">Estimated installation cost: {estimate.cost.toLocaleString()}</p>
            <p className="text-black/90 dark:text-blue-100/90">Annual water value: {benefit.annualValue.toLocaleString()} (index)</p>
            <p className="text-black/90 dark:text-blue-100/90">Estimated payback: ~{benefit.paybackYears} years</p>
          </div>
        </section>
      </div>

      {!alert.expected && (inputs.lat && inputs.lon) && (
        <div className={`mt-6 ${glass} px-4 py-3 text-sm text-black/80 dark:text-blue-100/80`}>
          {loadingAlert ? "Checking rain for next 24 hours..." : "No rain expected in the next 24 hours at your location."}
        </div>
      )}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 inline-block text-black dark:text-blue-100">{label}</span>
      {children}
    </label>
  );
}

function NumberInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <input
      type="number"
      value={value === 0 ? "" : value}  // show empty field if value is 0
      onChange={(e) => {
        const val = e.target.value;
        onChange(val === "" ? 0 : Number(val)); // treat empty as 0 internally
      }}
      className="w-full h-10 rounded-lg border border-black bg-white/40 px-3 text-sm text-black outline-none ring-1 ring-black/20 backdrop-blur focus:border-black focus:ring-black/30 dark:border-white/10 dark:bg-white/10 dark:text-blue-100"
    />
  );
}
