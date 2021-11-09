const SlashCommand = require("../../src/structures/SlashCommand")
const { checkEmoji } = require('../../src/utils/checkEmoji.js')
const Discord = require('discord.js');

module.exports = class TicketMenuSenderCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "ticketmenusender",
      description: 'Envia a mensagem de ticket no canal selecionado',
      options: [{
        name: 'channel',
        description: 'O canal onde a mensagem deve ser enviada',
        type: 'CHANNEL',
        required: true
      }],
      onlyDevs: true,
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    var channel = interaction.options.getChannel('channel')
    
    try {
      channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(client.constants.KURAMA_COLOR)
            .setTitle("<:kurama_coffee:826415473775869962> Central de Ajuda")
            .setThumbnail("https://cdn.discordapp.com/emojis/826430206487166996.png")
            .setDescription([
              `${checkEmoji(client, "826430254084128829")} **|** Precisando resolver um problema relacionado à mentores no servidor? Veio até o chat certo então!`,
              `${checkEmoji(client, "826430829181141062")} **|** Para iniciar o seu pedido de re-adicionar o mentor, clique no botão abaixo! Lembre-se de estar com tudo pronto para enviar o seu ticket!`,
              `${checkEmoji(client, "869310000768614400")} **|** Após criar seu ticket, aguarde até que os Administradores te respondam! E não fique mencionando ou incomando a staff para que eles vejam seu ticket.`
            ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setLabel("Abrir ticket")
              .setCustomId("ticket:create")
              .setEmoji("830475809490862112")
              .setStyle("SUCCESS")
          )
        ]
      })
      
      interaction.ffReply(`Yay! Deu tudo certo, enviei tudo no canal, ${channel.toString()}`)
    } catch(err) {
      interaction.ffReply(`Deu tudo errado irmão kkkjjj, se liga \n\`${err}\``)
    }
  }
}