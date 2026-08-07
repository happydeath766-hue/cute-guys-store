alert("APP.JS SI ESTA EJECUTANDO");
window.onload = () => {

    const tg = window.Telegram?.WebApp;

    if (tg) {
        tg.ready();
        tg.expand();
    }

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

    loadProducts();
    loadSavedImages();

    const adminButton = document.getElementById("admin-btn");

    if (adminButton) {
        adminButton.addEventListener("click", openAdmin);
    }
};


/* =========================
   NAVEGACIÓN
========================= */

function hideAllPages() {

    const ids = [
        "app",
        "product-page",
        "cart-page",
        "news-page",
        "contact-page",
        "stats-page",
        "admin-panel"
    ];

    ids.forEach(id => {
        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.style.display = "none";
        }
    });
}


function openHome() {

    hideAllPages();

    const app = document.getElementById("app");

    if (app) {
        app.style.display = "block";
    }
}


function goHome() {
    openHome();
}


function openCart() {

    hideAllPages();

    const pagina = document.getElementById("cart-page");

    if (pagina) {
        pagina.style.display = "block";
    }
}


function openNews() {

    hideAllPages();

    const pagina = document.getElementById("news-page");

    if (pagina) {
        pagina.style.display = "block";
    }
}


function openStats() {

    hideAllPages();

    const pagina = document.getElementById("stats-page");

    if (pagina) {
        pagina.style.display = "block";
    }
}


function openContact() {

    hideAllPages();

    const pagina = document.getElementById("contact-page");

    if (pagina) {
        pagina.style.display = "block";
    }
}


function openAdmin() {

    hideAllPages();

    const panel = document.getElementById("admin-panel");

    if (panel) {
        panel.style.display = "block";
    }
}


function closeAdmin() {
    openHome();
}


/* =========================
   PRODUCTOS
========================= */

async function loadProducts() {

    const catalogo = document.getElementById("catalogo");

    if (!catalogo) {
        return;
    }

    try {

        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) {
            throw new Error("HTTP " + respuesta.status);
        }

        const productos = await respuesta.json();

        catalogo.innerHTML = "";

        if (!Array.isArray(productos) || productos.length === 0) {

            catalogo.innerHTML = `
                <div class="plan-card">
                    <h2>No hay productos</h2>
                    <p>No se encontraron productos en la base de datos.</p>
                </div>
            `;

            return;
        }

        productos.forEach(producto => {

            const nombre = producto.nombre || "";

            const grupo = nombre === "MAYORES"
                ? "adultos"
                : nombre.toLowerCase();

            const imagenGuardada =
                localStorage.getItem("img-" + grupo);

            const imagen = imagenGuardada
                ? imagenGuardada
                : "images/" + (
                    producto.imagen || (grupo + ".jpg")
                  );

            catalogo.innerHTML += `

                <div
                    class="card-netflix"
                    style="
                        background-image:url('${imagen}');
                        background-size:cover;
                        background-position:center;
                    "
                    onclick="openProduct('${nombre}')"
                >

                    <div class="card-overlay">

                        <h2>${nombre}</h2>

                        <span>
                            Desde ${producto.precio_30} USD
                        </span>

                    </div>

                </div>

            `;
        });

    } catch (error) {

        console.error("Error cargando productos:", error);

        catalogo.innerHTML = `
            <div class="plan-card">
                <h2>⚠️ Error</h2>
                <p>No se pudieron cargar los productos.</p>
                <small>${error.message}</small>
            </div>
        `;
    }
}


/* =========================
   PRODUCTO
========================= */

async function openProduct(product) {

    hideAllPages();

    const pagina = document.getElementById("product-page");

    if (!pagina) {
        alert("No existe product-page");
        return;
    }

    pagina.style.display = "block";

    const titulo = document.getElementById("product-title");
    const contenido = document.getElementById("product-content");

    if (titulo) {
        titulo.innerText = product;
    }

    if (!contenido) {
        return;
    }

    contenido.innerHTML = `
        <div class="plan-card">
            <p>Cargando planes...</p>
        </div>
    `;

    try {

        const respuesta = await fetch("/api/productos");

        const productos = await respuesta.json();

        const encontrado = productos.find(
            p => p.nombre === product
        );

        if (!encontrado) {
            contenido.innerHTML = `
                <div class="plan-card">
                    <p>Producto no encontrado.</p>
                </div>
            `;
            return;
        }

        let html = "";

        if (encontrado.precio_30) {

            html += `
                <div class="plan-card">
                    <h2>30 días</h2>
                    <p>${encontrado.precio_30} USD</p>
                    <button
                        class="buy-btn"
                        onclick="buyProduct('${product}', '30 días', '${encontrado.precio_30}')"
                    >
                        Comprar
                    </button>
                </div>
            `;
        }

        if (encontrado.precio_60) {

            html += `
                <div class="plan-card">
                    <h2>60 días</h2>
                    <p>${encontrado.precio_60} USD</p>
                    <button
                        class="buy-btn"
                        onclick="buyProduct('${product}', '60 días', '${encontrado.precio_60}')"
                    >
                        Comprar
                    </button>
                </div>
            `;
        }

        if (encontrado.precio_perm) {

            html += `
                <div class="plan-card">
                    <h2>Permanente</h2>
                    <p>${encontrado.precio_perm} USD</p>
                    <button
                        class="buy-btn"
                        onclick="buyProduct('${product}', 'Permanente', '${encontrado.precio_perm}')"
                    >
                        Comprar
                    </button>
                </div>
            `;
        }

        contenido.innerHTML = html;

    } catch (error) {

        console.error(error);

        contenido.innerHTML = `
            <div class="plan-card">
                <h2>⚠️ Error</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}


/* =========================
   COMPRA
========================= */

function buyProduct(producto, plan, precio) {

    alert(
        "Producto: " +
        producto +
        "\nPlan: " +
        plan +
        "\nPrecio: " +
        precio +
        " USD"
    );
}


/* =========================
   IMÁGENES ADMIN
========================= */

function changeImage(group) {

    const input = document.getElementById(
        group + "-input"
    );

    if (!input) {
        alert("No existe el selector de imagen.");
        return;
    }

    if (!input.files || !input.files.length) {
        alert("Selecciona una imagen primero.");
        return;
    }

    const file = input.files[0];

    if (!file.type.startsWith("image/")) {
        alert("El archivo debe ser una imagen.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        try {

            localStorage.setItem(
                "img-" + group,
                event.target.result
            );

            alert("✅ Imagen guardada correctamente.");

            loadProducts();

        } catch (error) {

            console.error(error);

            alert(
                "❌ No se pudo guardar la imagen.\n" +
                error.message
            );
        }
    };

    reader.onerror = function() {
        alert("❌ No se pudo leer la imagen.");
    };

    reader.readAsDataURL(file);
}


function loadSavedImages() {

    const grupos = [
        "twinks",
        "prohibido",
        "adultos"
    ];

    grupos.forEach(group => {

        const imagen = localStorage.getItem(
            "img-" + group
        );

        if (imagen) {
            console.log(
                "Imagen guardada:",
                group
            );
        }
    });
}


/* =========================
   BOTÓN VOLVER
========================= */

function goBack() {
    openHome();
}
