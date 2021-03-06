const fs = require("fs")
const Discord = require("discord.js")
const bot = new Discord.Client()
const get_config = require("././handler/utils/config.js")
bot.commands = new Discord.Collection()
const {prefix} = require("./config.json")
require("dotenv").config();

bot.once("ready", () => {
    console.log(`${bot.user.tag} connecté.`)
})

for(directories=["commands","events"],i=0;i<directories.length;i++){
    if(!fs.existsSync(`./handler/${directories[i]}`)) fs.mkdirSync("./handler/" + directories[i])
}

cmdFiles = fs.readdirSync("./handler/commands").filter(file => file.endsWith(".js"))
for(file of cmdFiles){
    cmd = require("./handler/commands/" + file)
    bot.commands.set(cmd.name, cmd)
}

bot.on("message", msg => {
    if(msg.author.bot || !msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.lenth).trim().split(/ +/)
    const cmd = args.shift().toLowerCase();

    try {
        bot.commands.get(cmd).execute(msg, args)
    } catch(e){
        return console.log(`Commande '${cmd}' inconnue`);
    }
})

bot.login(process.env.TOKEN)