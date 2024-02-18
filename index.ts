import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const guildId = process.env.GUILD_ID;
const botId = process.env.BOT_ID;

// Set to API you are fetching price from
const baseUrl = `https://api.dexscreener.com/latest/dex/pairs/arbitrum/` 
// Set to token pair address
const addr = '0x25A9Ea8B6698782Ecd3707bb7626e606C46D75dd' 

client.on('ready', () => {
  console.log('The bot is ready');

  // Set interval to update nickname every 20 seconds
  setInterval(async () => {
    try {
      const price = await getPrice();
      const guild = client.guilds.cache.get(`${guildId}`);
      if (guild) {
        const bot = guild.members.cache.get(`${botId}`);

        if (bot) {
          bot.setNickname(`$${price.price}`);
          client.user?.setActivity(`${price.change}`)
          console.log(`Updated nickname to $ ${price.price}`);
          console.log(`Updated activity to ${price.change}`);
        } else {
          console.error('Bot not found in guild');
        }
      } else {
        console.error('Guild not found');
      }
    } catch(e) {
      console.error(e)
    }
  }, 20000); // 20 seconds in milliseconds
});

async function getPrice() {
  try {
    const response = await fetch(baseUrl + addr);
    const data = await response.json();
    let info: any = {};
    info["price"] = data.pair.priceUsd;
    info["change"] = `24h: ${data.pair.priceChange["h24"]}%`;
    return info;
  } catch (e) {
    console.error('Error fetching price:', e);
    return 'Error fetching price';
  }
}

client.login(process.env.DISCORD_TOKEN);
