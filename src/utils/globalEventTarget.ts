export const getGlobalEventTarget = (): typeof globalThis | Window | null => {
  if (typeof globalThis !== "undefined") {
    return globalThis
  }

  if (typeof window !== "undefined") {
    return window
  }

  return null
}

export const globalEventTarget = getGlobalEventTarget()
