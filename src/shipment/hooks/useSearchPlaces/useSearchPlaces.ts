import { useQuery } from "react-query"

import { useAuthStore } from "@/store"
import { searchPlacesFn } from "@/api/placeApi"

export const useSearchPlaces = ({
  input,
  country,
  keyword,
}: {
  input: string
  country: string
  keyword: string
}) => {
  const organization = useAuthStore((state) => state.organization)
  const isEnabled = input.length > 3

  return useQuery(
    ["searchPlaces", country, keyword],
    () => searchPlacesFn({ country, keyword, organization }),
    {
      staleTime: Infinity,
      cacheTime: isEnabled ? 5 * 60 * 1000 : 0,
      enabled: isEnabled,
    },
  )
}
