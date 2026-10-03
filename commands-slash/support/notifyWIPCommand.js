const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand")
const Discord = require('discord.js');

module.exports = class NotifyCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "wip",
      description: 'Fique ligado em tudo em que estamos trabalho no Kurama, e tudo que será adicionado nele!',
      subCommand: true,
      command: "notificar",
      devGuild: true,
      type: 'SUB_COMMAND'
    })
  }

  async run(client, interaction, context) {
    var member = context.guild.getMember(context.author)
    var notifyRole = "935207422547595284"
    
    if (member.roles.cache.has(notifyRole)) {
      member.roles.remove(notifyRole)
      interaction.ffReply(
        "Sério mesmo que você não quer mais receber minhas incríveis novidades? E eu pensava que nós eramos amigos...",
        kuramaEmojis.id('kurama_sob'),
        {ephemeral: true}
      )
    } else {
      member.roles.add(notifyRole)
      interaction.ffReply("Agora você irá ser notificado sobre as minhas novidades!", kuramaEmojis.id('kurama_hug'), {ephemeral: true})
    }
  }
}