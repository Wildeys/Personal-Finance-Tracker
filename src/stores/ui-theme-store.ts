import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { colorScheme } from 'nativewind';
import { Appearance } from 'react-native';
import type { Theme } from '@react-navigation/native';
import { DarkTheme, LightTheme } from '@/lib/theme';
import { AppearanceMode, PVoid, UIAppearance } from './types';

export class UIThemeStore {
  isSystemAppearance = false;
  appearance: AppearanceMode = "light";
  systemColorScheme: AppearanceMode | null = Appearance.getColorScheme() || 'light';
  private appearanceListener: any = null;

  private appearanceFromInternalToUI = (v: AppearanceMode): UIAppearance => {
    return v === "light" ? "Light" : "Dark";
  };

  private appearanceFromUIToInternal = (v: UIAppearance): AppearanceMode => {
    return v === "Light" ? "light" : "dark";
  };

  get selectedTheme(): UIAppearance {
    if (this.isSystemAppearance) return 'System';
    return this.appearanceFromInternalToUI(this.appearance);
  }

  setSelectedTheme = (theme: UIAppearance): void => {
    if (theme === 'System') {
      this.isSystemAppearance = true;
    } else {
      this.isSystemAppearance = false;
      this.appearance = this.appearanceFromUIToInternal(theme);
    }
    
    this.applyNativeWind();
  };

  private applyNativeWind = (): void => {
    const nativeWindTheme = this.isSystemAppearance
      ? 'system'
      : this.appearance;
    colorScheme.set(nativeWindTheme);
  };

  get navigationTheme(): Theme {
    if (this.isSystemAppearance) {
      return this.systemColorScheme === 'dark' ? DarkTheme : LightTheme;
    }
    return this.appearance === 'dark' ? DarkTheme : LightTheme;
  }

  get effectiveAppearance(): AppearanceMode {
    if (this.isSystemAppearance) {
      return this.systemColorScheme || 'light';
    }
    return this.appearance;
  }

  private setupAppearanceListener = () => {
    if (this.appearanceListener) {
      this.appearanceListener.remove();
    }

    this.appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      this.systemColorScheme = colorScheme || 'light';
    });
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UITheme",
      properties: [
        "isSystemAppearance",
        "appearance",
      ],
      debugMode: false,
    });
    
    this.setupAppearanceListener();
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
    this.applyNativeWind();
  };
}
