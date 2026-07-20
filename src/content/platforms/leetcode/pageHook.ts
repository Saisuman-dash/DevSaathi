(() => {

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

                const data = await response.clone().json();

                if (data.finished) {

                    window.postMessage(
                        {
                            source: "DevSaathi",
                            type: "SUBMISSION_RESULT",
                            payload: {
                                result: data.status_msg,
                                runtime: data.display_runtime,
                                memory: data.memory,
                                submissionId: data.submission_id,
                                totalCorrect: data.total_correct,
                                totalTestcases: data.total_testcases,
                            },
                        },
                        "*"
                    );

                }

            }

        } catch {}

        return response;

    };

    console.log("🔥 Page Hook Loaded");

})();