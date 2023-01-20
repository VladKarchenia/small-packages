import { useEffect } from "react"

import { userApi } from "@/api/userApi"

import { GridItem } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { ProfileContainer } from "@/profile"

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
      <MainLayout>
        <GridItem
          column={{
            "@initial": "1 / span 6",
            "@sm": "1 / span 12",
            "@lg": "1 / span 16",
          }}
        >
          <ProfileContainer />
        </GridItem>
      </MainLayout>
    </CommonLayout>
  )
}
