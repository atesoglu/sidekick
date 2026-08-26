import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { Theme } from "@carbon/react";
import { useLocalStorage } from "../hooks";

/** Carbon theme tokens. `white`/`g10` are light, `g90`/`g100` are dark. */
export type CarbonTheme = "white" | "g10" | "g90" | "g100";

const LIGHT_THEME: CarbonTheme = "white";
const DARK_THEME: CarbonTheme = "g100";
const STORAGE_KEY = "sidekick.theme-mode";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  theme: CarbonTheme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

function getDefaultMode(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Provides the active Carbon theme to the app and lets consumers toggle
 * between light/dark. Wraps children in Carbon's `<Theme>` component so
 * design tokens (CSS custom properties) cascade to all Carbon components.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useLocalStorage<ThemeMode>(
    STORAGE_KEY,
    getDefaultMode(),
    {
      parse: (v) => (v === "dark" ? "dark" : "light"),
      serialize: (v) => v,
    },
  );
  const theme = mode === "dark" ? DARK_THEME : LIGHT_THEME;

  useEffect(() => {
    // Portaled Carbon overlays (e.g. modals) attach to <body>, not to the
    // <Theme> wrapper element, so mirror the theme class there too.
    document.body.classList.remove("cds--white", "cds--g100");
    document.body.classList.add(`cds--${theme}`);
    document.body.style.colorScheme = mode;
  }, [mode, theme]);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const value = useMemo(
    () => ({ mode, theme, setMode, toggleMode }),
    [mode, theme, setMode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <Theme theme={theme}>{children}</Theme>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeContextValue {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
}

