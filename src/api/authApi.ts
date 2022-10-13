// import { LoginInput } from "@/pages/Login";
import axios from "axios"
import { GenericResponse, ILoginResponse, IUserResponse } from "./types"
const BASE_URL = "http://localhost:8000/api/"

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

authApi.defaults.headers.common["Content-Type"] = "application/json"

export const refreshAccessToken = async () => {
  const response = await authApi.get<ILoginResponse>("auth/refresh")
  return response.data
}

authApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.message as string

    if (errMessage.includes("not logged in") && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessToken()
      return authApi(originalRequest)
    }

    return Promise.reject(error)
  },
)

// export const loginUser = async (user: LoginInput) => {
//   const response = await authApi.post<ILoginResponse>("auth/login", user);
//   return response.data;
// };

export const logoutUser = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout")
  return response.data
}

export const getMe = async () => {
  const response = await authApi.get<IUserResponse>("users/me")
  return response.data
}
