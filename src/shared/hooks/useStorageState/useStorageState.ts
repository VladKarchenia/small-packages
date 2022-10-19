import { useState } from "react"

function getSerializedValue<T>(value: T) {
  const isInstanceOfMap = value instanceof Map
  const isInstanceOfSet = value instanceof Set

  if (isInstanceOfMap || isInstanceOfSet) return Array.from(value.values())

  return value
}

function setStorageValue<T>(storage: Storage, key: string, value: T) {
  try {
    const serializedValue = JSON.stringify(value)

    storage.setItem(key, serializedValue)
  } catch (error) {
    console.error(error)
  }
}

export function useStorageState<T>(
  storageType: "localStorage" | "sessionStorage",
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = window[storageType].getItem(key)

      if (storedValue) {
        const parsedValue = JSON.parse(storedValue)

        // Convert back to Map/Set if needed
        if (defaultValue instanceof Map) return new Map(parsedValue)
        if (defaultValue instanceof Set) return new Set(parsedValue)

        return parsedValue
      } else {
        const serializedValue = getSerializedValue(defaultValue)

        setStorageValue(window[storageType], key, serializedValue)

        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const updateValue = (newValue: T) => {
    try {
      const serializedValue = getSerializedValue(newValue)

      setStorageValue(window[storageType], key, serializedValue)
    } catch (err) {
      return
    }

    setValue(newValue)
  }

  return [value, updateValue]
}
