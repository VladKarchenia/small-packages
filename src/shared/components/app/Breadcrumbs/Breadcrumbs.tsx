import { useLocation, useNavigate } from "react-router-dom"

import { HOME } from "@/constants"

import { Copy, Flex, Link } from "@/shared/components"

interface IRouteMap {
  [key: string]: string
}

const RoutesMap: IRouteMap = {
  "/settings": "Settings",
  "/create/quote": "Create a quote",
  "/create/shipment": "Create a shipment",
  "/edit/quote": "Edit a quote #",
  "/edit/shipment": "Edit a shipment #",
  "/tracking/quote": "Quote #",
  "/tracking/shipment": "Shipment #",
}

const getRouteString = (pathname: string) => {
  if (pathname.includes("edit") || pathname.includes("tracking")) {
    const pathnames = pathname.split("/")
    const id = pathname.includes("packages") ? pathnames.at(-2) : pathnames.at(-1)

    pathname.includes("packages")
      ? pathnames.splice(pathnames.length - 2, 2)
      : pathnames.splice(pathnames.length - 1, 1)

    return RoutesMap[pathnames.join("/")] + id
  }

  return RoutesMap[pathname]
}

export const Breadcrumbs = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Flex css={{ width: "max-content", marginBottom: "$16", gap: "$4" }}>
      <Link
        as="button"
        type="button"
        onClick={() => navigate(HOME)}
        css={{ color: "$neutrals-6", hover: { color: "$theme-b-n3" } }}
      >
        Home
      </Link>

      <Copy color="neutrals-6" css={{ cursor: "default" }}>
        /
      </Copy>

      {!location.pathname.includes("packages") ? (
        <Copy fontWeight="semiBold" color="theme-b-n3" css={{ cursor: "default" }}>
          {getRouteString(location.pathname)}
        </Copy>
      ) : (
        <>
          <Link
            as="button"
            type="button"
            onClick={() => navigate(`${location.pathname.replace("/packages", "")}`)}
            css={{ color: "$neutrals-6", hover: { color: "$theme-b-n3" } }}
          >
            {getRouteString(location.pathname)}
          </Link>

          <Copy color="neutrals-6" css={{ cursor: "default" }}>
            /
          </Copy>

          <Copy fontWeight="semiBold" css={{ color: "$theme-b-n3", cursor: "default" }}>
            All packages
          </Copy>
        </>
      )}
    </Flex>
  )
}
