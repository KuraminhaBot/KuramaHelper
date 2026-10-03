const SlashCommand = require("../../src/structures/SlashCommand")
const { checkEmoji } = require('../../src/utils/checkEmoji.js')
const Discord = require('discord.js');

module.exports = class TicketMenuSenderCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'server',
      description: "Veja as informações sobre os servidores da Rede Dark."
    })
  }

  async run(client, interaction, context) {
    await interaction.ffReply("Eu não deveria estar enviando esta mensagem.. Mas se caso isto aconteceu! Algo de errado não está certo...")
  }
}
