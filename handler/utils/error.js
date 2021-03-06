const Discord = require("discord.js");
module.exports = {
    name: "error",
    execute(msg, content){
        embed = new Discord.MessageEmbed()
        .setDescription(content)
        .setColor("#fc5c65");
        author = msg.author
        msg.channel.send(embed).then(msg => {
            msg.react("➕");
            msg.awaitReactions((reaction, user) => user.id == author.id && reaction.emoji.name == "➕", {max: 1, time: 10000})
            .then(collected => {msg.reactions.removeAll()}).catch(() => {msg.delete()});
        });
    }
}