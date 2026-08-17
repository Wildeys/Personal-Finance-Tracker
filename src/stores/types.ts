export type UIAppearance = "System" | "Light" | "Dark";
export type AppearanceMode = "light" | "dark";

export type Language = "en" | "dh";
export type UILanguage = "English" | "Dhivehi";

export type PVoid = Promise<void>;

export interface IStore {
  hydrate?: () => PVoid;
}
