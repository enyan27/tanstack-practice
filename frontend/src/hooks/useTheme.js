import { create } from "zustand";

const useTheme = create((set) => ({
  theme: localStorage.getItem("daisy-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("daisy-theme", theme);
    set({ theme });
  }
}));

export default useTheme;
