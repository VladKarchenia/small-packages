import { Grid, Flex, SearchFilterCombobox } from "@/shared/components"
import { DestinationCombobox } from "@/shipment"

type ComboboxType = "address" | "string"

export interface ISearchFilterDrawerFormProps {
  initialValue: string
  onSelect: (value: any) => void
  comboboxType: ComboboxType
  placeholder: string
}

function getComboboxComponent(
  type: ComboboxType,
  initialValue: any,
  onSelect: (value: string, label: string) => void,
  placeholder: string,
) {
  switch (type) {
    case "string":
      return (
        <SearchFilterCombobox
          initialValue={initialValue}
          onSelect={onSelect}
          placeholder={placeholder}
        />
      )
    case "address":
      return (
        <DestinationCombobox
          initialValue={initialValue}
          onSelect={onSelect}
          placeholder={placeholder}
        />
      )
  }
}

export const SearchFilterDrawerForm: React.FC<ISearchFilterDrawerFormProps> = ({
  initialValue,
  onSelect,
  comboboxType,
  placeholder,
}) => {
  return (
    <Grid rows="calc(100% - $80) $80" css={{ height: "100%" }}>
      <Flex direction="column" css={{ padding: "$16" }}>
        {getComboboxComponent(comboboxType, initialValue, onSelect, placeholder)}
      </Flex>
    </Grid>
  )
}
