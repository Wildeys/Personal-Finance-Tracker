# Personal Finance Tracker

A React Native (Expo) app for tracking income and expenses on your phone. Log transactions locally, see a running balance on the Home dashboard, and manage categories and preferences in Settings.

Data stays on the device via MobX and AsyncStorage. There is no backend. Transactions remain available offline and survive app restarts.

## Getting started

**Requirements:** Node.js LTS, Yarn 1, [Expo Go](https://expo.dev/go) on your phone. Exact environment and library versions are listed in [requirements.txt](./requirements.txt). Install with Yarn (this is not a pip file).

Repo: [https://github.com/Wildeys/Personal-Finance-Tracker](https://github.com/Wildeys/Personal-Finance-Tracker)

```bash
git clone https://github.com/Wildeys/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker
yarn install
yarn start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). Phone and computer should be on the same Wi-Fi network.

Other commands:

```bash
yarn start --clear   # restart Metro with a clean cache
yarn lint
yarn format
```

Use **Yarn only** in this project (do not mix with npm).

## Features

- **Home dashboard** — current balance, income and expense totals, a time-of-day greeting, the last 5 transactions, and a “View all” link
- **Add transaction** — income or expense toggle, amount, category grid, and an optional note (max 120 characters). The form uses React Hook Form and Zod (amount must be greater than 0)
- **Read / delete** — FlashList on Home and on the full Transactions screen; each row has a delete button with a confirmation prompt
- **Categories** — defaults are Food, Transport, Utilities, Shopping, Health, Entertainment, Salary, Work, and Other. Settings lets you add or remove categories and blocks duplicate names
- **Preferences** — currency (MVR Rf or USD), light / dark / system theme, and English / Arabic. Switching to Arabic asks for an app restart so layout direction can update
- **Persistence** — `FinanceStore` uses `makePersistable` so transactions, categories, and currency survive reload
- **Demo login** — any email and password (6+ characters). The password is not saved on the device. Profile is available from the Home avatar (account details and sign out)
- **Data control** — clear all transactions from Settings



## Screenshots


| Home | Add Transaction | Settings | Navigation |
| ---- | --------------- | -------- | ---------- |
| ![Home](docs/screenshots/home.png) | ![Add Transaction](docs/screenshots/
add-transaction.png) | ![Settings](docs/screenshots/settings.png) | !
[Transactions](docs/screenshots/transactions.png) |
## Technologies used

- **Frameworks:** React Native 0.81, Expo SDK 54, Expo Router (file-based tabs)
- **State:** MobX, mobx-persist-store, AsyncStorage
- **UI / forms:** NativeWind (Tailwind CSS), FlashList, React Hook Form, Zod
- **i18n:** i18next / react-i18next
- **APIs:** none for finance data (local only). The starter `API_URL` points at dummyjson and is unused



## Known issues and future improvements

- Demo login accepts any valid email and password (6+ characters). There is no backend.
- Future: budgets or charts and CSV export,



## Project layout

```
src/
├── app/(app)/           # Home, Add Transaction, Settings tabs
├── components/          # transaction form + list item + UI kit
├── stores/              # MobX stores (auth, finance, theme, language)
└── translations/        # en.json, ar.json
```



## License

Private assessment project.