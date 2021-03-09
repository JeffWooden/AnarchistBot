const Discord = require("discord.js");
module.exports = {
    name: "error",
    execute(msg, content){
        config = require("../utils/config").get_config(msg.guild.id)
        embed = new Discord.MessageEmbed()
        .setDescription(content)
        .setFooter(msg.content, msg.author.displayAvatarURL())
        .setColor("#fc5c65");
        author = msg.author
        msg.channel.send(embed).then(msg => {
            msg.react("➕");
            msg.awaitReactions((reaction, user) => user.id == author.id && reaction.emoji.name == "➕", {max: 1, time: config["timeout"]["errors"]*1000})
            .then(collected => {if(collected.first().emoji.name == "➕"){msg.reactions.removeAll()}}).catch(() => {msg.delete()});
        });
    }
}