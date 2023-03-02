import { isAxiosError } from "axios"

import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"
import { ShipmentStatus } from "@/shared/types"

import { Box, Copy, Divider, Flex, FormCheckbox, Spinner, Stack } from "@/shared/components"

export interface IResponseContentProps {
  results: string[] | ShipmentStatus[]
  isLoading?: boolean
  isIdle?: boolean
  error?: unknown
  isCheckAll?: boolean
  handleCheckAllClick?: (event: React.FormEvent<HTMLInputElement>) => void
}

export const ResponseContent: React.FC<React.PropsWithChildren<IResponseContentProps>> = ({
  children,
  results,
  isLoading,
  isIdle,
  error,
  isCheckAll,
  handleCheckAllClick,
}) => {
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)

  if (isIdle) {
    return <Flex css={{ padding: "$16", height: "$56" }} />
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isAxiosError(error)) {
    return (
      <Flex css={{ padding: "$16" }}>
        <Copy scale={8} color="system-black">
          {error.response?.data.errorMessage || error.message}
        </Copy>
      </Flex>
    )
  }

  if (results.length === 0) {
    return (
      <Flex css={{ padding: "$16" }}>
        <Copy scale={8} color="system-black">
          Not found
        </Copy>
      </Flex>
    )
  }

  return (
    // <Grid rows="1fr $80" css={{ height: "100%" }}></Grid>
    <>
      {results.length > 0 ? (
        <Stack
          space={0}
          dividers={!isMediumAndAbove}
          css={{ paddingX: "$16", "@md": { paddingX: 0 } }}
        >
          <ResponseContentItem>
            <FormCheckbox
              value="All"
              onChange={handleCheckAllClick}
              name="Select all"
              id="Select all"
              label="Select all"
              checked={isCheckAll}
            />
          </ResponseContentItem>

          {isMediumAndAbove ? (
            <>
              <Divider />
              <Box css={{ height: "max-content", maxHeight: 240, overflow: "auto" }}>
                {children}
              </Box>
            </>
          ) : (
            children
          )}

          {/* TODO: do we need reset/apply buttons here? */}
          {/* <Grid
            gap={{ "@initial": 8, "@sm": 16 }}
            columns="1fr 1fr"
            css={{ paddingX: "$16", paddingTop: "$16", backgroundColor: "$system-white" }}
          >
            <GridItem>
              <Button full onClick={() => setStatusFilter([])}>
                <Copy as="span" scale={8} color="system-white" bold>
                  Reset
                </Copy>
              </Button>
            </GridItem>
            <GridItem>
              <Button action="secondary" full onClick={() => close("statusDrawer")}>
                <Copy as="span" scale={8} color="system-black" bold>
                  Apply
                </Copy>
              </Button>
            </GridItem>
          </Grid> */}
        </Stack>
      ) : (
        <Flex css={{ padding: "$16", height: "$56" }} />
      )}
    </>
  )
}

export const ResponseContentItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      css={{
        "> label": {
          padding: "$12",

          "@md": {
            padding: "$12 $16",
            cursor: "pointer",
            hover: {
              backgroundColor: "$neutrals-3",
            },

            "> p": {
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            },
          },
        },
      }}
    >
      {children}
    </Box>
  )
}
