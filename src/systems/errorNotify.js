const { checkEmoji } = require('../utils/checkEmoji.js');

module.exports = {
  run: async (client) => {    
    var logChannel = client.channels.cache.get(client.constants.GUILD_EVENTS_LOGERR_ID)
    
    process.on('FetchError', (err) => {
      logChannel.send(`${checkEmoji(client, "813179670270967819")} **[LOG] Fetch Error:** ${err}`)
    })
    
    process.on('unhandledRejection', (reason, promise) => {
      logChannel.send(`${checkEmoji(client, "813179670270967819")} **[LOG] Unhandled Rejection at:** ${promise}: ${reason}`);
    });
    
    process.on('uncaughtException', (err, origin) => {
      logChannel.build(
        `${checkEmoji(client, "813179670270967819")} **[LOG]** ${process.stderr.fd}`,
        `${checkEmoji(client, "813179670270967819")} **[LOG] Caught exception:** ${err}\n`,
        `${checkEmoji(client, "813179670270967819")} **[LOG] Exception origin:** ${origin}`
      )
    });
    
    process.on('error', (err) => {
      logChannel.send(`${checkEmoji(client, "813179670270967819")} **[LOG] Error:** ${err}`,)
    });
    
    process.on('warning', (warning) => {
      logChannel.send(`${checkEmoji(client, "813179670270967819")} **[LOG] Warning:** ${warning.name} ${warning.message} ${warning.stack}`)
    })
    
    client.on('error', (err) => {
      logChannel.ffSend(`**[LOG] Discord Error:** ${err}`, "813179670270967819")
    })
  },
  
  config: {
    "events": ["ready"],
    "disable": true
  }
}