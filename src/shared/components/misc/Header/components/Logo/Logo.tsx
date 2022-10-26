import React from "react"
import { Flex } from "@/shared/components"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"

interface ILogo {
  href?: string
}

export const Logo: React.FC<ILogo> = ({ href = "/" }) => {
  const isExtraSmall = useMedia([mediaQueries.xs], [true], false)

  return (
    <a
      aria-haspopup="false"
      aria-label="Logo name"
      role="button"
      tabIndex={0}
      href={href}
      style={{ textDecoration: "none" }}
    >
      <Flex>
        {isExtraSmall ? (
          <img
            alt="logo"
            src="https://gulfrelay.com/wp-content/uploads/2020/02/Gulf-Relay-horizontal-2-1-768x136.png"
            style={{ height: "48px" }}
          />
        ) : (
          <img
            alt="logo"
            src="https://media-exp1.licdn.com/dms/image/C4E0BAQEb4ldfr_4mhA/company-logo_200_200/0/1642195595536?e=1674691200&v=beta&t=x25Tx31XTRGBVfVcWwfvj_Y2oKg2qx7n4_HR8sSDkuM"
            style={{ height: "48px" }}
          />
        )}
      </Flex>
    </a>
  )
}
