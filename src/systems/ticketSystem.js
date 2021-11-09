const { checkEmoji } = require('../utils/checkEmoji.js')
const Util = require('../utils/Util')
const moment = require('moment')

module.exports = {
  run: async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.split(":")[0].includes("ticket")) return;
    
    switch (interaction.customId.split(":")[1]) {
      case 'create':
        var user = interaction.user, channel = interaction.channel
        
        var { threads } = await client.api.channels(channel.id).threads.archived.private.get()
        var archivedThread = threads.find(it => it.name.includes(user.id))
        
        var oldThread = archivedThread ? await channel.threads.fetch(archivedThread.id) : false;
        
        if (oldThread) 
          await interaction.ffReply("Desarquivando seu antigo ticket... Aguarde um pouquinho!", "826415473775869962", {ephemeral: true})
          
        if (oldThread && oldThread.archived) {
          if (interaction.createdTimestamp - oldThread.archiveTimestamp < client.constants.ONE_MINUTE_IN_MILLISECONDS*10) 
            return interaction.ffReply(`Pera... Não tem nem 10 minutos que você fechou seu antigo ticket! Volte aqui <t:${new moment(oldThread.archiveTimestamp+client.constants.ONE_MINUTE_IN_MILLISECONDS*10).unix()}:R>`)
          oldThread.setArchived(false)
        } 
              
        if (!oldThread) {
          var { threads } = await client.api.channels(channel.id).threads.active.get()
          var hasActiveThread = threads.some(it => it.name.includes(user.id))
          
          if (threads.some(it => it.name.includes(user.id))) 
            return interaction.ffReply("Você já tem um ticket ativo! Então pra que você vai querer criar outra ein...", {ephemeral: true}) 
        }
        
        if (!oldThread) await client.api.channels(channel.id).threads.post(
          {data: {name: `📨 ${user.username} (${user.id})`, auto_archive_duration: 1440, type: 12, invitable: false}})
          .then(it => interaction.ffReply("Criando um ticket para você... Segure firme!", "826415473775869962", {ephemeral: true}))
          
        if (!oldThread) {
          var threads = await interaction.channel.threads.fetch()
          var thread = threads.threads.find(it => it.name.includes(interaction.user.id))
        } else {
          var thread = oldThread
        }
                
        if (thread) 
          interaction.ffReply(`Seu ticket foi criado! Por favor mande suas super provas no ticket: ${thread.toString()}`, {followUp: true, ephemeral: true})
        
        if (!oldThread) await thread.members.add(user.id)
        var roleID = channel.id == "892781683315728394" ? "542457426746671156" : "514824471266459658"

        thread.send([
          `${checkEmoji(client, "869310000768614400")} **|** ${user.toString()} Prontinho! Eu criei um ticket para você, faça sua pergunta e aguarde até que um membro da equipe venha tirar sua dúvida.`,
          `${checkEmoji(client, "828360789529985066")} **|** Envie quais mentores você comprou e as provas da sua compra, se você precisar, anexe imagens. Para que os <@&${roleID}> possam te ajudar com mais eficiência.`,
          `${checkEmoji(client, "828360658159927316")} **|** Após ter seu problema resolvido ou se por algum motivo você quiser fechar o ticket, você pode utilizar \`/closeticket\` para arquivar esta thread.`
        ].join("\n"))
        
      break;
    }
  },
  
  config: {
    "events": ["interactionCreate"]
  }
}
