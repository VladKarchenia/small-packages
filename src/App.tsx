import { Navigate, useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthGuard } from "@/shared/components"
import MainLayout from "@/shared/layouts/main"
import { ModalsContainer } from "@/modals"
import { CreateShipment, Home, Login, PageNotFound, Profile, Unauthorize } from "@/pages"

import "react-toastify/dist/ReactToastify.css"
import "@/styles/fonts.css"

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
          { path: "shipment", element: <CreateShipment /> },
          // { path: "quote", element: <CreateQuote /> },
        ],
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
