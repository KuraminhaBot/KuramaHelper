const { Util, APIMessage, Message, TextChannel, User, Guild, Client } = require("discord.js");
const { checkEmoji } = require('../utils/checkEmoji.js')
const ClassUtil = require('../../src/utils/Util.js');

module.exports = class ProtoTypes {
  static start() {
    
    //New Discord reply
    Message.prototype.quote = async function(content, options) {
      const reference = {
        message_id:
          (!!content && !options
            ? typeof content === "object" && content.messageID
            : options && options.messageID) || this.id,
        message_channel: this.channel.id
      };

      const { data: parsed, files } = await APIMessage.create(
        this,
        content,
        options
      )
        .resolveData()
        .resolveFiles();
      
      this.client.api.channels[this.channel.id].messages.post({
        data: { ...parsed, message_reference: reference },
        files
      }).catch(err => this.channel.send(content, options))
    };
    
    //KuramaReply
    Message.prototype.ffReply = async function(content, emoji = "🔹", mentionUser, data={}) {
      if (mentionUser == undefined || mentionUser.toString() !== "false" && !mentionUser) mentionUser = true
      if (mentionUser && mentionUser.toString() !== ("true"||"false")) data= mentionUser, mentionUser=true;
      if (emoji.toString() === "true" || emoji.toString() === "false") mentionUser=emoji, emoji = "🔹"
      if (typeof emoji === "object") mentionUser=true, data=emoji, emoji= "🔹"
      
      var authorMention = mentionUser ? `<@!${this.author.id}> ` : ``      
      let emojiParsed = /(%..%..%..(%..|)?)/ig.test(this.client.emojis.resolveIdentifier(emoji)) ? emoji : (isNaN(emoji) ? Util.parseEmoji(emoji).id : emoji)
                  
      if (isNaN(emoji)) {
        if (data) return this.quote(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`, data);
        this.quote(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`);
      } else {
        if (data) return this.quote(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`, data);
        this.quote(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`);
      }
    }
    
    //Kurama Message
    Message.prototype.ffSend = async function(content, emoji = "🔹", mentionUser= true, data={}) {
      if (mentionUser == undefined || mentionUser.toString() !== "false" && !mentionUser) mentionUser = true
      if (mentionUser && mentionUser.toString() !== ("true"||"false")) data= mentionUser, mentionUser=true;
      if (emoji.toString() === "true" || emoji.toString() === "false") mentionUser=emoji, emoji = "🔹"
      if (typeof emoji === "object") mentionUser=true, data=emoji, emoji= "🔹"
      
      var authorMention = mentionUser ? `<@!${this.author.id}> ` : ``
      let emojiParsed = /(%..%..%..(%..|)?)/ig.test(this.client.emojis.resolveIdentifier(emoji)) ? emoji : (isNaN(emoji) ? Util.parseEmoji(emoji).id : emoji)

      if (isNaN(emoji)) {
        if (data) return this.channel.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`, data);
        this.channel.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`);
      } else {
        if (data) return this.channel.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`, data);
        this.channel.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`);
      }
    }
    
    TextChannel.prototype.ffSend = async function(content, emoji = "🔹", mentionUser=false, data={}) {
      if (typeof mentionUser === "string") mentionUser= this.client.users.cache.get(mentionUser)
      if (!isNaN(emoji) && this.client.emojis.cache.get(emoji) === undefined) mentionUser=this.client.users.cache.get(emoji), emoji = "🔹"
      if (typeof emoji === "object") mentionUser=false, data=emoji, emoji= "🔹"
      
      var authorMention = mentionUser ? `${mentionUser.toString()} ` : ``
      let emojiParsed = /(%..%..%..(%..|)?)/ig.test(this.client.emojis.resolveIdentifier(emoji)) ? emoji : (isNaN(emoji) ? Util.parseEmoji(emoji).id : emoji)

      if (isNaN(emoji)) {
        if (data) return this.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`, data);
        this.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`);
      } else {
        if (data) return this.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`, data);
        this.send(`${checkEmoji(this.client, emojiParsed)} **|** ${authorMention}${content}`);
      }
    }
    
    //OnlyDevs
    User.prototype.isDev = function() {
      if (this.id === process.env.OWNER_ID) return true;
      var guild = this.client.guilds.cache.get(process.env.COMMUNITY_GUILD)
      
      if (guild.members.cache.has(this.id)) {
        var member = guild.members.cache.get(this.id)
        if (member.roles.cache.has("697414895834234892")) return true;
      }
      
      return false;
    }
    
    User.prototype.isStaff = function() {
      if (this.id === process.env.OWNER_ID) return true;
      var guild = this.client.guilds.cache.get(process.env.COMMUNITY_GUILD)
      
      if (guild.members.cache.has(this.id)) {
        var member = guild.members.cache.get(this.id)
        if (member.roles.cache.has("692487651512811530")) return true;
      }
      
      return false;
    }
    
    Client.prototype.checkEmoji = function(emojiID) {
      let messageEmoji, emojiCheck = this.emojis.cache.get(emojiID)
      if (emojiCheck == undefined) {
        const identifier = this.emojis.resolveIdentifier(emojiID)
        if (identifier.includes("%")) {
          messageEmoji = emojiID;
        } else {
          messageEmoji = "🐛"
        }
      } else {
        messageEmoji = emojiCheck.toString();
      }
      return 
    }
    
    Message.prototype.kuramaReply = function(content, emoji= "🔹", mentionUser = true) {
      if (typeof emoji === "boolean") mentionUser= emoji, emoji= "🔹"
      var user = mentionUser ? `${this.author.toString()} ` : ""
      return `${checkEmoji(this.client, emoji)} **|** ${user}${content}`
    }
    
    Message.prototype.build = function(...object) {
      let messageContent = [], config = null

      object.forEach(it => {
        if (ClassUtil.isJSON(it)) config = JSON.parse(it).option
        else messageContent.push(it)
      })
            
      return this.channel.send(messageContent.join("\n"), config)
    }
    
    TextChannel.prototype.build = function(...object) {
      let messageContent = [], config = null

      object.forEach(it => {
        if (ClassUtil.isJSON(it)) config = JSON.parse(it).option
        else messageContent.push(it)
      })
            
      return this.send(messageContent.join("\n"), config)
    }
    
    Guild.prototype.getMember = function(User) {
      let guildMemberResolvable
      if (!isNaN(User)) guildMemberResolvable = User.toString()
      if (typeof User === "object") guildMemberResolvable = User.id
            
      if (!this.members.cache.has(guildMemberResolvable)) return false
      
      return this.members.cache.get(guildMemberResolvable)
    }
    
    User.prototype.getAvatar = function(options) {
      if (this.avatar !== null) {
        const format = this.avatar && this.avatar.startsWith("a_") ? ".gif?size=2048" : ".png?size=2048";
        
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}${format}`
      }
    }
  }
}