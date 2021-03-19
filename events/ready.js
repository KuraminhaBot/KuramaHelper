module.exports = async (client) => {
  client.user.setPresence({ activity: {name: 'e respondendo perguntas.', type: 'LISTENING'} })
}