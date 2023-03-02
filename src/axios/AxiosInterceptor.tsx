import { useEffect } from "react"
import { shallow } from "zustand/shallow"

import { useAuthStore } from "@/store"
import { shipmentApi } from "@/api/shipmentApi"
import { userApi } from "@/api/userApi"
import { placeApi } from "@/api/placeApi"
import { organizationApi } from "@/api/organizationApi"
import { refreshTokenFn } from "@/api/authApi"

export const AxiosInterceptor: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [refreshToken, setTokens] = useAuthStore(
    (state) => [state.refreshToken, state.setTokens],
    shallow,
  )

  useEffect(() => {
    const services = [shipmentApi, userApi, placeApi, organizationApi]

    services.map((instance) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resInterceptor = (response: any) => response

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errInterceptor = async (error: any) => {
        const originalRequest = error.config
        const errMessage = (error?.response?.data.error || error.message) as string

        if (
          (errMessage.includes("Unauthorized") || errMessage.includes("Forbidden")) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true

          if (refreshToken) {
            const { accessToken, refreshToken: newRefreshToken } = await refreshTokenFn(
              refreshToken,
            )
            setTokens({ accessToken, refreshToken: newRefreshToken })
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

            return instance(originalRequest)
          }
        }

        return Promise.reject(error)
      }

      return instance.interceptors.response.use(resInterceptor, errInterceptor)
    })

    return () => {
      services.map((instance) => {
        // initially, eject was used here, but it may not make much difference to use clear or eject?
        // instance.interceptors.response.eject(interceptor)
        return instance.interceptors.response.clear()
      })
    }
  }, [refreshToken, setTokens])

  return <>{children}</>
}
