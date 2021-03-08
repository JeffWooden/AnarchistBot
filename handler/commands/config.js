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
        const embed = new Discord.MessageEmbed();
        if(!args[0]){
            embed.setTitle("Liste des paramètres de la config");
            for(i in config){
                embed.addField(i,config[i],true)
            }
            return msg.channel.send(embed)
        }

        function unknownParamater(){
            error.execute(msg, `Paramètre "${setting}" inconnu.\n(faites \`${config.prefix}config\` pour obtenir la liste des paramètres)`)
        }
        setting = !args[1] ? args[0] : args[1]
        mode = !args[1] ? null : args[0];
        value = args[2]
        error = require("../utils/error.js")
        if(mode == null || mode == "read"){
            if(!config[setting]){unknownParamater()} else {
                embed.addField(setting, config[setting],true)
                msg.channel.send(embed)
            }
        } else if(mode == "modify"){
            if(!config[setting]){unknownParamater()} else {
                if(!value){error.execute(msg, `Rentrez une valeur pour modifier le paramètre "${setting}"`)}
                else {
                    try {value = typeof config[setting] != "string" ? JSON.parse(value) : value} catch(e){}
                    if(typeof config[setting] != typeof value){error.execute(msg, `Le type de "${value}" est "${typeof value}" ("${typeof config[setting]}" attendu)`)}
                    else {
                        if(config[setting] == value){error.execute(msg, `Rien n'a changé, le paramètre "${setting}" est déjà défini sur "${value}"`)}
                        else {
                            config[setting] = value;
                            fs.writeFileSync("./handler/configs/" + msg.guild.id + ".json", JSON.stringify(config, null, 2), "utf-8")
                            embed.setColor("#2ecc71")
                            .setDescription(`Læ "${setting}" du serveur a été modifié pour "${value}"`)
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL());
                            msg.channel.send(embed)
                        }
                    }
                }
            }
        } else {
            error.execute(msg, `Mode "${inconnu}", faites \`${config.prefix}help config\` pour plus d'informations`)
        }
        return msg.delete({timeout: 3000})
    }
}