import { EVENTS } from "../../../constants/events";
import { isProblemPage } from "./detector";
import { parseProblem } from "./parser";
import { startSession, endSession } from "../../../session/sessionManager";

console.log("🟢 DevSaathi injected");

// Notify that LeetCode is active
chrome.runtime.sendMessage({
    type: EVENTS.PLATFORM_CONNECTED,
    platform: "leetcode",
    url: location.href,
    timestamp: Date.now(),
});

if (isProblemPage()) {

    console.log("📘 Problem page detected");

    const problem = parseProblem();

    if (problem) {

        console.log("📘 Parsed Problem");

        console.table(problem);

        startSession(problem.slug);

        window.addEventListener("beforeunload", () => {
            endSession();
        });

        chrome.runtime.sendMessage({
            type: EVENTS.PROBLEM_PAGE_OPENED,
            platform: "leetcode",
            timestamp: Date.now(),
            problem,
        });

    }
}