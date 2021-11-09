const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "vo(c(ê|e)s|ses)|vcs",
  "est(a|ã)o|tem|v(ã|a)o",
  "fazendo|faz(er|)|",
  "(um|1)|",
  "projeto|serv(er|idor)",
  "de|",
  "(b(l|r)ack|braque|dark) c(lo|o)ver"
]

module.exports = class DoingBlackCloverServerResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "DoingBlackCloverServerResponse",
      priority: 0,
      ignoreDevs: false,
    })
	}
  
  async run(client, message) {
    var channelID = message.guild.type == "community" ? client.constants.COMMUNITY_SERVER_BOOST_ID : client.constants.SUPPORT_SERVER_BOOST_ID
    
    message.build(
      message.kuramaReply(`estamos fazendo sim, o nosso projeto se chama **__Dark Clover__**, se você estiver interessado nele, você pode dar **boost (<#${channelID}>)** aqui ou comprar um vip para ter acesso aos **Chat de Spoilers**.`, "826435905769308240"),
      `{ "option": { "files": ["https://i.imgur.com/Y26wVdm.gif"] } }`
    )
  }
}
