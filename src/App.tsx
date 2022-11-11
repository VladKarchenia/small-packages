import { Navigate, useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthGuard } from "@/shared/components"
import MainLayout from "@/shared/layouts/main"
import { ModalsContainer } from "@/modals"
import { CreateShipment, Home, Login, PageNotFound, Profile, Unauthorize, Tracking } from "@/pages"

import "react-toastify/dist/ReactToastify.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "@/styles/fonts.css"
import { ShippingType } from "./shipment"

const App: React.FC = (): JSX.Element => {
  const authRoutes = {
    path: "*",
    children: [{ path: "login", element: <Login /> }],
  }

  const mainRoutes = {
    path: "*",
    element: <MainLayout />,
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
    <>
      <ToastContainer />
      {/* check if this is the right place for the ModalsContainer */}
      <ModalsContainer />
      {routing}
    </>
  )
}

export default App
