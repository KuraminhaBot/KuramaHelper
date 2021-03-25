
module.exports = {
  run: async (client, message) => {
    if (!client.utils.KURAMA_GUILDS.includes(message.guild.id)) return
    
    var roleRemap = {
      "417061847489839106": {
        "697414895834234892": "769893662473584651", //Kurama Anbu's
        "821503838472241162": "769895028863664160" //Kurama Support
      },
      "769892417025212497": {
        "769893662473584651": "697414895834234892", //Kurama Anbu's
        "769895028863664160": "821503838472241162" //Kurama Support
      }
    }
    
    for (const guild in client.utils.KURAMA_GUILDS) {
      
      var targedGuild = client.guilds.cache.get(client.utils.KURAMA_GUILDS[guild])
      
      if (!targedGuild.getMember(message.author)) return;
      
      if (Object.values(roleRemap[message.guild.id]).some(r=> targedGuild.getMember(message.author).roles.cache.has(r))) {
        for (const id in Object.keys(roleRemap[message.guild.id])) {
          
          var role = message.guild.roles.cache.get(Object.keys(roleRemap[message.guild.id])[id])
          
          if (!targedGuild.getMember(message.author).roles.cache.has(Object.values(roleRemap[message.guild.id])[id])) {
            if (message.member.roles.cache.has(Object.keys(roleRemap[message.guild.id])[id])) {
              console.log("[Roles Synchronization]", `${message.guild.name} | Removi o cargo ${role.name} em ${message.author.tag}!`)
              await message.member.roles.remove(Object.keys(roleRemap[message.guild.id])[id], `Roles Synchronization: Não tinha o cargo em ${targedGuild.name}`)
              continue;
            }
            continue;
          }
          
          if (message.member.roles.cache.has(Object.keys(roleRemap[message.guild.id])[id])) {
            continue;
          }
                    
          console.log("[Roles Synchronization]", `${message.guild.name} | Setei o cargo ${role.name} em ${message.author.tag}!`)
          message.member.roles.add(Object.keys(roleRemap[message.guild.id])[id], `Roles Synchronization: Tinha o cargo em ${targedGuild.name}`)
        }
      }
    }
  },
  
  config: {
    "events": ["message"]
  }
}