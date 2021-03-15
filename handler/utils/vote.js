const Discord = require("discord.js")
module.exports = {
    name: "vote",
    formatDate(d,format){
        var convert = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
        d = new Date(d);
        AAAA = d.getFullYear(d)
        MM = convert[d.getMonth(d)]
        dd = d.getDate(d)
        hh = d.getHours(d)
        mm = d.getMinutes(d)
        ss = d.getSeconds(d)
        switch(format){
            case "array":
                return [dd,MM,AAAA,hh,mm,ss]
            default:
                return `${dd} ${MM} ${AAAA} à ${hh < 10 ? "0" + hh : hh}h${mm < 10 ? "0" + mm : mm}m${ss < 10 ? "0" + ss : ss}s`
        }
    },
    post(channel,type,duration,args,author){
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
            .setFooter(`Fin le ${this.formatDate(d)} [Durée ${result[1]} ${convert[result[2]].name}]${author != null ? ` - ${author.username}` : ''}`, author != null ? author.displayAvatarURL() : "");
            switch(type){
                default:
                    embed.setTitle(`Nouveau vote - ${type}`)
                    embed.setDescription(args.join(" "))
                    break
            }
            channel.send(embed)
            return resolve({
                duration: duration,
                author: author,
                type: type
            })
        })
    }
}