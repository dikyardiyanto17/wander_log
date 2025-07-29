// Typescript types
import type { AuthState } from '@/plugins/statetypes'

// Vue Pinia
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        jwt: "",
        username: "",
        initial: "",
        email: "",
        blocked: false,
        confirmed: false,
        provider: "",
        id: ""
    }),
    actions: {
        async saveToken(payload: string): Promise<void> {
            await localStorage.setItem("token", payload)
        },
        async removeToken(): Promise<void> {
            await localStorage.removeItem("token")
        },
        async removeUsers(): Promise<void> {
            this.jwt = ""
            this.username = ""
            this.initial = ""
            this.email = ""
            this.blocked = false
            this.confirmed = false
            this.provider = ""
            this.id = ""
        },
        async saveUsers(payload: AuthState): Promise<void> {
            this.jwt = payload.jwt
            this.username = payload.username
            this.initial = payload.initial
            this.email = payload.email
            this.blocked = payload.blocked
            this.confirmed = payload.confirmed
            this.provider = payload.provider
            this.id = payload.id
        }

    },
    getters: {},
    persist: true
})
