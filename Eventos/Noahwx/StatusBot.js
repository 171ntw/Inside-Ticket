const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: false,

    async execute(client) {
        const updatePresence = () => {
            const guildCount = client.guilds.cache.size;
            const activities = [
                { name: `🤖 Desenvolvido por nathan`, type: ActivityType.Watching },
                { name: `⚙️ Gerenciando ${guildCount} servidores simultâneos...`, type: ActivityType.Watching }
            ];

            let currentActivity = 0;

            const rotateActivities = () => {
                client.user.setPresence({
                    activities: [activities[currentActivity]],
                    status: 'online'
                });

                currentActivity = (currentActivity + 1) % activities.length;
            };

            rotateActivities();
            setInterval(rotateActivities, 10000);
        };

        // Atualiza a presença ao iniciar
        updatePresence();

        // Atualiza a presença sempre que o bot entrar em um servidor
        client.on(Events.GuildCreate, () => updatePresence());

        // Atualiza a presença sempre que o bot sair de um servidor
        client.on(Events.GuildDelete, () => updatePresence());
    }
}
