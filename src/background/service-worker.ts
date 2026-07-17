console.log("🚀 DevSaathi Service Worker Started");

chrome.runtime.onInstalled.addListener(() => {
    console.log("✅ DevSaathi Installed");
});

chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("📨 Message Received");
    console.log(message);
    console.log(sender);

    return true;
});