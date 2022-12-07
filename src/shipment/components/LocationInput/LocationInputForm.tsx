import { Grid, Flex } from "@/shared/components"
import { IAddress } from "@/shared/state"
import { DestinationCombobox } from "../DestinationCombobox"

interface ILocationInputFormProps {
  initialValue: IAddress
  onSelect: (location: string, placeId: string) => void
  placeholder?: string
}

export const LocationInputForm: React.FC<ILocationInputFormProps> = ({
  initialValue,
  onSelect,
  placeholder,
}) => {
  return (
    <Grid rows="calc(100% - $80) $80" css={{ height: "100%" }}>
      <Flex direction="column" css={{ padding: "$16" }}>
        <DestinationCombobox
          initialValue={initialValue.location}
          onSelect={onSelect}
          placeholder={placeholder}
        />
      </Flex>
    </Grid>
  )
}
