import { useLocation, useNavigate } from "react-router-dom"

import { HOME } from "@/constants"

import { Copy, Flex, Link } from "@/shared/components"

interface IRouteMap {
  [key: string]: string
}

const RoutesMap: IRouteMap = {
  "/profile": "User Profile",
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
      <Link onClick={() => navigate(HOME)}>
        <Copy scale={9} color="neutrals-7" css={{ hover: { color: "$system-black" } }}>
          Home
        </Copy>
      </Link>

      <Copy scale={9} color="neutrals-7" css={{ cursor: "default" }}>
        /
      </Copy>

      {!location.pathname.includes("packages") ? (
        <Copy scale={9} color="system-black" css={{ cursor: "default" }}>
          {getRouteString(location.pathname)}
        </Copy>
      ) : (
        <>
          <Link onClick={() => navigate(`${location.pathname.replace("/packages", "")}`)}>
            <Copy scale={9} color="neutrals-7" css={{ hover: { color: "$system-black" } }}>
              {getRouteString(location.pathname)}
            </Copy>
          </Link>

          <Copy scale={9} color="neutrals-7" css={{ cursor: "default" }}>
            /
          </Copy>

          <Copy scale={9} color="system-black" css={{ cursor: "default" }}>
            All packages
          </Copy>
        </>
      )}
    </Flex>
  )
}
