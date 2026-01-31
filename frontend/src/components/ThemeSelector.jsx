import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import useTheme from "../hooks/useTheme";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
        <PaletteIcon className="size-4" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 mt-2 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap">
        {THEMES.map((item) => (
          <li key={item} className="py-0.5">
            <button className={`flex justify-between ${theme === item ? "bg-primary text-primary-content" : ""}`} onClick={() => setTheme(item)}>
              <span className="capitalize">{item}</span>
              <div className="grid grid-cols-4" data-theme={item}>
                <span className="w-2 h-4 bg-primary/90" />
                <span className="w-2 h-4 bg-secondary" />
                <span className="w-2 h-4 bg-accent" />
                <span className="w-2 h-4 bg-base-100" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
