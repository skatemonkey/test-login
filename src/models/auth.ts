// src/models/auth.ts
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  permissions: string[]
}
