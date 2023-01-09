import { useEffect } from "react"
import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { ProfileContainer } from "@/profile"
import { userApi } from "@/api/userApi"

export const Profile = () => {
  const accessToken = window.localStorage.getItem("accessToken") || ""

  useEffect(() => {
    if (accessToken) {
      if (!userApi.defaults.headers.common["Authorization"]) {
        userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      }
    }
  }, [accessToken])
  return (
    <CommonLayout>
      <MainLayout fullContentSize={false} mobileFullBleed={false}>
        <ProfileContainer />
      </MainLayout>
    </CommonLayout>
  )
}
