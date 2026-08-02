window.onload = () => {

    const noticias = [
        "🔥 Nuevas suscripciones disponibles",
        "✨ Contenido actualizado diariamente",
        "💎 Pagos con CryptoBot, Binance y PayPal",
        "⭐ Promociones especiales"
    ];

    let i = 0;

    setInterval(() => {
        document.getElementById("news-text").textContent =
            noticias[i % noticias.length];

        i++;
    }, 3000);

    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("app").style.display = "block";
    }, 4000);

};

function openProduct(product) {

    switch (product) {

        case "TWINKS":
            alert("👑 TWINKS\n\n30 días: $15\n60 días: $25\nPermanente: $40");
            break;

        case "PROHIBIDO":
            alert("🔒 PROHIBIDO\n\n30 días: $15\n60 días: $25\nPermanente: $40");
            break;

        case "ADULTOS":
            alert("⭐ MAYORES\n\n30 días: $10\n60 días: $18\nPermanente: $30");
            break;

    }

}
const tg = window.Telegram.WebApp;

tg.ready();

const adminButton = document.getElementById("admin-btn");

if (
  tg.initDataUnsafe.user &&
  tg.initDataUnsafe.user.id === 8873809799
) {
  adminButton.style.display = "block";
}

adminButton.addEventListener("click", () => {
  alert("👑 Panel de administrador");
});
