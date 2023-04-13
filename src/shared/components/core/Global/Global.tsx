import React, { useEffect } from "react"
import lazysizes from "lazysizes"
import "lazysizes/plugins/attrchange/ls.attrchange"

import { globalCss, darkTheme } from "@/stitches/config"
import { darkColorsMap } from "@/stitches/theme"

import { IconProvider } from "@/shared/icons"

lazysizes.cfg.loadMode = 1

const globalStyles = () => {
  return globalCss({
    /* Box sizing rules */
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },

    html: {
      WebkitTapHighlightColor: "transparent",
    },

    /* Remove default margin */
    "body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd": {
      margin: 0,
    },

    /* Remove styles on ul, ol elements */
    "ul, ol": {
      listStyle: "none",
      margin: 0,
      padding: 0,
    },

    /* Set core body defaults */
    body: {
      minHeight: `calc(var(--vh) * 100)`,
      fontFamily: "$sans",
      fontStyle: "normal",
      fontStretch: "normal",
      fontWeight: "normal",
      letterSpacing: "0.5px",
      textRendering: "optimizeSpeed",
      lineHeight: 1.5,
      overflowX: "hidden",
      backgroundColor: "$theme-w-n11",
      transition: "150ms ease-out",
    },

    "a, button": {
      color: "inherit",
    },

    /* `<a>` elements that don't have a class get default styles */
    "a:not([class])": {
      transition: "150ms opacity",
      textDecorationSkipInk: "auto",
      textDecorationThickness: "from-font",

      hover: {
        opacity: 0.75,
      },
    },

    s: {
      textDecorationThickness: "from-font",
    },

    /* `<button>` elements that don't have a class get default styles */
    "button:not([class])": {
      appearance: "none",
      background: "transparent",
      border: "none",
      borderRadius: 0,
      padding: 0,
      cursor: "pointer",
      transition: "150ms opacity",

      hover: {
        opacity: 0.75,
      },
    },

    /* Make images easier to work with */
    "img, picture": {
      maxWidth: "100%",
      display: "block",
    },

    /* Inherit font and letterSpacing for inputs and buttons */
    "input, button, textarea, select": {
      font: "inherit",
      letterSpacing: "inherit",
    },

    "strong, b": {
      fontWeight: 500,
    },

    ".svg-sprite": {
      display: "none",
    },

    // 100vh fix in mobile webkit
    // https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
    // Alternative: https://pqina.nl/blog/how-to-prevent-scrolling-the-page-on-ios-safari/
    "html[data-fullscreen-page]": {
      height: "-webkit-fill-available",

      body: {
        height: "100vh",
        minHeight: "-webkit-fill-available",
        overflow: "hidden",
      },
    },

    /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
    "@reduceMotion": {
      "html:focus-within": {
        scrollBehavior: "auto",
      },

      "*, *::before, *::after": {
        animationDuration: "0.01ms !important",
        animationIterationCount: "1 !important",
        transitionDuration: "0.01ms !important",
        scrollBehavior: "auto",
      },
    },

    ".leaflet-control-container .leaflet-routing-container-hide": {
      display: "none",
    },

    ".leaflet-tooltip": {
      width: "max-content",
      maxWidth: 400,
      backgroundColor: "$theme-w-n7",
      borderColor: "$theme-w-n7",
      borderRadius: "$8",
      color: "$theme-b-n3",
      whiteSpace: "normal",
      textAlign: "center",

      before: {
        borderTopColor: "$theme-w-n7",
      },
    },

    // custom scrollbar styles based on the current theme
    "*::-webkit-scrollbar": {
      width: "auto",
    },

    "*::-webkit-scrollbar-track": {
      backgroundColor: "var(--colors-theme-n2-n7)",
    },

    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--colors-theme-n4-n6)",
      border: "3px solid var(--colors-theme-n2-n7)",
      borderRadius: "var(--radii-8)",

      ":hover": {
        backgroundColor: "var(--colors-neutrals-5)",
      },
    },
  })()
}

const pageCoverStyles = globalCss({
  "body::before": {
    content: "''",
    display: "block",
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "$theme-w-n11",
    zIndex: 99999,
  },

  ".render body::before": {
    display: "none",
  },
})

const updateThemeColors = globalCss({
  "@dark": {
    ":root:not(.light)": {
      ...Object.keys(darkTheme.colors).reduce((varSet, currentColorKey) => {
        const currentColor = darkTheme.colors[currentColorKey as keyof typeof darkColorsMap]
        const currentColorValue =
          currentColor.value.substring(0, 1) === "$"
            ? `$colors${currentColor.value}`
            : currentColor.value

        return {
          ...varSet,
          [currentColor.variable]: currentColorValue,
        }
      }, {}),
    },
  },
})

export const Global = ({
  children,
  shouldCoverPage,
}: React.PropsWithChildren<{
  shouldCoverPage?: boolean
}>) => {
  globalStyles()

  if (shouldCoverPage) {
    pageCoverStyles()
  }

  updateThemeColors()

  useEffect(() => {
    if (shouldCoverPage) {
      document.documentElement.classList.add("render")
    }
  }, [shouldCoverPage])

  return (
    <>
      {shouldCoverPage && (
        <noscript>
          <style type="text/css">{"body::before { display: none; }"}</style>
        </noscript>
      )}
      <IconProvider>{children}</IconProvider>
    </>
  )
}
