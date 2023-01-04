import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Role } from "@/shared/types"

export const AuthGuard = ({ allowedRoles }: { allowedRoles: Role[] }) => {
  // TODO: use Zustand
  const accessToken = window.localStorage.getItem("accessToken") || ""
  const username = window.localStorage.getItem("username") || ""
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority
  const location = useLocation()

  return accessToken && allowedRoles.includes(role as Role) ? (
    <Outlet />
  ) : accessToken && username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
