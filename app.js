setTimeout(() => {
    document.getElementById("splash-screen").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("app").style.display = "block";
    }, 500);

}, 2000);
function openProduct(product) {
    alert("Has abierto: " + product);
}
const audio = new Audio("startup.mp3");

window.onload = () => {
  audio.volume = 0.5;
  audio.play();

  const loadingMessages = [
    "Conectando...",
    "Cargando contenido...",
    "Buscando novedades...",
    "Preparando tu experiencia..."
  ];

  let i = 0;

  setInterval(() => {
    document.getElementById("loading-text").textContent =
      loadingMessages[i % loadingMessages.length];

    i++;
  }, 1200);

  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
  }, 5000);

  const news = [
    "🔥 Nuevas suscripciones disponibles",
    "✨ Contenido actualizado diariamente",
    "💳 Pagos con CryptoBot, Binance y PayPal",
    "⭐ Promociones especiales por tiempo limitado"
  ];

  let n = 0;

  setInterval(() => {
    document.getElementById("news-text").textContent =
      news[n % news.length];

    n++;
  }, 3000);
};
