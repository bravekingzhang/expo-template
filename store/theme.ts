import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

interface ThemeState {
  colorScheme: ColorSchemeName;
  language: 'en' | 'zh';
  setColorScheme: (scheme: ColorSchemeName) => void;
  setLanguage: (lang: 'en' | 'zh') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: Appearance.getColorScheme(),
      language: 'en',
      setColorScheme: (scheme) => {
        Appearance.setColorScheme(scheme);
        set({ colorScheme: scheme });
      },
      setLanguage: (lang) => set({ language: lang }),
      toggleTheme: () => {
        const newScheme = Appearance.getColorScheme() === 'dark' ? 'light' : 'dark';
        Appearance.setColorScheme(newScheme);
        set({ colorScheme: newScheme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// 在应用启动时，从存储中恢复主题设置
useThemeStore.subscribe((state) => {
  if (state.colorScheme) {
    Appearance.setColorScheme(state.colorScheme);
  }
});

// 监听系统主题变化
Appearance.addChangeListener((preferences) => {
  // 只有在系统主题变化且不是由我们的 toggleTheme 触发时才更新
  if (preferences.colorScheme !== useThemeStore.getState().colorScheme) {
    useThemeStore.getState().setColorScheme(preferences.colorScheme);
  }
});
