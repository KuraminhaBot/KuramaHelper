const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand")
const { checkEmoji } = require('../../src/utils/checkEmoji.js')
const Discord = require('discord.js');

module.exports = class closeTicketCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "closeticket",
      description: 'Fecha o ticket atual',
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    if (!interaction.channel.type.includes("THREAD")) 
      return interaction.ffReply("Safad! Você nem tá numa thread pra fechar algum ticket!", kuramaEmojis.id('kurama_rage_2'), {ephemeral: true})
    
    interaction.ffReply(`Ticket encerrado por ${interaction.user.toString()}, obrigado e até a próxima!`, kuramaEmojis.id('kurama_fine'), false)
      .then(it => interaction.channel.setArchived(true))
  }
}