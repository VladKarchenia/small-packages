import { Outlet } from "react-router-dom"
import { Header } from "@/shared/components"

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout
