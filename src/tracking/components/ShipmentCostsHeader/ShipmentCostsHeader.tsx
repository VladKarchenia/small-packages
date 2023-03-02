import { ButtonIcon, Copy, Flex, GridContainer, Hidden, Stack } from "@/shared/components"
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
          <Copy
            scale={{ "@initial": 11, "@sm": 7 }}
            color={{ "@initial": "neutrals-7", "@sm": "system-black" }}
            bold
          >
            {title}
          </Copy>
          <Hidden above="sm">
            <ButtonIcon
              ariaLabel="Show details"
              icon={showCostsDetails ? <IconChevronTop size="xs" /> : <IconChevronDown size="xs" />}
              onClick={handleShowDetailsClick}
            />
          </Hidden>
        </Flex>
      </Stack>
      <Copy scale={{ "@initial": 8, "@sm": 6 }} color="system-black" bold>
        ${price.toFixed(2)}
      </Copy>
    </GridContainer>
  )
}
