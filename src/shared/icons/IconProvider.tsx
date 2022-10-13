import React, { createContext, useContext, useState } from "react"

type IconCacheContextValue = [object, React.Dispatch<React.SetStateAction<object>>]

export const IconCache = createContext<IconCacheContextValue>(
  [] as unknown as IconCacheContextValue,
)

export const useIconCache = () => useContext(IconCache)

export const IconProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [cache, setCache] = useState({} as any)

  return (
    <IconCache.Provider value={[cache, setCache]}>
      <svg className="svg-sprite">
        <defs>
          {Object.keys(cache).map((id) => (
            <g key={id} id={id} dangerouslySetInnerHTML={{ __html: cache[id] }} />
          ))}
        </defs>
      </svg>
      {children}
    </IconCache.Provider>
  )
}
