const originalFetch = window.fetch;

window.fetch = async (...args) => {

    const response = await originalFetch(...args);

    try {

        const url =
            typeof args[0] === "string"
                ? args[0]
                : args[0] instanceof Request
                ? args[0].url
                : "";

        if (
            url.includes("/submissions/detail/") &&
            url.includes("/v2/check/")
        ) {

            console.log("🔥 Intercepted:", url);

            const data = await response.clone().json();

            console.log("📦 Judge Data:", data);

            if (data.finished) {

                console.log("📤 Posting Message");

                window.postMessage(
                    {
                        source: "DEVSAATHI",
                        type: "SUBMISSION_RESULT",
                        payload: data,
                    },
                    "*"
                );
            }
        }

    } catch (e) {
        console.error(e);
    }

    return response;
};

console.log("🚀 DevSaathi Fetch Hook Loaded");