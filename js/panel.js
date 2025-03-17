const filterInput = document.getElementById("filterInput");
const filterHidden = document.getElementById("filterHidden");
const activatedButtons = document.getElementById("activatedButtons");
// const filterTypeSelect = document.getElementById("filterType");
const requestList = document.getElementById("requestList");
const showPredifinedFilters = document.getElementById("showPredifinedFilters");
const showCustomFilters = document.getElementById("showCustomFilters");
const divPredefinedFilters = document.getElementById("divPredefinedFilters");
const divCustomFilters = document.getElementById("divCustomFilters");
const clearFilters = document.getElementById("clearFilters");
const clearRequestsButton = document.getElementById("clearRequests");
const overlay = document.getElementById("overlay");
const closeOverlayButton = document.getElementById("closeOverlay");
const requestDetails = document.getElementById("requestDetails");
const trustCoButton = document.getElementById("trustCoButton");
const oneTrustButton = document.getElementById("oneTrustButton");
const cookieBotButton = document.getElementById("cookieBotButton");
const didomiButton = document.getElementById("didomiButton");
const tarteAuCitronButton = document.getElementById("tarteAuCitronButton");
const gtmClientSideButton = document.getElementById("gtmClientSideButton");
const gtmServerSideButton = document.getElementById("gtmServerSideButton");
const tagCoButton = document.getElementById("tagCoButton");
const ga4ClientSideButton = document.getElementById("ga4ClientSideButton");
const ga4ServerSideButton = document.getElementById("ga4ServerSideButton");
const googleAdsButton = document.getElementById("googleAdsButton");
const googleTagButton = document.getElementById("googleTagButton");
const pianoButton = document.getElementById("pianoButton");
const atinternetButton = document.getElementById("atinternetButton");
const piwikButton = document.getElementById("piwikButton");
const csButton = document.getElementById("csButton");
const clarityButton = document.getElementById("clarityButton");
const kameleoonButton = document.getElementById("kameleoonButton");
const abtastyButton = document.getElementById("abtastyButton");
const bingButton = document.getElementById("bingButton");

const popinNews = document.getElementById("popinNews");
const closePopinNews = document.getElementById("closePopinNews");
const menuNews = document.getElementById("menuNews");
const popinBugs = document.getElementById("popinBugs");
const closePopinBugs = document.getElementById("closePopinBugs");
const menuBugs = document.getElementById("menuBugs");
const menuHelp = document.getElementById("menuHelp");
const closePopinHelp = document.getElementById("closePopinHelp");
const popinHelp = document.getElementById("popinHelp");
const backToTop = document.getElementById("backToTop");

const customFilterswitch1 = document.getElementById("customFilterswitch1");
const customFilterswitch2 = document.getElementById("customFilterswitch2");
const customFilterswitch3 = document.getElementById("customFilterswitch3");
const customFilterswitch4 = document.getElementById("customFilterswitch4");
const customFilterswitch5 = document.getElementById("customFilterswitch5");
const customFilterswitch6 = document.getElementById("customFilterswitch6");

const customFilterInput1 = document.getElementById("customFilterInput1");
const customFilterInput2 = document.getElementById("customFilterInput2");
const customFilterInput3 = document.getElementById("customFilterInput3");
const customFilterInput4 = document.getElementById("customFilterInput4");
const customFilterInput5 = document.getElementById("customFilterInput5");
const customFilterInput6 = document.getElementById("customFilterInput6");

let toolFavicon;
let requestType;

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

filterInput.addEventListener("input", updateRequestList);
filterHidden.addEventListener("input", updateRequestList);
// filterTypeSelect.addEventListener("change", updateRequestList);

// document.getElementById('applyFilter').addEventListener('click', () => {
//   const filterText = document.getElementById('filter-input').value;
//   const filters = parseFilters(filterText);
//   applyNetworkFilters(filters);
// });

showPredifinedFilters.addEventListener("click", () => {
  // Check if divPredefinedFilters data-status attributer is equals to show
  if (divPredefinedFilters.attributes["data-status"].value === "show") {
    divPredefinedFilters.className = "divPredefinedFiltersOut";
    showPredifinedFilters.style.backgroundColor = "#36eba9";
    showPredifinedFilters.style.color = "#280137";
    showPredifinedFilters.innerText = "Show predefined filters";
    divPredefinedFilters.attributes["data-status"].value = "hidden";

    _paq.push(["trackEvent", "Actions", "Hide predifined filters"]);
    // Wait for the animation to finish
    setTimeout(() => {
      divPredefinedFilters.style.display = "none";
    }, 400);
  } else {
    divPredefinedFilters.className = "divPredefinedFiltersIn";
    divPredefinedFilters.style.display = "block";
    showPredifinedFilters.style.backgroundColor = "#eb3678";
    showPredifinedFilters.style.color = "white";
    showPredifinedFilters.innerText = "Hide predefined filters";
    overlay.style.display = "none";
    divPredefinedFilters.attributes["data-status"].value = "show";
    _paq.push(["trackEvent", "Actions", "Show predifined filters"]);
  }
});

showCustomFilters.addEventListener("click", () => {
  // Check if divPredefinedFilters data-status attributer is equals to show
  if (divCustomFilters.attributes["data-status"].value === "show") {
    divCustomFilters.className = "divCustomFiltersOut";
    showCustomFilters.style.backgroundColor = "#36eba9";
    showCustomFilters.style.color = "#280137";
    showCustomFilters.innerText = "Show custom filters";
    divCustomFilters.attributes["data-status"].value = "hidden";

    _paq.push(["trackEvent", "Actions", "Hide custom filters"]);
    // Wait for the animation to finish
    setTimeout(() => {
      divCustomFilters.style.display = "none";
    }, 400);
  } else {
    divCustomFilters.className = "divCustomFiltersIn";
    divCustomFilters.style.display = "block";
    showCustomFilters.style.backgroundColor = "#eb3678";
    showCustomFilters.style.color = "white";
    showCustomFilters.innerText = "Hide custom filters";
    overlay.style.display = "none";
    divCustomFilters.attributes["data-status"].value = "show";
    _paq.push(["trackEvent", "Actions", "Show custom filters"]);
  }
});

clearFilters.addEventListener("click", () => {
  const normalButtonsToReset = chrome.storage.sync.get(
    "activatedButtonsValue",
    ({ activatedButtonsValue }) => {
      const activatedButtonsArray = activatedButtonsValue.split("|");
      activatedButtonsArray.forEach((button) => {
        document.getElementById(button).className = "normalButton";
        document.getElementById("tiny_" + button).style.display = "none";
      });
    }
  );

  document.getElementById("filterInput").value = "";
  document.getElementById("filterHidden").value = "";
  document.getElementById("activatedButtons").value = "";

  chrome.storage.sync.set({ filterInputValue: "" });
  chrome.storage.sync.set({ filterHiddenValue: "" });
  chrome.storage.sync.set({ activatedButtonsValue: "" });

  updateRequestList();

  _paq.push(["trackEvent", "Actions", "Clear filters"]);
});

clearRequestsButton.addEventListener("click", () => {
  networkRequests = [];
  pageUrls = [];
  updateRequestList();

  _paq.push(["trackEvent", "Actions", "Clear requests"]);
});

closeOverlayButton.addEventListener("click", () => {
  overlay.style.display = "none";
});

function activateButton(buttonName, syntax) {
  if (filterHidden.value.trim() !== "") {
    filterHidden.value += " OR ";
    activatedButtons.value += "|";
  }
  filterHidden.value += syntax;
  activatedButtons.value += buttonName;
  updateRequestList();
  chrome.storage.sync.set({ filterHiddenValue: filterHidden.value });
  chrome.storage.sync.set({ activatedButtonsValue: activatedButtons.value });
  // if document.getElementById(buttonName) exists
  if (document.getElementById(buttonName)) {
    document.getElementById(buttonName).className = "normalButtonGreen";
  }
  document.getElementById("tiny_" + buttonName).style.display = "inline";
}

function deactivateButton(buttonName, syntax) {
  // Remove syntax from filterHidden
  filterHidden.value = filterHidden.value.replace(syntax, "");
  filterHidden.value = filterHidden.value.replace(" OR  OR ", " OR ");
  // If filterHidden ends with " OR " then remove it
  if (filterHidden.value.endsWith(" OR ")) {
    filterHidden.value = filterHidden.value.slice(0, -4);
  }
  if (filterHidden.value.startsWith(" OR ")) {
    filterHidden.value = filterHidden.value.slice(4);
  }

  // Remove buttonName from activatedButtons
  activatedButtons.value = activatedButtons.value.replace(buttonName, "");
  activatedButtons.value = activatedButtons.value.replace("||", "|");
  // If activatedButtons ends with "|" then remove it
  if (activatedButtons.value.endsWith("|")) {
    activatedButtons.value = activatedButtons.value.slice(0, -1);
  }
  if (activatedButtons.value.startsWith("|")) {
    activatedButtons.value = activatedButtons.value.slice(1);
  }
  updateRequestList();

  chrome.storage.sync.set({ filterHiddenValue: filterHidden.value });
  chrome.storage.sync.set({ activatedButtonsValue: activatedButtons.value });
  if (document.getElementById(buttonName)) {
    document.getElementById(buttonName).className = "normalButton";
  }
  document.getElementById("tiny_" + buttonName).style.display = "none";
}

// find all the buttons with class normalButton
const buttons = Array.from(document.getElementsByClassName("normalButton")).map(
  (button) => button.id
);

buttons.forEach((buttonId) => {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    if (button.className === "normalButton") {
      activateButton(buttonId, button.attributes["data-syntax"].value);
      _paq.push(["trackEvent", "Filters", buttonId, "ON"]);
    } else {
      deactivateButton(buttonId, button.attributes["data-syntax"].value);
      _paq.push(["trackEvent", "Filters", buttonId, "OFF"]);
    }
  });
});

function applyNetworkFilters(filters) {
  chrome.devtools.network.onRequestFinished.addListener((request) => {
    const url = request.request.url;
    let match = filters.some((filter) => url.includes(filter));
    if (match) {
      addRequestToTable(request);
    }
  });
}

function updateRequestList() {
  const filterInputValue = filterInput.value.toLowerCase();
  const filterHiddenValue = filterHidden.value.toLowerCase();

  let filterCombined;
  if (filterInputValue.trim() !== "" && filterHiddenValue.trim() !== "") {
    filterCombined = filterInputValue + " OR " + filterHiddenValue;
  } else if (
    filterInputValue.trim() !== "" &&
    filterHiddenValue.trim() === ""
  ) {
    filterCombined = filterInputValue;
  } else if (
    filterInputValue.trim() === "" &&
    filterHiddenValue.trim() !== ""
  ) {
    filterCombined = filterHiddenValue;
  } else {
    filterCombined = "";
  }

  requestList.innerHTML = "";

  pageUrls.forEach((page) => {
    addPageUrlRow(page.url);

    const filteredRequests = networkRequests.filter((request) => {
      const url = request.request.url.toLowerCase();
      const ast = parseQuery(filterCombined);
      //   Check if filterCombined is not undefined

      if (filterCombined !== "") {
        if (evaluate(ast, url)) {
          addRequestToTable(request);
        } else {
        }
      } else {
        addRequestToTable(request);
      }
    });
  });
}

function addRequestToTable(request) {
  let urlToDisplay;
  // Check if request.request.url contains a query string
  if (request.request.url.includes("?")) {
    urlToDisplay = request.request.url.split("?")[0].split("/").slice(-1);
    urlToDisplay += "?" + request.request.url.split("?")[1];
  } else {
    urlToDisplay = request.request.url.split("/").slice(-1);
  }

  if (request.request.url.includes("gtm.js")) {
    toolFavicon = "gtm";
  } else if (
    request.request.url.includes("cdn.tagcommander.com") ||
    request.request.url.includes("cdn.trustcommander.net") ||
    (request.request.url.includes("privacy_v") &&
      request.request.url.includes(".js")) ||
    (request.request.url.includes("tc_") && request.request.url.includes(".js"))
  ) {
    toolFavicon = "commandersact";
  } else if (request.request.url.includes("xiti.com/event")) {
    toolFavicon = "piano";
  } else if (request.request.url.includes("xiti.com/hit.xiti")) {
    toolFavicon = "atinternet";
  } else if (
    request.request.url.includes("ppms.js") ||
    request.request.url.includes("ppms.php")
  ) {
    toolFavicon = "piwik";
  } else if (
    request.request.url.includes("matomo.js") ||
    request.request.url.includes("matomo.php")
  ) {
    toolFavicon = "matomo";
  } else if (
    request.request.url.includes("contentsquare.net/uxa") ||
    request.request.url.includes("contentsquare.net/v2") ||
    request.request.url.includes("contentsquare.net/pageview")
  ) {
    toolFavicon = "contentsquare";
  } else if (request.request.url.includes("n.clarity.ms/collect")) {
    toolFavicon = "clarity";
  } else if (request.request.url.includes("data.kameleoon.eu")) {
    toolFavicon = "kameleoon";
  } else if (
    request.request.url.includes("try.abtasty.com") ||
    request.request.url.includes("ariane.abtasty.com")
  ) {
    toolFavicon = "abtasty";
  } else if (
    request.request.url.includes("bat.bing.com/action") ||
    request.request.url.includes("bat.bing.com/p/action") ||
    request.request.url.includes("bat.bing.net/actionp")
  ) {
    toolFavicon = "bing";
  } else if (
    request.request.url.includes("/g/collect") ||
    request.request.url.includes("googletagmanager.com/gtag/js?id=G-")
  ) {
    toolFavicon = "ga4";
  } else if (request.request.url.includes("google.com/ccm/collect")) {
    toolFavicon = "google";
  } else if (
    request.request.url.includes("doubleclick.net") ||
    request.request.url.includes("googletagmanager.com/gtag/js?id=AW-") ||
    request.request.url.includes("googletagmanager.com/gtag/js?id=DC-")
  ) {
    toolFavicon = "googleads";
  } else {
  }
  // const initiatorType = request.initiator && request.initiator.url ? request.initiator.url : (request.initiator && request.initiator.type ? request.initiator.type : 'N/A');
  // const size = request.response.bodySize > 0 ? (request.response.bodySize / 1024).toFixed(2) + ' KB' : (request.response.contentLength ? (request.response.contentLength / 1024).toFixed(2) + ' KB' : 'N/A');
  const fileType = request.response.content.mimeType.split("/")[1];
  const listItem = document.createElement("tr");
  // Check if toolFavicon = gtm
  if (
    toolFavicon == "gtm" ||
    toolFavicon == "commandersact" ||
    toolFavicon == "piano" ||
    toolFavicon == "atinternet" ||
    toolFavicon == "piwik" ||
    toolFavicon == "matomo" ||
    toolFavicon == "contentsquare" ||
    toolFavicon == "clarity" ||
    toolFavicon == "kameleoon" ||
    toolFavicon == "abtasty" ||
    toolFavicon == "bing" ||
    toolFavicon == "ga4" ||
    toolFavicon == "google" ||
    toolFavicon == "googleads"
  ) {
    toolFavicon = `<img src="../favicons/favicon_${toolFavicon}.png" alt="favicon" class="favicon">`;
    if (
      request.request.url.includes(".js") ||
      request.request.url.includes("/js")
    ) {
      toolFavicon += ` <img src="../favicons/js_green.png" alt="js" class="favicon"> `;
    } else {
      toolFavicon += ` <img src="../favicons/send_pink.png" alt="js" class="favicon"> `;
    }
  } else {
    toolFavicon = "";
  }
  listItem.className = "request-item";
  listItem.innerHTML = `
        <td title="${request.request.url}">${toolFavicon}/${urlToDisplay}</td>
        <td>${request.response.status}</td>
        <td>${request.request.method}</td>
        <td>${fileType}</td>
    `;
  listItem.addEventListener("click", () => {
    // If url contains cdn.tagcommander.com and .js then isPreview is true
    if (
      (request.request.url.includes("cdn.tagcommander.com") ||
        request.request.url.endsWith(".js") ||
        request.request.url.includes(".json")) &&
      !request.request.url.includes("xiti.com")
    ) {
      isPreview = true;
    } else {
      isPreview = false;
    }
    showRequestDetails(request);
  });
  requestList.appendChild(listItem);
}

function addPageUrlRow(url) {
  const urlNoParams = url.split("?")[0];
  const listItem = document.createElement("tr");
  listItem.className = "page-url-item";
  listItem.innerHTML = `
        <td colspan="4" class="page-url">${urlNoParams}</td>
    `;
  requestList.appendChild(listItem);
}

function showRequestDetails(request) {
  request.getContent((body) => {
    let details;
    let urlRequest = request.request.url;

    if (urlRequest.includes("%")) {
      urlRequest = decodeURIComponent(urlRequest);
    }

    if (isPreview === true) {
      if (request.request.url.includes(".json")) {
        body = JSON.stringify(JSON.parse(body), null, 2);
      }

      details = `
        <span class="green">URL:</span><br><a href="${request.request.url}" target="_blank" class="code"><pre>${urlRequest}</pre></a><br><br>
        <span class="green">Preview:</span><br><pre>${body}</pre><br><br>
      `;
    } else {
      let queryParameters = request.request.queryString
        .map((param) => `${param.name}: ${param.value}`)
        .join("\n");
      let requestPayload = request.request.postData
        ? JSON.stringify(JSON.parse(request.request.postData.text), null, 2)
        : "N/A";

      // Check if queryParameters is a URL encoded string and decode it
      if (queryParameters.includes("%")) {
        queryParameters = decodeURIComponent(queryParameters);
      }

      // Check if requestPayload is a URL encoded string and decode it
      if (requestPayload.includes("%")) {
        requestPayload = decodeURIComponent(requestPayload);
      }

      details = `
        <span class="green">URL:</span><br><a href="${request.request.url}" target="_blank" class="code"><pre>${urlRequest}</pre></a><br><br>
        <span class="green">Query Parameters:</span><br><pre>${queryParameters}</pre><br><br>
        <span class="green">Request Payload:</span><br><pre>${requestPayload}</pre>
        `;
    }

    requestDetails.innerHTML = details;
    overlay.style.display = "block";
  });
}

// Load saved filter value when the panel opens
chrome.storage.sync.get("filterInputValue", ({ filterInputValue }) => {
  if (filterInputValue) {
    filterInput.value = filterInputValue;
    updateRequestList();
  }
});
chrome.storage.sync.get("filterHiddenValue", ({ filterHiddenValue }) => {
  if (filterHiddenValue) {
    filterHidden.value = filterHiddenValue;
    updateRequestList();
  }
});

chrome.storage.sync.get(
  "customFilterInput1Value",
  ({ customFilterInput1Value }) => {
    if (customFilterInput1Value) {
      customFilterInput1.value = customFilterInput1Value;
    }
  }
);

chrome.storage.sync.get(
  "customFilterInput2Value",
  ({ customFilterInput2Value }) => {
    if (customFilterInput2Value) {
      customFilterInput2.value = customFilterInput2Value;
    }
  }
);

chrome.storage.sync.get(
  "customFilterInput3Value",
  ({ customFilterInput3Value }) => {
    if (customFilterInput3Value) {
      customFilterInput3.value = customFilterInput3Value;
    }
  }
);

chrome.storage.sync.get(
  "customFilterInput4Value",
  ({ customFilterInput4Value }) => {
    if (customFilterInput4Value) {
      customFilterInput4.value = customFilterInput4Value;
    }
  }
);

chrome.storage.sync.get(
  "customFilterInput5Value",
  ({ customFilterInput5Value }) => {
    if (customFilterInput5Value) {
      customFilterInput5.value = customFilterInput5Value;
    }
  }
);

chrome.storage.sync.get(
  "customFilterInput6Value",
  ({ customFilterInput6Value }) => {
    if (customFilterInput6Value) {
      customFilterInput6.value = customFilterInput6Value;
    }
  }
);

chrome.storage.sync.get(
  "activatedButtonsValue",
  ({ activatedButtonsValue }) => {
    if (activatedButtonsValue) {
      activatedButtons.value = activatedButtonsValue;
      const activatedButtonsArray = activatedButtonsValue.split("|");
      activatedButtonsArray.forEach((button) => {
        if (document.getElementById(button)) {
          document.getElementById(button).className = "normalButtonGreen";
        }
        document.getElementById("tiny_" + button).style.display = "inline";
        if (button === "customFilter1") {
          customFilterswitch1.checked = true;
          customFilterInput1.disabled = true;
          chrome.storage.sync.get(
            "customFilterInput1Value",
            ({ customFilterInput1Value }) => {
              customFilterInput1.value = customFilterInput1Value;
            }
          );
        } else if (button === "customFilter2") {
          customFilterswitch2.checked = true;
          customFilterInput2.disabled = true;
          chrome.storage.sync.get(
            "customFilterInput2Value",
            ({ customFilterInput2Value }) => {
              customFilterInput2.value = customFilterInput2Value;
            }
          );
        } else if (button === "customFilter3") {
          customFilterswitch3.checked = true;
          customFilterInput3.disabled = true;
          chrome.storage.sync.get(
            "customFilterInput3Value",
            ({ customFilterInput3Value }) => {
              customFilterInput3.value = customFilterInput3Value;
            }
          );
        } else if (button === "customFilter4") {
          customFilterswitch4.checked = true;
          customFilterInput4.disabled = true;
          chrome.storage.sync.get(
            "customFilterInput4Value",
            ({ customFilterInput4Value }) => {
              customFilterInput4.value = customFilterInput4Value;
            }
          );
        } else if (button === "customFilter5") {
          customFilterswitch5.checked = true;
          customFilterInput5.disabled = true;
          chrome.storage.sync.get(
            "customFilterInput5Value",
            ({ customFilterInput5Value }) => {
              customFilterInput5.value = customFilterInput5Value;
            }
          );
        } else if (button === "customFilter6") {
          customFilterswitch6.checked = true;
          customFilterInput6.disabled = true;
          chrome.storage.sync.get(
            "customFilterInput6Value",
            ({ customFilterInput6Value }) => {
              customFilterInput6.value = customFilterInput6Value;
            }
          );
        }
      });
    } else {
    }
  }
);

// Save updates to storage whenever the user types
filterInput.addEventListener("input", () => {
  chrome.storage.sync.set({ filterInputValue: filterInput.value });
});
filterHidden.addEventListener("input", () => {
  chrome.storage.sync.set({ filterHiddenValue: filterHidden.value });
});
activatedButtons.addEventListener("input", () => {
  chrome.storage.sync.set({ activatedButtonsValue: activatedButtons.value });
});

// Save updates to storage whenever the click on buttons
// tagCoButton.addEventListener("click", () => {
//   chrome.storage.sync.set({ filterInputValue: filterInput.value });
// });

/******************************************************
 * 1) TOKENIZE THE QUERY
 ******************************************************/
function tokenize(query) {
  // Make parentheses explicit tokens by spacing them out
  query = query.replace(/\(/g, " ( ").replace(/\)/g, " ) ").toLowerCase();

  // Split on whitespace
  const rawTokens = query.trim().split(/\s+/);

  // Filter out empty strings
  return rawTokens.filter(Boolean);
}

/******************************************************
 * 2) PARSE TOKENS INTO AN AST
 *
 *   Expression := OrExpr
 *   OrExpr     := AndExpr ( "or" AndExpr )*
 *   AndExpr    := Factor ( "and" Factor )*
 *   Factor     := [ "not" ] ( WORD | "(" OrExpr ")" )
 ******************************************************/
class TokenStream {
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
  }

  peek() {
    return this.tokens[this.index];
  }

  next() {
    return this.tokens[this.index++];
  }

  hasMore() {
    return this.index < this.tokens.length;
  }
}

function parseQuery(query) {
  const stream = new TokenStream(tokenize(query));
  const ast = parseOrExpr(stream);

  // If there's leftover tokens, the user’s query might be malformed
  if (stream.hasMore()) {
    throw new Error("Unexpected extra tokens after parsing.");
  }
  return ast;
}

function parseOrExpr(stream) {
  let left = parseAndExpr(stream);
  while (stream.peek() === "or") {
    stream.next(); // consume 'or'
    const right = parseAndExpr(stream);
    left = { type: "binary", op: "OR", left, right };
  }
  return left;
}

function parseAndExpr(stream) {
  let left = parseFactor(stream);
  while (stream.peek() === "and") {
    stream.next(); // consume 'and'
    const right = parseFactor(stream);
    left = { type: "binary", op: "AND", left, right };
  }
  return left;
}

function parseFactor(stream) {
  // Handle "not" as a unary operator
  if (stream.peek() === "not") {
    stream.next(); // consume 'not'
    const node = parseFactor(stream);
    return { type: "unary", op: "NOT", node };
  }

  // If the next token is "(" then parse a sub-expression
  if (stream.peek() === "(") {
    stream.next(); // consume '('
    const node = parseOrExpr(stream);
    if (stream.peek() !== ")") {
      throw new Error("Missing closing parenthesis.");
    }
    stream.next(); // consume ')'
    return node;
  }

  // Otherwise, it must be a word
  const word = stream.next();
  return { type: "literal", value: word };
}

/******************************************************
 * 3) EVALUATE THE AST
 ******************************************************/
function evaluate(ast, line) {
  switch (ast.type) {
    case "literal":
      return line.includes(ast.value);

    case "unary": // NOT
      return !evaluate(ast.node, line);

    case "binary": // AND / OR
      const leftVal = evaluate(ast.left, line);
      const rightVal = evaluate(ast.right, line);
      if (ast.op === "AND") {
        return leftVal && rightVal;
      } else if (ast.op === "OR") {
        return leftVal || rightVal;
      } else {
        throw new Error("Unknown binary operator: " + ast.op);
      }

    default:
      throw new Error("Unknown AST node type: " + ast.type);
  }
}

// Cature the clicks on popinNews

menuNews.addEventListener("click", () => {
  popinNews.style.display = "block";
  _paq.push(["trackEvent", "Menu", "What's new"]);
});

menuBugs.addEventListener("click", () => {
  popinBugs.style.display = "block";
  _paq.push(["trackEvent", "Menu", "Bugs"]);
});

menuHelp.addEventListener("click", () => {
  popinHelp.style.display = "block";
  _paq.push(["trackEvent", "Menu", "Help"]);
});

closePopinNews.addEventListener("click", () => {
  popinNews.style.display = "none";
});

closePopinBugs.addEventListener("click", () => {
  popinBugs.style.display = "none";
});

closePopinHelp.addEventListener("click", () => {
  popinHelp.style.display = "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
  _paq.push(["trackEvent", "Actions", "Back to top"]);
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}

// When the customFilterswitchX changes, update the customFilterswitchXValue
customFilterswitch1.addEventListener("change", () => {
  const customFilterswitch1Value = customFilterswitch1.checked;
  chrome.storage.sync.set({ customFilterswitch1Value });
  if (customFilterswitch1Value === true) {
    // disable customFilterInput1
    customFilterInput1.disabled = true;
    const customFilterInput1Value = customFilterInput1.value;
    chrome.storage.sync.set({ customFilterInput1Value });
    activateButton("customFilter1", customFilterInput1Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 1", "ON"]);
  } else {
    // enable customFilterInput1
    customFilterInput1.disabled = false;
    const customFilterInput1Value = customFilterInput1.value;

    deactivateButton("customFilter1", customFilterInput1Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 1", "OFF"]);
  }
});

customFilterswitch2.addEventListener("change", () => {
  const customFilterswitch2Value = customFilterswitch2.checked;
  chrome.storage.sync.set({ customFilterswitch2Value });
  if (customFilterswitch2Value === true) {
    // disable customFilterInput2
    customFilterInput2.disabled = true;
    const customFilterInput2Value = customFilterInput2.value;
    chrome.storage.sync.set({ customFilterInput2Value });
    activateButton("customFilter2", customFilterInput2Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 2", "ON"]);
  } else {
    // enable customFilterInput2
    customFilterInput2.disabled = false;
    const customFilterInput2Value = customFilterInput2.value;

    deactivateButton("customFilter2", customFilterInput2Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 2", "OFF"]);
  }
});

customFilterswitch3.addEventListener("change", () => {
  const customFilterswitch3Value = customFilterswitch3.checked;
  chrome.storage.sync.set({ customFilterswitch3Value });
  if (customFilterswitch3Value === true) {
    // disable customFilterInput3
    customFilterInput3.disabled = true;
    const customFilterInput3Value = customFilterInput3.value;
    chrome.storage.sync.set({ customFilterInput3Value });
    activateButton("customFilter3", customFilterInput3Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 3", "ON"]);
  } else {
    // enable customFilterInput3
    customFilterInput3.disabled = false;
    const customFilterInput3Value = customFilterInput3.value;

    deactivateButton("customFilter3", customFilterInput3Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 3", "OFF"]);
  }
});

customFilterswitch4.addEventListener("change", () => {
  const customFilterswitch4Value = customFilterswitch4.checked;
  chrome.storage.sync.set({ customFilterswitch4Value });
  if (customFilterswitch4Value === true) {
    // disable customFilterInput4
    customFilterInput4.disabled = true;
    const customFilterInput4Value = customFilterInput4.value;
    chrome.storage.sync.set({ customFilterInput4Value });
    activateButton("customFilter4", customFilterInput4Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 4", "ON"]);
  } else {
    // enable customFilterInput4
    customFilterInput4.disabled = false;
    const customFilterInput4Value = customFilterInput4.value;

    deactivateButton("customFilter4", customFilterInput4Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 4", "OFF"]);
  }
});

customFilterswitch5.addEventListener("change", () => {
  const customFilterswitch5Value = customFilterswitch5.checked;
  chrome.storage.sync.set({ customFilterswitch5Value });
  if (customFilterswitch5Value === true) {
    // disable customFilterInput5
    customFilterInput5.disabled = true;
    const customFilterInput5Value = customFilterInput5.value;
    chrome.storage.sync.set({ customFilterInput5Value });
    activateButton("customFilter5", customFilterInput5Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 5", "ON"]);
  } else {
    // enable customFilterInput5
    customFilterInput5.disabled = false;
    const customFilterInput5Value = customFilterInput5.value;

    deactivateButton("customFilter5", customFilterInput5Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 5", "OFF"]);
  }
});

customFilterswitch6.addEventListener("change", () => {
  const customFilterswitch6Value = customFilterswitch6.checked;
  chrome.storage.sync.set({ customFilterswitch6Value });
  if (customFilterswitch6Value === true) {
    // disable customFilterInput6
    customFilterInput6.disabled = true;
    const customFilterInput6Value = customFilterInput6.value;
    chrome.storage.sync.set({ customFilterInput6Value });
    activateButton("customFilter6", customFilterInput6Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 6", "ON"]);
  } else {
    // enable customFilterInput6
    customFilterInput6.disabled = false;
    const customFilterInput6Value = customFilterInput6.value;

    deactivateButton("customFilter6", customFilterInput6Value);
    _paq.push(["trackEvent", "Filters", "Custom filter 6", "OFF"]);
  }
});
