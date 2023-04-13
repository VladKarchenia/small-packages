import React, { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import { Copy, Flex, Spacer } from "@/shared/components"
import { IconCopy } from "@/shared/icons"

import { SShipmentURLButton, SShipmentURLMessage } from "./ShipmentURL.styles"

type ShipmentURLProps = {
  url: string
  value: string
}

export const ShipmentURL = ({ url, value }: ShipmentURLProps) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const handleButtonClick = () => {
    setCopiedToClipboard(true)

    setTimeout(() => {
      setCopiedToClipboard(false)
    }, 2000)
  }

  return (
    <>
      <Copy scale={10} color="neutrals-5" fontWeight="bold">
        Tracking number link
      </Copy>
      <Spacer size={4} />
      <CopyToClipboard text={url}>
        <SShipmentURLButton
          type="button"
          onClick={handleButtonClick}
          css={{
            borderColor: `${copiedToClipboard ? "$brand-green-primary !important" : ""}`,
            keyboardFocus: {
              outlineColor: `${copiedToClipboard ? "$brand-green-primary !important" : ""}`,
            },
          }}
        >
          <Flex align="center" justify="between" css={{ width: "100%", color: "$theme-b-n3" }}>
            <Copy truncate>{value}</Copy>
            <Spacer size={8} horizontal />
            <Flex align="center" justify="center">
              <IconCopy />
            </Flex>
          </Flex>
        </SShipmentURLButton>
      </CopyToClipboard>
      {copiedToClipboard ? (
        <SShipmentURLMessage css={{ position: "absolute" }}>
          <Copy scale={10} color="brand-green-primary">
            URL was copied
          </Copy>
        </SShipmentURLMessage>
      ) : null}
    </>
  )
}
