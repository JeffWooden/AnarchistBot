const fs = require("fs")
const Discord = require("discord.js")
const bot = new Discord.Client()
const get_config = require("./handler/utils/config.js")
bot.commands = new Discord.Collection()
const {prefix, startMessageOnLaunch, handlerPath} = require("./config.json")
require("dotenv").config();

bot.once("ready", () => {
    console.log(`${bot.user.tag} connecté.`)
    if(startMessage == true) bot.channels.cache.find(ch => ch.name === "général").send("Hello World ! I'm UP !")
})

for(directories=["commands","events"],i=0;i<directories.length;i++){
    if(!fs.existsSync(`${handlerPath}/${directories[i]}`)) fs.mkdirSync(handlerPath + "/" + directories[i])
}

cmdFiles = fs.readdirSync(handlerPath + "/commands").filter(file => file.endsWith(".js"))
for(file of cmdFiles){
    cmd = require(handlerPath + "/commands/" + file)
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