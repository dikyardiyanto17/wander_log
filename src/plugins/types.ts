
// Basic

export interface Pagination {
    page: number
    pageCount: number
    pageSize: number
    total: number
}

export interface BasicArticle {
    id: number;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export interface Article {
    id: number | string;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | Date | null;
    locale: string | null;
    user: ArticleUser;
    category: ArticleCategory;
    comments: ArticleComment[];
    localizations: any[];
}

export interface ArticleUser {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export interface ArticleCategory {
    id: number;
    documentId: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export interface ArticleComment {
    id: number;
    documentId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// Basic Api

export interface ErrorDetail {
    path: string[];
    message: string;
    name: string;
}

export interface ErrorApiResponse {
    status: number;
    name: string;
    message: string;
    details?: {
        errors?: ErrorDetail[];
    };
}

export interface ApiResponse {
    data: []
    meta?: {}
}

export interface ApiRequest {
}

// Login Register

export interface LoginRegisterResponse {
    jwt: string
    user: {
        id: number
        documentId: string
        username: string
        email: string
        provider: string
        confirmed: boolean
        blocked: boolean
        createdAt: string
        updatedAt: string
        publishedAt: string
        locale: string | null
    }
}


// Input

export interface RegisterInput {
    email: string,
    username: string,
    password: string
}

export interface LoginInput {
    identifier: string,
    password: string
}

export interface ArticleForm {
    title: string;
    coverImageFile: File | string | null;
    description: string;
}

// State

export interface ShowInfoPayload {
    name?: string | ''
    messages: string
    type: 'success' | 'danger' | 'warning' | ''
    details?: {
        errors?: ErrorDetail[];
    };
}

export interface GroupedArticlesByUser {
    user: ArticleUser
    articles: Article[]
    comments: number
}

// Request Response Articles

export type PopulateOptions =
    | "[comments]"
    | "[user]"
    | "[category]"
    | "[comments][populate][user]"
    | "*"
    | "";

export type FilterOptions =
    | "[user][id]"
    | "";



export interface ArticlesResponse {
    data: Article[],
    meta?: {
        pagination?: Pagination
    }
}

export interface ArticleDetailResponse {
    data: Article,
    meta: {}
}
export interface ArticlesRequest {
    token: string;
    pagination?: {
        page?: number;
        pageSize?: number;
    };
    filters?: {
        option?: FilterOptions
        value?: number | string
    };
    populate?: PopulateOptions;
}

export interface ArticleDetailRequest {
    token: string;
    documentId: string
    populate?: PopulateOptions;
}

export interface ArticlesPostRequest {
    title: string
    description: string
    cover_image_url: string | File | null
    token: string
}

export interface ArticlesPutRequest {
    title: string
    description: string
    cover_image_url: string | File | null
    token: string
    documentId: string
}

export interface ArticlesDeleteRequest {
    token: string
    documentId: string | number
}

export interface ArticlesPostResponse {
    data: BasicArticle
    meta: {}
}

export interface ImageUploadRequest {
    token: string
    uploadFormData: FormData;
}

export interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: {
        public_id: string;
        resource_type: string;
    };
}

export interface ImageUploadItem {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        small?: ImageFormat;
        medium?: ImageFormat;
        thumbnail?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
        public_id: string;
        resource_type: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export type ImageUploadResponse = ImageUploadItem[];

// Request Response Comments
export interface CommentsPostRequest {
    token: string
    article: string | number
    content: string
}