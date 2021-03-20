const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "ganha|o?( )que|recebe",
  "dando|(se )?(der|dar)",
  "(nitro |)bo{2}st",
  "aqui|"
]

module.exports = class BoostRewardsResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "BoostRewardsResponse",
      priority: 0,
      ignoreDevs: false,
    })
  }
  
  async run(client, message) {
    
    var channelID = message.guild.type == "community" ? client.utils.COMMUNITY_SERVER_BOOST_ID : client.utils.SUPPORT_SERVER_BOOST_ID
    
    message.build(
      message.kuramaReply(`ao dar boost aqui você pode claimar as recompensas faladas no chat <#${channelID}>.\n`, "698156610123464744"),
      message.kuramaReply("Após dar boost você pode usar o comando `d!vipBoost` para pegar as vantagens em 1 servidor de sua escolha!\n", "799373211141800036", false),
      message.kuramaReply("`Observação: Você perde suas vantagens após terminar o seu Server Boosting.`", false),
      `{ "option": { "files": ["https://media1.tenor.com/images/31ad5196ff2418d0d67b230f60c5e570/tenor.gif"] } }`
    )
  }
}
