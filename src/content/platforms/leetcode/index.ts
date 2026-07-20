import { EVENTS } from "../../../constants/events";
import { isProblemPage } from "./detector";
import { parseProblem } from "./parser";
import { startSession, endSession } from "../../../session/sessionManager";
import { sendEvent } from "../../../api/client";

// ---------------- Inject Page Hook ----------------

const script = document.createElement("script");

script.src = chrome.runtime.getURL("pageHook.js");

(document.head || document.documentElement).appendChild(script);

script.onload = () => script.remove();

console.log("🟢 DevSaathi injected");

// ---------------- Platform Connected ----------------

chrome.runtime.sendMessage({
    type: EVENTS.PLATFORM_CONNECTED,
    platform: "leetcode",
    url: location.href,
    timestamp: Date.now(),
});

if (!isProblemPage()) {
    throw new Error("Not a problem page");
}

const problem = parseProblem();

if (!problem) {
    throw new Error("Problem not found");
}

console.table(problem);

startSession(problem.slug);

// ---------------- Problem Opened ----------------

sendEvent({
    type: EVENTS.PROBLEM_PAGE_OPENED,
    platform: "leetcode",
    timestamp: Date.now(),
    problem,
});

// ---------------- Heartbeat ----------------

const heartbeat = setInterval(() => {
    sendEvent({
        type: EVENTS.HEARTBEAT,
        platform: "leetcode",
        timestamp: Date.now(),
        problem,
    });
}, 30000);

// ---------------- Session End ----------------

window.addEventListener("beforeunload", () => {

    clearInterval(heartbeat);

    endSession();

    sendEvent({
        type: EVENTS.SESSION_ENDED,
        platform: "leetcode",
        timestamp: Date.now(),
        problem,
    });

});

// ---------------- Receive Submission Result ----------------

window.addEventListener("message", (event) => {

    if (event.source !== window) return;

    if (!event.data) return;

    if (event.data.source !== "DevSaathi") return;

    if (event.data.type !== "SUBMISSION_RESULT") return;

    console.log("🏁 GOT RESULT", event.data.payload);

    sendEvent({
        type: EVENTS.SUBMISSION_RESULT,
        platform: "leetcode",
        timestamp: Date.now(),
        result: event.data.payload.result,
        problem,
    });

});