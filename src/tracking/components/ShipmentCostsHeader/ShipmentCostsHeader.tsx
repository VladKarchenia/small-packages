import { ButtonIcon, Copy, Flex, GridContainer, Spacer, Stack } from "@/shared/components"
import { IconChevronTop, IconChevronDown } from "@/shared/icons"

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
  return (
    <GridContainer fullBleed>
      <Stack space={8}>
        <Flex align="center" justify="between">
          <Copy scale={10} color="neutrals-7" bold>
            {title}
          </Copy>
          <ButtonIcon
            ariaLabel="Show details"
            icon={showCostsDetails ? <IconChevronDown /> : <IconChevronTop />}
            onClick={handleShowDetailsClick}
          />
        </Flex>
      </Stack>
      <Copy scale={8} color="system-black" bold>
        ${price.toFixed(2)}
      </Copy>
    </GridContainer>
  )
}
