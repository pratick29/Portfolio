export const logTypes = {
  building: {
    label: "building",
    dot: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
  },
  exploring: {
    label: "exploring",
    dot: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-400",
  },
  learning: {
    label: "learning",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  shipped: {
    label: "shipped",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
};

export const logEntries = [
  {
    id: "log-building-profskor",
    date: "2026-08",
    type: "building",
    text: "ProfSkor — next Pratick Labs product, in development.",
  },
  {
    id: "log-shipped-klippy",
    date: "2026-07",
    type: "shipped",
    text: "Klippy — first Pratick Labs product shipped.",
  },
  {
    id: "log-exploring-ai-tools",
    date: "2026-07",
    type: "exploring",
    text: "AI tooling and developer workflows at Pratick Labs.",
  },
  {
    id: "log-learning-ml",
    date: "2026-06",
    type: "learning",
    text: "Machine learning pipelines with scikit-learn.",
  },
  {
    id: "log-shipped-ckd",
    date: "2026-05",
    type: "shipped",
    text: "Chronic Kidney Disease prediction model — 85% accuracy on 400+ records.",
  },
];