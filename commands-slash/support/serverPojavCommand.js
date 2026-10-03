const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand");

module.exports = class ServerIPCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'pojav',
      description: "Veja todos as informações de servidores Pojav da Rede Dark.",
      command: "server",
      subCommand: true,
      type: 'SUB_COMMAND'
    })
  }

  async run(client, interaction, context) {
    await interaction.build(
      interaction.kuramaReply("Aqui você pode conferir todos os ips dos servidores da Rede Dark abertos atualmente para emuladores de celular!", kuramaEmojis.id('kurama_nemligo')),
      ...(Object.values(client.constants.POJAV_SERVERS)).map(server => {
        return interaction.kuramaReply(`**Ip do ${server.name}:** \`${server.ip}\` | [Clique aqui para baixar o modpack](${server.modpack})`, "🔸", false)
      })
    )
  }
}
