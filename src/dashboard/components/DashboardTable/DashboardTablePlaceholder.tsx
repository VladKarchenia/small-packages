import { useTranslation } from "react-i18next"
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
import { ShippingType } from "@/shipment"

const PlaceholderRow = ({ shippingType }: { shippingType: ShippingType }) => (
  <TableRow>
    <TabularData
      css={{
        paddingLeft: "$24",
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
    {shippingType === ShippingType.Shipment ? (
      <TabularData
        css={{
          paddingLeft: `calc($16 + $12)`,
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
  shippingType: ShippingType
  isFilterApplied: boolean
}

export const DashboardTablePlaceholder = ({
  shippingType,
  isFilterApplied,
}: IDashboardTablePlaceholderProps) => {
  const { t } = useTranslation()

  return (
    <>
      <CreateButton />
      <Flex align="center" justify="between">
        <Flex align="center" wrap css={{ gap: "$12" }}>
          {shippingType === ShippingType.Shipment ? (
            <>
              <Redacted height="$40" width="108px" text animated />
              <Redacted height="$40" width="172px" text animated />
            </>
          ) : (
            <Redacted height="$40" width="204px" text animated />
          )}
          <Redacted height="$40" width="204px" text animated />
          {isFilterApplied ? <Redacted height="$24" width="100px" text animated /> : null}
        </Flex>
      </Flex>
      <Table caption="Dashboard table">
        <DashboardTableHead />
        <TableBody>
          {Array.from(new Array(20), (_, index) => index).map((v) => (
            <PlaceholderRow key={`placeholder-row-${v}`} shippingType={shippingType} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
