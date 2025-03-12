const networkRequests = [];

chrome.webRequest.onCompleted.addListener(
    (details) => {
        networkRequests.push(details);
        chrome.storage.local.set({ networkRequests });
    },
    { urls: ["<all_urls>"] }
);

chrome.runtime.onInstalled.addListener(() => {
    console.log('Network Auditor extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRequests") {
        chrome.storage.local.get("networkRequests", (data) => {
            sendResponse(data.networkRequests || []);
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});