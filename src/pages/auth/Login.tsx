import { Box, Copy } from "@/shared/components"

import { LoginFormContainer } from "./LoginFormContainer"

export const Login = () => {
  return (
    <Box
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#2363eb",
      }}
    >
      <Box
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Copy>Login to have access!</Copy>
        <LoginFormContainer />
      </Box>
    </Box>
  )
}
