const { readdir } = require("fs");

module.exports = {
    async execute(client) {
        let commands = [];

        readdir('./Comandos/', (error, folder) => {
            folder.forEach(subfolder => {
                readdir(`./Comandos/${subfolder}`, (error, files) => {
                    files.forEach(file => {
                        if (!file.endsWith('.js')) return;
                        file = require(`../Comandos/${subfolder}/${file}`);
                        if (!file?.name) return;

                        client.commands.set(file?.name, file);
                        commands.push(file);
                    });
                });
            });
        });

        client.on('ready', async () => {
            client.guilds.cache.forEach(guild => guild.commands.set(commands));
        });

        client.on('guildCreate', async (guild) => {
            guild.commands.set(commands);
        });
    }
}