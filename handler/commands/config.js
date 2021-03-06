const fs = require("fs")
const Discord = require("discord.js")
module.exports = {
    /*
         __   __        ___    __  
        /  ` /  \ |\ | |__  | / _` 
        \__, \__/ | \| |    | \__> 
        
    */
    name: 'config',
    description: 'Obtenir toutes les informations de la configuration serveur.',
    syntax: 'config [read|modify] <setting> [value]',
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
            require("../utils/error").execute(msg, `Paramètre "${setting}" inconnu.\n(faites \`${config.prefix}config\` pour obtenir la liste des paramètres)`)
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