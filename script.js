fetch('iltifatlar.json')
  .then(res => res.json())
  .then(compliments => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('az-AZ', { month: 'long' });
    const year = today.getFullYear();
    const index = today.getDate() % compliments.length;

    document.getElementById("dayCount").textContent = `📅 Bugün ${day} ${month} ${year}`;
    document.getElementById("complimentNumber").textContent = ` İltifatlar ${index + 1}/${compliments.length}`;
    document.getElementById("compliment").textContent = compliments[index];
  })
  .catch(error => {
    document.getElementById("compliment").textContent = "İltifatlar yüklənə bilmədi 😢";
    console.error("Xəta:", error);
  });

function shareSite() {
  const shareData = {
    title: "💖Hər Gün Bir İltifat 💖",
    text: "Nə yəni hər gün bir iltifat?🥺💘",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch((err) => console.log("Xəta:", err));
  } else {
    prompt("Linki kopyala və paylaş ✨", window.location.href);
  }
}

const emojis = ["🌸", "🎀", "🩷", "😻", "💝", "💖"];
for (let i = 0; i < 100; i++) {
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.top = Math.random() * 100 + "vh";
  emoji.style.fontSize = (Math.random() * 20 + 20) + "px";
  document.body.appendChild(emoji);
}

function updateProgressBar() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const total = endOfDay - startOfDay;
  const passed = now - startOfDay;
  const remaining = endOfDay - now;

  const percent = Math.min((passed / total) * 100, 100);
  document.getElementById("progress").style.width = percent + "%";

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerText =
    `Yeni iltifata ${hours} saat, ${minutes} dəqiqə, ${seconds} saniyə qaldı.`;
}

updateProgressBar();
setInterval(updateProgressBar, 1000);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("✅ Service Worker qeydiyyatdan keçdi!"))
    .catch(error => console.error("❌ Xəta:", error));
}

function togglePanel() {
  const panel = document.getElementById("panel");
  panel.style.display = (panel.style.display === "none" || panel.style.display === "") ? "block" : "none";
}

function addCompliment() {
  const input = document.getElementById("newCompliment");
  const value = input.value.trim();
  if (value) {
    let compliments = JSON.parse(localStorage.getItem("customCompliments") || "[]");
    compliments.push(value);
    localStorage.setItem("customCompliments", JSON.stringify(compliments));

    const li = document.createElement("li");
    li.textContent = value;
    document.getElementById("complimentList").appendChild(li);
    input.value = "";
  } else {
    alert("Zəhmət olmasa boş göndərmə 🙃");
  }
}

function clearAllCompliments() {
  if (confirm("Əminsən? Bütün əlavə etdiyin iltifatlar silinəcək!")) {
    localStorage.removeItem("customCompliments");
    alert("Bütün əlavə olunan iltifatlar silindi. (İltifatların silinməsi üçün səhifəni yenilə)");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const compliments = JSON.parse(localStorage.getItem("customCompliments") || "[]");
  const list = document.getElementById("complimentList");
  compliments.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  });
});