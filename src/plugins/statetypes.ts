import type { Article, GroupedArticlesByUser, Pagination } from "./types"

export interface AuthState {
    jwt: string,
    username: string,
    initial: string,
    email: string,
    blocked: boolean,
    confirmed: boolean,
    provider: string
    id: string | number
}

export interface ArticlesState {
    articles: Article[]
    article: Article | null
    pagination: Pagination
    users: GroupedArticlesByUser[]
}

export interface InfoState {
    messages: string,
    type: 'success' | 'danger' | 'warning' | '',
    isShown: boolean
    isLoading: boolean
}

export interface ThemeState {
    isDark: boolean,
    appName: string,
    darkBackground: number,
    lightBackground: number
}