import { APIRequestContext, expect } from '@playwright/test';

export class BuzzAPI {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createPost(text: string) {
        const response = await this.request.post(
            'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/posts',
            {
                data: { text: text }
            }
        );

        expect(response.ok()).toBeTruthy();

        return response.json();
    }
}
