const { readdirSync } = require("fs");

module.exports = {
    async execute(client) {

        readdirSync('./Eventos/').forEach(folder => {
            const eventFiles = readdirSync(`./Eventos/${folder}`).filter(arquivo => arquivo.endsWith('.js'));

            for (const file of eventFiles) {
                const event = require(`../Eventos/${folder}/${file}`);

                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            }
        })
    }
}