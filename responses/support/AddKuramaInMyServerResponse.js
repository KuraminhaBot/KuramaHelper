const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "(bota|adicion(a|o)|coloc(a|o)|poe|convid(o|a))r?",
  "(a|o|u)?",
  "(k|c)uram(a|inha)|<@!?640593174171090984>",
]

module.exports = class AddKuramaInMyServerResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "AddKuramaInMyServerResponse",
      priority: 0,
      ignoreDevs: false,
    })
  }
  
  async run(client, message) {
    if (message.content.match("/kuram(a|inha) (helper|canary|rework)/ig")) 
      return message.ffReply("Infelizmente você não pode adicionar essas minhas versões diferentes, elas são privadas e servem ou para testes ou para funcionamentos dos servidores do Kurama", "826430408173813820")

    message.build(
      message.kuramaReply(`Querendo me adicionar? Para me convidar para o seu servidor é muiitoo simples!`, "826415473969070090"),
      message.kuramaReply(`Basta digitar o comando \`d!invite\` e clicar no primeiro link da mensagem!`, "826430254084128829", false),
      message.kuramaReply(`Ou então, você pode me enviar o convite do seu servidor nas mensagens diretas, assim eu irei criar um link para que você me adicione nele!`, "828360789529985066", false),
      message.kuramaReply(`Se você tiver alguma outra dúvida de como me adicionar, basta mencionar o cargo de Suporte!!`, "869310000768614400", false)
    )
  }
}
