import { useEffect, useState } from "react"

type Dimension = number

interface IDimesions {
  // size of the displayed content (padding included)
  clientHeight: Dimension
  clientWidth: Dimension
  // size of the visible content (padding and border included)
  offsetHeight: Dimension
  offsetWidth: Dimension
  // actual size of the content (when element is scrollable)
  scrollHeight: Dimension
  scrollWidth: Dimension
}

/**
 * Returns element dimensions
 *
 * Use this hook to access the an element's dimensions as opposed to accessing
them directly on other events, as Webkit calculates the window dimension
s every time those properties are accessed

 * MDN Reference: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
 */
export const useElementDimensions = (elRef: React.RefObject<HTMLElement>) => {
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const [dimensions, setDimensions] = useState<IDimesions>({
    clientHeight: 0,
    clientWidth: 0,
    offsetHeight: 0,
    offsetWidth: 0,
    scrollHeight: 0,
    scrollWidth: 0,
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (elRef.current) {
        const { clientHeight, clientWidth, offsetHeight, offsetWidth, scrollHeight, scrollWidth } =
          elRef.current

        setLoaded(true)

        setDimensions({
          clientHeight,
          clientWidth,
          offsetHeight,
          offsetWidth,
          scrollHeight,
          scrollWidth,
        })
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [elRef])

  return { dimensions, isLoaded }
}
