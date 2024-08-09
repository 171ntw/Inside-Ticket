const { Events, InteractionType } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction, client) {
        if (interaction.type == InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            if (interaction.guild) {
                interaction.member = interaction.guild.members.cache.get(interaction.user.id);
            }

            try {
                await command.execute(client, interaction);
            } catch (err) {
                console.error(`Erro ao executar o comando ${interaction.commandName}:`, err);
            }
        }
    }
}