export function formatTaka(amount: number): string {
  return `${new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(amount)} টাকা`;
}

export function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

export function getChangeLabel(
  dir: "up" | "down" | "flat",
  pct: number,
): string {
  const number = new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(pct);

  if (dir === "up") return `▲ ${number}%`;
  if (dir === "down") return `▼ ${number}%`;

  return `— ${number}%`;
}