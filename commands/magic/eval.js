const { MessageEmbed, MessageAttachment } = require('discord.js');
const Util = require('../../src/utils/Util.js');
const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async (client, message, args) => {
        const code = args.join(" ")
        
        if (message.author !== client.owner) return message.ffSend("Apenas pessoas especiais podem utilizar esse comando :3", "813179670270967819");

        if (!code) return message.ffSend('E os argumentos bro?', "826415473775869962")

        try {
            let embed = new MessageEmbed()
            .setTitle("Sucesso!")
            .setDescription(`\`\`\`js\n${eval(code)}\`\`\``)
            .setColor(client.utils.KURAMA_COLOR);
            
            message.channel.send(embed)
        } catch (err) {

           let embed = new MessageEmbed()
            .setTitle("<:kurama_sunglasses:826413802102849597> • Kurama Canary - Eval")
            .setColor("RED")
            .setDescription('<:errado:639895787983339531> • Ocorreu um erro durante o eval.\n```js' + err + "```");

            message.channel.send(embed)
        }
    },

    conf: {},

    get help() {
        return {
            name:"eval",
            category: "Magic"
        }
    }
}