import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("/automations", () => {
        return HttpResponse.json([
            {
                id: "send_email",
                label: "Send Email",
                params: ["to", "subject"]
            },
            {
                id: "generate_doc",
                label: "Generate Document",
                params: ["template", "recipient"]
            }
        ]);
    }),

    http.post("/simulate", async ({ request }) => {
        const data = await request.json();

        return HttpResponse.json({
            status: "success",
            steps: data.nodes?.length || 0
        });
    })
];
