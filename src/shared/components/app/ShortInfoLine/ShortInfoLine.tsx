import { ReactNode } from 'react';
import { Copy, Flex, } from "@/shared/components"

type ShortInfoLineProps = {
  icon?: ReactNode | null,
  text?: string,
  children?: ReactNode | null,
}

export const ShortInfoLine = ({icon, text,children}: ShortInfoLineProps) => {
  return (
    <Flex align="center" css={{paddingBottom: "$12"}}>
      <Flex css={{ paddingRight: "$8" }}>
        {icon}
      </Flex>
      {text && <Copy scale={9} color="system-black">
        {text}
      </Copy>}
      {children}
    </Flex>
  )
}
