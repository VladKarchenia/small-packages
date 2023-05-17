import { ShippingType } from "@/shared/types"

import {
  CreateButton,
  Flex,
  Redacted,
  Table,
  TableBody,
  TableRow,
  TabularData,
} from "@/shared/components"

import { DashboardTableHead } from "./DashboardTableHead"

const PlaceholderRow = ({ tab }: { tab: ShippingType }) => (
  <TableRow
    css={{
      cursor: "default",
      hover: {
        backgroundColor: "inherit",
      },
    }}
  >
    <TabularData
      css={{
        paddingLeft: "$12",
      }}
    >
      <Redacted height="$24" text animated />
    </TabularData>
    <TabularData
      css={{
        paddingLeft: "$16",
      }}
    >
      <Redacted height="$24" text animated />
    </TabularData>
    {tab === ShippingType.Shipment ? (
      <TabularData
        css={{
          paddingLeft: "$16",
        }}
      >
        <Redacted height="$24" text animated />
      </TabularData>
    ) : null}
    <TabularData
      css={{
        paddingLeft: "$16",
      }}
    >
      <Redacted height="$24" text animated />
    </TabularData>
    <TabularData
      css={{
        paddingLeft: "$16",
      }}
    >
      <Redacted height="$24" text animated />
    </TabularData>
    <TabularData
      css={{
        paddingX: "$16",
      }}
    >
      <Redacted height="$24" text animated />
    </TabularData>
  </TableRow>
)

interface IDashboardTablePlaceholderProps {
  tab: ShippingType
  isFilterApplied: boolean
}

export const DashboardTablePlaceholder = ({
  tab,
  isFilterApplied,
}: IDashboardTablePlaceholderProps) => {
  return (
    <>
      <CreateButton />
      <Flex align="center" justify="between">
        <Flex align="center" wrap css={{ gap: "$12" }}>
          {tab === ShippingType.Shipment ? (
            <>
              <Redacted height="$40" width="100px" text animated />
              <Redacted height="$40" width="170px" text animated />
            </>
          ) : (
            <Redacted height="$40" width="200px" text animated />
          )}
          <Redacted height="$40" width="200px" text animated />
          {isFilterApplied ? <Redacted height="$24" width="100px" text animated /> : null}
        </Flex>
      </Flex>
      <Table caption="Dashboard table">
        <DashboardTableHead isLoading={true} />
        <TableBody>
          {Array.from(new Array(20), (_, index) => index).map((v) => (
            <PlaceholderRow key={`placeholder-row-${v}`} tab={tab} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
