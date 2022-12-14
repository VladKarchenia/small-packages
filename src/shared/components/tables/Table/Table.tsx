import { Box, Copy } from "@/shared/components"
import { ComponentProps } from "@/utils"

import {
  STable,
  STableCaption,
  STableHead,
  STableBody,
  STabularData,
  STabularHead,
  STableRow,
} from "./Table.styles"

interface ITableView {
  caption: string
}

export interface IColumn extends ComponentProps<typeof STabularHead> {}

export interface IRow extends ComponentProps<typeof STableRow> {}

export interface ITabularData extends ComponentProps<typeof STabularData> {}

export interface ITabularHead extends ComponentProps<typeof STabularHead> {}

/**
 * Create an HTML table and takes a caption prop for accessibility to describe
 * the contents of the table.
 *
 * @example
 * <TableView caption="Harry Potter characters">
 *   <TableHead>
 *     <Column>Name</Column>
 *     <Column>House</Column>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *      <TabularData>Hermione Grainger</TabularData>
 *      <TabularData>Griffindor</TabularData>
 *     </TableRow>
 *   </TableBody>
 * </TableView>
 */
export const Table: React.FC<React.PropsWithChildren<ITableView>> = ({ caption, children }) => (
  <STable>
    <STableCaption>{caption}</STableCaption>
    {children}
  </STable>
)

export const TableHead: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <STableHead>
    <STableRow>{children}</STableRow>
  </STableHead>
)

export const TableBody: React.FC<React.PropsWithChildren<unknown>> = ({ children, ...props }) => (
  <STableBody {...props}>{children}</STableBody>
)

export const TableRow: React.FC<IRow> = ({ children }) => <STableRow>{children}</STableRow>

/**
 * A tabular head element with a Copy component already configured
 *
 * @example
 * <Column>Name</Name>
 */
export const Column: React.FC<IColumn> = ({ children, ...props }) => {
  return (
    <STabularHead scope="col" {...props}>
      <Box css={{ display: "inline-flex", alignItems: "center" }}>
        <Copy as="span" scale={8} color="system-black" bold>
          {children}
        </Copy>
      </Box>
    </STabularHead>
  )
}

/**
 * A tabular head element with a Copy component already configured and sorting
 *
 * @example
 * <SortableColumn>Name</SortableColumn>
 */
export const SortableColumn: React.FC<IColumn> = ({ children, ...props }) => {
  return (
    <STabularHead scope="col" {...props}>
      {children}
    </STabularHead>
  )
}

export const TabularData: React.FC<ITabularData> = ({ children, ...props }) => {
  return <STabularData {...props}>{children}</STabularData>
}

export const TabularHead: React.FC<ITabularHead> = ({ children, ...props }) => {
  return (
    <STabularHead as="th" {...props}>
      {children}
    </STabularHead>
  )
}
