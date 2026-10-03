const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand");

module.exports = class ServerIPCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'ip',
      description: "Veja todos os IP's dos servidores da Rede Dark.",
      command: "server",
      subCommand: true,
      type: 'SUB_COMMAND'
    })
  }

  async run(client, interaction, context) {
    const servers = interaction.guild.id == client.constants.NATION_GUILD_ID ? 
                    client.constants.NATION_SERVERS : client.constants.SERVERS;

    await interaction.build(
      interaction.kuramaReply("Aqui você pode conferir todos os ips dos servidores da Rede Dark abertos atualmente!", kuramaEmojis.id('kurama_nemligo')),
      ...servers.filter(it => it.server).map(server => {
        return interaction.kuramaReply(`**Ip do ${server.name}:** \`${server.ip}\``, "🔸", false)
      })
    )
  }
}
