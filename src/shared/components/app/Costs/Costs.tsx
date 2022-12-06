import { Copy, Flex, GridContainer, Stack } from "@/shared/components"
import { ICost } from "@/shared/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"

interface ICostsProps {
  costs: ICost[]
}

export const Costs = ({ costs }: ICostsProps) => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  return (
    <GridContainer fullBleed>
      <Stack space={{ "@initial": 12, "@sm": 16 }} css={{ paddingTop: "$16" }}>
        {costs.map((cost) => {
          return (
            <Flex justify="between" key={cost.name}>
              <Copy
                scale={{ "@initial": 9, "@sm": 8 }}
                color={isSmallAndAbove ? "system-black" : "neutrals-7"}
              >
                {cost.name}
              </Copy>
              <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black" bold>
                ${cost.value.toFixed(2)}
              </Copy>
            </Flex>
          )
        })}
      </Stack>
    </GridContainer>
  )
}
