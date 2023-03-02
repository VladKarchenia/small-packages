export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  expiresInTime: number
}

export interface IRefreshResponse {
  accessToken: string
  refreshToken: string
  expiresInTime: number
}

export interface LoginInput {
  username: string
  password: string
}

export interface RecoveryInput {
  email: string
}

export interface ResetInput {
  newPassword: string
  confirmNewPassword: string
}

export interface ChangeInput {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
