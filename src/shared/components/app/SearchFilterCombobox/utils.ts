import { GetPopularSuggestions_popularSuggestionsByCountryCode_places } from "@/api/types"
import { ComboboxItemFormat } from "@/shared/components"

export interface GetSuggestions_suggestionsByTerm_places_matchedSubstrings {
  __typename: "PlaceMatchedSubstrings"
  length: number | null
  offset: number | null
}

export interface GetSuggestions_suggestionsByTerm_places {
  __typename: "Place"
  placeId: string
  title: string
  latitude: number | null
  longitude: number | null
  matchedSubstrings: GetSuggestions_suggestionsByTerm_places_matchedSubstrings | null
}

export function mapDestinationToComboboxItem(
  item:
    | GetSuggestions_suggestionsByTerm_places
    | GetPopularSuggestions_popularSuggestionsByCountryCode_places,
): ComboboxItemFormat {
  return {
    label: item.title,
    value: item.placeId,
  }
}
