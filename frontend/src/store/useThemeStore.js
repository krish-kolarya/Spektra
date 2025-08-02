import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("spektra-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("spektra-theme", theme);
    set({ theme });
  },
}));
