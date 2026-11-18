# generaltranslation: `formatListToParts` / `formatList` mismatch repro

Minimal reproduction: for the same list, `formatListToParts` picks a different
conjunction than `formatList` in Spanish and Hebrew.

## Run

Requires Node.js 18+ (any version with `Intl.ListFormat`).

```sh
npm install
npm run repro
```

The script exits with code 1 while the mismatch is present.

## Output (generaltranslation 9.5.12, Node v24.18.0, ICU 78.3, CLDR 48.0, macOS arm64)

```
BUG  Spanish "and" (y -> e before an "i" sound)
     formatList:        "Fernando e Isabel"
     formatListToParts: "Fernando y Isabel"
BUG  Spanish "or" (o -> u before an "o" sound)
     formatList:        "siete u ocho"
     formatListToParts: "siete o ocho"
BUG  Spanish "or" with numbers
     formatList:        "7 u 8"
     formatListToParts: "7 o 8"
BUG  Hebrew "and" (attached to Hebrew words, no hyphen)
     formatList:        "אבא ואמא"
     formatListToParts: "אבא ו-אמא"

GT instance (targetLocale es): ["Fernando"," y ","Isabel"]
```
