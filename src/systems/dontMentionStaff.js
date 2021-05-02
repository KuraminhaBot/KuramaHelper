module.exports = {
  run: async (client, message) => {
    const guild = message.guild
    
    if (!client.utils.ALLOWED_CHANNELS.includes(message.channel.id)) return;
    if (message.author.isStaff() || message.author.isDev()) return;
    
    var mentionedUsers = [...message.mentions.users.array()], validUsers = []
    let userWarned = false
        
    for (var user in mentionedUsers) {
      if (mentionedUsers[user].isStaff() || mentionedUsers[user].isDev()) {
        validUsers.push(mentionedUsers[user])
      }
    }
        
    if (validUsers.length !== 0) {
      if (/((conversa|vem|vamos|pode?( vir|)|libera|coisa)(r|)) ?(|.*) (pv|dm|privado)/ig.test(message.content)) {
        userWarned= true
        return message.build(
            message.kuramaReply("**Não mencione pessoas da equipe!** As vezes elas podem estar ocupadas... vai se ela está cagando e você aí, incomodando ela...", "826416082012733460"),
            message.kuramaReply("**Não damos suporte via DM!** Não insista para que algum staff te atenda via mensagem direta, seja direto com a pessoa.", false)
          )
      }
    } else {
      const filter = m => m.author == message.author
      const collector = message.channel.createMessageCollector(filter, { max: 5, time: 60000, errors: ['time']})
      
      collector.on('collect', m => {
        if (userWarned) return;
        if (/((conversa|vem|vamos|pode?( vir|)|libera|coisa)(r|)) ?(|.*) (pv|dm|privado)/ig.test(m.content)) {
          userWarned=true
          collector.stop()
          return message.build(
            message.kuramaReply("**Não mencione pessoas da equipe!** As vezes elas podem estar ocupadas... vai se ela está cagando e você aí, incomodando ela...", "826416082012733460"),
            message.kuramaReply("**Não damos suporte via DM!** Não insista para que algum staff te atenda via mensagem direta, seja direto com a pessoa.", false)
          )
        }
      })
    }
  },
  
  "config": {
    "events": ["message"]
  }
}