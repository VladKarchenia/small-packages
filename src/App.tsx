import { Navigate, useRoutes } from "react-router-dom"
import { MainLayout } from "@/layout"
import { Home, Login, PageNotFound } from "@/pages"
import "@/styles/fonts.css"

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Home /> },
      { path: "404", element: <PageNotFound /> },
      { path: "login", element: <Navigate to="/login/signin" /> },
    ],
  }

  const loginRoutes = {
    path: "login",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      // { path: ":id", element: <AccountDetailView /> },
      // { path: "add", element: <AccountAddView /> },
      // { path: "list", element: <AccountListView /> },
      { path: "signin", element: <Login /> },
    ],
  }

  const routing = useRoutes([mainRoutes, loginRoutes])

  return <>{routing}</>
}

export default App
