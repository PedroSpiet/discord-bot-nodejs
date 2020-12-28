const Discord = require("discord.js");
const config = require('./config.json');

const client = new Discord.Client();

const prefix = config.prefix;
const commands = require('./scripts/commandsReader')(prefix);

client.on("ready", () => {
    console.log(`Logado com o BOT ${client.user.tag}`);
});

client.on("message", async (msg) => {
    if (!msg.author.bot && msg.guild) {
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        //console.log(await msg.channel.messages.fetch());
        const args = msg.content.split(" ");
        if (commands[args[0]]){
            commands[args[0]](client, msg)
        } else {
            msg.reply("Comando não encontrado! digite !commands para ver todos os comandos");
        }
    }
});

client.login(config.token);