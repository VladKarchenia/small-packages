import React from "react"

import { ComponentProps } from "@/stitches/types"

import { Title } from "@/shared/components"

import { SModalHeader } from "./Header.styles"

type ModalHeaderProps = ComponentProps<typeof SModalHeader> & {
  title?: string
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, children, ...props }) => {
  return (
    <SModalHeader empty={!title} {...props}>
      {title && (
        <Title as="h3" scale={7}>
          {title}
        </Title>
      )}

      {children}
    </SModalHeader>
  )
}
