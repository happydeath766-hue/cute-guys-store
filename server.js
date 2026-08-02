const express = require("express");
const path = require("path");
const { Telegraf, Markup } = require("telegraf");

const app = express();

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;

// BOT DE TELEGRAM
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "🛒 Bienvenido a Cute Guys Store\n\nSelecciona una opción:",
    Markup.inlineKeyboard([
      [Markup.button.callback("👑 TWINKS", "twinks")],
      [Markup.button.callback("🔒 PROHIBIDO", "prohibido")],
      [Markup.button.callback("⭐ ADULTOS", "adultos")],
      [
        Markup.button.webApp(
          "🛍️ Abrir Cute Guys Store",
          "https://cute-guys-store-production.up.railway.app/"
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
