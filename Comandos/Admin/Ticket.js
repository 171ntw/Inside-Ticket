const { ApplicationCommandType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { config } = require("../../Database/db");

module.exports = {
    name: "ticket",
    category: "admin",
    description: "Envia a mensagem de ticket",
    type: ApplicationCommandType.ChatInput,

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.editReply({ ephemeral: true, content: '❌ | Você não tem permissão para usar este comando.' });
            return;
        }

        const canalLog = await config.get(`${interaction.guild.id}.CanalLog`);
        const roleStaff = await config.get(`${interaction.guild.id}.RoleStaff`);
        const category = await config.get(`${interaction.guild.id}.Category`);

        if (!canalLog || !roleStaff || !category) {
            const noahEmbed = new EmbedBuilder()
                .setColor('#2B2D31')
                .setDescription('> **Você ainda não configurou totalmente o bot para uso.**\n\n> **Para isso use o comando `/painel-ticket` para configurar.**')

            interaction.editReply({ ephemeral: true, content: '', components: [], embeds: [noahEmbed] });
            return;
        }

        const noahEmbed = new EmbedBuilder()
            .setColor('#2B2D31')
            .setDescription('> **Painel de ticket enviado com sucesso.**')

        const embed = new EmbedBuilder()
            .setTitle('ATENDIMENTO')
            .setColor('#2B2D31')
            .setDescription('> **Para abrir um ticket, clique no botão abaixo.**\n\n> **ATENÇÃO:** Não abra um **TICKET** sem **NECESSIDADE!**')
            .setThumbnail('https://cdn.discordapp.com/avatars/1102787184190291998/64068a4d0daa138598eec296b58e9d4a.png')
            .setImage('https://media.discordapp.net/attachments/987380096132337734/1102800287707701299/Abra_um_ticket.png')
            .setFooter({ text: '™ Inside Ticket All rights reserved', iconURL: 'https://cdn.discordapp.com/avatars/1102787184190291998/64068a4d0daa138598eec296b58e9d4a.png' })

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId('openTicket')
                    .setEmoji('1260858531809198110')
                    .setLabel('Abrir Ticket')
            )

        await interaction.channel.send({ ephemeral: false, content: '', components: [row], embeds: [embed] });
        await interaction.editReply({ ephemeral: true, content: '', components: [], embeds: [noahEmbed] });
    }
}
