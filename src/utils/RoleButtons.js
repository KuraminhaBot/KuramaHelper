const Constants = require('./Constants.js')
const Discord = require("discord.js")
const Util = require('./Util.js')

module.exports = class RoleButtons {
  static registerButtons(guild) {
    if (guild.id == "851673486727839795") return this.robloxDark()
  }
  
  static robloxDark() {
    //=== [ REGIONAL ROLES ] ===//
    var english = this.buttonRole("854490973971283968", "🇧🇷", "Portuguese")
    var portuguese = this.buttonRole("854491481917489163", "🇺🇸", "English")
    
    //=== [ NOTIFY ROLES ] ===//
    var inserver = this.buttonRole("891648381045325855", {name: "kurama_reading", id: "826430254084128829"}, "Discord Updates", {
      description: "Stay tuned for all the news here from our Discord (<#853949428637237278>), so you don't miss a thing!"
    })
    var wip = this.buttonRole("891649001127022603", {name: "kurama_fixit", id: "826430206487166996"}, "WIP Updates", {
      description: "Keep a close eye on the changes that are coming to our games! Peerks will be sent on a channel that only people with this role can see!"
    })
    var news = this.buttonRole("891649002985123900", {name: "kurama_thumbsup", id: "826415473969070090"}, "Games News", {
      description: "Receive notifications of all new updates and changes to our games that will be sent out in <#853453645805912094>! Yay, you will like to be informed."
    })
    var stats = this.buttonRole("891649005954678784", {name: "kurama_fine", id: "869310000768614400"}, "Games Status", {
      description: "Don't just hang around without knowing why the server is down, or why you can't log into the server, get notifications of the status of our games!"
    })

    //=== [ LISTS ] ===//
    var languages = new Array(english, portuguese)
    var notify = new Array(inserver, wip, news, stats)    
    
    //=== [ CLASSES ] ===//
    var regionalRoles = this.buttonType(languages, "Regional Roles", 
      `Choose a region position so you can get better support, talk to people who speak your language, and many others.
      
      **Remembering that you cannot have two region positions at the same time! We will do this to avoid confusion.**`,
      "https://cdn.discordapp.com/emojis/826430254084128829.png",
      "{emoji} **|** Ready! You will now have access to support in {label}!",
      "<:kurama_comfy:826415473922539580> **|** Wait a minute, you'll lose access to the support channels, ok... But if you want I'll be here.",
      { removeOtherRole: true}
    )
    
    var notifyRoles = this.buttonType(
      notify, "Notify Roles", null, "https://cdn.discordapp.com/emojis/826430829181141062.png", 
      "{emoji} **|** Excellent! Now with {role} you will be notified whenever there is something new!",
      "<:kurama_sob:826430408173813820> **|** I don't believe! I thought you wanted to see the news, I thought we were friends.. But if you need to, I'll stay here!",
    )
    
    return [
      regionalRoles,
      notifyRoles
    ]
  }
  
  static getMessages(classes) {
    return classes.map(it => {
      return {
        embeds: [this.createEmbed(it.name, it.description, it.image)],
        components: this.generateRows(it.buttons)
      }
    })
  }
  
  static buttonRole(id, emoji, string, options) {
    var button = new Discord.MessageButton()
      .setCustomId(`broles:${id}`)
      .setStyle("SECONDARY")
      .setLabel(string)
      .setEmoji(emoji)
    
    button.options = options
    return button;
  }
  
  static generateRows(buttons) {
    var buttonsPerRows = Util.chunk(buttons, 6)
    
    return buttonsPerRows.map(it => {
      return new Discord.MessageActionRow()
        .addComponents(it)
    })
  }
  
  static findClass(bclass, customID) {
    return bclass.find(it => it.buttons.some(it => it.customId == customID))
  }
  
  static buttonType(buttons, name, description, image, message, removeMessage, options) {
    if (buttons.every(it => it.options?.description)) {
      description = buttons.map(it => `${this.getRoleEmoji(it.emoji)} **${it.label}:** ${it.options.description}`).join("\n\n")
    }
    
    return {
      name: name,
      description: description,
      image: image,
      message: message,
      removeMessage: removeMessage,
      buttons: buttons,
      options: options
    }
  }
  
  static createEmbed(title, description, image) {
    return new Discord.MessageEmbed()
      .setColor(Constants.KURAMA_COLOR)
      .setDescription(description)
      .setThumbnail(image)
      .setTitle(title)
  }
  
  static applyPlaceholder(content, interaction, role) {
    return content
      .replace(new RegExp("{user}", "ig"), `${interaction.user.username}`)
      .replace(new RegExp("{@user}", "ig"), `${interaction.user.toString()}`)
      .replace(new RegExp("{user\.discriminator}", "ig"), `${interaction.user.discriminator}`)
      .replace(new RegExp("{user\.tag}", "ig"), `${interaction.user.tag}`)
      .replace(new RegExp("{user\.id}", "ig"), `${interaction.user.id}`)
      .replace(new RegExp(("{staff(\.username)?}"), "i"), `${interaction.user.username}`)
      .replace(new RegExp("{emoji}", "ig"), `${this.getRoleEmoji(interaction.component.emoji)}`)
      .replace(new RegExp("{label}", "ig"), `${interaction.component.label}`)
      .replace(new RegExp("{customID}", "ig"), `${interaction.component.customId}`)
      .replace(new RegExp("{role}", "ig"), `<@&${role}>`)
  }
  
  static getRoleEmoji(emote) {
    return [
      `${emote.id ? "<:" : ""}`,
      `${emote.animated ? "a:" : ""}`,
      `${emote.name}`,
      `${emote.id ? `:${emote.id}>`: ""}`
    ].join("")
  }
}