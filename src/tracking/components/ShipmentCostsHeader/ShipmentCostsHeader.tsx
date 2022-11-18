import { ButtonIcon, Copy, Flex, GridContainer, Spacer, Stack } from "@/shared/components"
import { IconChevronTop } from "@/shared/icons"

interface IShipmentCostProps {
  title: string
  price: number
}

export const ShipmentCostsHeader = ({ title, price }: IShipmentCostProps) => {
  return (
    <GridContainer fullBleed>
      <Stack space={8}>
        <Flex align="center" justify="between">
          <Copy scale={10} color="neutrals-7" bold>
            {title}
          </Copy>
          <ButtonIcon
            ariaLabel="Edit shipment"
            icon={<IconChevronTop />}
            onClick={() => console.log("Clicked edit button")}
          />
        </Flex>
      </Stack>
      <Copy scale={8} color="system-black" bold>
        ${price.toFixed(2)}
      </Copy>
      <Spacer size={16} />
    </GridContainer>
  )
}
