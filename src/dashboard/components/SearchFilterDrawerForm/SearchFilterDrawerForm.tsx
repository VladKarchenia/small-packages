import { Grid, Flex } from "@/shared/components"
import {
  SearchTermCombobox,
  DashboardTableStatusFilter,
  DashboardTableNameFilter,
  DashboardTableDestinationAddressFilter,
  DashboardTableOriginAddressFilter,
} from "@/dashboard/components"

type ComboboxType =
  | "status"
  | "recipientName"
  | "originalAddress"
  | "destinationAddress"
  | "searchTerm"

function getComboboxComponent(type: ComboboxType) {
  switch (type) {
    case "status":
      return <DashboardTableStatusFilter />
    case "recipientName":
      return <DashboardTableNameFilter />
    case "originalAddress":
      return <DashboardTableOriginAddressFilter />
    case "destinationAddress":
      return <DashboardTableDestinationAddressFilter />
    case "searchTerm":
      return <SearchTermCombobox />
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
