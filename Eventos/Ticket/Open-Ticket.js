const { Events, ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, ModalSubmitInteraction, PermissionsBitField, EmbedBuilder, ButtonBuilder } = require("discord.js");
const { config } = require("../../Database/db");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction, client) {
        if (ButtonInteraction) {
            const { customId } = interaction;

            if (customId == 'openTicket') {
                const ticketopen = interaction.guild.channels.cache.find(c => c.topic === `ticket created by ${interaction.user.id}`);

                if (ticketopen) {
                    const rowticketopen = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setStyle(5)
                                .setURL(ticketopen.url)
                                .setEmoji('1252430363679129640')
                                .setLabel('・Ir para o ticket')
                        )

                    await interaction.reply({ ephemeral: true, components: [rowticketopen], content: `❌ | ${interaction.user}, Você já possui um ticket aberto.` });
                    return;
                }

                const newModal = new ModalBuilder()
                    .setCustomId('openTicket-Modal')
                    .setTitle('- PAINEL DE TICKETS -')
                    .setComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setStyle(2)
                                    .setCustomId('assuntoTicket')
                                    .setRequired(true)
                                    .setMinLength(4)
                                    .setMaxLength(300)
                                    .setLabel('Assunto do Ticket:')
                            )
                    )

                interaction.showModal(newModal);
            }

            if (customId === 'closedTicket') {
                try {
                    const attachment = await createTranscript(interaction.channel, {
                        limit: -1,
                        returnType: 'attachment',
                        filename: 'transcript.html',
                        saveImages: false,
                        footerText: 'Developer By Novak',
                        poweredBy: false,
                    });

                    const canalLogsId = await config.get(`${interaction.guild.id}.CanalLog`);

                    let canalLogs;
                    try {
                        canalLogs = await client.channels.fetch(canalLogsId);
                    } catch (error) {
                        await interaction.channel.delete();
                        return;
                    }

                    await canalLogs.send({ embeds: [], files: [attachment] });

                    await interaction.channel.delete();
                } catch (error) {
                    console.error('Erro ao fechar o ticket:', error);
                    await interaction.reply({ ephemeral: true, content: '❌ | Ocorreu um erro ao fechar o ticket.' });
                }
            }
        }

        if (ModalSubmitInteraction) {
            const { customId } = interaction;

            if (customId === 'openTicket-Modal') {
                const assunto = interaction.fields.getTextInputValue('assuntoTicket');
                const categoryId = config.get(`${interaction.guild.id}.Category`);
                const roleId = config.get(`${interaction.guild.id}.RoleStaff`);
                const category = interaction.guild.channels.cache.get(categoryId);
                const role = interaction.guild.roles.cache.get(roleId);

                if (!category || !role) {
                    interaction.reply({ ephemeral: true, content: '❌ | Categoria ou cargo não encontrados. Verifique as configurações.' });
                    return;
                }

                const channel = await interaction.guild.channels.create({
                    name: `🎫・${interaction.user.displayName}`,
                    type: 0,
                    topic: `ticket created by ${interaction.user.id}`,
                    parent: categoryId,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: roleId,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                        }
                    ],
                });

                const embed = new EmbedBuilder()
                    .setColor('#2B2D31')
                    .setFields({ name: '> Assunto do ticket', value: `\`${assunto}\`` })
                    .setThumbnail('https://cdn.discordapp.com/avatars/1102787184190291998/64068a4d0daa138598eec296b58e9d4a.png')
                    .setFooter({ text: '™ Inside Ticket All rights reserved', iconURL: 'https://cdn.discordapp.com/avatars/1102787184190291998/64068a4d0daa138598eec296b58e9d4a.png' })
                    .setDescription(`
**TICKET ABERTO POR ${interaction.user}**

- **A Equipe já está ciente da abertura do seu ticket, basta aguardar que algum Staff o atenderá!**

- **Adiante o assunto para melhorar o seu suporte**, **tente detalhar para que seu atendimento seja o mais rápido possível.**`)

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId('closedTicket')
                            .setEmoji('1174962546822873139')
                            .setLabel('Fechar Ticket')
                    )

                const message = await channel.send({ content: `<@${interaction.user.id}>`, components: [row], embeds: [embed] });
                message.pin()
                await interaction.reply({ ephemeral: true, content: '✅ | Seu ticket foi criado com sucesso.' });
            }
        }
    }
}