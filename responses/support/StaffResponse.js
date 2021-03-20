const ServerResponse = require("../../src/structures/serverResponses")
const { checkEmoji } = require("../../src/utils/checkEmoji")

var patterns = [
  "como|quer(o|ia)|tem|posso",
  "fa(ç|s{2})o|vaga|vira|ganha|",
  "(head(-| ) |)adm(in|)|staff"
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
      message.kuramaReply(`não existe uma fórmula secreta e nem um método de virar **Administrador** do dia para noite (isso só acontece em casos raros). Mas você pode continuar sendo você mesmo e dando o melhor de si! ${checkEmoji(client, "750442742873587816")}`, "739485308248129616"),
      message.kuramaReply(`Mas para virar staff, você pode simplemente ficar atento com as novidades aqui do servidor, talvez um dia você consiga participar da staff de algum dos servidores de Minecraft!`, "711661099115610232", false)
    )
  }
}
