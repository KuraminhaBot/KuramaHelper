const kuramaEmojis = require('./KuramaEmojis');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports.stackFAQ = async (message, title, channelID) => {
  const client = message.client;
  var regex = /(?:\*\*)?(?<emoji>(.+?))(?:\*\*)?\|(?:\*\*)?(?<title>(.+?))\*\*/
  
  var channel = client.channels.cache.get(channelID)
  
  if (message.channel !== channel) return;
  if (message.author.bot && message.author.sytem) return;
  
  if (channel !== null) {
    var last100MessagesInTheChannel = await channel.messages.fetch({ limit: 100 })
      .then(messages => messages.filter(it => it.author.id !== client.user.id).sort((a, b) => a.createdTimestamp - b.createdTimestamp))
      
    var last200MessagesInTheChannel = await channel.messages.fetch({ limit: 100, before: last100MessagesInTheChannel.first().id })
      .then(messages => messages.filter(it => it.author.id !== client.user.id).sort((a, b) => a.createdTimestamp - b.createdTimestamp))
            
    var olderMessagesInTheChannel = await channel.messages.fetch({ limit: 100, before: last200MessagesInTheChannel.first().id })
      .then(messages => messages.filter(it => it.author.id !== client.user.id).sort((a, b) => a.createdTimestamp - b.createdTimestamp))

    var allMessagesInTheChannel = last100MessagesInTheChannel
      .concat(last200MessagesInTheChannel.filter(it => !olderMessagesInTheChannel.has(it.id)))
      .concat(olderMessagesInTheChannel.filter(it => !last100MessagesInTheChannel.has(it.id)))
      .filter(it => it.author.id !== client.user.id).sort((a, b) => a.createdTimestamp - b.createdTimestamp)

    var selfMessages = await channel.messages.fetch({ limit: 100 })
      .then(messages => messages.filter(it => it.author.id == client.user.id).sort((a, b) => a.createdTimestamp - b.createdTimestamp))
    
    var embeds = []
    
    let activeEmbed = new MessageEmbed()
      .setTitle(kuramaEmojis.text(`[[emoji:kurama_coffee]] ${title}`))
      .setColor(`#FF6E02`)
    
    var newText = []
    
    allMessagesInTheChannel.forEach((it) => {
      var match = it.content.match(regex)
            
      if (match !== null && match.groups !== undefined) {
        
        var emoji = match.groups.emoji
        var text = match.groups.title
        
        newText.push(`${emoji} **|** [${text}](${it.url})`)
                
        if (newText.join("\n").toString().length >= 2048) {
          newText = newText.slice(newText.length-1, 100)
          embeds.push(activeEmbed)
          activeEmbed = new MessageEmbed()
            .setColor(`#FF6E02`)
        }
        
        activeEmbed.setDescription(newText.join(`\n`))
      }
    })
    
    embeds.push(activeEmbed)
    
    var isDirty = embeds.size != selfMessages.size
    let i=0
    
    if (!isDirty) {
      for (const createdEmbed in embeds) {
        var selfEmbed = selfMessages[i+1].embeds[0]
        
        if (selfEmbed == null) {
          isDirty = true
          break
        } else {
          if (selfEmbed.description.replace(/(\n)/ig, "") !== createdEmbed.description.replace(/(\n)/ig, "")) {
            isDirty = true
            break
          }
        }
      }
    }
    
    if (isDirty) {
      selfMessages.forEach((it) => {
        it.delete()
      })
      
      embeds.forEach((it) => {
        channel.send({embeds: [it]})
      })
    }
  }
}