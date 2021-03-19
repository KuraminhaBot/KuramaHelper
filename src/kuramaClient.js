const Discord = require("discord.js");
const fs = require('fs');
const { readdirSync } = require('fs')

module.exports = class kuramaClient{
  constructor(client) {
    this.client = client
  }
  
  loadCommands(index = '/app/commands') {
    const cmdFiles = readdirSync(index);
    console.log(`[CMD-LOAD] O total de ${cmdFiles.length} comandos foram carregados!`);

    cmdFiles.forEach(folder => {
      readdirSync(`${index}/${folder}`).forEach(f => {
        try {
          const props = require(`${index}/${folder}/${f}`);
          if (f.split(".").slice(-1)[0] !== "js") return;
          console.log(`[CMD-LOADING] Carregando ${props.help.name}.js`);
          
          if (props.init) props.init(this.client);
          this.client.commands.set(props.help.name, props);
          
          if (props.help.aliases) {
            props.alias = true;
            props.help.aliases.forEach(alias => this.client.commands.set(alias, props));
          }
        } catch (e) {
          console.log(`[ERR] ${f} was not loaded correctly: ${e}`);
        }
      })
    });
  }

  loadEvents(index = '/app/events') {
    const evtFiles = readdirSync(index);
    console.log("[EVENTS]", `Carregando o total de ${evtFiles.length} eventos`);
    evtFiles.forEach(f => {
      const eventName = f.split(".")[0];
      const event = require(`${index}/${f}`);

      this.client.on(eventName, event.bind(null, this.client));
    });
  }
  
  loadResponses(index = '/app/responses') {
    const cmdFiles = readdirSync(index);
    console.log(`[RESPONSES-LOAD] O total de ${cmdFiles.length} respostas foram carregadas!`);

    cmdFiles.forEach(folder => {
      readdirSync(`${index}/${folder}`).forEach(f => {
        try {
          const props = new (require(`${index}/${folder}/${f}`))(this);
          if (f.split(".").slice(-1)[0] !== "js") return;
          console.log(`[RESPONSE] Carregando ${props.config.name}.js`);
          
          if (props.init) props.init(this.client);
          
          if (folder == "community") props.guilds = ["community"]
          if (folder == "support") props.guilds = ["community", "support"]
          
          this.client.responses.set(props.config.name, props);
        } catch (e) {
          console.log(`[ERR] ${f} was not loaded correctly: ${e}`);
        }
      })
    });
  }
  
  loadSystem(index = '/app/src/systems') {
    const sytFiles = readdirSync(index);
    console.log("[SYSTEMS]", `Carregando o total de ${sytFiles.length} eventos`);
    sytFiles.forEach(f => {
      const system = require(`${index}/${f}`);
      
      if (system.config.events) {
        system.config.events.forEach((eventName) => {
          this.client.on(eventName, (...args) => system.run(this.client, ...args));
        })
      }
    });
  }
};