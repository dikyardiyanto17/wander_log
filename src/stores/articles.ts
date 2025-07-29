// Typescript type
import type { ArticlesState } from '@/plugins/statetypes'
import type { Article, ArticleComment, GroupedArticlesByUser, Pagination } from '@/plugins/types'

// Vue pinia
import { defineStore } from 'pinia'

export const useArticlesStore = defineStore('articles', {
    state: (): ArticlesState => ({
        articles: [],
        article: null,
        pagination: {
            page: 1,
            pageCount: 1,
            pageSize: 1,
            total: 0,
        },
        users: []
    }),
    actions: {
        setArticles(payload: Article[]): void {
            this.articles = [...payload]
        },
        resetArticles(): void {
            this.articles = []
        },
        setArticle(payload: Article): void {
            this.article = payload
        },
        setPagination(payload: Pagination): void {
            this.pagination = { ...payload }
        },
        addCommentArticle(newComment: ArticleComment, articleId: number | string) {
            console.log("ARTICLE ID:", articleId);
            if (!articleId) return;

            const foundArticle = this.articles.find(article => article.id == articleId);

            if (foundArticle) {
                if (!Array.isArray(foundArticle.comments)) {
                    foundArticle.comments = [];
                }
                foundArticle.comments.push(newComment);
            }
            console.log(this.articles)
        },
        async groupArticlesByUser(articles: Article[]): Promise<GroupedArticlesByUser[]> {
            const groupedMap = new Map<number, GroupedArticlesByUser>();

            for (const article of articles) {
                const userId = article.user.id;

                if (!groupedMap.has(userId)) {
                    groupedMap.set(userId, {
                        user: article.user,
                        articles: [],
                        comments: 0,
                    });
                }

                const group = groupedMap.get(userId)!;

                // Safely add comments
                group.comments += article.comments?.length ?? 0;

                group.articles.push(article);
            }

            this.users = Array.from(groupedMap.values());
            return this.users;
        },
    },
    getters: {}
})
