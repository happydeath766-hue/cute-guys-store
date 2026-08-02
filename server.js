require("dotenv").config();
const express = require("express");
const path = require("path");
const { Telegraf, Markup } = require("telegraf");
const { Pool } = require("pg");

const app = express();

app.use(express.static(path.join(__dirname)));
app.use(express.json());

const PORT = process.env.PORT || 3000;


// BASE DE DATOS POSTGRESQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("rlwy.net")
    ? { rejectUnauthorized: false }
    : false
});

app.get("/hola", (req, res) => {

    res.send("FUNCIONA");

});

app.get("/test-db", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT NOW()"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

// API PRODUCTOS
app.get("/api/productos", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM productos ORDER BY id"
    );

    res.json(resultado.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al cargar productos"
    });
  }
});


// API NOTICIAS
app.get("/api/noticias", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM noticias ORDER BY id"
    );

    res.json(resultado.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al cargar noticias"
    });
  }
});


// BOT DE TELEGRAM
const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start((ctx) => {

  const botones = [
    [
      Markup.button.callback(
        "👑 TWINKS",
        "twinks"
      )
    ],
    [
      Markup.button.callback(
        "🔒 PROHIBIDO",
        "prohibido"
      )
    ],
    [
      Markup.button.callback(
        "⭐ ADULTOS",
        "adultos"
      )
    ],
    [
      Markup.button.webApp(
        "🛍️ Abrir Cute Guys Store",
        "https://cute-guys-store-production.up.railway.app"
      )
    ],
    [
      Markup.button.callback(
        "📩 Contacto",
        "contacto"
      )
    ]
  ];

  // Mostrar botón Admin solo para tu cuenta
  if (ctx.from.id === 8873809799) {
  botones.push([
    Markup.button.callback(
      "👑 Admin",
      "admin"
    )
  ]);
}
  
  ctx.reply(
    "🛒 Bienvenido a Cute Guys Store\n\nSelecciona una opción:",
    Markup.inlineKeyboard(botones)
  );

});

bot.action("contacto", (ctx) => {

  ctx.reply(
    "📩 Contacto:\n@CuteGuyspg"
  );

});

bot.action("twinks", (ctx) => {

  ctx.reply(
    "👑 TWINKS\n\n📅 30 días: $15 USD\n📅 60 días: $25 USD\n♾ Permanente: $40 USD"
  );

});


bot.action("prohibido", (ctx) => {

  ctx.reply(
    "🔒 PROHIBIDO\n\n📅 30 días: $15 USD\n📅 60 días: $25 USD\n♾ Permanente: $40 USD"
  );

});


bot.action("adultos", (ctx) => {

  ctx.reply(
    "⭐ ADULTOS\n\n📅 30 días: $10 USD\n📅 60 días: $18 USD\n♾ Permanente: $30 USD"
  );

});

bot.action("admin", (ctx) => {
  if (ctx.from.id !== 8873809799) {
    return ctx.answerCbQuery("❌ No autorizado");
  }

  ctx.reply(
    "👑 Panel Administrador\n\nSelecciona una opción:",
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "💰 Cambiar precios",
          "precios"
        )
      ],
      [
        Markup.button.callback(
          "🖼️ Cambiar imágenes",
          "imagenes"
        )
      ],
      [
        Markup.button.callback(
          "📰 Editar noticias",
          "noticias"
        )
      ],
      [
        Markup.button.callback(
          "➕ Agregar categoría",
          "agregar_categoria"
        )
      ],
      [
        Markup.button.callback(
          "❌ Eliminar categoría",
          "eliminar_categoria"
        )
      ]
    ])
  );

});

bot.launch();

// SERVIDOR WEB
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
  console.log("Bot iniciado");
});
