import { test, expect } from "@playwright/test";

test.describe("JSONPlaceholder API Validation", () => {

    test("Long Title", async ({ request }) => {

        const response = await request.post(
            "https://jsonplaceholder.typicode.com/posts",
            {
                data: {
                    title: "A".repeat(5000),
                    body: "Playwright",
                    userId: 1
                }
            }
        );

        expect(response.status()).toBe(201);

    });

    test("Special Characters", async ({ request }) => {

        const response = await request.post(
            "https://jsonplaceholder.typicode.com/posts",
            {
                data: {
                    title: "@#$%^&*()<>🔥🚀",
                    body: "Testing",
                    userId: 1
                }
            }
        );

        expect(response.status()).toBe(201);

    });

    test("Missing UserId", async ({ request }) => {

        const response = await request.post(
            "https://jsonplaceholder.typicode.com/posts",
            {
                data: {
                    title: "Test",
                    body: "Test"
                }
            }
        );

        expect(response.status()).toBe(201);

    });

});