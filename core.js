const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "!";
const commands = require('./scripts/commandsReader')(prefix);

client.on("ready", () => {
    console.log(`Logado com o BOT ${client.user.tag}`);
});

client.on("message", async (msg) => {
    if (!msg.author.bot) {
        console.log(`${msg.author.username}: ${msg.content}`);
        //console.log(await msg.channel.messages.fetch());
        const args = msg.content.split(" ");
        if (commands[args[0]]) commands[args[0]](client, msg);
    }
});

client.login("token");