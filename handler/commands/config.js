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
        function readObject(object,element,embed,root){
            for(i in object[element]){
                if(typeof object[element][i] == "object"){
                    readObject(object[element], i, embed, `${root}/${i}`)
                } else {
                    embed.addField(`${root}/${i}`,`${object[element][i]}`,true)
                }
            }
        }
        const embed = new Discord.MessageEmbed();
        if(!args[0]){
            embed.setTitle("Liste des paramètres de la config");
            for(i in config){
                (typeof config[i] == "object" ? readObject(config, i, embed, i) : embed.addField(`${i}`,`${config[i]}`,true))
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
            function stringContains(e,t){return-1!=e.indexOf(t)}
            function getKeyPath(object, path){
                if(!object || path.length === 0) return object;
                return getKeyPath(object[path.shift()], path)
            }
            function setKeyPath(object, path, value){
                if(!object || path.length === 0) return null
                if(path.length === 1) object[path[0]] = value
                else return setKeyPath(object[path.shift()], path, value)
            }
            oldValue = getKeyPath(config, setting.split("."))
            try{value=typeof oldValue!="string"?JSON.parse(value):value}catch(e){}
            if(!oldValue) return unknownParamater();
            if(typeof oldValue == "object"){
                embed.setDescription(`Quel paramètre voudriez-vous accéder dans "${setting.split(".").join("/")}" ?`)
                .setColor("#3498db");
                for(i in oldValue){
                    (typeof oldValue[i] == "object" ? readObject(oldValue, i, embed, i) : embed.addField(`${i}`,`${oldValue[i]}`,true))
                }
                return msg.channel.send(embed);
            }
            if(typeof oldValue != typeof value) return error.execute(msg, `"${typeof oldValue}" attendu au lieu de "${typeof value}"`)
            if(oldValue == value) return error.execute(msg,`Rien n'a changé, "${setting}" toujours égal à \`${oldValue}\``);
            setKeyPath(config, setting.split("."), value)
            fs.writeFileSync("./handler/configs/" + msg.guild.id + ".json", JSON.stringify(config, null, 2), "utf-8")
            embed.setColor("#2ecc71")
            .setDescription(`Læ "${setting}" du serveur a été modifié pour "${value}"`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL());
            msg.channel.send(embed)
        } else {
            error.execute(msg, `Mode "${inconnu}", faites \`${config.prefix}help config\` pour plus d'informations`)
        }
    }
}