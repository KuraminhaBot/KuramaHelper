const RoleEvents = ["guildMemberRoleAdd", "guildMemberRoleRemove"]

module.exports = {
  run: async (client, message, addedRole) => {
    if (!client.constants.KURAMA_GUILDS.includes(message.guild.id)) return
    if (RoleEvents.includes(client.eventName)) message.author = message.user; message.member = message;
        
    var roleRemap = {
      "417061847489839106": {
        "697414895834234892": "769893662473584651", //Kurama Anbu's
        "821503838472241162": "769895028863664160", //Kurama Support
        "558683710732500994": "907007159479468033" //Discord Moderator
      },
      "769892417025212497": {
        "769893662473584651": "697414895834234892", //Kurama Anbu's
        "769895028863664160": "821503838472241162" //Kurama Support
      },
      "907002995668025345": {
      }
    }
    
    var guildArray = Object.entries(roleRemap).map(it => it[0])
    const ThisSystem = await require("./synchronizeRoles")

    if (client.eventName == "guildMemberRemove") {
      var leaveOfGuild = guildArray.some(async (it) => {
        var isMemberInGuild = await client.guilds.cache.get(it).verifyAndGetMember(message.author);

        return isMemberInGuild ? true : false;
      })
    }

    for (const guild in guildArray) {
      var targedGuild = client.guilds.cache.get(guildArray[guild])
      var targedMember = await targedGuild.verifyAndGetMember(message.author);
      var targedRoles = Object.values(roleRemap[message.guild.id] || {});

      if (!roleRemap[message.guild.id]) return;
      if (!targedMember) return;

      if (RoleEvents.includes(client.eventName) && addedRole?.id) {
        if (Object.keys(roleRemap[message.guild.id]).includes(addedRole.id)) {
          targedRoles = [roleRemap[message.guild.id][addedRole.id]]
        }
      }

      if (targedGuild.id !== message.guild.id) {
        if (targedGuild.roles.cache.some(it => targedRoles.includes(it.id))) {
          for (let role in targedRoles.filter(it => targedGuild.roles.cache.has(it))) {
            role = targedRoles.filter(it => targedGuild.roles.cache.has(it))[role];

            var contextGuildRole = client.utils.getKeyByValue(roleRemap[message.guild.id], role)
            var roleInGuild = targedGuild.roles.cache.get(role);
            
            if (RoleEvents.includes(client.eventName)) {
              if (Object.keys(roleRemap[message.guild.id]).includes(addedRole.id)) {
                if (client.eventName == "guildMemberRoleAdd") {
                  await ThisSystem.addRole(message, targedMember, targedGuild, role, roleInGuild)
                } else {
                  await ThisSystem.removeRole(message, targedMember, targedGuild, role, roleInGuild)
                }
                continue;
              }
            }

            if (!message.member.roles.cache.has(contextGuildRole)) {
              if (targedMember.roles.cache.has(role)) {
                await ThisSystem.addRole(message, targedMember, targedGuild, role, roleInGuild)
              }
              continue;
            }
            
            if (message.member.roles.cache.has(contextGuildRole)) {
              if (!targedMember.roles.cache.has(role)) {
                await ThisSystem.removeRole(message, targedMember, targedGuild, role, roleInGuild)
              }
              continue;
            }
          }
        }
      }
    }
  },
  
  removeRole: async function (message, targedMember, targedGuild, role, roleInGuild) {
    await targedMember.roles.remove(role, `Roles Synchronization: Não tinha o cargo em ${message.guild.name}`)
      .then(it => console.log(
      "[Roles Synchronization]", `${targedGuild.name} | Removi o cargo ${roleInGuild.name} de ${message.author.tag}!`
    ))
  },
  
  addRole: async function (message, targedMember, targedGuild, role, roleInGuild) {
    if (targedMember.roles.cache.has(role)) return;
    
    await targedMember.roles.add(role, `Roles Synchronization: Tinha o cargo em ${message.guild.name}`)
      .then(it => console.log(
      "[Roles Synchronization]", `${targedGuild.name} | Adicionei o cargo ${roleInGuild.name} de ${message.author.tag}!`
    ))
  },
  
  config: {
    "events": ["messageCreate", "guildMemberRemove", ...RoleEvents],
    "disable": false
  }
}