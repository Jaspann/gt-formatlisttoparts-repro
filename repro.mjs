import { GT, formatList, formatListToParts } from "generaltranslation";

const cases = [
  {
    label: 'Spanish "and" (y -> e before an "i" sound)',
    items: ["Fernando", "Isabel"],
    options: { locales: "es" },
  },
  {
    label: 'Spanish "or" (o -> u before an "o" sound)',
    items: ["siete", "ocho"],
    options: { locales: "es", type: "disjunction" },
  },
  {
    label: 'Spanish "or" with numbers',
    items: [7, 8],
    options: { locales: "es", type: "disjunction" },
  },
  {
    label: 'Hebrew "and" (attached to Hebrew words, no hyphen)',
    items: ["אבא", "אמא"],
    options: { locales: "he" },
  },
];

let mismatches = 0;
for (const { label, items, options } of cases) {
  const expected = formatList(items, options);
  const actual = formatListToParts(items, options).join("");
  const ok = expected === actual;
  if (!ok) mismatches++;
  console.log(`${ok ? "OK  " : "BUG "} ${label}`);
  console.log(`     formatList:        ${JSON.stringify(expected)}`);
  console.log(`     formatListToParts: ${JSON.stringify(actual)}`);
}

const gt = new GT({ targetLocale: "es" });
console.log(
  "\nGT instance (targetLocale es):",
  JSON.stringify(gt.formatListToParts(["Fernando", "Isabel"])),
);

console.log(
  `\nnode ${process.version}, ICU ${process.versions.icu}, CLDR ${process.versions.cldr}`,
);
console.log(`${mismatches} of ${cases.length} cases differ`);
