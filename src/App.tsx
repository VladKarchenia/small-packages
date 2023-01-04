import { Navigate, useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthGuard, Box } from "@/shared/components"
import { ModalsContainer } from "@/modals"
import {
  CreateShipment,
  Home,
  Login,
  PageNotFound,
  Profile,
  Unauthorize,
  Tracking,
  Reset,
  Recovery,
} from "@/pages"
import { Role } from "@/shared/types"
import { ShippingType } from "@/shipment"

import "react-toastify/dist/ReactToastify.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "@/styles/fonts.css"

const App: React.FC = (): JSX.Element => {
  const authRoutes = {
    path: "*",
    children: [
      { path: "login", element: <Login /> },
      { path: "recovery", element: <Recovery /> },
      { path: "reset", element: <Reset /> },
    ],
  }

  const mainRoutes = {
    path: "/",
    children: [
      {
        path: "/",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin]} />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "profile",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin]} />,
        children: [{ path: "", element: <Profile /> }],
      },
      // TODO: maybe change it to quote/create or quote/id/edit?
      {
        path: "create",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin]} />,
        children: [
          { path: "quote", element: <CreateShipment shippingType={ShippingType.Quote} /> },
          { path: "shipment", element: <CreateShipment shippingType={ShippingType.Shipment} /> },
        ],
      },
      {
        path: "edit",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin]} />,
        children: [
          { path: "quote/:shipmentId", element: <CreateShipment shippingType={ShippingType.Quote} /> },
          { path: "shipment/:shipmentId", element: <CreateShipment shippingType={ShippingType.Shipment} /> },
        ],
      },
      {
        path: "tracking/:shipmentId",
        // path: "tracking/*",
        element: <Tracking />,
      },
      { path: "unauthorized", element: <Unauthorize /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "404", element: <PageNotFound /> },
    ],
  }

  const routing = useRoutes([mainRoutes, authRoutes])

  return (
    <Box>
      <ToastContainer />
      <ModalsContainer />
      {routing}
    </Box>
  )
}

export default App
