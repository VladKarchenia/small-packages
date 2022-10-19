import { styled } from "@/config"

export const STable = styled("table", {
  borderCollapse: "collapse",
  tableLayout: "fixed",
  width: "100%",

  // "@md": {
  //   marginTop: "calc(-$space$40 + -$space$48)",
  // },

  variants: {
    hasBookings: {
      true: {
        boxShadow: "0 1px 0 $colors$neutrals-4",
      },
    },
  },
})

export const STableHead = styled("thead", {
  position: "sticky",
  // top: "calc($128 + $48)",
  top: "$0",
  zIndex: "$1",
  // backgroundColor: "$neutrals-0",
  backgroundColor: "$neutrals-1",
  boxShadow: "0 1px 0 $colors$neutrals-4",

  "@xl": {
    top: "$128",
  },
})

export const STableBody = styled("tbody", {})

export const STableRow = styled("tr", {
  boxShadow: "0 -1px 0 $colors$neutrals-4",
})

export const STabularData = styled("td", {
  borderCollapse: "collapse",
  fontWeight: "normal",
  paddingX: "$8",
  paddingY: "$24",
  verticalAlign: "top",
  boxShadow: "0 -1px 0 $colors$neutrals-4",

  "&:first-child": {
    paddingLeft: "$8",
  },

  "&:last-child": {
    paddingRight: "$8",
  },

  variants: {
    align: {
      start: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      end: {
        textAlign: "right",
      },
    },
  },

  defaultVariants: {
    align: "start",
  },
})

export const STabularHead = styled(STabularData, {
  padding: "$0 $8",
  height: "$48",
  verticalAlign: "middle",
  boxShadow: "0 -1px 0 $colors$neutrals-4, 0 1px 0 $colors$neutrals-4",
})

export const STableCaption = styled("caption", {
  paddingY: "$8",
  position: "sticky",
  top: "calc($128 + $8)",
  zIndex: "$1",
  backgroundColor: "$neutrals-0",
  visibility: "hidden",

  "@xl": {
    top: "calc($80 + $8)",
  },
})
