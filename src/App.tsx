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
} from "@/pages"
import { ShippingType } from "@/shipment"

import "react-toastify/dist/ReactToastify.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "@/styles/fonts.css"

const App: React.FC = (): JSX.Element => {
  const authRoutes = {
    path: "*",
    children: [
      { path: "login", element: <Login /> },
      { path: "reset", element: <Reset /> },
    ],
  }

  const mainRoutes = {
    path: "*",
    children: [
      { index: true, element: <Home /> },
      {
        path: "profile",
        element: <AuthGuard allowedRoles={["user", "admin"]} />,
        children: [{ path: "", element: <Profile /> }],
      },
      {
        path: "create",
        element: <AuthGuard allowedRoles={["user", "admin"]} />,
        children: [
          { path: "quote", element: <CreateShipment shippingType={ShippingType.Quote} /> },
          { path: "shipment", element: <CreateShipment shippingType={ShippingType.Shipment} /> },
        ],
      },
      {
        path: "tracking",
        element: <Tracking />,
      },
      { path: "unauthorized", element: <Unauthorize /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "404", element: <PageNotFound /> },
    ],
  }

  const routing = useRoutes([mainRoutes, authRoutes])

  return (
    <Box css={{ height: "100vh" }}>
      <ToastContainer />
      <ModalsContainer />
      {routing}
    </Box>
  )
}

export default App
