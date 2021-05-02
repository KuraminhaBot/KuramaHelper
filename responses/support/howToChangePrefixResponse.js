const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "como|onde|qual|existe|tem( )?jeito|ajuda|quero|queria|tem algum",
  "(posso |)(troc(ar|a|o))",
  "o prefix(o|)",
  "do|da",
  "kuram(inha|a)"
]

module.exports = class howToChangePrefixResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "howToChangePrefixResponse",
      priority: 0,
      ignoreDevs: false,
    })
  }
  
  async run(client, message) {
    message.build(
      message.kuramaReply("alterar o meu prefix no seu servidor é muitooo fácil, veja comigo.", "826415473969070090"),
      message.kuramaReply("Você pode alterar o meu prefix no seu servidor utilizando o comando `d!setPrefix <prefix>`.", "826415473775869962", false)
    )
  }
}
