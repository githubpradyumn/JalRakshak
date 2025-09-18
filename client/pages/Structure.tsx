import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Hammer, Droplets, Ruler, Layers, Wrench } from "lucide-react";

const glass =
  "rounded-2xl border border-black bg-white/20 shadow-xl ring-1 ring-black/20 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:ring-white/10";

type StructureInfo = {
  name: string;
  description: string;
  suitability: string[];
  typicalDims: string;
  materials: string[];
  estCost: string;
  maintenance: string[];
  notes?: string;
};

const CATALOG: StructureInfo[] = [
  {
    name: "RCC tank",
    description: "Reinforced concrete storage tank with first-flush and filtration suitable for rooftop collection.",
    suitability: ["Urban rooftops", "Limited ground space", "Potable with treatment"],
    typicalDims: "2m × 2m × 2.5m (10 m³) or modular per demand",
    materials: ["RCC", "PVC/HDPE pipes", "First-flush valve", "Sand/charcoal filter"],
    estCost: "₹ 60,000 – ₹ 1,80,000 for 5–15 m³ (varies by region)",
    maintenance: ["Quarterly cleaning", "Filter media replacement yearly", "Inspect for cracks/leaks"],
  },
  {
    name: "Recharge pit",
    description: "Percolation pit to recharge groundwater using filtered rooftop/yard runoff.",
    suitability: ["Areas with permeable soil", "Space available in setback", "Reduce flooding"],
    typicalDims: "1.5m × 1.5m × 2–3m depth with gravel and sand filter",
    materials: ["Bricks/RCC rings", "Gravel & sand", "Geo-textile", "PVC pipes"],
    estCost: "₹ 25,000 – ₹ 70,000 depending on depth & lining",
    maintenance: ["Desilt before monsoon", "Inspect inlets", "Replace clogged media as needed"],
  },
  {
    name: "Percolation trench",
    description: "Linear trench to intercept and recharge runoff along plot periphery.",
    suitability: ["Large plots", "Parking and landscapes", "Reduce surface runoff"],
    typicalDims: "0.6–1m wide × 1.5–2m deep, length as required",
    materials: ["Bricks/stones", "Gravel/sand", "Perforated pipes"],
    estCost: "₹ 1,200 – ₹ 2,500 per running meter",
    maintenance: ["Desilt chambers", "Remove debris", "Maintain vegetative cover"],
  },
  {
    name: "Rain barrel",
    description: "Small capacity HDPE barrel connected to downpipe for basic non-potable reuse.",
    suitability: ["Small homes", "Gardening", "Low cost"],
    typicalDims: "200–500 L drums, elevate on stand with tap",
    materials: ["HDPE barrel", "Tap & overflow pipe", "Leaf screen"],
    estCost: "₹ 3,000 – ₹ 10,000",
    maintenance: ["Clean screen monthly", "Flush after first rains", "Keep covered"],
  },
  {
    name: "Recharge well",
    description: "Deep bore with recharge filter to inject treated runoff into aquifer where allowed.",
    suitability: ["High runoff sites", "Regulatory approval", "Deeper water table"],
    typicalDims: "150–300mm dia to 30–60m depth with filter pack",
    materials: ["PVC casing", "Gravel pack", "Silt trap", "Filter media"],
    estCost: "₹ 80,000 – ₹ 2,50,000",
    maintenance: ["Desilt traps", "Test water quality periodically", "Regulatory compliance"],
  },
  {
    name: "Modular underground tank",
    description: "Subsurface modular PP crate tank wrapped in geotextile for high-volume storage under driveways/yards.",
    suitability: ["Space constraints", "Driveway/parking underlay", "Large storage"],
    typicalDims: "Modular crates assembled to 5–50 m³, burial depth 1–2.5 m",
    materials: ["PP crates", "Geotextile", "HDPE liner (optional)", "Inlet/outlet pipes", "Access chamber"],
    estCost: "₹ 3,500 – ₹ 6,000 per m³ + excavation",
    maintenance: ["Inspect access chamber", "Flush silt trap pre-monsoon", "Check liner integrity"],
  },
  {
    name: "Recharge shaft",
    description: "Vertical shaft with filter media to rapidly recharge deeper strata; used where water table is deep.",
    suitability: ["Large campuses", "High runoff areas", "Deep aquifer recharge"],
    typicalDims: "0.6–1 m dia × 10–20 m depth with gravel/sand filter",
    materials: ["Precast RCC rings", "Gravel/sand", "Silt trap", "PVC pipes"],
    estCost: "₹ 1,20,000 – ₹ 3,00,000 (site dependent)",
    maintenance: ["Desilt silt traps", "Inspect media annually", "Ensure safety cover"],
  },
  {
    name: "Infiltration gallery",
    description: "Subsurface gravel trench with perforated pipes to distribute and infiltrate filtered runoff.",
    suitability: ["Sandy soils", "Landscape areas", "Distributed recharge"],
    typicalDims: "0.8–1 m wide × 1.5–2 m deep; length as required",
    materials: ["Perforated HDPE pipes", "Gravel", "Geotextile", "Inspection ports"],
    estCost: "₹ 1,800 – ₹ 3,000 per running meter",
    maintenance: ["Vacuum clean inspection ports", "Replace clogged sections", "Maintain pretreatment"],
  },
  {
    name: "Soak pit",
    description: "Circular percolation pit filled with brick bats/gravel for small plot recharge.",
    suitability: ["Individual houses", "Low budget", "Non-clayey soils"],
    typicalDims: "1–1.2 m dia × 2–3 m depth",
    materials: ["Brick bats", "Gravel", "PVC pipe", "Top slab with cover"],
    estCost: "₹ 15,000 – ₹ 40,000",
    maintenance: ["Remove silt annually", "Prevent direct debris entry", "Cover securely"],
  },
  {
    name: "Filter chamber",
    description: "Two-chamber sand/charcoal filter for pretreatment of rooftop runoff before storage/recharge.",
    suitability: ["All systems as pretreatment", "Roof runoff polishing"],
    typicalDims: "0.6 m × 0.6 m × 0.9 m per chamber (customizable)",
    materials: ["Bricks/RCC", "Sand", "Gravel", "Charcoal", "Mesh screens"],
    estCost: "₹ 8,000 – ₹ 25,000",
    maintenance: ["Replace media yearly", "Clean screens monthly", "Bypass during first flush if needed"],
  },
];

function findStructure(q: string): StructureInfo | null {
  const norm = q.trim().toLowerCase();
  if (!norm) return null;
  const exact = CATALOG.find((s) => s.name.toLowerCase() === norm);
  if (exact) return exact;
  const fuzzy = CATALOG.find((s) => s.name.toLowerCase().includes(norm));
  return fuzzy ?? null;
}

export default function Structure() {
  const [query, setQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const info = useMemo(() => findStructure(query), [query]);

  const handleShowInfo = () => {
    if (query.trim()) {
      setShowInfo(true);
    }
  };

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-center justify-between text-black dark:text-blue-100">
        <div className="flex items-center gap-2">
          <Hammer className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          <span className="text-xl font-bold">Structure</span>
        </div>
        <div className="text-xs text-blue-900/70 dark:text-blue-100/70">Rainwater harvesting structures</div>
      </header>

      <section className={`mb-6 p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20 text-black dark:text-blue-100`}>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
          <Layers className="h-5 w-5" /> Choose or type a structure
        </h2>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); handleShowInfo(); }}>
          <input
            list="structures"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 flex-1 rounded-lg border border-black bg-white/40 px-3 text-sm text-black placeholder-black/50 outline-none ring-1 ring-black/20 backdrop-blur focus:border-black focus:ring-black/30 dark:border-white/10 dark:bg-white/10 dark:text-blue-100"
            placeholder="Enter structure name (e.g., RCC tank, Recharge pit, Rain barrel)"
          />
          <datalist id="structures">
            {CATALOG.map((s) => (
              <option key={s.name} value={s.name} />
            ))}
          </datalist>
          <Button 
            type="submit"
            className="h-10 shrink-0 rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700"
            disabled={!query.trim()}
          >
            Show Info
          </Button>
        </form>
      </section>

      {showInfo ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
            <h3 className="mb-2 text-base font-semibold text-black dark:text-blue-100">Overview</h3>
            {info ? (
              <p className="text-black/90 dark:text-blue-100/90">{info.description}</p>
            ) : (
              <p className="text-red-600 dark:text-red-400">Structure not found. Please check the name and try again.</p>
            )}
          </div>
          <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
            <h3 className="mb-2 text-base font-semibold text-black dark:text-blue-100">Suitability</h3>
            <ul className="list-disc pl-5 text-black/90 dark:text-blue-100/90">
              {(info?.suitability ?? ["—"]).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
            <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-blue-900 dark:text-blue-100">
              <Ruler className="h-4 w-4" /> Typical dimensions
            </h3>
            <p className="text-black/90 dark:text-blue-100/90">{info?.typicalDims ?? "—"}</p>
          </div>
          <div className={`p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
            <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-blue-900 dark:text-blue-100">
              <Wrench className="h-4 w-4" /> Materials & installation
            </h3>
            <p className="text-black/90 dark:text-blue-100/90">{info ? info.materials.join(", ") : "—"}</p>
            <p className="mt-2 text-blue-900/90 dark:text-blue-100/90">Estimated cost: {info?.estCost ?? "—"}</p>
            <p className="mt-1 text-xs text-blue-900/60 dark:text-blue-100/60">Costs vary by region and specifications.</p>
          </div>
          <div className={`md:col-span-2 p-6 ${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
            <h3 className="mb-2 text-base font-semibold text-black dark:text-blue-100">Maintenance</h3>
            <ul className="list-disc pl-5 text-black/90 dark:text-blue-100/90">
              {(info?.maintenance ?? ["—"]).map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className={`p-8 ${glass} text-center`}>
          <div className="flex flex-col items-center gap-4">
            <Layers className="h-16 w-16 text-blue-400 dark:text-blue-500" />
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Select a Structure</h3>
            <p className="text-blue-700 dark:text-blue-300 max-w-md">
              Enter a structure name above and click "Show Info" to view detailed information about rainwater harvesting structures.
            </p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-blue-600 dark:text-blue-400">
              <span>• RCC tank</span>
              <span>• Recharge pit</span>
              <span>• Rain barrel</span>
              <span>• Recharge well</span>
              <span>• Soak pit</span>
              <span>• Filter chamber</span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
