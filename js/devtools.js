const panelUrl = chrome.runtime.getURL("panel.html");

chrome.devtools.panels.create(
  "Network Auditor",
  "icons/icon-48x48.png",
  "html/panel.html",
  function(panel) {
    console.log("Network Auditor panel created");
  }
);

chrome.devtools.panels.create("Network Auditor", null, panelUrl, function(panel) {
    panel.onShown.addListener(function(window) {
        // Logic to communicate with the background script and fetch network requests
        chrome.runtime.sendMessage({ action: "getNetworkRequests" }, function(response) {
            window.networkRequests = response.requests;
            window.filterCriteria = { and: [], or: [] };
            window.updateDisplay();
        });

        window.updateDisplay = function() {
            // Logic to update the panel display based on networkRequests and filterCriteria
        };

        window.applyFilters = function() {
            // Logic to filter networkRequests based on filterCriteria
        };
    });
});