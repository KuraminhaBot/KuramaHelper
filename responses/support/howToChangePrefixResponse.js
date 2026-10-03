const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "como|onde|qual|existe|tem( )?jeito|ajuda|quero|queria|tem algum",
  "(posso |)(troc(ar|a|o))",
  "o prefix(o|)",
  "do|da|",
  "kuram(inha|a)|"
]

module.exports = class HowToChangePrefixResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "HowToChangePrefixResponse",
      priority: 0,
      ignoreDevs: false,
    })
  }
  
  run(client, message) {
    message.build(
      message.kuramaReply("alterar o meu prefix no seu servidor é muitooo fácil, veja comigo.", kuramaEmojis.id('kurama_thumbsup')),
      message.kuramaReply("Você pode alterar o meu prefix no seu servidor utilizando o comando `d!setPrefix <prefix>`.", kuramaEmojis.id('kurama_coffee'), false)
    )
  }
}
