// Typescript types
import type { ThemeState } from '@/plugins/statetypes'

// Vue Pinia
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: (): ThemeState => ({
        isDark: false,
        appName: "Wonder Log",
        darkBackground: 1,
        lightBackground: 1
    }),
    actions: {
        initTheme(): void {
            const saved = localStorage.getItem('theme')
            const bg = localStorage.getItem('bg')
            this.isDark = saved == 'dark-mode'
            if (!saved){
                localStorage.setItem("theme", "dark-mode")
            }
            if (!bg){
                localStorage.setItem("bg", "1")
            }
        },
        toggleTheme(): void {
            this.isDark = !this.isDark
            const newTheme = this.isDark ? 'dark-mode' : 'light-mode'
            localStorage.setItem('theme', newTheme)
        },
        setTheme(value: boolean): void {
            this.isDark = value
            const newTheme = value ? 'dark-mode' : 'light-mode'
            localStorage.setItem('theme', newTheme)
        },
    },
})
