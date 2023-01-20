import { Copy, Flex, Spacer } from "@/shared/components"

interface IShortInfoLineProps {
  icon: React.ReactNode
  text: string
}

export const ShortInfoLine: React.FC<React.PropsWithChildren<IShortInfoLineProps>> = ({
  children,
  icon,
  text,
}) => {
  return (
    <Flex align="center">
      {icon}
      <Spacer size={8} horizontal />
      <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
        {text}
      </Copy>
      {children}
    </Flex>
  )
}
