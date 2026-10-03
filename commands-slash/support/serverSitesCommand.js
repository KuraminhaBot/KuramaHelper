const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const SlashCommand = require("../../src/structures/SlashCommand")

module.exports = class TicketMenuSenderCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'site',
      description: "Veja as informações sobre o site oficial da Rede Dark."
    })
  }

  async run(client, interaction, context) {
    const site = interaction.guild.id == client.constants.NATION_GUILD_ID ? 
                    client.constants.NATION_SITE : client.constants.DARK_SITE;

    await interaction.ffReply(
      `Quer comprar VIP, Modos, Mentores e ver outras informações? Que tal entrar no nosso site! Basta [clicar aqui](${site})`,
      kuramaEmojis.id('kurama_gaming_2')
    )
  }
}
