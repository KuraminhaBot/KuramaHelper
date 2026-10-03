const kuramaEmojis = require('../../src/utils/KuramaEmojis');
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
      }, {
        name: 'type',
        description: 'O tipo de menu que deverá ser enviado',
        type: 'STRING',
        choices: [{
          name: 'Denúncia de Players',
          value: 'report'
        }, {
          name: 'Suporte Mentor',
          value: 'mentor'
        }, {
          name: 'Suporte Dark',
          value: 'supportDark'
        }, {
          name: 'Suporte Nation',
          value: 'supportNation'
        }, {
          name: 'Suporte Kurama',
          value: 'supportKurama'
        }, {
          name: 'Suporte RedstoneCraft',
          value: 'supportRedstoneCraft'
        }],
        required: true
      }],
      onlyDevs: true,
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    var channel = interaction.options.getChannel('channel');
    var type = interaction.options.get('type')?.value;

    var data = this.getMessageData(client, type)

    try {
      channel.send(data)

      interaction.ffReply(`Yay! Deu tudo certo, enviei tudo no canal, ${channel.toString()}`)
    } catch(err) {
      interaction.ffReply(`Deu tudo errado irmão kkkjjj, se liga \n\`${err}\``)
    }
  }

  getMessageData(client, type) {
    return {
      mentor: {
        embeds: [
          new Discord.MessageEmbed()
              .setColor(client.constants.KURAMA_COLOR)
              .setTitle(kuramaEmojis.text("[[emoji:kurama_coffee]] Central de Ajuda"))
              .setThumbnail(kuramaEmojis.text("[[emoji-url:kurama_fixit]]"))
              .setDescription([
                `${checkEmoji(client, kuramaEmojis.id('kurama_reading'))} **|** Precisando resolver um problema relacionado à mentores no servidor? Veio até o chat certo então!`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_lurk'))} **|** Para iniciar o seu pedido de re-adicionar o mentor, clique no botão abaixo! Lembre-se de estar com tudo pronto para enviar o seu ticket!`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_fine'))} **|** Após criar seu ticket, aguarde até que os Administradores te respondam! E não fique mencionando ou incomando a staff para que eles vejam seu ticket.`
              ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                  .setLabel("Abrir ticket")
                  .setCustomId("ticket:create:mentor")
                  .setEmoji("830475809490862112")
                  .setStyle("SUCCESS")
          )
        ]
      },
      report: {
        embeds: [
          new Discord.MessageEmbed()
              .setColor(client.constants.KURAMA_COLOR)
              .setTitle(kuramaEmojis.text("[[emoji:kurama_coffee]] Central de Denúncias"))
              .setThumbnail(kuramaEmojis.text("[[emoji-url:kurama_ban]]"))
              .setDescription([
                `${checkEmoji(client, kuramaEmojis.id('kurama_analise'))} **|** Precisando resolver um problema relacionado à denúncias no servidor? Veio até o chat certo então!`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_fixit'))} **|** Para iniciar o seu report, selecione um servidor no **Menu** e depois selecione a opção "Abrir ticket de denúncia"! Lembre-se de estar com tudo pronto para enviar o seu ticket!`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_nemligo'))} **|** Após criar seu ticket, aguarde até que os Administradores te respondam! E não fique mencionando ou incomando a staff para que eles vejam seu ticket.`
              ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
              new Discord.MessageSelectMenu()
                  .setPlaceholder("Selecione um servidor")
                  .setCustomId("ticket:create:report")
                  .setMinValues(2)
                  .setMaxValues(2)
                  .addOptions(client.constants.SERVERS.map(it => { return { value: it.value, label: it.name, emoji: '721480875040047194' }}))
                  .addOptions({value: 'create', label: "Abrir ticket de denúncia", emoji: "892190020792909914"})
          )
        ]
      },
      supportDark: {
        embeds: [
          new Discord.MessageEmbed()
            .setColor(client.constants.KURAMA_COLOR)
            .setTitle(kuramaEmojis.text("[[emoji:kurama_reading]] Central de Suporte"))
            .setThumbnail(kuramaEmojis.text("[[emoji-url:kurama_gaming]]"))
            .setDescription([
              `${checkEmoji(client, kuramaEmojis.id('kurama_analise'))} **|** Precisando resolver um problema relacionado a algum servidor? Veio até o chat certo então!`,
              `${checkEmoji(client, kuramaEmojis.id('kurama_fixit'))} **|** Para iniciar o seu ticket, selecione um servidor no **Menu** e depois selecione a opção "Abrir ticket"! Lembre-se de estar com tudo pronto para enviar o seu ticket!`,
              `${checkEmoji(client, kuramaEmojis.id('kurama_nemligo'))} **|** Após criar seu ticket, aguarde até que te respondam! E não fique mencionando ou incomando a staff para que eles vejam seu ticket.`
            ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setPlaceholder("Selecione um servidor")
                .setCustomId("ticket:create:darksup")
                .setMinValues(2)
                .setMaxValues(2)
                .addOptions(client.constants.SERVERS.map(it => { return { value: it.value, label: it.name, emoji: '721480875040047194' }}))
                .addOptions({value: 'create', label: "Abrir ticket de suporte", emoji: "892190020792909914"})
          )
        ]
      },
      supportNation: {
        embeds: [
          new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setTitle("<:NationCraft:796177186994126878> Central de Suporte")
            .setImage("https://i.imgur.com/uEmzaXX.png")
            .setDescription([
              `${checkEmoji(client, "960277958046658580")} **|** Precisando resolver um problema relacionado a algum servidor? Veio até o chat certo então!`,
              `${checkEmoji(client, "701687722691133482")} **|** Para iniciar o seu ticket, selecione um servidor no **Menu** e depois selecione a opção "Abrir ticket"! Lembre-se de estar com tudo pronto para enviar o seu ticket!`,
              `${checkEmoji(client, "939310079134547968")} **|** Após criar seu ticket, aguarde até que te respondam! E não fique mencionando ou incomando a staff para que eles vejam seu ticket.`
            ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setPlaceholder("Selecione um servidor")
                .setCustomId("ticket:create:nationsup")
                .setMinValues(2)
                .setMaxValues(2)
                .addOptions(client.constants.NATION_SERVERS.map(it => { return { value: it.value, label: it.name, emoji: '721480875040047194' }}))
                .addOptions({value: 'create', label: "Abrir ticket de suporte", emoji: "892190020792909914"})
          )
        ]
      },
      supportKurama: {
        embeds: [
          new Discord.MessageEmbed()
              .setColor(client.constants.KURAMA_COLOR)
              .setTitle(kuramaEmojis.text("[[emoji:kurama_coffee]] Central de Ajuda"))
              .setThumbnail(kuramaEmojis.text("[[emoji-url:kurama_reading]]"))
              .setDescription([
                `${checkEmoji(client, kuramaEmojis.id('kurama_fixit'))} **|** Seja bem vindo à Central de Ajuda do Kuraminha! Um lugar onde você pode encontrar as respostas para as suas perguntas, desde que elas sejam relacionadas a Kurama, é claro!`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_lurk'))} **|** Para iniciar o seu ticket de suporte, clique no botão abaixo! Lembre-se de estar com tudo pronto para enviar o seu ticket para a equipe! E confira antes se a sua dúvida já foi respondida em <#769900882887180288>.`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_fine'))} **|** Após criar seu ticket, aguarde até que os nossos suportes te respondam, não fique mencionando ou incomodando a staff para que eles vejam seu ticket.`
              ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                  .setLabel("Iniciar suporte")
                  .setCustomId("ticket:create:supportKurama")
                  .setEmoji("1252076189774774354")
                  .setStyle("DANGER")
          )
        ]
      },
      supportRedstoneCraft: {
        embeds: [
          new Discord.MessageEmbed()
              .setColor("#e40d36")
              .setTitle(kuramaEmojis.text("[[emoji:kurama_coffee]] Central de Ajuda"))
              .setThumbnail("https://i.imgur.com/apxKCkq.png")
              .setDescription([
                `${checkEmoji(client, kuramaEmojis.id('kurama_fixit'))} **|** Seja bem vindo à Central de Ajuda do RedstoneCraft! Um lugar onde você pode encontrar as respostas para as suas perguntas, desde que elas sejam relacionadas a RedstoneCraft, é claro!`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_lurk'))} **|** Para iniciar o seu ticket de suporte, clique no botão abaixo! Lembre-se de estar com tudo pronto para enviar o seu ticket para a equipe!`,
                `${checkEmoji(client, kuramaEmojis.id('kurama_fine'))} **|** Após criar seu ticket, aguarde até que os nossos suportes te respondam, não fique mencionando ou incomodando a staff para que eles vejam seu ticket.`
              ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setPlaceholder("Selecione um servidor")
                .setCustomId("ticket:create:redstonesup")
                .setMinValues(2)
                .setMaxValues(2)
                .addOptions({ value: 'SHOP', label: "Suporte Loja", emoji: "999372867168915496" })
                .addOptions({ value: 'PAYMENTS', label: "Suporte Pagamentos", emoji: "999372868494299186" })
                .addOptions({ value: 'DISCORD', label: "Suporte Discord", emoji: "999372871182860349" })
                .addOptions({value: 'create', label: "Abrir ticket de suporte", emoji: "892190020792909914"})
          )
        ]
      }
    }[type]
  }
}