const { checkEmoji } = require('./checkEmoji.js')

module.exports = class Util {
  static getRandomValue(max){
    return Math.floor(Math.random()*max);
  }
  
  static getRandomValueOfObject(obj) {
    return obj[Object.keys(obj)[this.getRandomValue(Object.keys(obj).length)]]
  }
  
  static isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  
  static arrayRemove(array, item) {
    const index = array.indexOf(item)
    if (index < 0) return;
    array.splice(index, 1)
    return array;
  }
  
  static async verifyArrayAndRemove(original, arrayRemove) {
    var array = [...original]
    for (const item in arrayRemove) {
      if (!array.includes(arrayRemove[item])) {
        continue;
      }
      
      const index = array.indexOf(arrayRemove[item])
      if (index < 0) {
        continue;
      }

      array.splice(index, 1);
    }
    return array;
  }
  
  static delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
  
  static getEmoteURL(emoji) {
    if (emoji.identifier.includes("%")) {
      return `https://twemoji.maxcdn.com/2/72x72/${emoji.toString().codePointAt(0).toString(16)}.png`
    } else {
      return emoji.url
    }
  }
  
  static progressBar(amount, length) {
    var response = "█".repeat(amount) + ".".repeat(length - amount)
    return response;
  }
  
  static getPlaceholders(item, message, user, mod) {
    var guild = message.guild ? message.guild : null, completeString = item, channel = message.channel
    if (typeof item === "object") completeString = JSON.stringify(item)
      
    completeString = completeString
      .replace(new RegExp("{@user}", "ig"), `${user.toString()}`)
      .replace(new RegExp("{user\.discriminator}", "ig"), `${user.discriminator}`)
      .replace(new RegExp("{user\.tag}", "ig"), `${user.tag}`)
      .replace(new RegExp("{user\.avatar}", "ig"), `${user.getAvatar()}`)
      .replace(new RegExp("{user\.id}", "ig"), `${user.id}`)
      .replace(new RegExp(("{user(\.username)?}"), "ig"), `${user.username}`)

    if (message.guild) {
      completeString = completeString
        .replace(new RegExp("{#channel}", "ig"), `${channel.toString()}`)
        .replace(new RegExp("{channel\.id}", "ig"), `${channel.id}`)
        .replace(new RegExp("{channel(\.name)?}", "ig"), `${channel.name}`)
        .replace(new RegExp("{guild}", "ig"), `${guild.name}`)
        .replace(new RegExp("{guild\.id}", "ig"), `${guild.id}`)
        .replace(new RegExp("{guild\.size}", "ig"), `${guild.memberCount}`)
        .replace(new RegExp("{guild\.icon}", "ig"), `${guild.iconURL()}`)
    }

    if (mod) {
      completeString = completeString
        .replace(new RegExp("{reason}", "ig"), `${mod.reason}`)
        .replace(new RegExp("{punishment}", "ig"), `${mod.punishiment}`)
        .replace(new RegExp("{@staff}", "ig"), `${message.author.toString()}`)
        .replace(new RegExp("{staff\.discriminator}", "ig"), `${message.author.discriminator}`)
        .replace(new RegExp("{staff\.tag}", "ig"), `${message.author.tag}`)
        .replace(new RegExp("{staff\.avatar}", "ig"), `${message.author.getAvatar()}`)
        .replace(new RegExp("{staff\.id}", "ig"), `${message.author.id}`)
        .replace(new RegExp(("{staff(\.username)?}"), "i"), `${message.author.username}`)
    }
    
    if (typeof item === "object") return JSON.parse(completeString)
    
    return completeString
  }
}