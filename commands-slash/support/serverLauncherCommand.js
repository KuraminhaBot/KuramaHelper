const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand")
const { checkEmoji } = require('../../src/utils/checkEmoji.js')
const Discord = require('discord.js');

module.exports = class ServerLauncherCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'launcher',
      description: "Veja informações sobre o launcher da Rede Dark.",
      subCommand: true,
      command: "server",
      type: 'SUB_COMMAND'
    })
  }

  async run(client, interaction, context) {
    var launcher = interaction.guild.id == client.constants.NATION_GUILD_ID ? client.constants.LAUNCHER_NATION : client.constants.LAUNCHER_URL;
    
    await interaction.build(
      interaction.kuramaReply(`Você sabia que a nossa Rede tem um launcher que facilita o download dos modpacks?`, kuramaEmojis.id('kurama_zap')),
      interaction.kuramaReply(`Interessante né? Para baixar o nosso launcher basta [clicar aqui](<${launcher}>)!`, kuramaEmojis.id('kurama_nemligo'), false)
    )
  }
}
