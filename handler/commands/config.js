const fs = require("fs")
const Discord = require("discord.js")
module.exports = {
    /*
         __   __        ___    __  
        /  ` /  \ |\ | |__  | / _` 
        \__, \__/ | \| |    | \__> 
        
    */
    name: 'config',
    execute(msg, args, config){
        const embed = new Discord.MessageEmbed()
        if(!args[0]){
            embed.setTitle("Liste des paramètres de la config");
            for(i in config){
                embed.addField(i,config[i],true)
            }
            return msg.channel.send(embed)
        }
        setting = args[0]

        if(config[setting] == undefined){
            embed.setDescription(`Paramètre "${setting}" inconnu.\n\
            (faites \`${config.prefix}config\` pour obtenir la liste des paramètres)`)
            embed.setColor("#fc5c65")
            author = msg.author
            msg.channel.send(embed).then(msg => {
                msg.react("➕");
                msg.awaitReactions((reaction, user) => user.id == author.id && reaction.emoji.name == "➕", {max: 1, time: 10000})
                .then(collected => {msg.reactions.removeAll()}).catch(() => {msg.delete()});
            });
            return msg.delete({timeout: 3000})
        }

        if(!args[1] || args[1] == "read"){
            return msg.channel.send(`**${setting}:** \`\`\`\n${config[setting]}\`\`\``)
        } else if(args[1] == "modify"){
            return msg.channel.send(`Modification du paramètre '${setting}'`)
        } else {
            return msg.channel.send(`Sous paramètre '${args[1]}' inconnu (Essayez 'read' ou 'modify')`)
        }
    }
}