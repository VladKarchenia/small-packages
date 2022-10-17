import { Outlet } from "react-router-dom"
import { Header } from "@/shared/components"
import { ModalsContainer } from "@/modals"

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ModalsContainer />
    </>
  )
}

export default MainLayout
