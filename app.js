async function loadAds() {
  const res = await fetch("ads.json");
  return await res.json();
}

function showAd(slot, ad) {
  const adDiv = document.getElementById(slot);
  if (!adDiv) return;

  adDiv.innerHTML = `
    <div class="ad-box">
      <span class="ad-close">&times;</span>
      ${ad.content}
    </div>
  `;

  adDiv.querySelector(".ad-close").addEventListener("click", () => {
    adDiv.innerHTML = "";
  });
}

function showOverlayAd(ad) {
  const overlay = document.getElementById("overlayAd");
  overlay.innerHTML = ad.content;
  overlay.style.display = "block";

  setTimeout(() => {
    overlay.style.display = "none";
  }, 6000);
}

function rotateAds(ads) {
  setInterval(() => {
    const ad = ads[Math.floor(Math.random() * ads.length)];
    if (ad.type === "overlay") {
      showOverlayAd(ad);
    } else {
      showAd(ad.position + "Ad", ad);
    }
  }, Math.floor(Math.random() * 5000) + 10000); // 10-15s
}

// ---------------- VIDEO ADS ----------------
const adVideo = document.getElementById("adVideo");
const mainVideo = document.getElementById("mainVideo");
const skipBtn = document.getElementById("skipAdBtn");

// Pre-roll
function playPreRollAd() {
  mainVideo.style.display = "none";
  adVideo.style.display = "block";
  skipBtn.style.display = "none";
  adVideo.src = "ad.mp4";
  adVideo.currentTime = 0;
  adVideo.play();

  setTimeout(() => skipBtn.style.display = "block", 5000);
}

adVideo.addEventListener("ended", () => {
  if (!mainVideo.dataset.started) startMainVideo();
  else resumeMainVideo();
});

skipBtn.addEventListener("click", () => {
  adVideo.pause();
  if (!mainVideo.dataset.started) startMainVideo();
  else resumeMainVideo();
});

function startMainVideo() {
  adVideo.style.display = "none";
  skipBtn.style.display = "none";
  mainVideo.style.display = "block";
  mainVideo.dataset.started = true;
  mainVideo.play();
}

function resumeMainVideo() {
  adVideo.style.display = "none";
  skipBtn.style.display = "none";
  mainVideo.style.display = "block";
  mainVideo.play();
}

// Mid-roll
let midRollPlayed = false;
mainVideo.addEventListener("timeupdate", () => {
  if (mainVideo.currentTime > 15 && !midRollPlayed) {
    midRollPlayed = true;
    playMidRollAd();
  }
});

function playMidRollAd() {
  mainVideo.pause();
  mainVideo.style.display = "none";
  adVideo.style.display = "block";
  skipBtn.style.display = "none";
  adVideo.src = "ad2.mp4";
  adVideo.currentTime = 0;
  adVideo.play();

  setTimeout(() => skipBtn.style.display = "block", 4000);
}

// Init
window.onload = async () => {
  const ads = await loadAds();
  rotateAds(ads);
  playPreRollAd();
};
