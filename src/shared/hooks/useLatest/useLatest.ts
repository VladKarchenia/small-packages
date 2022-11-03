import { useEffect, useRef } from "react"

/**
 * This hook returns the latest value of a given value.
 *
 * Useful to store the latest value of a callback function, to prevent unnecessary creation of a new callback function.
 */
export function useLatest<T>(current: T) {
  const storedValue = useRef(current)

  useEffect(() => {
    storedValue.current = current
  }, [current])

  return storedValue
}
