import { useEffect } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Copy, Flex, Grid } from "@/shared/components"
import { IconTick } from "@/shared/icons"
import { RecoveryInput } from "@/api/types"
import { forgotPasswordFn } from "@/api/authApi"
import { RecoveryForm } from "./RecoveryForm"

// TODO: Invalid email error after request

const defaultValues: RecoveryInput = {
  email: "",
}

export const RecoveryFormContainer = () => {
  const navigate = useNavigate()
  const methods = useForm<RecoveryInput>({
    mode: "onChange",
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const { mutate: forgotPassword } = useMutation(
    ({ email }: RecoveryInput) => forgotPasswordFn(email),
    {
      onSuccess: () => {
        navigate("/login")
        toast.success(<ToastMessage />, {
          icon: false,
          position: "bottom-right",
          progressStyle: {
            backgroundColor: "black",
          },
        })
      },
    },
  )

  const onSubmitHandler: SubmitHandler<RecoveryInput> = (values) => {
    forgotPassword(values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <RecoveryForm defaultValues={defaultValues} isLoading={false} />
      </form>
    </FormProvider>
  )
}

const ToastMessage = () => (
  <Grid columns={"$40 1fr"} gap={16}>
    <Flex
      align="center"
      justify="center"
      css={{
        height: "$40",
        backgroundColor: "$neutrals-4",
        borderRadius: "$8",
      }}
    >
      <IconTick />
    </Flex>
    <Copy scale={8} color="system-black" css={{ lineHeight: 1.2 }}>
      Please check your e-mail for further instructions
    </Copy>
  </Grid>
)
