const siteID = "32f0a224-0d51-46e9-a213-270c5f248baf";

var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
  let u = "https://samthebehaviorguy.piwik.pro/";
  _paq.push(["setTrackerUrl", u + "ppms.php"]);
  _paq.push(["setSiteId", siteID]);
  let d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.async = true;
  g.defer = true;
  g.src = "../js/ppms.min.js";
  s.parentNode.insertBefore(g, s);
})();
