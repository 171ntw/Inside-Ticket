const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        console.clear();
        console.log('\x1b[32m[GITHUB]\x1b[0m https://github.com/noahwx');
        console.log('\x1b[36m[AUTOR-MENSAGEM]\x1b[0m Olá, esse sistema foi inspirado no bot "Inside Ticket". Eu o refiz para vocês ❤️‍🩹');
        console.log('\x1b[36m[SISTEMA]\x1b[0m Iniciado com sucesso.');
    }
}