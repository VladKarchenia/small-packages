import { useRef } from "react"

export const useClearButton = () => {
  const clearRef = useRef<any>()
  const isClearButtonClick = (e: Event) => e.composedPath().includes(clearRef.current)

  return { clearRef, isClearButtonClick }
}
