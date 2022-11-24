// import { LazyQueryResult, QueryLazyOptions, useLazyQuery } from "@apollo/client"

import { ComboboxItemFormat } from "@/shared/components"

// import { GetSuggestions, GetSuggestionsVariables } from "@/gql/types/GetSuggestions"
// import { GET_SUGGESTIONS } from "@/gql/destinations"

import { mapDestinationToComboboxItem } from "./utils"
import { useQuery } from "react-query"
import { getSuggestionsFn } from "@/api/postApi"
import { ISuggestionsResponse } from "@/api/types"

export interface GetSuggestionsVariables {
  term: string
}

// type GetSuggestionsFn = (
//   options?: GetSuggestionsVariables,
// ) => Promise<LazyQueryResult<GetSuggestions, GetSuggestionsVariables>>

export function useDestinationSuggestions() {
  // export function useDestinationSuggestions(): [ComboboxItemFormat[], GetSuggestionsFn] {
  // const [getSuggestions, { data, previousData, loading }] = useLazyQuery<
  //   GetSuggestions,
  //   GetSuggestionsVariables
  // >(GET_SUGGESTIONS, {})

  // const { data: items, refetch } = useQuery(["getSuggestions", term], getSuggestionsFn(term), {
  //   enabled: false,
  //   select: (data: ISuggestionsResponse) =>
  //     data.data.suggestionsByTerm.places.map(mapDestinationToComboboxItem) || [],
  // })

  // return [items, refetch]
  return null
}
