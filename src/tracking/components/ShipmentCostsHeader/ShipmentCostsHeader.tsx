import { ButtonIcon, Copy, Flex, GridContainer, Spacer, Stack } from "@/shared/components"
import { IconChevronTop, IconChevronDown } from "@/shared/icons"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"

interface IShipmentCostProps {
  title: string
  price: number
  showCostsDetails: boolean
  handleShowDetailsClick: () => void
}

export const ShipmentCostsHeader = ({
  title,
  price,
  showCostsDetails,
  handleShowDetailsClick,
}: IShipmentCostProps) => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  return (
    <GridContainer fullBleed>
      <Stack space={8}>
        <Flex align="center" justify="between">
          <Copy
            scale={isSmallAndAbove ? 7 : 11}
            color={isSmallAndAbove ? "system-black" : "neutrals-7"}
            bold
          >
            {title}
          </Copy>
          {isSmallAndAbove ? null : (
            <ButtonIcon
              ariaLabel="Show details"
              icon={showCostsDetails ? <IconChevronTop /> : <IconChevronDown />}
              onClick={handleShowDetailsClick}
            />
          )}
        </Flex>
      </Stack>
      <Copy scale={{ "@initial": 8, "@sm": 6 }} color="system-black" bold>
        ${price.toFixed(2)}
      </Copy>
    </GridContainer>
  )
}
