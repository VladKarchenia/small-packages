import { useEffect } from "react"

const classNames = ["has-focus"]

// Note: This hook should only be used once on the top level component of the app or on storybook stories
export const useKeyboardFocus = () => {
  // https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2

  const handleFirstTab = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      classNames.forEach((className) => document.body.classList.add(className))

      window.removeEventListener("keydown", handleFirstTab)
      window.addEventListener("mousedown", handleMouseDownOnce)
    }
  }

  const handleMouseDownOnce = () => {
    classNames.forEach((className) => document.body.classList.remove(className))

    window.removeEventListener("mousedown", handleMouseDownOnce)
    window.addEventListener("keydown", handleFirstTab)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleFirstTab)

    return () => {
      window.removeEventListener("keydown", handleFirstTab)
      window.removeEventListener("mousedown", handleMouseDownOnce)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
