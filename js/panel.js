const filterInput = document.getElementById('filter-input');
const filterTypeSelect = document.getElementById('filter-type');
const requestList = document.getElementById('request-list');
const showFilters = document.getElementById('showFilters');
const clearFilters = document.getElementById('clearFilters');
const clearListButton = document.getElementById('clearList');
const overlay = document.getElementById('overlay');
const closeOverlayButton = document.getElementById('closeOverlay');
const requestDetails = document.getElementById('requestDetails');
const gtmButtonClientSide = document.getElementById('gtmButtonClientSide');
const gtmButtonServerSide = document.getElementById('gtmButtonServerSide');
const tagCoButton = document.getElementById('tagCoButton');
const ga4ButtonClientSide = document.getElementById('ga4ButtonClientSide');
const ga4ButtonServerSide = document.getElementById('ga4ButtonServerSide');
const googleAdsButton = document.getElementById('googleAdsButton');
const googleTagButton = document.getElementById('googleTagButton');
const pianoButton = document.getElementById('pianoButton');
const atinternetButton = document.getElementById('atinternetButton');
const piwikButton = document.getElementById('piwikButton');
const csButton = document.getElementById('csButton');
const clarityButton = document.getElementById('clarityButton');
const kameleoonButton = document.getElementById('kameleoonButton');
const abtastyButton = document.getElementById('abtastyButton');
const bingButton = document.getElementById('bingButton');

let networkRequests = [];
let pageUrls = [];

let isPreview = false;

chrome.devtools.network.onRequestFinished.addListener((request) => {
    networkRequests.push(request);
    updateRequestList();
});

chrome.devtools.network.onNavigated.addListener((url) => {
    pageUrls.push({ url, requests: [] });
    updateRequestList();
});

filterInput.addEventListener('input', updateRequestList);
filterTypeSelect.addEventListener('change', updateRequestList);

// document.getElementById('applyFilter').addEventListener('click', () => {
//   const filterText = document.getElementById('filter-input').value;
//   const filters = parseFilters(filterText);
//   applyNetworkFilters(filters);
// });

showFilters.addEventListener('click', () => {
    if(document.getElementById('divFilters').style.display === 'block') {
        document.getElementById('divFilters').style.display = 'none';
        showFilters.style.backgroundColor = '#36eba9';
        showFilters.style.color = '#280137';

    } else {
        document.getElementById('divFilters').style.display = 'block';
        showFilters.style.backgroundColor = '#eb3678';
        showFilters.style.color = 'white';
    }
});

clearFilters.addEventListener('click', () => {
    document.getElementById('filter-input').value = '';
    updateRequestList();
    
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

clearListButton.addEventListener('click', () => {
    networkRequests = [];
    pageUrls = [];
    updateRequestList();
});

closeOverlayButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

tagCoButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'cdn.tagcommander.com';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

pianoButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'xiti.com/event';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

atinternetButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'xiti.com/hit.xiti';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

csButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'c.contentsquare.net';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

clarityButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'n.clarity.ms/collect';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });

});

kameleoonButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'data.kameleoon.eu';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

abtastyButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'try.abtasty.com ariane.abtasty.com';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

bingButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'bat.bing.com/action bat.bing.com/p/action bat.bing.net/actionp';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

gtmButtonClientSide.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'www.googletagmanager.com';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

gtmButtonServerSide.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'gtm.js';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

ga4ButtonClientSide.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'google-analytics.com/collect';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

ga4ButtonServerSide.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += '/g/collect';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

googleTagButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'google.com/ccm/collect';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

googleAdsButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'googletagmanager.com/gtag/js?id=AW- g.doubleclick.net/';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});

piwikButton.addEventListener('click', () => {
    if (filterInput.value.trim() !== '') {
        filterInput.value += ' ';
    }
    filterInput.value += 'ppms.php';
    updateRequestList();
    chrome.storage.sync.set({ filterValue: filterInput.value });
});


function parseFilters(filterText) {
  const filters = filterText.split(/\s+/).map(f => f.trim());
  return filters;
}

function applyNetworkFilters(filters) {
  chrome.devtools.network.onRequestFinished.addListener(request => {
    const url = request.request.url;
    let match = filters.some(filter => url.includes(filter));
    if (match) {
      addRequestToTable(request);
    }
  });
}

function updateRequestList() {
    const filterValue = filterInput.value.toLowerCase();
    const filterType = filterTypeSelect.value;
    const filters = parseFilters(filterValue);

    requestList.innerHTML = '';

    pageUrls.forEach(page => {
        addPageUrlRow(page.url);
        const filteredRequests = networkRequests.filter(request => {
            const url = request.request.url.toLowerCase();
            if (filterType === 'and') {
                return filters.every(filter => url.includes(filter));
            } else {
                return filters.some(filter => url.includes(filter));
            }
        });
        filteredRequests.forEach(request => {
            addRequestToTable(request);
        });
    });
}

function addRequestToTable(request) {
    let urlToDisplay;
    // Check if request.request.url contains a query string
    if (request.request.url.includes("?")) {
        urlToDisplay = (request.request.url.split("?")[0]).split("/").slice(-1);
        urlToDisplay += "?" + request.request.url.split("?")[1];
        
    } else {
        urlToDisplay = request.request.url.split("/").slice(-1);
    }
    // const initiatorType = request.initiator && request.initiator.url ? request.initiator.url : (request.initiator && request.initiator.type ? request.initiator.type : 'N/A');
    // const size = request.response.bodySize > 0 ? (request.response.bodySize / 1024).toFixed(2) + ' KB' : (request.response.contentLength ? (request.response.contentLength / 1024).toFixed(2) + ' KB' : 'N/A');
    const fileType = request.response.content.mimeType.split('/')[1];
    const listItem = document.createElement('tr');
    listItem.className = 'request-item';
    listItem.innerHTML = `
        <td title="${request.request.url}">/${urlToDisplay}</td>
        <td>${request.response.status}</td>
        <td>${request.request.method}</td>
        <td>${fileType}</td>
    `;
    listItem.addEventListener('click', () => {
        

        // If url contains cdn.tagcommander.com and .js then isPreview is true
        if (request.request.url.includes('cdn.tagcommander.com')) {
            isPreview = true;
        } else {
            isPreview = false;
        }
        showRequestDetails(request);
    });
    requestList.appendChild(listItem);
}

function addPageUrlRow(url) {
    const urlNoParams = url.split('?')[0];
    const listItem = document.createElement('tr');
    listItem.className = 'page-url-item';
    listItem.innerHTML = `
        <td colspan="4" class="page-url">${urlNoParams}</td>
    `;
    requestList.appendChild(listItem);
}

function showRequestDetails(request) {
  request.getContent((body) => {
    let details;
    console.log('isPreview', isPreview);
    if (isPreview === true) {
      details = `
        <span class="green">URL:</span><br><a href="${request.request.url}" target="_blank" class="code"><pre>${request.request.url}</pre></a><br><br>
        <span class="green">Preview:</span><br><pre>${body}</pre><br><br>
      `;
    } else {
      const queryParameters = request.request.queryString.map(param => `${param.name}: ${param.value}`).join('\n');
      const requestPayload = request.request.postData ? JSON.stringify(JSON.parse(request.request.postData.text), null, 2) : 'N/A';
      details = `
        <span class="green">URL:</span><br><a href="${request.request.url}" target="_blank" class="code"><pre>${request.request.url}</pre></a><br><br>
        <span class="green">Query Parameters:</span><br><pre>${queryParameters}</pre><br><br>
        <span class="green">Request Payload:</span><br><pre>${requestPayload}</pre>
      `;
    }

    requestDetails.innerHTML = details;
    overlay.style.display = 'block';
  });
}

// Load saved filter value when the panel opens
chrome.storage.sync.get('filterValue', ({ filterValue }) => {
    if (filterValue) {
      filterInput.value = filterValue;
      updateRequestList();
    }
  });
  
  // Save updates to storage whenever the user types
  filterInput.addEventListener('input', () => {
    chrome.storage.sync.set({ filterValue: filterInput.value });
  });

  // Save updates to storage whenever the click on buttons
    tagCoButton.addEventListener('click', () => {
        chrome.storage.sync.set({ filterValue: filterInput.value });
    });
