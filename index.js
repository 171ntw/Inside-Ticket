const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { config } = require("dotenv");
const path = require("path");

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Reaction,
        Partials.Message,
        Partials.User
    ]
});

const SlashHandler = require(path.join(__dirname, "handlers", "Slash"));
const EventHandler = require(path.join(__dirname, "handlers", "Event"));

SlashHandler.execute(client);
EventHandler.execute(client);

client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
    console.log('\x1b[36m[BOT]\x1b[0m Logado com sucesso.');
}).catch((error) => {
    console.error('\x1b[31m[BOT]\x1b[0m Falha ao iniciar sessão:', error);
});

module.exports = client;