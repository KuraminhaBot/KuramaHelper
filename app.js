require('dotenv').config()
require('./src/structures/ProtoTypes').start()

const Discord = require('discord.js');
const kuramaClient = require('./src/kuramaClient.js')
const client = new Discord.Client()

const Constants = require("./src/utils/Constants")
const Enmap = require('enmap');
const cron = require('cron');

client.commands = new Enmap()
client.responses = new Enmap()
client.startTime = Date.now()

client.guild = client.guilds.cache.get("417061847489839106")
client.support = client.guilds.cache.get("769892417025212497")
client.prefix = process.env.PREFIX

client.utils = Constants

const kurama = new kuramaClient(client)
  kurama.loadEvents()
  kurama.loadCommands()
  kurama.loadResponses()
//  kurama.loadSystem()

client.on("error", (e) => console.error(e));

client.login(process.env.AUTH_TOKEN)
	.then(() => console.log(`[CONNECT] ${client.user.username} is online.`))
	.catch((e) => console.log(`[ERROR] Failure connecting to Discord! ${e.message}!`))