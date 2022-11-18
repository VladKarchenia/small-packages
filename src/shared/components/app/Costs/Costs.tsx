import { Copy, Flex, GridContainer, Stack } from "@/shared/components"
import { ICost } from "@/shared/types"

interface ICostsProps {
  costs: ICost[]
}

export const Costs = ({ costs }: ICostsProps) => {
  return (
    <GridContainer fullBleed>
      {costs.map((cost, index) => {
        return (
          <Stack space={12} key={index}>
            <Flex justify="between">
              <Copy scale={8} color="neutrals-7">
                {cost.name}
              </Copy>
              <Copy scale={8} color="system-black">
                ${cost.value}
              </Copy>
            </Flex>
          </Stack>
        )
      })}
    </GridContainer>
  )
}
