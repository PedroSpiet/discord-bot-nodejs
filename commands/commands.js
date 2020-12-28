const config = require("../config.json");
const commands = require("../scripts/commandsReader")(config.prefix);

const descriptions = {
    "!commands": "Use esse comando para ver os comandos disponíveis",
    "!clear": "Limpa o chat de um canal de texto!",
    "!ping": "Ping o bot"
}


module.exports = async (channel, msg) => {
    var texto = "Comandos: \n ";
    Object.keys(commands).forEach(command => {
        texto += `\n ${command}: ${descriptions[command] ? descriptions[command]: 'Não tem descrição'}`;
    });

    msg.reply(texto);
}