window.onload = () => {

    const tg = window.Telegram.WebApp;

    tg.ready();

    const noticias = [
        "🔥 Nuevas suscripciones disponibles",
        "✨ Contenido actualizado diariamente",
        "💎 Pagos con CryptoBot, Binance y PayPal",
        "⭐ Promociones especiales"
    ];

    let i = 0;

    setInterval(() => {

        const texto = document.getElementById("news-text");

        if (texto) {
            texto.textContent = noticias[i % noticias.length];
        }

        i++;

    }, 3000);

    // Mostrar la aplicación después de 2 segundos

    setTimeout(() => {

        const loading = document.getElementById("loading-screen");
        const app = document.getElementById("app");

        if (loading) {
            loading.style.display = "none";
        }

        if (app) {
            app.style.display = "block";
        }

    }, 2000);

    // Botón admin

    const adminButton = document.getElementById("admin-btn");

    if (
        tg.initDataUnsafe.user &&
        tg.initDataUnsafe.user.id === 8873809799
    ) {
        adminButton.style.display = "block";
    }

};

function openProduct(product) {

    alert("Has abierto: " + product);

}
