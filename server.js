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
  ssl: {
    rejectUnauthorized: false
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

  // Mostrar botón Admin solo para ti
  if (ctx.from.id === 8873809799) {
    botones[4].push(
      Markup.button.callback(
        "👑 Admin",
        "admin"
      )
    );
  }

  ctx.reply(
    "🛒 Bienvenido a Cute Guys Store\n\nSelecciona una opción:",
    Markup.inlineKeyboard(botones)
  );

});

bot.action("admin", (ctx) => {

  if (ctx.from.id !== 8873809799) {
    return ctx.answerCbQuery("❌ No autorizado");
  }

  ctx.reply(
    "👑 Panel Administrador",
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "💰 Cambiar precios",
          "precios"
        )
      ],
      [
        Markup.button.callback(
          "🖼 Cambiar imágenes",
          "imagenes"
        )
      ],
      [
        Markup.button.callback(
          "📰 Editar noticias",
          "noticias"
        )
      ]
    ])
  );

});

  ctx.reply(
    "👑 Panel Administrador\n\nSele

  // Botón solo para el administrador
  if (ctx.from.id === 8873809799) {
    botones[4].push(
      Markup.button.callback(
        "👑 Admin",
        "admin"
      )
    );
  }


  ctx.reply(
    "🛒 Bienvenido a Cute Guys Store\n\nSelecciona una opción:",
    Markup.inlineKeyboard(botones)
  );

});

bot.launch();


// SERVIDOR WEB
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
  console.log("Bot iniciado");
});
