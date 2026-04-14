async function loadFeed(url, id, count=2) {
  try {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await res.json();
    const items = data.items.slice(0, count);
    document.getElementById(id).innerHTML = items.map(i =>
      `<li><a href="${i.link}" target="_blank">${i.title}</a></li>`).join("");
  } catch {
    document.getElementById(id).innerHTML = "<li>Unable to load news</li>";
  }
}

// Feeds per category
loadFeed("https://feeds.bbci.co.uk/news/world/rss.xml", "international");
loadFeed("https://www.espn.com/espn/rss/news", "sports");
loadFeed("https://feeds.bbci.co.uk/news/rss.xml", "national");
loadFeed("https://www.brainyquote.com/link/quotebr.rss", "thought");

// Simple ticker
async function loadTicker() {
  const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/rss.xml");
  const data = await res.json();
  document.getElementById("ticker").textContent = data.items.slice(0,2).map(i => i.title).join(" — ");
}
loadTicker();