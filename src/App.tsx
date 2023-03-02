import { Navigate, useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { ModalsContainer } from "@/modals"
import { Role } from "@/shared/types"

import {
  Shipment,
  Home,
  Login,
  PageNotFound,
  Profile,
  Tracking,
  Reset,
  Recovery,
  Packages,
} from "@/pages"

import { AuthGuard, Box } from "@/shared/components"

import "react-toastify/dist/ReactToastify.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "@/stitches/fonts/fonts.css"

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
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "profile",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [{ path: "", element: <Profile /> }],
      },
      {
        path: "create",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [
          { path: "quote", element: <Shipment /> },
          { path: "shipment", element: <Shipment /> },
        ],
      },
      {
        path: "edit",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [
          { path: "quote/:shipmentId", element: <Shipment /> },
          { path: "shipment/:shipmentId", element: <Shipment /> },
        ],
      },
      {
        path: "tracking",
        children: [
          {
            path: "quote/:shipmentId",
            children: [
              { path: "", element: <Tracking /> },
              { path: "packages", element: <Packages /> },
            ],
          },
          {
            path: "shipment/:shipmentId",
            children: [
              { path: "", element: <Tracking /> },
              { path: "packages", element: <Packages /> },
            ],
          },
        ],
      },
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
