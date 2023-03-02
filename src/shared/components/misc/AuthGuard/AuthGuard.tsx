import { Navigate, Outlet, useLocation } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { useAuthStore } from "@/store"
import { Role } from "@/shared/types"
import { LOGIN } from "@/constants"

export const AuthGuard = ({ allowedRoles }: { allowedRoles: Role[] }) => {
  const location = useLocation()
  const [accessToken, user] = useAuthStore((state) => [state.accessToken, state.user], shallow)
  const role = user?.authorities?.[0]?.authority

  return accessToken && allowedRoles.includes(role as Role) ? (
    <Outlet />
  ) : (
    <Navigate to={LOGIN} state={{ from: location }} replace />
  )
}
