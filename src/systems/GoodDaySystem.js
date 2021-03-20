const CronJob = require('cron').CronJob;
const { checkEmoji } = require('../utils/checkEmoji.js')

module.exports = {
  run: async (client) => {
    
    const job = new CronJob('0 */24 * * *', async () => {
      var channel = client.channels.cache.get("702148442331283466")
      
      channel.build(
        `${checkEmoji(client, "711661099115610232")} **|** Um outro dia nasce, staff da Dark, que o hoje seja melhor que o ontem!`
      )
    }, null, true, 'America/Sao_Paulo')
    
    job.start()
  },
  
  config: {
    "events": ["ready"]
  }
}