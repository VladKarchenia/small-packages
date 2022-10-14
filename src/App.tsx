import { Navigate, useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthGuard } from "@/shared/components"
import MainLayout from "@/shared/layouts/main"
import { Home, Login, PageNotFound, Profile, Unauthorize } from "@/pages"

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
      { path: "unauthorized", element: <Unauthorize /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "404", element: <PageNotFound /> },
    ],
  }

  const routing = useRoutes([mainRoutes, authRoutes])

  return (
    <>
      <ToastContainer />
      {routing}
    </>
  )
}

export default App
