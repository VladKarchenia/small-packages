import { ButtonIcon, Copy, Flex, GridContainer, Hidden, Spacer } from "@/shared/components"
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
      <Flex align="center" justify="between">
        <Copy
          scale={{ "@initial": 9, "@md": 5 }}
          color={{ "@initial": "theme-n6-n3", "@md": "theme-b-n3" }}
          fontWeight="bold"
          uppercase={{ "@initial": false, "@md": true }}
        >
          {title}
        </Copy>
        <Hidden above="sm">
          <ButtonIcon
            ariaLabel="Show details"
            icon={showCostsDetails ? <IconChevronTop size="xs" /> : <IconChevronDown size="xs" />}
            onClick={handleShowDetailsClick}
            inputIcon
          />
        </Hidden>
      </Flex>
      <Spacer size={{ "@initial": 12, "@md": 24 }} />
      <Copy scale={3} color="theme-b-n3" fontWeight="bold">
        ${price.toFixed(2)}
      </Copy>
    </GridContainer>
  )
}
