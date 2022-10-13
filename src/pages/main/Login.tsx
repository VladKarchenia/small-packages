// // import { Box, Container, Typography } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { object, string, TypeOf } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import FormInput from "../components/FormInput";
// import { useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useMutation, useQuery } from "react-query";
// import { getMe, loginUser } from "../api/authApi";
// import { useStateContext } from "../context";
// import { Box, Button, Copy } from "@/shared/components";

// const loginSchema = object({
//   email: string().min(1, "Email address is required").email("Email Address is invalid"),
//   password: string()
//     .min(1, "Password is required")
//     .min(8, "Password must be more than 8 characters")
//     .max(32, "Password must be less than 32 characters"),
// });

// export type LoginInput = TypeOf<typeof loginSchema>;

export const Login = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();

  //   const from = ((location.state as any)?.from.pathname as string) || "/";

  //   const methods = useForm<LoginInput>({
  //     resolver: zodResolver(loginSchema),
  //   });

  //   const stateContext = useStateContext();

  //   // API Get Current Logged-in user
  //   const query = useQuery(["authUser"], getMe, {
  //     enabled: false,
  //     select: (data) => data.data.user,
  //     retry: 1,
  //     onSuccess: (data) => {
  //       stateContext.dispatch({ type: "SET_USER", payload: data });
  //     },
  //   });

  //   //  API Login Mutation
  //   const { mutate: loginUser, isLoading } = useMutation(
  //     (userData: LoginInput) => loginUser(userData),
  //     {
  //       onSuccess: () => {
  //         query.refetch();
  //         toast.success("You successfully logged in");
  //         navigate(from);
  //       },
  //       onError: (error: any) => {
  //         if (Array.isArray((error as any).response.data.error)) {
  //           (error as any).response.data.error.forEach((el: any) =>
  //             toast.error(el.message, {
  //               position: "top-right",
  //             })
  //           );
  //         } else {
  //           toast.error((error as any).response.data.message, {
  //             position: "top-right",
  //           });
  //         }
  //       },
  //     }
  //   );

  //   const {
  //     reset,
  //     handleSubmit,
  //     formState: { isSubmitSuccessful },
  //   } = methods;

  //   useEffect(() => {
  //     if (isSubmitSuccessful) {
  //       reset();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isSubmitSuccessful]);

  //   const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
  //     // ? Executing the loginUser Mutation
  //     loginUser(values);
  //   };

  return (
    <>1</>
    // <Box
    //   css={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     minHeight: "100vh",
    //     backgroundColor: "#2363eb",
    //   }}
    // >
    //   <Box
    //     css={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       flexDirection: "column",
    //     }}
    //   >
    //     <Copy>Welcome Back!</Copy>
    //     <Copy>Login to have access!</Copy>
    //     <FormProvider {...methods}>
    //       <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
    //         <FormInput name="email" label="Email Address" type="email" />
    //         <FormInput name="password" label="Password" type="password" />

    //         <Copy css={{ fontSize: "0.9rem", mb: "1rem", textAlign: "right" }}>
    //           <Link to="/" style={{ color: "#333" }}>
    //             Forgot Password?
    //           </Link>
    //         </Copy>

    //         <Button type="submit" loading={isLoading}>
    //           Login
    //         </Button>

    //         <Copy css={{ fontSize: "0.9rem", mt: "1rem" }}>
    //           Need an account? <Link to="/register">Sign Up Here</Link>
    //         </Copy>
    //       </form>
    //     </FormProvider>
    //   </Box>
    // </Box>
  )
}
