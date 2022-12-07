import { useEffect } from "react"

interface IViewportHeight {
  updateOnResize?: boolean
}

/**
 * Adds event on resize to update a CSS custom property (variables)
 * with the actual value of the viewport height, since there are browsers (Safari iOS and Firefox Android)
 * that assume a fixed value for the viewport height, in favour of a dynamic value depending on the current view.
 *
 * Uses visualViewport api if available, otherwise window.innerHeight.
 * @url https://bitbucket.org/peoplelikeyouandme/plum-ui/pull-requests/381/feature-viewport-height-hook/diff
 */
export const useViewportHeight = ({ updateOnResize }: IViewportHeight) => {
  useEffect(() => {
    const windowObject = window.visualViewport ? window.visualViewport : window

    const updateHeight = () => {
      const height = window.visualViewport ? window.visualViewport.height : window.innerHeight
      document.documentElement.style.setProperty("--vh", `${height * 0.01}px`)
    }

    updateHeight()

    if (updateOnResize) {
      windowObject.addEventListener("resize", updateHeight)
    }

    return () => {
      document.documentElement.style.removeProperty("--vh")

      if (updateOnResize) {
        windowObject.removeEventListener("resize", updateHeight)
      }
    }
  }, [updateOnResize])
}
