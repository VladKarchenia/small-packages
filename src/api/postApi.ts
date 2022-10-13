import { authApi } from "./authApi"
import { IPostsResponse } from "./types"

export const getAllPosts = async () => {
  const response = await authApi.get<IPostsResponse>(`posts`)
  return response.data
}
