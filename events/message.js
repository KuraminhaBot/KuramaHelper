module.exports = async (client, message) => {
  
  let prefix = process.env.PREFIX, type = false

  if (message.guild && !message.guild.me.permissionsIn(message.channel).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
  if (message.author.bot || message.author.system) return;
  
  if (message.content === `${prefix}restart` && message.author.id === '361977144445763585') {
    await message.channel.send(`<:kurama_yay:710127641230966824> • Reiniciando! Recarregando todos os meus comandos.`)
      .then(message => client.destroy()).catch(err => console.log(err))
      .then(() => client.login(process.env.AUTH_TOKEN)).catch(err => console.log(err))
      .then(() => message.channel.send(`<a:kurama_pat_animated:711661099115610232> • Voltei! Iniciado com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`)).catch(err => console.log(err));
    console.log('[RESTART] Desconectando - Processo forçado pelo dono.');
    process.exit();
  }
  
  if (message.guild.id == process.env.SUPPORT_GUILD) type = "support"
  if (message.guild.id == process.env.COMMUNITY_GUILD) type = "community"

  message.guild.type = type, client.owner = client.users.cache.get("361977144445763585"), client.guild = client.guilds.cache.get("417061847489839106"), client.support = client.guilds.cache.get("769892417025212497"), client.prefix = process.env.PREFIX

  
  if (type && !message.content.toLowerCase().startsWith(prefix)) {
    
    var responsesOlder = client.responses.filter(r => r.guilds.includes(type))    
    
    responsesOlder.forEach(response => {      
      if (!client.utils.ALLOWED_CHANNELS.includes(message.channel.id)) return;

      if (response.config.regex.test(message.content)) {
        if (message.author.isDev() && response.config.ignoreDevs) return;
        if (message.author.isStaff() && response.config.ignoreStaff) return;
        console.log('[ReponseLog]', `| [User] ${message.author.tag} - (${message.author.id}) run ${response.config.name}.js [Guild] ${message.guild.name} - (${message.guild.id}) - ${message.channel.name} (${message.channel.id})`)
        return response.run(client, message)
      }
    })
  }
  
  if (message.content.toLowerCase().indexOf(prefix) !== 0) return
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  let cmd = client.commands.get(command)
  
  message.command = cmd, message.cmd = cmd
    
  if (cmd.conf.onlyguilds && !message.guild) return message.channel.send("você não pode usar este comando em mensagens privadas!", "813179670270967819")
  try {
    cmd.run(client, message, args, cmd)
    if (message.channel.type == "dm") console.log('[CommandLog]', `| [User] ${message.author.tag} - (${message.author.id}) executou ${cmd.help.name}.js`)
    if (message.channel.type !== "dm") console.log('[CommandLog]', `| [User] ${message.author.tag} - (${message.author.id}) executou ${cmd.help.name}.js [Guild] ${message.guild.name} - (${message.guild.id}) - ${message.channel.name} (${message.channel.id})`)
  } catch(err) {
    return message.ffSend(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "813179670270967819");
  }
}