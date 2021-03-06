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
        setting = !args[1] ? args[0] : args[1]
        mode = !args[1] ? null : args[0];
        error = require("../utils/error.js")
        if(mode == null || mode == "read"){
            if(!config[setting]){
                error.execute(msg, `Paramètre "${setting}" inconnu.\n(faites \`${config.prefix}config\` pour obtenir la liste des paramètres)`)
            } else {
                embed.addField(setting, config[setting],true)
                msg.channel.send(embed)
            }
        } 
        if(mode == "modify"){
            error.execute(msg, `Non-disponible.`)
        } else {
            error.execute(msg, `Mode "${inconnu}", faites \`${config.prefix}help config\` pour plus d'informations`)
        }
        return msg.delete({timeout: 3000})
    }
}