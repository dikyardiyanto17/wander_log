// Typescript types
import type { InfoState } from '@/plugins/statetypes'
import type { ErrorApiResponse, ErrorDetail, ShowInfoPayload } from '@/plugins/types';

// Vue Pinia
import { defineStore } from 'pinia'
export const useInfoStore = defineStore('info', {
    state: (): InfoState => ({
        messages: "Sukses",
        type: "success",
        isShown: false,
        isLoading: false
    }),
    actions: {
        showInfo(payload: ShowInfoPayload): void {
            try {
                this.isShown = true;
                const detailMessages = payload.details?.errors
                    ?.map((err: ErrorDetail) => `• ${err.path.join(".")}: ${err.message}`)
                    .join("\n") ?? "";

                this.messages = `${payload.name ? `Error Name: ${payload.name}\n` : ""}${payload.messages}\n${detailMessages}`;
                this.type = payload.type;

                setTimeout(() => {
                    this.isShown = false;
                }, 5000);
            } catch (error) {
                alert(error);
            }
        }
        ,
        async errorHandling(payload: ErrorApiResponse): Promise<void> {
            await this.showInfo({
                messages: payload.message,
                name: payload.name,
                type: "danger",
                details: payload.details,
            });
            this.isLoading = false;
            console.log(payload);
        }
        ,
        formatDetails(details: any): string {
            if (!details || typeof details !== 'object') return "";
            let output = "";
            for (const [key, value] of Object.entries(details)) {
                if (Array.isArray(value)) {
                    output += `${key}: ${value.join(", ")}\n`;
                } else {
                    output += `${key}: ${value}\n`;
                }
            }
            return output.trim();
        },
        startLoading(): void {
            if (!this.isLoading) {
                this.isLoading = true
            }
        },
        resetLoading(): void {
            if (this.isLoading) {
                this.isLoading = false
            }
        }
    },
    getters: {
    }
})
