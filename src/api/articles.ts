// Axios API
import api from "@/plugins/axios";

// Typescript Type
import type { ArticleDetailRequest, ArticleDetailResponse, ArticlesDeleteRequest, ArticlesPostRequest, ArticlesPostResponse, ArticlesPutRequest, ArticlesRequest, ArticlesResponse, ImageUploadRequest, ImageUploadResponse } from "@/plugins/types";

export default class ArticlesService {
    static async articles(payload: ArticlesRequest): Promise<ArticlesResponse> {
        try {
            const { token, populate, pagination, filters } = payload;
            const params: Record<string, any> = {};
            if (populate != "" && populate != "*") {
                params[`populate${populate}`] = "*";
            }
            if (populate == "*") {
                params[`populate`] = "*";
            }

            if (pagination) {
                if (pagination.page) {
                    params['pagination[page]'] = pagination.page;
                }
                if (pagination.pageSize) {
                    params['pagination[pageSize]'] = pagination.pageSize;
                }
            }

            if (filters?.option && filters.value !== undefined) {
                params[`filters${filters.option}`] = filters.value;
            }

            const response = await api.get('/api/articles', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async detail(payload: ArticleDetailRequest): Promise<ArticleDetailResponse> {
        try {
            const { token, documentId, populate } = payload;
            const params: Record<string, any> = {};
            if (populate != "" && populate != "*") {
                params[`populate${populate}`] = "*";
            }
            if (populate == "*") {
                params[`populate`] = "*";
            }
            const response = await api.get(`/api/articles/${documentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async create(payload: ArticlesPostRequest): Promise<ArticlesPostResponse> {
        try {
            const { token, cover_image_url, description, title } = payload
            const response = await api.post("/api/articles", { data: { title, description, cover_image_url } }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response.data
        } catch (error) {
            throw error
        }
    }

    static async update(payload: ArticlesPutRequest): Promise<ArticlesPostResponse> {
        try {
            const { token, cover_image_url, description, title, documentId } = payload
            const response = await api.put(`/api/articles/${documentId}`, { data: { title, description, cover_image_url } }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response.data
        } catch (error) {
            throw error
        }
    }

    static async delete(payload: ArticlesDeleteRequest): Promise<void> {
        try {
            const { token, documentId } = payload
            const response = await api.delete(`/api/articles/${documentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response?.data
        } catch (error) {
            throw error
        }
    }

    static async uploadPicture(payload: ImageUploadRequest): Promise<ImageUploadResponse> {
        try {
            const { token, uploadFormData } = payload
            const response = await api.post("/api/upload",
                uploadFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            return response.data
        } catch (error) {
            throw error
        }
    }

}
