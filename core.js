const Discord = require("discord.js");
const config = require('./config.json');

const client = new Discord.Client();

const permissions = config.permissions;

const prefix = config.prefix;
const commands = require('./scripts/commandsReader')(prefix);

client.on("ready", () => {
    console.log(`Logado com o BOT ${client.user.tag}`);
});

client.on("message", async (msg) => {
    if (!msg.author.bot && msg.guild && msg.content.charAt(0) == "!") {

        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        //console.log(await msg.channel.messages.fetch());
        const args = msg.content.split(" ");
        if (commands[args[0]]){
            if (verifyPermission(msg.member, args[0])){
                commands[args[0]](client, msg)
            }
            else {
                msg.reply('Você não tem permissão para executar este comando!');
            }
        } else {
            msg.reply("Comando não encontrado! digite !commands para ver todos os comandos");
        }
    }
});

client.on("guildMemberAdd", (member) => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id == config.welcomeId);
    welcomeChannel.send(`${member.user} acabou de entrar em nosso servidor :P yey`);
    member.send("Bem vindo ao nosso servidor\nSe divirta 😃");
});

client.on("guildMemberRemove",(member)=>{
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id == config.welcomeId);
    welcomeChannel.send(`${member.user} acabou de sair em nosso servidor :(`);
});

function verifyPermission(member, command) {
    let verification = !permissions[command];
    
    if(!verification) {
        const perms = permissions[command];
        perms.forEach(p => {
            switch(p.type) {
                case 'role':
                    if(member.roles.cache.has(p.value)) verification = true;
                break;

                case 'permission':
                    if(member.permissions.has(p.value)) verification = true;
                break;
            }
        });
    }
    
    return verification;
}

client.login(config.token);