const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand")

module.exports = class ServerModpackCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'modpacks',
      description: "Veja todos os modpacks dos servidores da Rede Dark.",
      subCommand: true,
      command: "server",
      type: 'SUB_COMMAND'
    })
  }

  async run(client, interaction, context) {
    var modpackUrl = interaction.guild.id == client.constants.NATION_GUILD_ID ?
                      "https://toppixelmon.com/modpacksnation.html" : "https://toppixelmon.com/modpacks.html";

    interaction.build(
      interaction.kuramaReply(`Aqui você pode conferir todos os modpacks dos servidores da ${context.network} abertos atualmente!`, kuramaEmojis.id('kurama_zap')),
      interaction.kuramaReply(`Para isso você pode [clicar aqui](<${modpackUrl}>) para ser redirecionado para o site da ${interaction.guild.name}.`, false)
    )
  }
}
