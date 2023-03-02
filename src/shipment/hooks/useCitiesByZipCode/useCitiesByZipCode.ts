import { useQuery } from "react-query"

import { searchCitiesByZipFn } from "@/api/placeApi"

export const useCitiesByZipCode = ({ country, zipCode }: { country: string; zipCode: string }) => {
  const isEnabled =
    !!zipCode &&
    (country === "United States"
      ? /^([0-9]{5}|([0-9]{5}-[0-9]{4}))?$/.test(zipCode)
      : /^([A-Za-z0-9]{3} [A-Za-z0-9]{3})?$/.test(zipCode))

  return useQuery(
    ["citiesByZipCode", country, zipCode],
    () =>
      searchCitiesByZipFn({
        country,
        zipCode,
      }),
    {
      staleTime: Infinity,
      cacheTime: isEnabled ? 5 * 60 * 1000 : 0,
      enabled: isEnabled,
    },
  )
}
