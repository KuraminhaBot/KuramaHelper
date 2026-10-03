const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const ServerResponse = require("../../src/structures/serverResponses")
const { checkEmoji } = require("../../src/utils/checkEmoji")

var patterns = [
  "como|quer(o|ia)|tem|posso",
  "fa(ç|s{2})o|vaga|vira|ganha|",
  "(head(-| ) |)adm(in|)|staff|anbu do kuram(a|inha)"
]

module.exports = class StaffResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "StaffResponse",
      priority: 0,
      ignoreDevs: false,
    })
  }
  
  async run(client, message) {
    message.build(
      message.kuramaReply(`não existe uma fórmula secreta e nem um método de virar **Administrador** do dia para noite (isso só acontece em casos raros). Mas você pode continuar sendo você mesmo e dando o melhor de si! ${checkEmoji(client, kuramaEmojis.id('kurama_ownt'))}`, kuramaEmojis.id('kurama_what')),
      message.guild.type == "community" ? message.kuramaReply(`Mas para virar staff, você pode simplemente ficar atento com as novidades aqui do servidor, talvez um dia você consiga participar da staff de algum dos servidores de Minecraft!`, kuramaEmojis.id('kurama_pat_animated'), false) : ""
    )
  }
}
