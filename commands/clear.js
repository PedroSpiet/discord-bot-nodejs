module.exports = async (client, msg) => {
   const channel = msg.channel;
   
   const fetchMessage = await channel.messages.fetch().catch(console.error);

   await channel.bulkDelete(fetchMessage);

   msg.reply(`Apagou ${fetchMessage.size} messages!`);
}