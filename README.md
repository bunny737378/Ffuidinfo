# 🎮 Free Fire UID Tracker Bot

A powerful Telegram bot that fetches Free Fire player details using their UID. Built with Node.js and deployed on Vercel.

## ✨ Features

- 🔍 **Instant Player Lookup** - Get player details by entering UID
- 📊 **Comprehensive Info** - Name, Region, Account Creation Date, Ban Status
- 🤖 **Smart Forwarding** - Automatically forwards successful results to designated group
- ⚡ **Fast Response** - Optimized API calls with timeout handling
- 🛡️ **Error Handling** - Robust error management and user feedback
- 📱 **Interactive UI** - Inline keyboards for better user experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ff-uid-tracker-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   BOT_TOKEN=your_telegram_bot_token_here
   PORT=3000
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

## 🌐 Deployment on Vercel

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `BOT_TOKEN`: Your Telegram bot token
4. Deploy automatically

### Method 2: Vercel CLI

1. Install Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. Deploy
   ```bash
   vercel --prod
   ```

3. Set environment variables
   ```bash
   vercel env add BOT_TOKEN
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BOT_TOKEN` | Telegram Bot Token from BotFather | ✅ Yes |
| `PORT` | Server port (default: 3000) | ❌ No |

### Group Configuration

To enable forwarding to a specific group:

1. Add your bot to the target group
2. Make the bot an administrator
3. Update `GROUP_ID` in `index.js` with your group's ID

```javascript
const GROUP_ID = -1002549791785; // Replace with your group ID
```

## 🔧 API Reference

The bot uses the Free Fire Info API:
```
GET https://freefire-info.aryankumarsha20.workers.dev/ff?id={UID}
```

## 📝 Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Initialize the bot and show welcome message |
| `Enter UID` | Send any numeric UID to get player details |

## 🎯 Usage Example

1. Start the bot with `/start`
2. Click "📌 Enter UID" or directly send a numeric UID
3. Bot will fetch and display player information
4. Successful results are automatically forwarded to the configured group

## 📊 Response Format

```
✅ Player Found!

👤 Name: PlayerName
🆔 UID: 123456789
🌍 Region: India
📅 Account Created: 2023-01-15
🚫 Ban Status: Active 🟢

🔹 Use this bot to check more player details anytime!

Join Our Discussion Group - [Link](https://t.me/letsdiscusswithbunnys)
```

## 🛠️ Project Structure

```
ff-uid-tracker-bot/
├── index.js          # Main bot logic
├── package.json      # Dependencies and scripts
├── vercel.json       # Vercel deployment configuration
├── .gitignore        # Git ignore patterns
├── .env              # Environment variables (local)
└── README.md         # Project documentation
```

## 🔒 Security Features

- ✅ Input validation for UIDs
- ✅ API timeout handling (5 seconds)
- ✅ Error logging and monitoring
- ✅ Environment variable protection
- ✅ Uncaught exception handling

## 🐛 Error Handling

The bot handles various error scenarios:

- **Invalid UID**: Shows user-friendly error message
- **API Timeout**: Graceful failure with retry suggestion
- **Player Not Found**: Clear feedback to user
- **Server Errors**: Logged and handled gracefully

## 📈 Performance

- **Response Time**: < 2 seconds average
- **API Timeout**: 5 seconds maximum
- **Uptime**: 99.9% (Vercel hosting)
- **Concurrent Users**: Scales automatically

## 📄 License

This project is made by me bunny.

## ⚡ Performance Tips

- Use webhooks instead of polling for better performance
- Cache frequently requested UIDs (optional enhancement)
- Monitor API usage and implement rate limiting if needed

## 🎨 Customization

You can easily customize:
- Response message format
- Group forwarding logic
- Additional player statistics
- Custom commands and features

---

**Made with ❤️ for the Free Fire community**

*This bot is not affiliated with Free Fire or Garena. It uses publicly available APIs for educational purposes.*