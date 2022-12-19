import { Copy, Flex, Link } from "@/shared/components"
import { useLocation, useNavigate } from "react-router-dom"

interface IRoutesMap {
  [key: string]: string
}

const RoutesMap: IRoutesMap = {
  "/create/shipment": "Create a shipment",
  "/create/quote": "Create a quote",
  "/tracking": "Shipment #...",
}

export const Breadcrumbs = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { pathname } = location

  const pathnames = pathname.split("/").filter((el) => el)

  return (
    <Flex css={{ marginBottom: "$16" }}>
      <Link
        style={{ cursor: "pointer" }}
        color="primary"
        onClick={() => navigate("/")}
        css={{ marginRight: "$4" }}
      >
        <Copy scale={9} color={"neutrals-7"}>
          Home {"/"}
        </Copy>
      </Link>
      {Object.keys(RoutesMap).includes(pathname) ? (
        <Copy scale={9} color={"system-black"}>
          {" "}
          {RoutesMap[pathname]}
        </Copy>
      ) : (
        pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Copy key={index} scale={9} color={"system-black"}>
              {path}
            </Copy>
          ) : (
            <Link key={index} onClick={() => navigate(routeTo)} css={{ marginRight: "$4" }}>
              <Copy scale={9} color={"neutrals-7"}>
                {" "}
                {path} {"/"}
              </Copy>
            </Link>
          )
        })
      )}
    </Flex>
  )
}
