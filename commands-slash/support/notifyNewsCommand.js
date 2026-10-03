const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand")
const Discord = require('discord.js');

module.exports = class NotifyNewsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "novidades",
      description: 'Fique ligado as novidades que estão por vir no servidor e no Kuraminha',
      subCommand: true,
      command: "notificar",
      type: 'SUB_COMMAND',
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    var member = context.guild.getMember(context.author)
    var notifyRole = "769895515860631583"
    
    if (member.roles.cache.has(notifyRole)) {
      member.roles.remove(notifyRole)
      interaction.ffReply(
        "Sério mesmo que você não quer mais receber minhas incríveis novidades? E eu pensava que nós eramos amigos...",
        kuramaEmojis.id('kurama_sob'),
        {ephemeral: true}
      )
    } else {
      member.roles.add(notifyRole)
      interaction.ffReply("Agora você irá ser notificado sobre as minhas novidades!", kuramaEmojis.id('kurama_pat_animated'), {ephemeral: true})
    }
  }
}