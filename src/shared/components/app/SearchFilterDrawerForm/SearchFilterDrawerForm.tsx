import {
  Grid,
  Flex,
  SearchTermCombobox,
  RecipientNameFilterCombobox,
  OriginalAddressFilterCombobox,
  DestinationAddressFilterCombobox,
} from "@/shared/components"

type ComboboxType = "searchTerm" | "recipientName" | "originalAddress" | "destinationAddress"

export interface ISearchFilterDrawerFormProps {
  comboboxType: ComboboxType
}

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

export const SearchFilterDrawerForm: React.FC<ISearchFilterDrawerFormProps> = ({
  comboboxType,
}) => {
  return (
    <Grid rows="calc(100% - $80) $80" css={{ height: "100%" }}>
      <Flex direction="column" css={{ paddingY: "$16" }}>
        {getComboboxComponent(comboboxType)}
      </Flex>
    </Grid>
  )
}
