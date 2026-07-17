console.log("🟢 DevSaathi injected into LeetCode");

chrome.runtime.sendMessage({
    type: "PLATFORM_CONNECTED",
    platform: "leetcode",
    url: window.location.href,
    timestamp: Date.now()
});