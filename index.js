const fs = require("fs")
const Discord = require("discord.js")
const bot = new Discord.Client()
bot.utils = new Discord.Collection()
bot.commands = new Discord.Collection()
require("dotenv").config();

bot.once("ready", () => {
    console.log(`${bot.user.tag} connecté.`)
})

for(directories=["commands","events"],i=0;i<directories.length;i++){
    if(!fs.existsSync(`./handler/${directories[i]}`)) fs.mkdirSync("./handler/" + directories[i])
}

Files = fs.readdirSync("./handler/commands").filter(file => file.endsWith(".js"))
for(file of Files){
    exe = require("./handler/commands/" + file)
    bot.commands.set(exe.name, exe)
}
Files = fs.readdirSync("./handler/utils").filter(file => file.endsWith(".js"))
for(file of Files){
    exe = require("./handler/utils/" + file)
    bot.utils.set(exe.name, exe)
}

bot.on("message", msg => {
    error = require("./handler/utils/error.js")
    config = bot.utils.get("config").get_config(msg.guild.id);
    prefix = config["prefix"]
    if(msg.author.bot || !msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const cmd = args.shift().toLowerCase();

    try {
        bot.commands.get(cmd).execute(msg, args, config)
    } catch(e){
        return console.log(`Commande '${cmd}' inconnue`);
    }
})

bot.login(process.env.TOKEN)