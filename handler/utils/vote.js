const Discord = require("discord.js")
module.exports = {
    name: "vote",
    formatDate(d){
        var convert = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
        d = new Date(d);
        AAAA = d.getFullYear(d)
        MM = convert[d.getMonth(d)]
        dd = d.getDate(d)
        hh = d.getHours(d)
        mm = d.getMinutes(d)
        ss = d.getSeconds(d)
        return `${dd} ${MM} ${AAAA} à ${hh}h${mm}m${ss}s`
    },
    post(channel,type,duration,content,author){
        return new Promise((resolve, reject) => {
            var convert = {
                "s": {
                    "name":"seconde(s)",
                    "operation":1000
                },
                "m": {
                    "name":"minute(s)",
                    "operation":1000*60
                },
                "h": {
                    "name":"heure(s)",
                    "operation":1000*60*60
                },
                "d": {
                    "name":"jour(s)",
                    "operation":1000*60*60*24
                }
            }
            regex = /([0-9]+)([d|h|m|s])/gm
            result = regex.exec(duration);
            if(result == null) return reject(`"${duration}" n'est pas une durée correcte (\`/([0-9]+)([d|h|m|s])/\`)`);
            var d = new Date().getTime() + parseInt(result[1])*convert[result[2]].operation
            embed = new Discord.MessageEmbed()
            .setTitle(`Nouveau Vote ! - ${type}`)
            .setDescription(`${content}`)
            .setFooter(`Fin le ${this.formatDate(d)} [Durée ${result[1]} ${convert[result[2]].name}]${author != null ? ` - ${author.username}` : ''}`, author != null ? author.displayAvatarURL() : "");
            channel.send(embed)
            return resolve({
                duration: duration,
                author: author,
                type: type
            })
        })
    }
}