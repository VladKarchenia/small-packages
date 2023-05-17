import { styled } from "@/stitches/config"

export const STable = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
})

export const STableRow = styled("tr", {
  backgroundColor: "transparent",
  color: "$theme-b-n3",
  transition: "150ms ease-out",
  cursor: "pointer",
  display: "table",
  width: "100%",
  tableLayout: "fixed",

  hover: {
    backgroundColor: "$theme-n2-n7",
  },
})

export const STableHead = styled("thead", {
  backgroundColor: "transparent",
  borderBottom: "1px solid $theme-n4-n7",

  [`${STableRow}`]: {
    cursor: "initial",

    hover: {
      backgroundColor: "transparent",
    },
  },
})

export const STableBody = styled("tbody", {
  display: "block",
  //this is the sum of all components except this one
  maxHeight: "calc((var(--vh) * 100) - $256 - $72 - $2)",
  overflowY: "auto",
})

export const STabularData = styled("td", {
  borderCollapse: "collapse",
  fontWeight: "normal",
  padding: 0,
  height: "$56",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
  width: "auto",
  textOverflow: "ellipsis",
  overflow: "hidden",

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
  padding: "$0 $12",

  "@lg": {
    paddingX: "$16",
  },
})

export const STableCaption = styled("caption", {
  visibility: "hidden",
})
