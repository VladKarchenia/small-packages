import { Grid, Flex } from "@/shared/components"
import { IAddress } from "@/shared/types"
import { DestinationCombobox } from "../DestinationCombobox"

interface ILocationInputFormProps {
  initialValue: IAddress
  onSelect: (locationDetails: IAddress) => void
  placeholder?: string
  country: string
}

export const LocationInputForm: React.FC<ILocationInputFormProps> = ({
  initialValue,
  onSelect,
  placeholder,
  country,
}) => {
  return (
    <Grid rows="calc(100% - $80) $80" css={{ height: "100%" }}>
      <Flex direction="column" css={{ padding: "$16" }}>
        <DestinationCombobox
          initialValue={initialValue}
          onSelect={onSelect}
          placeholder={placeholder}
          country={country}
        />
      </Flex>
    </Grid>
  )
}
