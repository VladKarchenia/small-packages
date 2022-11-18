import { useTranslation } from "react-i18next"

import { TableRow, Table, TableBody, TabularData } from "@/shared/components"
import { DashboardTableHead } from "./DashboardTableHead"
import { DashboardTablePlaceholder } from "./DashboardTablePlaceholder"
import { ShippingType } from "@/shipment"

interface IShipping {
  code: string
}

interface ITableProps {
  isLoading: boolean
  bookings: IShipping[]
  shippingType: ShippingType
}

export const DashboardTable = ({ isLoading, bookings = [], shippingType }: ITableProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return <DashboardTablePlaceholder />
  }

  if (!isLoading && !bookings.length) {
    return (
      <Table caption="Dashboard table">
        <DashboardTableHead />
        <TableBody>
          <TableRow>
            <TabularData
              colSpan={5}
              css={{
                padding: "$0",
                borderBottom: "1px solid $neutrals-0",
                firstChild: { padding: "$0" },
                height: `calc((var(--vh) * 100) - $192 - $128 - $48)`,
              }}
            >
              Empty
              {/* <ResetYourFiltersMessage /> */}
            </TabularData>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Table caption="Dashboard table" hasBookings>
      <DashboardTableHead />
      <TableBody>
        {bookings.map(({ code }) => {
          return (
            <TableRow key={code}>
              <TabularData>aaa</TabularData>
              <TabularData align="end">bbb</TabularData>
              <TabularData
                align="start"
                css={{
                  width: 152,
                  paddingLeft: "$48",
                  "@lg": { width: 168, paddingLeft: "$64" },
                }}
              >
                ccc
              </TabularData>
              <TabularData
                align="start"
                css={{
                  width: 152,
                  paddingLeft: "$48",
                  "@lg": { width: 168, paddingLeft: "$64" },
                }}
              >
                ddd
              </TabularData>
              <TabularData align="end">eee</TabularData>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
