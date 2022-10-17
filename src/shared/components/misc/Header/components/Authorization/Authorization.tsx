import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { logoutUserFn } from "@/api/authApi"
import { useStateContext } from "@/shared/state"
import { Button, Flex } from "@/shared/components"

export const Authorization = () => {
  const navigate = useNavigate()
  const stateContext = useStateContext()
  const user = stateContext?.state.authUser

  const { mutate: logoutUser, isLoading } = useMutation(async () => await logoutUserFn(), {
    onSuccess: (data) => {
      window.location.href = "/login"
    },
    onError: (error: any) => {
      if (Array.isArray(error.response.data.error)) {
        error.data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          }),
        )
      } else {
        toast.error(error.response.data.message, {
          position: "top-right",
        })
      }
    },
  })

  const onLogoutHandler = async () => {
    logoutUser()
  }

  return (
    <Flex>
      {!user ? (
        <>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </>
      ) : null}
      {user ? (
        <>
          <Button loading={isLoading} onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button loading={isLoading} onClick={onLogoutHandler}>
            Logout
          </Button>
        </>
      ) : null}
    </Flex>
  )
}
