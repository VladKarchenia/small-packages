import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"

import { logoutUserFn } from "@/api/authApi"

import { ButtonIcon } from "@/shared/components"
import { IconClock } from "@/shared/icons"

export const LogoutButton = () => {
  // TODO: use Zustand
  const refreshToken = window.localStorage.getItem("refreshToken") || ""
  const navigate = useNavigate()

  const { mutate: logoutUser } = useMutation(() => logoutUserFn(refreshToken), {
    onSuccess: () => {
      navigate("/login")
    },
    // onError: (error: any) => {
    //   if (Array.isArray(error.response.data.error)) {
    //     error.data.error.forEach((el: any) =>
    //       toast.error(el.message, {
    //         position: "top-right",
    //       }),
    //     )
    //   } else {
    //     toast.error(error.response.data.message, {
    //       position: "top-right",
    //     })
    //   }
    // },
  })

  return (
    <ButtonIcon
      type="button"
      ariaLabel="Logout button"
      icon={
        <IconClock
          width={32}
          height={32}
          fixedSize={true}
          css={{
            borderRadius: "$rounded",
            cursor: "pointer",
          }}
        />
      }
      onClick={() => logoutUser()}
    />
  )
}
