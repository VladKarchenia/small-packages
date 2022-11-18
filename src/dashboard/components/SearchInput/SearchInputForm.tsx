import { Grid, Flex, Title, Spacer } from "@/shared/components"
import { IAddress } from "@/shared/state"
// import { DestinationCombobox } from "../DestinationCombobox"

export interface ISearchInputFormProps {
  initialValue: string
  onSelect: (location: string, placeId: string) => void
}

export const SearchInputForm: React.FC<ISearchInputFormProps> = ({ initialValue, onSelect }) => {
  return (
    <Grid rows="calc(100% - $80) $80" css={{ height: "100%" }}>
      <Flex direction="column" css={{ paddingX: "$24" }}>
        <Title as="h3" scale={7}>
          Find destination
        </Title>
        <Spacer size={24} />
        {/* <DestinationCombobox initialValue={initialValue.location} onSelect={onSelect} /> */}
      </Flex>
    </Grid>
  )
}
