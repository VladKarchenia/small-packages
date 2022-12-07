import React, { useEffect } from "react"
import { globalCss } from "@/config"
import { Colors } from "@/config/theme/types"
import { IconProvider } from "@/shared/icons"

import lazysizes from "lazysizes"
import "lazysizes/plugins/attrchange/ls.attrchange"

lazysizes.cfg.loadMode = 1

const globalStyles = (backgroundColor?: Colors) => {
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
      letterSpacing: "0.5px",
      textRendering: "optimizeSpeed",
      lineHeight: 1.5,
      overflowX: "hidden",
      backgroundColor: backgroundColor ? `$${backgroundColor}` : "",
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
      border: 0,
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

    /* Inherit fonts for inputs and buttons */
    "input, button, textarea, select": {
      font: "inherit",
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
    backgroundColor: "$system-white",
    zIndex: 99999,
  },

  ".render body::before": {
    display: "none",
  },
})

export const Global = ({
  children,
  shouldCoverPage,
  backgroundColor,
}: React.PropsWithChildren<{
  shouldCoverPage?: boolean
  /**
   * Use to set the body background colour
   */
  backgroundColor?: Colors
}>) => {
  globalStyles(backgroundColor)

  if (shouldCoverPage) {
    pageCoverStyles()
  }

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
