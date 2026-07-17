import { EVENTS } from "../../../constants/events";
import { isProblemPage } from "./detector";

console.log("🟢 DevSaathi injected into LeetCode");

// Always notify that LeetCode is active
chrome.runtime.sendMessage({
  type: EVENTS.PLATFORM_CONNECTED,
  platform: "leetcode",
  url: location.href,
  timestamp: Date.now(),
});

// Detect if this is a problem page
if (isProblemPage()) {
  console.log("📘 Problem page detected");

  chrome.runtime.sendMessage({
    type: EVENTS.PROBLEM_PAGE_OPENED,
    platform: "leetcode",
    url: location.href,
    timestamp: Date.now(),
  });
}