# Personal Finance Tracker

A React Native (Expo) app for tracking income and expenses on your phone. Transactions are stored locally, so your data is available offline and survives app restarts.

Built on Expo Router, MobX, NativeWind, React Hook Form, and Zod.

## Features

- **Dashboard** — current balance plus income and expense totals
- **Add transaction** — income or expense with amount, category, and optional note
- **Validated form** — React Hook Form + Zod
- **Transaction list** — recent activity with delete
- **Categories** — add and remove categories in Settings
- **Persistence** — MobX + AsyncStorage (data survives reload)
- **Theme & language** — light/dark and English/Arabic. Switching to Arabic asks for an app restart so layout direction can update.
- **Demo login** — any email and password (6+ characters). The password is not saved on the device.

## Screenshots

Add device captures here after running the app:

| Home | Add Transaction | Settings |
| --- | --- | --- |
| ![Home](docs/screenshots/home.png) | ![Add Transaction](docs/screenshots/add-transaction.png) | ![Settings](docs/screenshots/settings.png) |

Place files in `docs/screenshots/` named `home.png`, `add-transaction.png`, and `settings.png`.

## Getting started

**Requirements:** Node.js LTS, Yarn 1, [Expo Go](https://expo.dev/go) on your phone.

```bash
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
