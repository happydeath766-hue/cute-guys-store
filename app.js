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

    adminButton.addEventListener("click", () => {

    document.getElementById("app").style.display = "none";

    document.getElementById("admin-panel").style.display = "block";

});


function openProduct(product) {

    alert("Has abierto: " + product);

}

function openProduct(product) {

    document.getElementById("app").style.display = "none";

    document.getElementById("product-page").style.display = "block";

    document.getElementById("product-title").innerText = product;

    let html = "";

    if (product === "TWINKS") {

        html = `
        <div class="plan-card">
            <h2>30 días</h2>
            <p>15 USD</p>
            <button class="buy-btn">Comprar</button>
        </div>

        <div class="plan-card">
            <h2>60 días</h2>
            <p>25 USD</p>
            <button class="buy-btn">Comprar</button>
        </div>

        <div class="plan-card">
            <h2>Permanente</h2>
            <p>40 USD</p>
            <button class="buy-btn">Comprar</button>
        </div>
        `;
    }

    if (product === "PROHIBIDO") {

        html = `
        <div class="plan-card">
            <h2>30 días</h2>
            <p>15 USD</p>
            <button class="buy-btn">Comprar</button>
        </div>

        <div class="plan-card">
            <h2>60 días</h2>
            <p>25 USD</p>
            <button class="buy-btn">Comprar</button>
        </div>
        `;
    }

    if (product === "ADULTOS") {

        html = `
        <div class="plan-card">
            <h2>30 días</h2>
            <p>10 USD</p>
            <button class="buy-btn">Comprar</button>
        </div>

        <div class="plan-card">
            <h2>60 días</h2>
            <p>18 USD</p>
            <button class="buy-btn">Comprar</button>
        </div>
        `;
    }

    document.getElementById("product-content").innerHTML = html;

}

function goBack() {

    document.getElementById("product-page").style.display = "none";

    document.getElementById("app").style.display = "block";

}

function changeImage(group) {

    const input = document.getElementById(group + "-input");

    const file = input.files[0];

    if (!file) {

        alert("Selecciona una imagen");

        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        document.getElementById(
            "img-" + group
        ).src = e.target.result;

        localStorage.setItem(
            "img-" + group,
            e.target.result
        );

        alert("Imagen actualizada");

    };

    reader.readAsDataURL(file);

}

function loadImages() {

    ["twinks", "prohibido", "adultos"].forEach(

        (group) => {

            const saved = localStorage.getItem(
                "img-" + group
            );

            if (saved) {

                document.getElementById(
                    "img-" + group
                ).src = saved;

            }

        }

    );

}

function closeAdmin() {

    document.getElementById(
        "admin-panel"
    ).style.display = "none";

    document.getElementById(
        "app"
    ).style.display = "block";

}

window.onload = () => {

    loadImages();

};
