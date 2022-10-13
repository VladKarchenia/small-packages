export const breakpoints = {
  initial: 0,
  xxs: 375,
  xs: 414,
  sm: 768,
  md: 992,
  lg: 1280,
  xl: 1440,
  xxl: 1920,
};

export type Breakpoint = keyof typeof breakpoints;

export const mediaQueries = {
  xxs: `only screen and (min-width: ${breakpoints.xxs}px)`,
  xs: `only screen and (min-width: ${breakpoints.xs}px)`,
  sm: `only screen and (min-width: ${breakpoints.sm}px)`,
  md: `only screen and (min-width: ${breakpoints.md}px)`,
  lg: `only screen and (min-width: ${breakpoints.lg}px)`,
  xl: `only screen and (min-width: ${breakpoints.xl}px)`,
  xxl: `only screen and (min-width: ${breakpoints.xxl}px)`,

  "max-xxs": `only screen and (max-width: ${breakpoints.xxs - 1}px)`,
  "max-xs": `only screen and (max-width: ${breakpoints.xs - 1}px)`,
  "max-sm": `only screen and (max-width: ${breakpoints.sm - 1}px)`,
  "max-md": `only screen and (max-width: ${breakpoints.md - 1}px)`,
  "max-lg": `only screen and (max-width: ${breakpoints.lg - 1}px)`,
  "max-xl": `only screen and (max-width: ${breakpoints.xl - 1}px)`,
  "max-xxl": `only screen and (max-width: ${breakpoints.xxl - 1}px)`,

  supportsHover: "(hover: hover)",
  isTouchDevice: "(pointer: coarse)",

  reduceMotion: "(prefers-reduced-motion: reduce)",
};

export type MediaQuery = keyof typeof mediaQueries;
