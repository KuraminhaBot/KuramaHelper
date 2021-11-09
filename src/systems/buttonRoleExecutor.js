const RoleButtons = require("../utils/RoleButtons")
const Util = require('../utils/Util')

module.exports = {
  run: async (client, interaction) => {
    if (!interaction.isMessageComponent()) return;
    if (!interaction.customId?.includes("broles:")) return;
    
    var role = interaction.customId.split(":")[1]
    var classes = RoleButtons.registerButtons(interaction.guild)

    var baseMessages = RoleButtons.getMessages(classes)
    var itClass = RoleButtons.findClass(classes, interaction.customId)
    
    if (!interaction.member.roles.cache.has(role)) {      
      if (itClass.options?.removeOtherRole) {
        await itClass.buttons.filter(it => it.customId.split(":")[1] !== role).map(it => it.customId.split(":")[1]).forEach(it => {
          if (interaction.member.roles.cache.has(it)) {
            interaction.member.roles.remove(it, `[BUTTON-ROLE]`)
          }
        })
      }

      await interaction.member.roles.add(role,`[BUTTON-ROLE]`)
      
      interaction.reply({
        content: RoleButtons.applyPlaceholder(itClass.message, interaction, role),
        ephemeral: true
      })
    } else {
      interaction.member.roles.remove(role,`[BUTTON-ROLE]`)
      
      interaction.reply({
        content: RoleButtons.applyPlaceholder(itClass.removeMessage, interaction, role),
        ephemeral: true
      })
    }
  },
  
  config: {
    "events": ["interactionCreate"]
  }
}
