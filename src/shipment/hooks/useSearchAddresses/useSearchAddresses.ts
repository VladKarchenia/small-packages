import { useQuery } from "react-query"

import { searchAddressesFn } from "@/api/placeApi"

export const useSearchAddresses = ({
  input,
  country,
  zipCode,
  state,
  city,
  address,
}: {
  input: string
  country: string
  zipCode: string
  state: string
  city: string
  address: string
}) => {
  const isEnabled = input.length > 3

  return useQuery(
    ["searchAddresses", country, zipCode, state, city, address],
    () => searchAddressesFn({ country, zipCode, state, city, address }),
    {
      staleTime: Infinity,
      cacheTime: isEnabled ? 5 * 60 * 1000 : 0,
      enabled: isEnabled,
    },
  )
}
