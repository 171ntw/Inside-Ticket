const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "botinfo",
    category: "utilidades",
    description: "Veja minhas informações.",
    type: ApplicationCommandType.ChatInput,

    async execute(client, interaction) {
        const infoEmbed = new EmbedBuilder()
            .setTitle('Informações do Bot')
            .setColor('#0099ff')
            .setDescription('> Este bot foi inspirado no projeto "Inside Ticket". Foi desenvolvido para proporcionar uma experiência divertida e útil para os usuários.')
            .setTimestamp()
            .setFooter({ text: 'Desenvolvido por noahwx', iconURL: 'https://cdn.discordapp.com/avatars/1266387274199990408/e01b12624de2f6ac86ab032c10df5193.png?size=2048' })

        const buttonRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(5)
                    .setURL('https://github.com/noahwx')
                    .setLabel('Baixar'),
                new ButtonBuilder()
                    .setStyle(5)
                    .setURL('https://discord.gg/qm2JkFmMm6')
                    .setLabel('Suporte')
            )

        await interaction.reply({ content: `${interaction.user}`, components: [buttonRow], embeds: [infoEmbed] });
    }
}
