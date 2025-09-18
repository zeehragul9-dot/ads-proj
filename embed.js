(async function () {
  const container = document.createElement("div");
  container.id = "my-ad-container";
  container.style.border = "1px solid #ddd";
  container.style.padding = "10px";
  container.style.margin = "10px 0";
  container.style.textAlign = "center";
  document.body.appendChild(container);

  try {
    const res = await fetch("https://zeehragul9-dot.github.io/ads-proj/ads.json");
    const ads = await res.json();

    // pick random ad
    const ad = ads[Math.floor(Math.random() * ads.length)];
    container.innerHTML = ad.content;

    // add close button
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "✖";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "5px";
    closeBtn.style.right = "10px";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => container.remove();
    container.style.position = "relative";
    container.appendChild(closeBtn);

  } catch (e) {
    container.innerHTML = "<p>Ad could not load.</p>";
  }
})();
