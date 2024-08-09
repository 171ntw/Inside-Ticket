const { Events, StringSelectMenuInteraction, ModalSubmitInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, EmbedBuilder, ChannelType } = require("discord.js");
const { config } = require("../../Database/db");

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction, client) {
        if (StringSelectMenuInteraction && interaction.customId == 'noahConfig') {
            const { values } = interaction;

            if (values[0] == 'configlog') {
                const newModal = new ModalBuilder()
                    .setCustomId('configlog-modal')
                    .setTitle('- Configurar Canal de Transcript -')
                    .setComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setStyle(1)
                                    .setCustomId('channelId')
                                    .setRequired(true)
                                    .setLabel('Insira o ID do canal:')
                            )
                    )

                await interaction.showModal(newModal);

                interaction.editReply('');
            }

            if (values[0] == 'configrole') {
                const newModal = new ModalBuilder()
                    .setCustomId('configrole-modal')
                    .setTitle('- Configurar Cargo Responsável -')
                    .setComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setStyle(1)
                                    .setCustomId('roleId')
                                    .setRequired(true)
                                    .setLabel('Insira o ID do cargo:')
                            )
                    )

                await interaction.showModal(newModal);

                interaction.editReply('');
            }

            if (values[0] == 'configcategoria') {
                const newModal = new ModalBuilder()
                    .setCustomId('configcategoria-modal')
                    .setTitle('- Configurar Categoria -')
                    .setComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setStyle(1)
                                    .setCustomId('categoryId')
                                    .setRequired(true)
                                    .setLabel('Insira o ID da categoria:')
                            )
                    )

                await interaction.showModal(newModal);

                interaction.editReply('');
            }
        }

        if (ModalSubmitInteraction) {
            const { customId } = interaction;

            if (customId === 'configlog-modal') {
                const channelId = interaction.fields.getTextInputValue('channelId');
                const channel = interaction.guild.channels.cache.get(channelId);

                if (isNaN(channelId) || !Number.isInteger(Number(channelId))) {
                    const embed = new EmbedBuilder()
                        .setColor('#2B2D31')
                        .setDescription('> **Isto não é um ID de canal válido.**');

                    await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
                    return;
                }

                if (!channel) {
                    const embed = new EmbedBuilder()
                        .setColor('#2B2D31')
                        .setDescription('> **Este canal não existe.**');

                    await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
                    return;
                }

                const embed = new EmbedBuilder()
                    .setColor('#2B2D31')
                    .setDescription(`> **Canal de transcript alterado para ${channel.url} com sucesso.**`);

                config.set(`${interaction.guild.id}.CanalLog`, channel.id);
                await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
            }

            if (customId === 'configrole-modal') {
                const roleId = interaction.fields.getTextInputValue('roleId');
                const role = interaction.guild.roles.cache.get(roleId);

                if (isNaN(roleId) || !Number.isInteger(Number(roleId))) {
                    const embed = new EmbedBuilder()
                        .setColor('#2B2D31')
                        .setDescription('> **Isto não é um ID de cargo.**');

                    await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
                    return;
                }

                if (!role) {
                    const embed = new EmbedBuilder()
                        .setColor('#2B2D31')
                        .setDescription('> **Este cargo não existe.**');

                    await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
                    return;
                }

                const embed = new EmbedBuilder()
                    .setColor('#2B2D31')
                    .setDescription(`> **Cargo Responsável alterado para ${role} com sucesso.**`);

                config.set(`${interaction.guild.id}.RoleStaff`, role.id);
                await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
            }

            if (customId === 'configcategoria-modal') {
                const categoryId = interaction.fields.getTextInputValue('categoryId');
                const category = interaction.guild.channels.cache.get(categoryId);

                if (isNaN(categoryId) || !Number.isInteger(Number(categoryId))) {
                    const embed = new EmbedBuilder()
                        .setColor('#2B2D31')
                        .setDescription('> **Isto não é um ID de categoria.**');

                    await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
                    return;
                }

                if (!category || category.type !== ChannelType.GuildCategory) {
                    const embed = new EmbedBuilder()
                        .setColor('#2B2D31')
                        .setDescription('> **Esta categoria não existe.**');

                    await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
                    return;
                }

                const embed = new EmbedBuilder()
                    .setColor('#2B2D31')
                    .setDescription(`> **Categoria alterada para \`${category}\` com sucesso.**`);

                config.set(`${interaction.guild.id}.Category`, category.id);
                await interaction.reply({ ephemeral: true, content: '', components: [], embeds: [embed] });
            }
        }
    }
}
