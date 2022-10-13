import { nanoid } from "nanoid"
import { useRef } from "react"

export const useId = (characterAmount = 16) => {
  const idRef = useRef(nanoid(characterAmount))

  return idRef.current
}
