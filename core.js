const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logado com o BOT ${client.user.tag}`);
});

client.on("message", (msg) => {
   if (!msg.author.bot) {
        if (msg.content == 'Boa noite') {
            msg.reply(`Olá, ${msg.author.username}, Tenha uma ótima noite!`);
        }
        else {
            msg.reply("Não reconheço esse padrão de mensagem ainda, to sendo programada ainda");
        }

        console.log(`Author: ${msg.author.username}: ${msg.content}`);
   }
});


client.on("disconnect", (msg) => {
    msg.reply("Vagabundo desligou o servidor local e eu vou mimir");
})
client.login("NzkyOTM2NjM0NjQ3MTgzNDAx.X-k9yQ.TmWVtmlf_qRNFNFtQrz99TNkGLo");