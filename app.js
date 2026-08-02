const audio = new Audio("startup.mp3");

window.onload = () => {
  audio.volume = 0.4;

  audio.play().catch(() => {});

  const loadingMessages = [
    "🚀 Conectando con Cute Guys Store...",
    "📰 Buscando novedades...",
    "💎 Cargando suscripciones...",
    "✨ Preparando tu experiencia..."
  ];

  let i = 0;

  const loadingInterval = setInterval(() => {
    document.getElementById("loading-text").textContent =
      loadingMessages[i % loadingMessages.length];

    i++;
  }, 1000);

  setTimeout(() => {
    clearInterval(loadingInterval);

    document.getElementById("loading-screen").style.opacity = "0";

    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("app").style.display = "block";
    }, 500);

  }, 4000);

  const news = [
    "🔥 Nuevas suscripciones disponibles",
    "✨ Contenido actualizado diariamente",
    "💳 Pagos con CryptoBot, Binance y PayPal",
    "⭐ Promociones especiales disponibles"
  ];

  let n = 0;

  setInterval(() => {
    document.getElementById("news-text").textContent =
      news[n % news.length];

    n++;
  }, 3000);
};

function openProduct(product) {
  alert("Has abierto: " + product);
}
