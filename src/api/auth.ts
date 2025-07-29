// services/AuthService.ts

// Axios API
import api from "@/plugins/axios"

// Typescript Type
import type { LoginInput, RegisterInput, LoginRegisterResponse } from "@/plugins/types"

export default class AuthService {
  static async register(payload: RegisterInput): Promise<LoginRegisterResponse> {
    try {
      const response = await api.post('/api/auth/local/register', payload)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async login(payload: LoginInput): Promise<LoginRegisterResponse> {
    try {
      const response = await api.post('/api/auth/local', payload)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async articles(payload: any): Promise<any> {
    try {
      const response = await api.post('/api/articles?populate=*', payload)
      return response.data
    } catch (error) {
      throw error
    }
  }

}
