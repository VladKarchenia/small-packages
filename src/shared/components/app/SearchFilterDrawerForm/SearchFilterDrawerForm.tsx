import {
  Grid,
  Flex,
  SearchTermCombobox,
  RecipientNameFilterCombobox,
  OriginalAddressFilterCombobox,
  DestinationAddressFilterCombobox,
} from "@/shared/components"

type ComboboxType = "searchTerm" | "recipientName" | "originalAddress" | "destinationAddress"

function getComboboxComponent(type: ComboboxType) {
  switch (type) {
    case "recipientName":
      return <RecipientNameFilterCombobox />
    case "searchTerm":
      return <SearchTermCombobox />
    case "originalAddress":
      return <OriginalAddressFilterCombobox />
    case "destinationAddress":
      return <DestinationAddressFilterCombobox />
  }
}

export interface ISearchFilterDrawerFormProps {
  comboboxType: ComboboxType
}

export const SearchFilterDrawerForm: React.FC<ISearchFilterDrawerFormProps> = ({
  comboboxType,
}) => {
  return (
    <Grid rows="calc(100% - $40) $40" css={{ height: "100%" }}>
      <Flex direction="column" css={{ paddingY: "$16" }}>
        {getComboboxComponent(comboboxType)}
      </Flex>
    </Grid>
  )
}
