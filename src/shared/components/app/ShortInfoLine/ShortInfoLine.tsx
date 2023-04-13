import { Copy, Flex, Spacer } from "@/shared/components"

interface IShortInfoLineProps {
  icon: React.ReactNode
  text: string
}

export const ShortInfoLine = ({ icon, text }: IShortInfoLineProps) => {
  return (
    <Flex align="center">
      {icon}
      <Spacer size={8} horizontal />
      <Copy>{text}</Copy>
    </Flex>
  )
}
