const { ApplicationCommandType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "painel-config",
    category: "admin",
    description: "Abre o painel de configuração do ticket.",
    type: ApplicationCommandType.ChatInput,

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.editReply({ ephemeral: true, content: '❌ | Você não tem permissão para usar este comando.' });
        }

        const embed = new EmbedBuilder()
            .setColor('#2B2D31')
            .setDescription('> **Menu de Configuração do Ticket**')

        const select = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('noahConfig')
                    .setPlaceholder('Selecione uma opção...')
                    .setOptions(
                        {
                            label: 'Canal de Transcript',
                            description: 'Configura o canal para as logs de fechamentos.',
                            emoji: '📜',
                            value: 'configlog'
                        },
                        {
                            label: 'Cargo Responsável',
                            description: 'Configura o cargo que terá permissão nos tickets.',
                            emoji: '🏷️',
                            value: 'configrole'
                        },
                        {
                            label: 'Categoria de Abertura',
                            description: 'Configura a categoria que abrirá os tickets.',
                            emoji: '📩',
                            value: 'configcategoria'
                        }
                    )
            )

        interaction.editReply({ ephemeral: true, content: '', components: [select], embeds: [embed] });
    }
}