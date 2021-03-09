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

    if(cmd == "help"){
        embed = new Discord.MessageEmbed();
        if(!args[0]){
            embed.setTitle("Aide - Toutes les commandes")
            for(cmds=fs.readdirSync("./handler/commands/").filter(file => file.endsWith(".js")),i=0;i<cmds.length;i++){
                embed.addField(prefix + cmds[i].slice(0,-3), bot.commands.get(cmds[i].slice(0,-3)).description, true)
            }
            msg.channel.send(embed)
        } else {
            cmdHelp = bot.commands.get(args[0])
            if(cmdHelp == undefined){
                error.execute(msg, `La commande "${args[0]}" n'existe pas !\nFaites \`${prefix}help\` pour obtenir une liste de toutes les commandes.`)
            } else {
                embed.setTitle(`Aide - ${args[0]}`)
                .setDescription(`Syntaxe de la commande:\n\`\`\`${prefix}${cmdHelp.syntax}\`\`\``)
                .setColor("");
                msg.channel.send(embed)
            }
        }
        return msg.delete({timeout: config["timeout"]["command_execution"]*1000})
    }
    if(!bot.commands.get(cmd)) return error.execute(msg, `La commande "${cmd}" n'existe pas !\nFaites \`${prefix}help\` pour obtenir une liste de toutes les commandes.`), msg.delete({timeout: 5000})
    try {
        bot.commands.get(cmd).execute(msg, args, config)
        msg.delete({timeout: config["timeout"]["command_execution"]*1000})
    } catch(e){
        throw e;
    }
})

bot.login(process.env.TOKEN)