window.onload = () => {

    const tg = window.Telegram.WebApp;

    tg.ready();

    loadProducts();

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

};

function hideAllPages() {

    const paginas = [
        "app",
        "product-page",
        "cart-page",
        "news-page",
        "contact-page",
        "stats-page",
        "admin-panel"
    ];

    paginas.forEach(id => {

        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.style.display = "none";
        }

    });

}

function openHome() {

    hideAllPages();

    document.getElementById("app").style.display = "block";

}

function goHome() {

    openHome();

}

function openCart() {

    hideAllPages();

    document.getElementById("cart-page").style.display = "block";

}

function openNews() {

    hideAllPages();

    document.getElementById("news-page").style.display = "block";

}

function openStats() {

    hideAllPages();

    document.getElementById("stats-page").style.display = "block";

}

function openContact() {

    hideAllPages();

    document.getElementById("contact-page").style.display = "block";

}

function openAdmin() {

    hideAllPages();

    document.getElementById("admin-panel").style.display = "block";

}
function openProduct(product) {

    hideAllPages();

    const pagina = document.getElementById("product-page");

    if (!pagina) {
        alert("No existe product-page");
        return;
    }

    pagina.style.display = "block";

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

        <div class="plan-card">
            <h2>Permanente</h2>
            <p>40 USD</p>
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

async function loadProducts() {

    const respuesta = await fetch("/api/productos");

    const productos = await respuesta.json();

    const catalogo = document.getElementById("catalogo");

    if (!catalogo) return;

    catalogo.innerHTML = "";

    productos.forEach((producto) => {

        catalogo.innerHTML += `
        <div class="card-netflix"
             style="background-image: url('images/${producto.nombre.toLowerCase()}.jpg');"
             onclick="openProduct('${producto.nombre}')">

            <div class="card-overlay">

                <h2>${producto.nombre}</h2>

                <span>Desde ${producto.precio_30} USD</span>

            </div>

        </div>
        `;

    });

}
