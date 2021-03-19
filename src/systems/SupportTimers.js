const CronJob = require('cron').CronJob;
const { checkEmoji } = require('../utils/checkEmoji.js')

module.exports = {
  run: async (client) => {
    
    var channels = ["769900869612994560", "702150853628526662"]
    
    const job = new CronJob("* */1 * * *", async () => {
      for (const id in channels) {
        
        let channel = client.channels.cache.get(channels[id])
        
        var selfMessages = await channel.messages.fetch({ limit: 100 })
          .then(messages => messages.filter(it => it.author.id == client.user.id))
        
        if (selfMessages.array().length !== 0) {
          if (selfMessages.first().content.includes("LEIA ANTES DE PERGUNTAR")) {
            if ((Date.now() - selfMessages.first().createdTimestamp) < 600000) return;
          }
        }
        
        if (channel.lastMessage && channel.lastMessage.author.id == client.user.id) {
          if (channel.lastMessage.content.includes("LEIA ANTES DE PERGUNTAR")) return;
        }
        
        var type = channel.guild.id == process.env.SUPPORT_GUILD ? "support" : "community"
        
        let supportRole = client.utils.KURAMA_SUPPORT_ID, newsChannel = client.utils.KURAMA_STATUS_ID, context = `no <#${client.utils.SUPPORT_FAQ_CHANNEL_ID}>`
        if (type == "community") supportRole = client.utils.DARK_SUPPORT_ID, newsChannel = client.utils.DARK_ANNOUNCEMENTS_ID, context = "em algum canal de dúvidas frequentes"
        
        channel.build(
          `${checkEmoji(client, "711661099115610232")} **| LEIA ANTES DE PERGUNTAR!**`,
          `${checkEmoji(client, "742104629265039510")} **| Se for uma dúvida:** Veja se a resposta da sua pergunta está ${context}! Caso não esteja lá, envie a sua pergunta aqui e, na mensagem, mencione o <@&${supportRole}>, nós iremos tentar te ajudar o mais breve possível!`,
          `${checkEmoji(client, "799373211141800036")} **| Se você irá perguntar se algo foi alterado/adicionado/removido:** Veja o canal <#${newsChannel}> para saber!`,
          `{ "option": { "allowedMentions": { "roles": ["769894020654563378"] } } }`
        )
      }
    }, null, true, 'America/Sao_Paulo')
    
    job.start()
  },
  
  config: {
    "events": ["ready"]
  }
}
