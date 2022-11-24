import { Copy, Flex, GridContainer, Stack } from "@/shared/components"
import { ICost } from "@/shared/types"

interface ICostsProps {
  costs: ICost[]
}

export const Costs = ({ costs }: ICostsProps) => {
  return (
    <GridContainer fullBleed>
      <Stack space={12} css={{ paddingTop: "$16" }}>
        {costs.map((cost) => {
          return (
            <Flex justify="between" key={cost.name}>
              <Copy scale={8} color="neutrals-7">
                {cost.name}
              </Copy>
              <Copy scale={8} color="system-black" bold>
                ${cost.value.toFixed(2)}
              </Copy>
            </Flex>
          )
        })}
      </Stack>
    </GridContainer>
  )
}
