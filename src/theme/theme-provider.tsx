import React, { createContext, useContext, useState } from "react";
import {
  lightTheme as defaultLightTheme,
  darkTheme as defaultDarkTheme,
} from "./theme";

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  background: string;
  text: string;
  borderColor: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  toggleTheme: (customLightTheme?: Theme, customDarkTheme?: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultLightTheme);

  const toggleTheme = (customLightTheme?: Theme, customDarkTheme?: Theme) => {
    setTheme(
      (prevTheme) =>
        prevTheme === defaultLightTheme
          ? customDarkTheme || defaultDarkTheme // Use custom dark theme or default
          : customLightTheme || defaultLightTheme // Use custom light theme or default
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
