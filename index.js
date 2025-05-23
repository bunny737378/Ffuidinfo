require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');
const express = require('express');

// Initialize bot with token from environment
const bot = new Telegraf(process.env.BOT_TOKEN);
const GROUP_ID = -1002549791785; // Replace with your actual group ID

// Filtered forwarder: Only forwards "✅ Player Found!" responses
async function replyAndConditionalForward(ctx, message, options = {}) {
  const sent = await ctx.reply(message, options);

  // Forward only if message starts with "✅ Player Found!"
  if (typeof message === 'string' && message.startsWith("✅ Player Found!")) {
    await ctx.telegram.forwardMessage(GROUP_ID, ctx.chat.id, sent.message_id);
  }
}

bot.start(async (ctx) => {
  await ctx.reply(
    "👋 Welcome to Free Fire UID Tracker Bot!\n\n" +
    "🔎 Send me a Free Fire UID, and I'll fetch the player's details instantly!\n\n" +
    "📌 Enter a valid numeric UID to proceed!",
    {
      reply_markup: {
        inline_keyboard: [[{ text: "📌 Enter UID", callback_data: "enter_uid" }]],
      },
    }
  );
});

bot.action("enter_uid", async (ctx) => {
  await ctx.reply("📌 *Send a Free Fire UID*, and I'll fetch the player's details for you.\n\n⚠️ Make sure the UID is valid.", { parse_mode: 'Markdown' });
});

bot.on("text", async (ctx) => {
  try {
    const userInput = ctx.message.text.trim();

    if (!/^\d+$/.test(userInput)) {
      return ctx.reply("❌ Please enter a valid numeric Free Fire UID.");
    }

    const processing = await ctx.reply("⏳ Processing your request...");
    const data = await fetchData(userInput);
    await ctx.deleteMessage(processing.message_id);

    if (!data || !data.name) {
      return ctx.reply("⚠️ No player found for this UID. Please check and try again.");
    }

    // Get user info for personalized message
    const userId = ctx.from.id;
    const userName = ctx.from.username || ctx.from.first_name || 'User';
    const profileLink = `[${userName}](tg://user?id=${userId})`;

    const result =
      "✅ Player Found!\n\n" +
      `👤 Name: ${data.name || "N/A"}\n` +
      `🆔 UID: ${data.id || "N/A"}\n` +
      `🌍 Region: ${data.region || "N/A"}\n` +
      `📅 Account Created: ${data.account_creation_date || "N/A"}\n` +
      `🚫 Ban Status: ${data.is_banned ? `Banned (${data.ban_period || 0} days) 🔴` : "Active 🟢"}\n\n` +
      `${profileLink} THANX FOR USING OUR BOT`;

    await replyAndConditionalForward(ctx, result, { parse_mode: 'Markdown' });

  } catch (e) {
    console.error(e);
    await ctx.reply("❌ *Failed to fetch data. Please try again!*", { parse_mode: 'Markdown' });
  }
});

async function fetchData(uid) {
  try {
    const response = await axios.get(`https://freefire-info.aryankumarsha20.workers.dev/ff?id=${uid}`, { timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.message);
    return null;
  }
}

process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Express app setup for Vercel
const app = express();

app.use(bot.webhookCallback('/webhook'));

app.get('/', (req, res) => {
  res.send('FF UID Tracker Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 FF ID Tracker Bot is Running on port ${PORT}...`);
});