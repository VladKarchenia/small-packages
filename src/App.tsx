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
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "profile",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [{ path: "", element: <Profile /> }],
      },
      // TODO: maybe change it to quote/create or quote/id/edit?
      {
        path: "create",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [
          { path: "quote", element: <CreateShipment /> },
          { path: "shipment", element: <CreateShipment /> },
        ],
      },
      {
        path: "edit",
        element: <AuthGuard allowedRoles={[Role.User, Role.Admin, Role.Ops]} />,
        children: [
          { path: "quote/:shipmentId", element: <CreateShipment /> },
          { path: "shipment/:shipmentId", element: <CreateShipment /> },
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
