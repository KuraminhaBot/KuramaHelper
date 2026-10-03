const kuramaEmojis = require('../../src/utils/KuramaEmojis');
const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
	"como",
	"ganh(a|o|ar)|obtem|receber|(gast|us)(ar|o|a)",
	"(kurama(-| )|)coins|moedas|dinheiro"
]


module.exports = class HowToGetCoinsResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "HowToGetCoinsResponse",
      priority: 0,
      ignoreDevs: false,
    })
  }
  
  async run(client, message) {
    message.build(
      message.kuramaReply("você pode ganhar **Kurama Coins**.... Dormindo! Ksksks brincadeirinha! Existe uma maneira muito simples de ganhar **Kurama Coins**, apenas coletando daily!", kuramaEmojis.id('kurama_reading')),
      message.kuramaReply("Também há como apostar **Kurama Coins** com um amigo, apostar é uma boa maneira de ganhar (ou perder se você for azarado) coins de forma fácil e divertida!", kuramaEmojis.id('kurama_money_animated'), false),
      message.kuramaReply("Mas não se preocupe! Se você não gosta de apostas, você pode gastar seus coins comprando backgrounds novos ou até mesmo layouts diferentes para o seu perfil", kuramaEmojis.id('kurama_coffee'), false)
    )
  }
}
