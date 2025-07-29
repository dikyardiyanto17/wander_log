// Axios API
import api from "@/plugins/axios";
import type { CommentsPostRequest } from "@/plugins/types";

export default class CommentsService {
    static async create(payload: CommentsPostRequest): Promise<any> {
        try {
            const { token, content, article } = payload
            const response = await api.post("/api/comments", { data: { content, article } }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response.data
        } catch (error) {
            throw error
        }
    }
}
