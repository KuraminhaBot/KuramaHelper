const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "qual|me|algu(é)m",
  "envia|(é|e)|passa|manda",
  "o|os",
  "endere(ç|c)o de|",
  "ip",
  "do?( servidor|)",
  "((naruto|nc)|(nanatsu|nnt)|(dbc|dragon ball)|(ds|demon slayer)|(poke))(dark|)",
  "dark|"
]

module.exports = class ServersIPResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "ServersIPResponse",
      priority: 0,
      ignoreDevs: false,
    })
	}
  
  async run(client, message) {    
    message.build(
      message.kuramaReply(`vamos por partes... A Rede Dark apresenta uma váriedade de servidores. Para descobrir o ip de algum servidor, você pode ir no <#702147978844045402> e ir no tópico do canal, igual é mostrado nessa imagem. E digitar o comando do servidor desejado!`, "739485308248129616"),
      message.kuramaReply(`Não entendeu? Vamos tentar assim, vá no <#702150853628526662> e mencione os <@&558685405801742358> para que eles possam te ajudar a responder essa pergunta! Uma boa tarde!`, "799373211141800036", false),
      `{ "option": { "allowedMentions": { "roles": ["812686310472679494"], "users": ["${message.author.id}"] } } }`
    )
  }
}
