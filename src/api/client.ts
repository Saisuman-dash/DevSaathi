const API_URL = "http://127.0.0.1:8000/events";

export async function sendEvent(event: unknown) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        console.log("✅ Event sent");
    } catch (error) {
        console.error("❌ Failed to send event", error);
    }
}