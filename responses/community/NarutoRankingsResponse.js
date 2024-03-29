const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "como|me ajuda|onde",
  "vir(a|o)|upa|fa(z|s|ço|sso)",
  "a (quest|missao)( pra vir(a|ar)|)|",
  "jounin|chunin|genin|nukenin|anbu|akatsuki"
]

module.exports = class NarutoRankingsResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "NarutoRankingsResponse",
      priority: 0,
      ignoreDevs: false
    })
	}

  run(client, message) {
    message.build(
      message.kuramaReply("Com dúvidas sobre o Naruto Dark? Pegue o cargo <@&643566203503378454> no <#702147947978293310> para obter acesso ao canal de Dúvidas Frequentes.", "828360658159927316"),
      message.kuramaReply("Após obter o cargo você pode tirar as dúvidas de rankings neste canal aqui <#716065542741426216>.", "779445435085357116", false),
      message.kuramaReply("Sua dúvida é sobre outras sagas? Neste canal aqui <#702147193217220628> você pode ver nossos FAQ's de ajuda de sagas.", "802214533367332935", false),
      `{ "option": { "allowedMentions": { "roles": ["812686310472679494"], "users": ["${message.author.id}"] } } }`
    )
  }
}