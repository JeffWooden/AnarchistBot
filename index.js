const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")
require("dotenv").config();

bot.once("ready", () => {
    console.log(`${bot.user.tag} connecté.`)
    if(config.startMessage == true) bot.channels.cache.find(ch => ch.name === "général").send("Hello World ! I'm UP !")
})

bot.login(process.env.TOKEN)