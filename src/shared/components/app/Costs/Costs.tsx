import { Copy, Flex, GridContainer, Hidden, Spacer, Stack, Divider } from "@/shared/components"
import { ICost } from "@/shared/types"

interface ICostsProps {
  costs: ICost[]
}

export const Costs = ({ costs }: ICostsProps) => {
  return (
    <GridContainer fullBleed>
      <Hidden above="md">
        <Spacer size={16} />
        <Divider />
      </Hidden>
      <Stack
        space={{ "@initial": 12, "@md": 16 }}
        css={{ paddingTop: "$16", "@md": { paddingTop: "$32" } }}
      >
        {costs.map((cost) => {
          return (
            <Flex justify="between" key={cost.name} css={{ color: "$theme-b-n5" }}>
              <Copy scale={{ "@initial": 10, "@md": 4 }}>{cost.name}</Copy>
              <Copy scale={{ "@initial": 10, "@md": 4 }}>${cost.value.toFixed(2)}</Copy>
            </Flex>
          )
        })}
      </Stack>
    </GridContainer>
  )
}
