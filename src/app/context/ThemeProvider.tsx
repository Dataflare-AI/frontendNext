"use client";

import React, { useEffect, ReactNode } from "react";

import data from "../../../data.json";

const THEME_KEY = "theme";
export const ThemeContext = React.createContext({});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [customTheme, setCustomTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem(THEME_KEY);
      if (theme) {
        return JSON.parse(theme);
      }
    }
    return {};
  });

  function updateTheme(theme: { primary: string }) {
    setCustomTheme({
      primary: theme.primary,
      // secondary: theme.secondary,
    });
  }

  useEffect(() => {
    const style = document.documentElement.style;
    const cssVariables = [
      {
        name: "--primary",
        value: customTheme?.primary ?? "black",
      },
    ];
    cssVariables.forEach((variable) => {
      style.setProperty(variable.name, variable.value);
    });
  }, [customTheme]);

  function mockDataFetch() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }

  useEffect(() => {
    mockDataFetch().then((theme) => {
      updateTheme(theme as { primary: string });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(customTheme));
  }, [customTheme]);

  return (
    <ThemeContext.Provider value={{ customTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
