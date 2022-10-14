import axios from "axios"
import urljoin from "url-join"
import { GenericResponse, ILoginResponse, IUserResponse } from "./types"
import { LoginInput } from "@/pages"

// move to .env file
const BASE_URL = "http://localhost:8000/"

export const authApi = axios.create({
  baseURL: urljoin(BASE_URL, "api"),
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

export const loginUser = async (user: LoginInput) => {
  // const response = await authApi.post<ILoginResponse>("auth/login", user)
  // return response.data
  console.log(user)

  return {
    data: {
      user: {
        name: "Vlad",
        email: "vlad@mail.com",
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

export const logoutUser = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout")
  return response.data
}

export const getMe = async () => {
  // const response = await authApi.get<IUserResponse>("users/me")
  // return response.data
  return {
    data: {
      user: {
        name: "Vlad",
        email: "vlad@mail.com",
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
