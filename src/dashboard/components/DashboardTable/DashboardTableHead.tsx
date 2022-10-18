import { Column, TableHead } from "@/shared/components"

export const DashboardTableHead = () => {
  return (
    <TableHead>
      <Column
        align="start"
        css={{
          "@md": { width: "35%" },
          "@lg": { width: "50%" },
        }}
      >
        {/* {t("dashboard:earnings.table.bookingDetails")} */}
        Column 1
      </Column>
      <Column align="end">Column 2</Column>
      <Column
        align="start"
        css={{
          width: 152,
          paddingLeft: "$48",
          "@lg": { width: 168, paddingLeft: "$64" },
        }}
      >
        Column 3
      </Column>
      <Column
        align="start"
        css={{
          width: 152,
          paddingLeft: "$48",
          "@lg": { width: 168, paddingLeft: "$64" },
        }}
      >
        Column 4
      </Column>
      <Column align="end" css={{ width: "$96" }}>
        Column 5
      </Column>
    </TableHead>
  )
}
