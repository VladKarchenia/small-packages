import { styled } from "@/stitches/config"

export const STable = styled("table", {
  borderCollapse: "collapse",
  width: "100%",
})

export const STableRow = styled("tr", {
  cursor: "pointer",

  hover: {
    backgroundColor: "$neutrals-2",
  },
})

export const STableHead = styled("thead", {
  backgroundColor: "$neutrals-1",

  [`${STableRow}`]: {
    cursor: "initial",

    hover: {
      backgroundColor: "$neutrals-1",
    },
  },
})

export const STableBody = styled("tbody", {})

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
  backgroundColor: "$system-white",
  visibility: "hidden",
})
