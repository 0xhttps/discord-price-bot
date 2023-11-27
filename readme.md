# Discord Bot with Price Ticker

This Discord bot, written in TypeScript, updates its nickname in a specified guild with the latest price fetched from a designated API.

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/0xhttps/discord-price-bot.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file:**
    ```
    GUILD_ID=your_guild_id
    BOT_ID=your_bot_id
    DISCORD_TOKEN=your_discord_token
    ```

4. **Modify `baseUrl` and `addr` in `index.ts`:**
    - Set `baseUrl` to the API endpoint for fetching prices.
    - Set `addr` to the token pair address.
