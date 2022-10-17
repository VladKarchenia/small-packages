import { Outlet } from "react-router-dom"
import { Header } from "@/shared/components"
import { ModalsContainer } from "@/modals"

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* check if this is the right place for the ModalsContainer */}
      <ModalsContainer />
    </>
  )
}

export default MainLayout
