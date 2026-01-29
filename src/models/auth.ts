// src/models/auth.ts
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  user_id: number
  access_token: string
  permissions: string[]
}
