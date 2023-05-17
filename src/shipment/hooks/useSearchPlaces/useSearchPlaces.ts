import { useQuery } from "react-query"

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
  const isEnabled = input.length > 3

  return useQuery(["searchPlaces", country, keyword], () => searchPlacesFn({ country, keyword }), {
    staleTime: Infinity,
    cacheTime: isEnabled ? 5 * 60 * 1000 : 0,
    enabled: isEnabled,
  })
}
