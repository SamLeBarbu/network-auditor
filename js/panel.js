const filterInput = document.getElementById("filterInput");
const filterHidden = document.getElementById("filterHidden");
const activatedButtons = document.getElementById("activatedButtons");
// const filterTypeSelect = document.getElementById("filterType");
const requestList = document.getElementById("requestList");
const showFilters = document.getElementById("showFilters");
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

let favicon;

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

showFilters.addEventListener("click", () => {
  // Check if divFilters data-status attributer is equals to show
  if (
    document.getElementById("divFilters").attributes["data-status"].value ===
    "show"
  ) {
    document.getElementById("divFilters").className = "divFiltersOut";
    showFilters.style.backgroundColor = "#36eba9";
    showFilters.style.color = "#280137";
    showFilters.innerText = "Show predefined filters";
    document.getElementById("divFilters").attributes["data-status"].value =
      "hidden";

    _paq.push(["trackEvent", "Hide filters", "click"]);
    // Wait for the animation to finish
    setTimeout(() => {
      document.getElementById("divFilters").style.display = "none";
    }, 400);
  } else {
    document.getElementById("divFilters").className = "divFiltersIn";
    document.getElementById("divFilters").style.display = "block";
    showFilters.style.backgroundColor = "#eb3678";
    showFilters.style.color = "white";
    showFilters.innerText = "Hide predefined filters";
    overlay.style.display = "none";
    document.getElementById("divFilters").attributes["data-status"].value =
      "show";
    _paq.push(["trackEvent", "Show filters", "click"]);
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

  _paq.push(["trackEvent", "Clear filters", "click"]);
});

clearRequestsButton.addEventListener("click", () => {
  networkRequests = [];
  pageUrls = [];
  updateRequestList();

  _paq.push(["trackEvent", "Clear requests", "click"]);
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
  document.getElementById(buttonName).className = "normalButtonGreen";
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
  document.getElementById(buttonName).className = "normalButton";
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
      _paq.push(["trackEvent", buttonId, "click - ON"]);
    } else {
      deactivateButton(buttonId, button.attributes["data-syntax"].value);
      _paq.push(["trackEvent", buttonId, "click - OFF"]);
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
    favicon = "gtm";
  } else if (
    request.request.url.includes("cdn.tagcommander.com") ||
    request.request.url.includes("cdn.trustcommander.net")
  ) {
    favicon = "commandersact";
  } else if (request.request.url.includes("xiti.com/event")) {
    favicon = "piano";
  } else if (request.request.url.includes("xiti.com/hit.xiti")) {
    favicon = "atinternet";
  } else if (
    request.request.url.includes("contentsquare.net/uxa") ||
    request.request.url.includes("contentsquare.net/v2") ||
    request.request.url.includes("contentsquare.net/pageview")
  ) {
    favicon = "contentsquare";
  } else if (request.request.url.includes("n.clarity.ms/collect")) {
    favicon = "clarity";
  } else if (request.request.url.includes("data.kameleoon.eu")) {
    favicon = "kameleoon";
  } else if (
    request.request.url.includes("try.abtasty.com") ||
    request.request.url.includes("ariane.abtasty.com")
  ) {
    favicon = "abtasty";
  } else if (
    request.request.url.includes("bat.bing.com/action") ||
    request.request.url.includes("bat.bing.com/p/action") ||
    request.request.url.includes("bat.bing.net/actionp")
  ) {
    favicon = "bing";
  } else if (
    request.request.url.includes("/g/collect") ||
    request.request.url.includes("googletagmanager.com/gtag/js?id=G-")
  ) {
    favicon = "ga4";
  } else if (request.request.url.includes("google.com/ccm/collect")) {
    favicon = "google";
  } else if (
    request.request.url.includes("doubleclick.net") ||
    request.request.url.includes("googletagmanager.com/gtag/js?id=AW-") ||
    request.request.url.includes("googletagmanager.com/gtag/js?id=DC-")
  ) {
    favicon = "googleads";
  } else {
  }
  // const initiatorType = request.initiator && request.initiator.url ? request.initiator.url : (request.initiator && request.initiator.type ? request.initiator.type : 'N/A');
  // const size = request.response.bodySize > 0 ? (request.response.bodySize / 1024).toFixed(2) + ' KB' : (request.response.contentLength ? (request.response.contentLength / 1024).toFixed(2) + ' KB' : 'N/A');
  const fileType = request.response.content.mimeType.split("/")[1];
  const listItem = document.createElement("tr");
  // Check if favicon = gtm
  if (
    favicon == "gtm" ||
    favicon == "commandersact" ||
    favicon == "piano" ||
    favicon == "atinternet" ||
    favicon == "contentsquare" ||
    favicon == "clarity" ||
    favicon == "kameleoon" ||
    favicon == "abtasty" ||
    favicon == "bing" ||
    favicon == "ga4" ||
    favicon == "google" ||
    favicon == "googleads"
  ) {
    favicon = `<img src="../favicons/favicon_${favicon}.png" alt="favicon" class="favicon">`;
  } else {
    favicon = "";
  }
  listItem.className = "request-item";
  listItem.innerHTML = `
        <td title="${request.request.url}">${favicon}/${urlToDisplay}</td>
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
    console.log("isPreview", isPreview);

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
  "activatedButtonsValue",
  ({ activatedButtonsValue }) => {
    if (activatedButtonsValue) {
      console.log("activatedButtonsValue", activatedButtonsValue);
      activatedButtons.value = activatedButtonsValue;
      const activatedButtonsArray = activatedButtonsValue.split("|");
      activatedButtonsArray.forEach((button) => {
        document.getElementById(button).className = "normalButtonGreen";
        document.getElementById("tiny_" + button).style.display = "inline";
      });
    } else {
      console.log("activatedButtonsValue", activatedButtonsValue);
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
  _paq.push(["trackEvent", "What's new", "click", "Menu"]);
});

menuBugs.addEventListener("click", () => {
  popinBugs.style.display = "block";
  _paq.push(["trackEvent", "Know bugs", "click", "Menu"]);
});

menuHelp.addEventListener("click", () => {
  popinHelp.style.display = "block";
  _paq.push(["trackEvent", "Help", "click", "Menu"]);
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
