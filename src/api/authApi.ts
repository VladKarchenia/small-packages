import axios from "axios"
import urljoin from "url-join"
import { GenericResponse, ILoginResponse, IUserResponse } from "./types"
import { LoginInput } from "@/pages"

// move to .env file
const BASE_URL = "http://localhost:8000/"

export const authApi = axios.create({
  baseURL: urljoin(BASE_URL, "api"),
  // withCredentials is to send cookies in the requests all the time (our JWT)
  withCredentials: true,
})

authApi.defaults.headers.common["Content-Type"] = "application/json"

// // we can also set JWT in axios headers
// const token = localStorage.getItem("token") // inside App
// // or
// const token = response.data.token // inside login func
// authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`

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

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("auth/login", user)
  return response.data
}

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout")
  return response.data
}

export const getMeFn = async () => {
  // const response = await authApi.get<IUserResponse>("users/me")
  // return response.data
  return {
    data: {
      user: {
        name: "Vlad",
        email: "vlad@mail.com",
        // role: "user",
        role: "admin",
        _id: "aaa",
        id: "aaa",
        createdAt: "15-01-2020",
        updatedAt: "16-01-2020",
        __v: 123,
      },
    },
  }
}
