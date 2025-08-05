import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("spektra-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("spektra-theme", theme);
    set({ theme });
  },
}));
